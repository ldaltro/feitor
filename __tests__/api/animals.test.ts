import { POST, GET } from '@/app/api/animals/route';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

// Mock the dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $connect: jest.fn(),
    animal: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

const mockHeaders = headers as jest.MockedFunction<typeof headers>;
const mockPrismaConnect = prisma.$connect as jest.MockedFunction<typeof prisma.$connect>;
const mockPrismaAnimalCreate = prisma.animal.create as jest.MockedFunction<typeof prisma.animal.create>;
const mockPrismaAnimalFindMany = prisma.animal.findMany as jest.MockedFunction<typeof prisma.animal.findMany>;

describe('/api/animals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/animals', () => {
    const validAnimalData = {
      name: 'Test Animal',
      tag: 'T001',
      breed: 'Test Breed',
      gender: 'Macho',
      birthDate: '2023-01-01T00:00:00.000Z',
      status: 'Saudável',
      weight: 100,
      purchaseValue: 1000,
      notes: 'Test notes'
    };

    it('should create an animal successfully with valid data', async () => {
      // Mock headers to return farmId
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue('farm-123')
      } as any);

      // Mock Prisma to return created animal
      const createdAnimal = {
        id: 'animal-123',
        ...validAnimalData,
        farmId: 'farm-123',
        birthDate: new Date(validAnimalData.birthDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaAnimalCreate.mockResolvedValue(createdAnimal);

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validAnimalData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.id).toBe('animal-123');
      expect(data.name).toBe('Test Animal');
      expect(data.farmId).toBe('farm-123');

      expect(mockPrismaAnimalCreate).toHaveBeenCalledWith({
        data: {
          name: 'Test Animal',
          tag: 'T001',
          breed: 'Test Breed',
          gender: 'Macho',
          birthDate: new Date(validAnimalData.birthDate),
          status: 'Saudável',
          weight: 100,
          purchaseValue: 1000,
          purchaseDate: null,
          notes: 'Test notes',
          farmId: 'farm-123',
        }
      });
    });

    it('should return 400 when farmId is missing from headers', async () => {
      // Mock headers to return null farmId
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue(null)
      } as any);

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validAnimalData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Farm ID not found');
      expect(mockPrismaAnimalCreate).not.toHaveBeenCalled();
    });

    it('should return 400 when required fields are missing', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue('farm-123')
      } as any);

      const incompleteData = {
        name: 'Test Animal',
        // Missing required fields
      };

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incompleteData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing required fields');
      expect(mockPrismaAnimalCreate).not.toHaveBeenCalled();
    });

    it('should handle optional fields correctly', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue('farm-123')
      } as any);

      const minimalData = {
        name: 'Test Animal',
        tag: 'T001',
        breed: 'Test Breed',
        gender: 'Macho',
        birthDate: '2023-01-01T00:00:00.000Z',
        status: 'Saudável',
        // No optional fields
      };

      const createdAnimal = {
        id: 'animal-123',
        ...minimalData,
        farmId: 'farm-123',
        birthDate: new Date(minimalData.birthDate),
        weight: 0,
        purchaseValue: 0,
        purchaseDate: null,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaAnimalCreate.mockResolvedValue(createdAnimal);

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(minimalData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(mockPrismaAnimalCreate).toHaveBeenCalledWith({
        data: {
          name: 'Test Animal',
          tag: 'T001',
          breed: 'Test Breed',
          gender: 'Macho',
          birthDate: new Date(minimalData.birthDate),
          status: 'Saudável',
          weight: 0,
          purchaseValue: 0,
          purchaseDate: null,
          notes: null,
          farmId: 'farm-123',
        }
      });
    });

    it('should return 500 when database operation fails', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue('farm-123')
      } as any);

      mockPrismaAnimalCreate.mockRejectedValue(new Error('Database error'));

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validAnimalData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create animal');
      expect(data.details).toBe('Database error');
    });
  });

  describe('GET /api/animals', () => {
    it('should fetch animals successfully', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue('farm-123')
      } as any);

      // Mock the $connect method
      mockPrismaConnect.mockResolvedValue(undefined);

      const mockAnimals = [
        {
          id: 'animal-1',
          name: 'Animal 1',
          tag: 'A001',
          breed: 'Breed 1',
          status: 'Saudável',
          birthDate: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'animal-2',
          name: 'Animal 2',
          tag: 'A002',
          breed: 'Breed 2',
          status: 'Saudável',
          birthDate: new Date(),
          createdAt: new Date(),
        }
      ];

      mockPrismaAnimalFindMany.mockResolvedValue(mockAnimals);

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'GET',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(2);
      expect(data[0].name).toBe('Animal 1');
      expect(data[1].name).toBe('Animal 2');

      expect(mockPrismaAnimalFindMany).toHaveBeenCalledWith({
        where: { farmId: 'farm-123' },
        select: {
          id: true,
          name: true,
          tag: true,
          breed: true,
          status: true,
          birthDate: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it('should return 400 when farmId is missing', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue(null)
      } as any);

      const request = new Request('http://localhost:3000/api/animals', {
        method: 'GET',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Farm ID not found');
      expect(mockPrismaAnimalFindMany).not.toHaveBeenCalled();
    });
  });
});