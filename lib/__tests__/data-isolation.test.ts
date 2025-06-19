import {
  getUserContext,
  getIsolationWhere,
  getIsolationData,
  validateFarmAccess,
  isCurrentUserAdmin,
  requireAdmin,
} from '../data-isolation';
import { UserRole } from '../types/auth';

// Mock Next.js headers
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

import { headers } from 'next/headers';

const mockHeaders = headers as jest.MockedFunction<typeof headers>;

describe('Data Isolation Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserContext', () => {
    it('should extract user context from headers', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const context = await getUserContext();

      expect(context).toEqual({
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: 'farm123',
      });
    });

    it('should handle missing headers gracefully', async () => {
      mockHeaders.mockResolvedValue({
        get: () => null,
      } as any);

      const context = await getUserContext();

      expect(context).toEqual({
        userId: '',
        role: null,
        farmId: null,
      });
    });

    it('should handle admin user with no farmId', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const context = await getUserContext();

      expect(context).toEqual({
        userId: 'admin123',
        role: UserRole.ADMIN,
        farmId: null,
      });
    });
  });

  describe('getIsolationWhere', () => {
    it('should return all data for admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const whereClause = await getIsolationWhere({ status: 'active' });

      expect(whereClause).toEqual({ status: 'active' });
    });

    it('should filter by farmId for non-admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const whereClause = await getIsolationWhere({ status: 'active' });

      expect(whereClause).toEqual({
        farmId: 'farm123',
        status: 'active',
      });
    });

    it('should throw error for non-admin user without farmId', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      await expect(getIsolationWhere()).rejects.toThrow(
        'Usuário não possui fazenda associada'
      );
    });

    it('should handle empty additional where clause', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', 'farm456'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const whereClause = await getIsolationWhere();

      expect(whereClause).toEqual({
        farmId: 'farm456',
      });
    });
  });

  describe('getIsolationData', () => {
    it('should return data as-is for admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const data = { name: 'Test Animal', breed: 'Holstein' };
      const result = await getIsolationData(data);

      expect(result).toEqual(data);
    });

    it('should add farmId for non-admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const data = { name: 'Test Animal', breed: 'Holstein' };
      const result = await getIsolationData(data);

      expect(result).toEqual({
        name: 'Test Animal',
        breed: 'Holstein',
        farmId: 'farm123',
      });
    });

    it('should throw error for non-admin user without farmId', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const data = { name: 'Test Animal' };

      await expect(getIsolationData(data)).rejects.toThrow(
        'Usuário não possui fazenda associada'
      );
    });
  });

  describe('validateFarmAccess', () => {
    it('should allow admin to access any farm', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const result = await validateFarmAccess('any-farm-id');
      expect(result).toBe(true);
    });

    it('should allow user to access their own farm', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const result = await validateFarmAccess('farm123');
      expect(result).toBe(true);
    });

    it('should deny user access to different farm', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      await expect(validateFarmAccess('farm456')).rejects.toThrow(
        'Acesso negado: você não tem permissão para acessar dados desta fazenda'
      );
    });
  });

  describe('isCurrentUserAdmin', () => {
    it('should return true for admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const result = await isCurrentUserAdmin();
      expect(result).toBe(true);
    });

    it('should return false for non-admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.OWNER],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      const result = await isCurrentUserAdmin();
      expect(result).toBe(false);
    });
  });

  describe('requireAdmin', () => {
    it('should pass for admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'admin123'],
        ['x-user-role', UserRole.ADMIN],
        ['x-user-farm-id', ''],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      await expect(requireAdmin()).resolves.not.toThrow();
    });

    it('should throw error for non-admin users', async () => {
      const mockHeadersList = new Map([
        ['x-user-id', 'user123'],
        ['x-user-role', UserRole.EMPLOYEE],
        ['x-user-farm-id', 'farm123'],
      ]);

      mockHeaders.mockResolvedValue({
        get: (key: string) => mockHeadersList.get(key) || null,
      } as any);

      await expect(requireAdmin()).rejects.toThrow(
        'Acesso negado: apenas administradores podem executar esta ação'
      );
    });
  });
});