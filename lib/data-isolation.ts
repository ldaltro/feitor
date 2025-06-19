import { headers } from 'next/headers';
import { UserRole } from './types/auth';

/**
 * Get user context from request headers (set by middleware)
 */
export async function getUserContext() {
  const headersList = await headers();
  
  return {
    userId: headersList.get('x-user-id') || '',
    role: headersList.get('x-user-role') as UserRole,
    farmId: headersList.get('x-user-farm-id') || null,
  };
}

/**
 * Get Prisma where clause for data isolation
 * Automatically filters by farmId for non-admin users
 */
export async function getIsolationWhere(additionalWhere?: any) {
  const { role, farmId } = await getUserContext();
  
  // Admins can access all data
  if (role === UserRole.ADMIN) {
    return additionalWhere || {};
  }
  
  // Non-admin users are limited to their farm
  if (!farmId) {
    throw new Error('Usuário não possui fazenda associada');
  }
  
  return {
    farmId,
    ...(additionalWhere || {}),
  };
}

/**
 * Get Prisma create/update data with farmId
 * Automatically adds farmId for non-admin users
 */
export async function getIsolationData(data: any) {
  const { role, farmId } = await getUserContext();
  
  // Admins need to explicitly set farmId
  if (role === UserRole.ADMIN) {
    return data;
  }
  
  // Non-admin users automatically get their farmId
  if (!farmId) {
    throw new Error('Usuário não possui fazenda associada');
  }
  
  return {
    ...data,
    farmId,
  };
}

/**
 * Validate farm access for non-admin users
 */
export async function validateFarmAccess(targetFarmId: string) {
  const { role, farmId } = await getUserContext();
  
  // Admins can access any farm
  if (role === UserRole.ADMIN) {
    return true;
  }
  
  // Non-admin users can only access their own farm
  if (farmId !== targetFarmId) {
    throw new Error('Acesso negado: você não tem permissão para acessar dados desta fazenda');
  }
  
  return true;
}

/**
 * Check if current user is admin
 */
export async function isCurrentUserAdmin() {
  const { role } = await getUserContext();
  return role === UserRole.ADMIN;
}

/**
 * Ensure user is admin (throw error if not)
 */
export async function requireAdmin() {
  if (!(await isCurrentUserAdmin())) {
    throw new Error('Acesso negado: apenas administradores podem executar esta ação');
  }
}