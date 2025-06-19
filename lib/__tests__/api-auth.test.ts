import { NextRequest, NextResponse } from 'next/server';
import { withAuth, createIsolatedWhere, createIsolatedData } from '../api-auth';
import { UserRole } from '../types/auth';

// Mock Next.js headers
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

import { headers } from 'next/headers';

const mockHeaders = headers as jest.MockedFunction<typeof headers>;

describe('API Auth Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('withAuth Higher-Order Function', () => {
    it('should call handler with authenticated user for valid headers', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(mockHandler);

      const request = new NextRequest('http://localhost/api/test');
      const response = await protectedHandler(request);

      expect(mockHandler).toHaveBeenCalledWith(request, {
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: 'farm123',
      });
      expect(response).toBeInstanceOf(NextResponse);
    });

    it('should return 401 for missing user headers', async () => {
      mockHeaders.mockResolvedValue({
        get: () => null,
      } as any);

      const mockHandler = jest.fn();
      const protectedHandler = withAuth(mockHandler);

      const request = new NextRequest('http://localhost/api/test');
      const response = await protectedHandler(request);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data.error).toBe('Não autenticado');
    });

    it('should enforce admin requirement', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn();
      const protectedHandler = withAuth(mockHandler, { requireAdmin: true });

      const request = new NextRequest('http://localhost/api/admin/test');
      const response = await protectedHandler(request);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      
      const data = await response.json();
      expect(data.error).toBe('Acesso negado: apenas administradores podem executar esta ação');
    });

    it('should allow admin access to admin-required routes', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(mockHandler, { requireAdmin: true });

      const request = new NextRequest('http://localhost/api/admin/test');
      const response = await protectedHandler(request);

      expect(mockHandler).toHaveBeenCalledWith(request, {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      });
      expect(response.status).toBe(200);
    });

    it('should enforce farm requirement for non-admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn();
      const protectedHandler = withAuth(mockHandler, { requireFarm: true });

      const request = new NextRequest('http://localhost/api/animals');
      const response = await protectedHandler(request);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      
      const data = await response.json();
      expect(data.error).toBe('Usuário não possui fazenda associada');
    });

    it('should allow admin users without farm when farm is required', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const protectedHandler = withAuth(mockHandler, { requireFarm: true });

      const request = new NextRequest('http://localhost/api/animals');
      const response = await protectedHandler(request);

      expect(mockHandler).toHaveBeenCalledWith(request, {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      });
      expect(response.status).toBe(200);
    });

    it('should handle handler errors gracefully', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const mockHandler = jest.fn().mockRejectedValue(new Error('Handler error'));
      const protectedHandler = withAuth(mockHandler);

      const request = new NextRequest('http://localhost/api/test');
      const response = await protectedHandler(request);

      expect(response.status).toBe(500);
      
      const data = await response.json();
      expect(data.error).toBe('Erro interno do servidor');
    });
  });

  describe('createIsolatedWhere', () => {
    it('should return where clause as-is for admin users', () => {
      const adminUser = {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      };

      const whereClause = createIsolatedWhere(adminUser, { status: 'active' });

      expect(whereClause).toEqual({ status: 'active' });
    });

    it('should add farmId filter for non-admin users', () => {
      const user = {
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: 'farm123',
      };

      const whereClause = createIsolatedWhere(user, { status: 'active' });

      expect(whereClause).toEqual({
        farmId: 'farm123',
        status: 'active',
      });
    });

    it('should handle empty additional where for non-admin users', () => {
      const user = {
        userId: 'user123',
        role: UserRole.EMPLOYEE,
        farmId: 'farm456',
      };

      const whereClause = createIsolatedWhere(user);

      expect(whereClause).toEqual({
        farmId: 'farm456',
      });
    });

    it('should throw error for non-admin user without farmId', () => {
      const user = {
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: null,
      };

      expect(() => createIsolatedWhere(user)).toThrow(
        'Usuário não possui fazenda associada'
      );
    });

    it('should handle empty where clause for admin', () => {
      const adminUser = {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      };

      const whereClause = createIsolatedWhere(adminUser);

      expect(whereClause).toEqual({});
    });
  });

  describe('createIsolatedData', () => {
    it('should return data as-is for admin users', () => {
      const adminUser = {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      };

      const data = { name: 'Test Animal', breed: 'Holstein' };
      const result = createIsolatedData(adminUser, data);

      expect(result).toEqual(data);
    });

    it('should add farmId to data for non-admin users', () => {
      const user = {
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: 'farm123',
      };

      const data = { name: 'Test Animal', breed: 'Holstein' };
      const result = createIsolatedData(user, data);

      expect(result).toEqual({
        name: 'Test Animal',
        breed: 'Holstein',
        farmId: 'farm123',
      });
    });

    it('should throw error for non-admin user without farmId', () => {
      const user = {
        userId: 'user123',
        role: UserRole.EMPLOYEE,
        farmId: null,
      };

      const data = { name: 'Test Animal' };

      expect(() => createIsolatedData(user, data)).toThrow(
        'Usuário não possui fazenda associada'
      );
    });

    it('should preserve existing farmId in data for admin', () => {
      const adminUser = {
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      };

      const data = { name: 'Test Animal', farmId: 'specific-farm' };
      const result = createIsolatedData(adminUser, data);

      expect(result).toEqual({
        name: 'Test Animal',
        farmId: 'specific-farm',
      });
    });

    it('should override farmId for non-admin users', () => {
      const user = {
        userId: 'user123',
        role: UserRole.EMPLOYEE,
        farmId: 'user-farm',
      };

      const data = { name: 'Test Animal', farmId: 'wrong-farm' };
      const result = createIsolatedData(user, data);

      expect(result).toEqual({
        name: 'Test Animal',
        farmId: 'user-farm', // User's farmId should override
      });
    });
  });
});