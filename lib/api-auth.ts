import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { UserRole } from './types/auth';

export interface AuthenticatedUser {
  userId: string;
  role: UserRole;
  farmId: string | null;
}

/**
 * Higher-order function to protect API routes with authentication and role checks
 */
export function withAuth(
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<Response>,
  options: {
    requireAdmin?: boolean;
    requireFarm?: boolean;
  } = {}
) {
  return async (req: NextRequest) => {
    try {
      const headersList = await headers();
      
      const userId = headersList.get('x-user-id');
      const role = headersList.get('x-user-role') as UserRole;
      const farmId = headersList.get('x-user-farm-id') || null;

      if (!userId || !role) {
        return NextResponse.json(
          { error: 'Não autenticado' },
          { status: 401 }
        );
      }

      // Check if admin is required
      if (options.requireAdmin && role !== UserRole.ADMIN) {
        return NextResponse.json(
          { error: 'Acesso negado: apenas administradores podem executar esta ação' },
          { status: 403 }
        );
      }

      // Check if farm is required for non-admin users
      if (options.requireFarm && role !== UserRole.ADMIN && !farmId) {
        return NextResponse.json(
          { error: 'Usuário não possui fazenda associada' },
          { status: 403 }
        );
      }

      const user: AuthenticatedUser = {
        userId,
        role,
        farmId,
      };

      return await handler(req, user);
    } catch (error) {
      console.error('API Auth Error:', error);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }
  };
}

/**
 * Create a Prisma where clause that respects data isolation
 */
export function createIsolatedWhere(user: AuthenticatedUser, additionalWhere?: any) {
  // Admins can access all data
  if (user.role === UserRole.ADMIN) {
    return additionalWhere || {};
  }
  
  // Non-admin users are limited to their farm
  if (!user.farmId) {
    throw new Error('Usuário não possui fazenda associada');
  }
  
  return {
    farmId: user.farmId,
    ...(additionalWhere || {}),
  };
}

/**
 * Create Prisma data that includes farmId for data isolation
 */
export function createIsolatedData(user: AuthenticatedUser, data: any) {
  // Admins need to explicitly set farmId in their requests
  if (user.role === UserRole.ADMIN) {
    return data;
  }
  
  // Non-admin users automatically get their farmId
  if (!user.farmId) {
    throw new Error('Usuário não possui fazenda associada');
  }
  
  return {
    ...data,
    farmId: user.farmId,
  };
}