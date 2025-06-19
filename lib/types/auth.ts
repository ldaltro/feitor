export const UserRole = {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  farmId: string | null;
}

export interface JWTPayload {
  userId: string;
  username: string;
  role: UserRole;
  farmId: string | null;
}