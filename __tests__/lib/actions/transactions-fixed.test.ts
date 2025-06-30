import { createTransaction, getTransactions } from '@/lib/actions/transactions';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Mock the dependencies
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  prisma: {
    transaction: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    animal: {
      findFirst: jest.fn(),
    },
    $connect: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

const mockHeaders = headers as jest.MockedFunction<typeof headers>;
const mockPrismaTransactionCreate = prisma.transaction.create as jest.MockedFunction<typeof prisma.transaction.create>;
const mockPrismaTransactionFindMany = prisma.transaction.findMany as jest.MockedFunction<typeof prisma.transaction.findMany>;
const mockPrismaAnimalFindFirst = prisma.animal.findFirst as jest.MockedFunction<typeof prisma.animal.findFirst>;

describe('Transaction Actions - Fixed', () => {
  
  const mockFarmId = 'farm-123';
  const mockAnimalId = 'animal-123';
  const mockTransactionId = 'transaction-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock headers to return farmId
    mockHeaders.mockReturnValue({
      get: jest.fn().mockReturnValue(mockFarmId),
    } as any);
  });

  describe('createTransaction', () => {
    const validTransactionData = {
      type: 'Venda',
      date: new Date('2024-01-15'),
      amount: 1500.50,
      description: 'Venda de gado',
      animalId: mockAnimalId,
    };

    it('should create transaction with specific animal successfully', async () => {
      // Mock animal exists in farm
      mockPrismaAnimalFindFirst.mockResolvedValue({
        id: mockAnimalId,
        farmId: mockFarmId,
      });

      // Mock transaction creation
      const mockTransaction = {
        id: mockTransactionId,
        type: 'Venda',
        date: new Date('2024-01-15'),
        value: 1500.50,
        person: 'Venda de gado',
        farmId: mockFarmId,
        animalId: mockAnimalId,
      };
      mockPrismaTransactionCreate.mockResolvedValue(mockTransaction);

      const result = await createTransaction(validTransactionData);

      expect(result.error).toBeNull();
      expect(result.transaction).toEqual(mockTransaction);
      expect(mockPrismaAnimalFindFirst).toHaveBeenCalledWith({
        where: { id: mockAnimalId, farmId: mockFarmId },
      });
      expect(mockPrismaTransactionCreate).toHaveBeenCalledWith({
        data: {
          type: 'Venda',
          date: new Date('2024-01-15'),
          value: 1500.50,
          person: 'Venda de gado',
          farmId: mockFarmId,
          animalId: mockAnimalId,
        },
      });
    });

    it('should create transaction without specific animal using default animal', async () => {
      const dataWithoutAnimal = {
        type: 'Despesa',
        date: new Date('2024-01-15'),
        amount: 500.00,
        description: 'Ração para gado',
      };

      // Mock default animal lookup
      mockPrismaAnimalFindFirst.mockResolvedValue({
        id: 'default-animal-123',
      });

      // Mock transaction creation
      const mockTransaction = {
        id: mockTransactionId,
        type: 'Despesa',
        date: new Date('2024-01-15'),
        value: 500.00,
        person: 'Ração para gado',
        farmId: mockFarmId,
        animalId: 'default-animal-123',
      };
      mockPrismaTransactionCreate.mockResolvedValue(mockTransaction);

      const result = await createTransaction(dataWithoutAnimal);

      expect(result.error).toBeNull();
      expect(result.transaction).toEqual(mockTransaction);
      expect(mockPrismaAnimalFindFirst).toHaveBeenCalledWith({
        where: { farmId: mockFarmId },
        select: { id: true },
      });
    });

    it('should fail when no farm ID in headers', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      } as any);

      const result = await createTransaction(validTransactionData);

      expect(result.error).toBe('Farm ID not found');
      expect(result.transaction).toBeUndefined();
    });

    it('should fail when specified animal does not exist in farm', async () => {
      mockPrismaAnimalFindFirst.mockResolvedValue(null);

      const result = await createTransaction(validTransactionData);

      expect(result.error).toBe('Animal not found or access denied');
      expect(result.transaction).toBeUndefined();
    });

    it('should fail when no animals exist in farm and no animalId provided', async () => {
      const dataWithoutAnimal = {
        type: 'Despesa',
        date: new Date('2024-01-15'),
        amount: 500.00,
        description: 'Ração para gado',
      };

      mockPrismaAnimalFindFirst.mockResolvedValue(null);

      const result = await createTransaction(dataWithoutAnimal);

      expect(result.error).toBe('No animals found in farm. Create an animal first.');
      expect(result.transaction).toBeUndefined();
    });

    it('should validate required fields', async () => {
      const invalidData = {
        type: '', // Empty type
        date: new Date(),
        amount: -100, // Could be negative, but let's test schema
        description: '',
      };

      const result = await createTransaction(invalidData as any);

      expect(result.error).toBeTruthy();
      expect(result.transaction).toBeUndefined();
    });

    it('should handle database errors gracefully', async () => {
      mockPrismaAnimalFindFirst.mockResolvedValue({
        id: mockAnimalId,
        farmId: mockFarmId,
      });

      mockPrismaTransactionCreate.mockRejectedValue(new Error('Database connection failed'));

      const result = await createTransaction(validTransactionData);

      expect(result.error).toBe('Failed to create transaction');
      expect(result.transaction).toBeUndefined();
    });

    it('should handle different transaction types', async () => {
      const transactionTypes = ['Venda', 'Compra', 'Despesa', 'Outra receita'];
      
      for (const type of transactionTypes) {
        mockPrismaAnimalFindFirst.mockResolvedValue({
          id: mockAnimalId,
          farmId: mockFarmId,
        });

        const mockTransaction = {
          id: `${mockTransactionId}-${type}`,
          type,
          date: new Date('2024-01-15'),
          value: 1000.00,
          person: `Transação do tipo ${type}`,
          farmId: mockFarmId,
          animalId: mockAnimalId,
        };
        mockPrismaTransactionCreate.mockResolvedValue(mockTransaction);

        const data = {
          type,
          date: new Date('2024-01-15'),
          amount: 1000.00,
          description: `Transação do tipo ${type}`,
          animalId: mockAnimalId,
        };

        const result = await createTransaction(data);

        expect(result.error).toBeNull();
        expect(result.transaction?.type).toBe(type);
      }
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions for farm successfully', async () => {
      const mockTransactions = [
        {
          id: 'trans-1',
          type: 'Venda',
          date: new Date('2024-01-15'),
          value: 1500.50,
          person: 'Cliente A',
          farmId: mockFarmId,
          animalId: mockAnimalId,
          animal: {
            id: mockAnimalId,
            name: 'Boi 001',
            tag: 'A001',
          },
        },
        {
          id: 'trans-2',
          type: 'Compra',
          date: new Date('2024-01-10'),
          value: 2000.00,
          person: 'Fornecedor B',
          farmId: mockFarmId,
          animalId: 'animal-456',
          animal: {
            id: 'animal-456',
            name: 'Vaca 002',
            tag: 'A002',
          },
        },
      ];

      mockPrismaTransactionFindMany.mockResolvedValue(mockTransactions);

      const result = await getTransactions();

      expect(result.error).toBeNull();
      expect(result.transactions).toEqual(mockTransactions);
      expect(mockPrismaTransactionFindMany).toHaveBeenCalledWith({
        where: { animal: { farmId: mockFarmId } },
        include: { animal: true },
        orderBy: { date: 'desc' },
      });
    });

    it('should fail when no farm ID in headers', async () => {
      mockHeaders.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      } as any);

      const result = await getTransactions();

      expect(result.error).toBe('Farm ID not found');
      expect(result.transactions).toEqual([]);
    });

    it('should handle database errors when fetching transactions', async () => {
      mockPrismaTransactionFindMany.mockRejectedValue(new Error('Database error'));

      const result = await getTransactions();

      expect(result.error).toBeTruthy();
      expect(result.transactions).toEqual([]);
    });
  });

  describe('Integration scenarios', () => {
    it('should create and then fetch transaction', async () => {
      // Setup: Create transaction
      mockPrismaAnimalFindFirst.mockResolvedValue({
        id: mockAnimalId,
        farmId: mockFarmId,
      });

      const newTransaction = {
        id: mockTransactionId,
        type: 'Venda',
        date: new Date('2024-01-15'),
        value: 1500.50,
        person: 'Venda de gado',
        farmId: mockFarmId,
        animalId: mockAnimalId,
      };
      mockPrismaTransactionCreate.mockResolvedValue(newTransaction);

      const createData = {
        type: 'Venda',
        date: new Date('2024-01-15'),
        amount: 1500.50,
        description: 'Venda de gado',
        animalId: mockAnimalId,
      };

      // Test creation
      const createResult = await createTransaction(createData);
      expect(createResult.error).toBeNull();
      expect(createResult.transaction).toEqual(newTransaction);

      // Setup: Fetch transactions
      const transactionWithAnimal = {
        ...newTransaction,
        animal: {
          id: mockAnimalId,
          name: 'Boi 001',
          tag: 'A001',
        },
      };
      mockPrismaTransactionFindMany.mockResolvedValue([transactionWithAnimal]);

      // Test fetching
      const fetchResult = await getTransactions();
      expect(fetchResult.error).toBeNull();
      expect(fetchResult.transactions).toHaveLength(1);
      expect(fetchResult.transactions[0]).toEqual(transactionWithAnimal);
    });
  });
});