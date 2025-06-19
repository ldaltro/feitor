import { NextRequest } from 'next/server';
import { GET as adminFarmsGetHandler, POST as adminFarmsPostHandler } from '@/app/api/admin/farms/route';
import { GET as adminUsersGetHandler, POST as adminUsersPostHandler } from '@/app/api/admin/users/route';
import { UserRole } from '@/lib/types/auth';

// Mock the auth functions
jest.mock('@/lib/api-auth', () => ({
  withAuth: (handler: any, options: any) => {
    return async (req: NextRequest) => {
      // Mock admin user for admin-required endpoints
      if (options.requireAdmin) {
        const mockAdminUser = {
          userId: 'admin123',
          role: UserRole.ADMIN,
          farmId: null,
        };
        return handler(req, mockAdminUser);
      }
      
      // Mock regular user
      const mockUser = {
        userId: 'user123',
        role: UserRole.OWNER,
        farmId: 'farm123',
      };
      return handler(req, mockUser);
    };
  },
}));

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    farm: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@/lib/auth', () => ({
  hashPassword: jest.fn(),
}));

import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;

describe('Admin API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/admin/farms', () => {
    it('should return all farms with user counts for admin', async () => {
      const mockFarms = [
        {
          id: 'farm1',
          name: 'Farm One',
          address: '123 Farm St',
          phone: '555-0123',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          users: [
            {
              id: 'user1',
              username: 'owner1',
              email: 'owner1@farm.com',
              fullName: 'Owner One',
              role: 'OWNER',
              active: true,
              createdAt: new Date(),
            },
          ],
          _count: {
            animals: 50,
            lotes: 5,
            events: 20,
            transactions: 15,
          },
        },
        {
          id: 'farm2',
          name: 'Farm Two',
          address: '456 Ranch Rd',
          phone: '555-0456',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          users: [],
          _count: {
            animals: 30,
            lotes: 3,
            events: 10,
            transactions: 8,
          },
        },
      ];

      mockPrisma.farm.findMany.mockResolvedValue(mockFarms);

      const request = new NextRequest('http://localhost/api/admin/farms', {
        method: 'GET',
      });

      const response = await adminFarmsGetHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.farms).toHaveLength(2);
      expect(data.farms[0].name).toBe('Farm One');
      expect(data.farms[0].users).toHaveLength(1);
      expect(data.farms[0]._count.animals).toBe(50);
    });
  });

  describe('POST /api/admin/farms', () => {
    it('should create a new farm with valid data', async () => {
      const mockCreatedFarm = {
        id: 'new-farm-id',
        name: 'New Farm',
        address: '789 New Farm Ave',
        phone: '555-0789',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.farm.create.mockResolvedValue(mockCreatedFarm);

      const request = new NextRequest('http://localhost/api/admin/farms', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New Farm',
          address: '789 New Farm Ave',
          phone: '555-0789',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminFarmsPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.farm.name).toBe('New Farm');
      expect(data.farm.address).toBe('789 New Farm Ave');
    });

    it('should reject farm creation without name', async () => {
      const request = new NextRequest('http://localhost/api/admin/farms', {
        method: 'POST',
        body: JSON.stringify({
          address: '789 New Farm Ave',
          phone: '555-0789',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminFarmsPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Nome da fazenda é obrigatório');
    });
  });

  describe('GET /api/admin/users', () => {
    it('should return all users for admin', async () => {
      const mockUsers = [
        {
          id: 'user1',
          username: 'owner1',
          email: 'owner1@farm.com',
          fullName: 'Owner One',
          password: 'hashedpassword',
          role: 'OWNER',
          active: true,
          farmId: 'farm1',
          createdAt: new Date(),
          updatedAt: new Date(),
          farm: {
            id: 'farm1',
            name: 'Farm One',
          },
        },
        {
          id: 'admin1',
          username: 'admin',
          email: 'admin@system.com',
          fullName: 'System Admin',
          password: 'hashedpassword',
          role: 'ADMIN',
          active: true,
          farmId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          farm: null,
        },
      ];

      mockPrisma.user.findMany.mockResolvedValue(mockUsers);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'GET',
      });

      const response = await adminUsersGetHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toHaveLength(2);
      expect(data.users[0].role).toBe('OWNER');
      expect(data.users[1].role).toBe('ADMIN');
    });

    it('should filter users by farmId when provided', async () => {
      const mockUsers = [
        {
          id: 'user1',
          username: 'owner1',
          email: 'owner1@farm.com',
          fullName: 'Owner One',
          password: 'hashedpassword',
          role: 'OWNER',
          active: true,
          farmId: 'farm1',
          createdAt: new Date(),
          updatedAt: new Date(),
          farm: {
            id: 'farm1',
            name: 'Farm One',
          },
        },
      ];

      mockPrisma.user.findMany.mockResolvedValue(mockUsers);

      const request = new NextRequest('http://localhost/api/admin/users?farmId=farm1', {
        method: 'GET',
      });

      const response = await adminUsersGetHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toHaveLength(1);
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: { farmId: 'farm1' },
        include: { farm: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('POST /api/admin/users', () => {
    it('should create a new user with valid data', async () => {
      const mockCreatedUser = {
        id: 'new-user-id',
        username: 'newuser',
        email: 'newuser@farm.com',
        fullName: 'New User',
        password: 'hashedpassword',
        role: 'EMPLOYEE',
        active: true,
        farmId: 'farm1',
        createdAt: new Date(),
        updatedAt: new Date(),
        farm: {
          id: 'farm1',
          name: 'Farm One',
        },
      };

      mockPrisma.user.findFirst.mockResolvedValue(null); // No existing user
      mockPrisma.farm.findUnique.mockResolvedValue({ id: 'farm1', name: 'Farm One' } as any);
      mockHashPassword.mockResolvedValue('hashedpassword');
      mockPrisma.user.create.mockResolvedValue(mockCreatedUser);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          username: 'newuser',
          email: 'newuser@farm.com',
          password: 'password123',
          fullName: 'New User',
          role: 'EMPLOYEE',
          farmId: 'farm1',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminUsersPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user.username).toBe('newuser');
      expect(data.user.role).toBe('EMPLOYEE');
      expect(data.user.password).toBeUndefined(); // Password should not be returned
    });

    it('should reject user creation with missing fields', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          username: 'newuser',
          // Missing email, password, fullName, role
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminUsersPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Todos os campos são obrigatórios');
    });

    it('should reject non-admin user without farm', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          username: 'newuser',
          email: 'newuser@farm.com',
          password: 'password123',
          fullName: 'New User',
          role: 'OWNER',
          // Missing farmId for non-admin user
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminUsersPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Fazendeiros e funcionários devem ter uma fazenda associada');
    });

    it('should reject creation of duplicate username', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 'existing-user',
        username: 'existinguser',
        email: 'different@email.com',
      } as any);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          username: 'existinguser',
          email: 'newuser@farm.com',
          password: 'password123',
          fullName: 'New User',
          role: 'EMPLOYEE',
          farmId: 'farm1',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminUsersPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Usuário já existe com esse nome de usuário');
    });

    it('should allow admin user creation without farmId', async () => {
      const mockCreatedAdmin = {
        id: 'new-admin-id',
        username: 'newadmin',
        email: 'newadmin@system.com',
        fullName: 'New Admin',
        password: 'hashedpassword',
        role: 'ADMIN',
        active: true,
        farmId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        farm: null,
      };

      mockPrisma.user.findFirst.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue('hashedpassword');
      mockPrisma.user.create.mockResolvedValue(mockCreatedAdmin);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          username: 'newadmin',
          email: 'newadmin@system.com',
          password: 'password123',
          fullName: 'New Admin',
          role: 'ADMIN',
          // No farmId for admin user
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await adminUsersPostHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user.role).toBe('ADMIN');
      expect(data.user.farmId).toBeNull();
    });
  });
});