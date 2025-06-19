import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { hashPassword } from '@/lib/auth';
import { UserRole } from '@/lib/types/auth';

export const GET = withAuth(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const farmId = searchParams.get('farmId');

    const where = farmId ? { farmId } : {};

    const users = await prisma.user.findMany({
      where,
      include: {
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users });
  },
  { requireAdmin: true }
);

export const POST = withAuth(
  async (req: NextRequest) => {
    const body = await req.json();
    const { username, email, password, fullName, role, farmId } = body;

    // Validation
    if (!username || !email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Função inválida' },
        { status: 400 }
      );
    }

    // Non-admin users must have a farm
    if (role !== UserRole.ADMIN && !farmId) {
      return NextResponse.json(
        { error: 'Fazendeiros e funcionários devem ter uma fazenda associada' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: `Usuário já existe com esse ${existingUser.username === username ? 'nome de usuário' : 'email'}` },
        { status: 400 }
      );
    }

    // Validate farm exists if farmId is provided
    if (farmId) {
      const farm = await prisma.farm.findUnique({
        where: { id: farmId }
      });

      if (!farm) {
        return NextResponse.json(
          { error: 'Fazenda não encontrada' },
          { status: 400 }
        );
      }
    }

    const hashedPasswordValue = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPasswordValue,
        fullName,
        role,
        farmId: role === UserRole.ADMIN ? null : farmId,
      },
      include: {
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  },
  { requireAdmin: true }
);