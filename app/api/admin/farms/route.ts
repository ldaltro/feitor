import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';

export const GET = withAuth(
  async (req: NextRequest) => {
    const farms = await prisma.farm.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            role: true,
            active: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            animals: true,
            lotes: true,
            events: true,
            transactions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ farms });
  },
  { requireAdmin: true }
);

export const POST = withAuth(
  async (req: NextRequest) => {
    const body = await req.json();
    const { name, address, phone } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Nome da fazenda é obrigatório' },
        { status: 400 }
      );
    }

    const farm = await prisma.farm.create({
      data: {
        name,
        address: address || null,
        phone: phone || null,
      },
    });

    return NextResponse.json({ farm });
  },
  { requireAdmin: true }
);