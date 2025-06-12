import { getTransactions, getTransactionById, createTransaction, deleteTransaction } from '@/lib/actions/transactions';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    transaction: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Transaction Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getTransactions', () => {
    it('returns transactions successfully', async () => {
      const mockTransactions = [
        {
          id: '1',
          type: 'Venda',
          date: new Date('2023-04-23'),
          value: 1500,
          person: 'João Silva',
          animalId: 'a1',
          animal: { id: 'a1', name: 'Trovão', tag: 'B001' },
        },
      ];

      (db.transaction.findMany as jest.Mock).mockResolvedValueOnce(mockTransactions);

      const result = await getTransactions();

      expect(db.transaction.findMany).toHaveBeenCalledWith({
        include: { animal: true },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual({ transactions: mockTransactions });
    });

    it('returns error when database query fails', async () => {
      (db.transaction.findMany as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      const result = await getTransactions();

      expect(result).toEqual({ error: 'Failed to fetch transactions' });
    });
  });

  describe('getTransactionById', () => {
    it('returns transaction by id successfully', async () => {
      const mockTransaction = {
        id: '1',
        type: 'Venda',
        date: new Date('2023-04-23'),
        value: 1500,
        person: 'João Silva',
        animalId: 'a1',
        animal: { id: 'a1', name: 'Trovão', tag: 'B001' },
      };

      (db.transaction.findUnique as jest.Mock).mockResolvedValueOnce(mockTransaction);

      const result = await getTransactionById('1');

      expect(db.transaction.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { animal: true },
      });
      expect(result).toEqual({ transaction: mockTransaction });
    });

    it('returns error when transaction not found', async () => {
      (db.transaction.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Not found'));

      const result = await getTransactionById('999');

      expect(result).toEqual({ error: 'Failed to fetch transaction with ID 999' });
    });
  });

  describe('createTransaction', () => {
    const validTransactionData = {
      date: new Date('2023-04-23'),
      type: 'Venda',
      value: 1500,
      person: 'João Silva',
      animalId: 'a1',
    };

    it('creates transaction successfully', async () => {
      const mockCreatedTransaction = {
        id: '1',
        ...validTransactionData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.transaction.create as jest.Mock).mockResolvedValueOnce(mockCreatedTransaction);

      const result = await createTransaction(validTransactionData);

      expect(db.transaction.create).toHaveBeenCalledWith({
        data: validTransactionData,
      });
      expect(revalidatePath).toHaveBeenCalledWith('/transacoes');
      expect(result).toEqual({ transaction: mockCreatedTransaction });
    });

    it('returns validation error for invalid data', async () => {
      const invalidData = {
        date: 'not-a-date', // Invalid date
        type: 'Venda',
        value: 'not-a-number', // Invalid value
        person: 'João Silva',
        animalId: 'a1',
      };

      const result = await createTransaction(invalidData as any);

      expect(db.transaction.create).not.toHaveBeenCalled();
      expect(result.error).toBeDefined();
    });

    it('returns error when database create fails', async () => {
      (db.transaction.create as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      const result = await createTransaction(validTransactionData);

      expect(result).toEqual({ 
        error: 'Failed to create transaction' 
      });
    });
  });

  describe('deleteTransaction', () => {
    it('deletes transaction successfully', async () => {
      (db.transaction.delete as jest.Mock).mockResolvedValueOnce({ id: '1' });

      const result = await deleteTransaction('1');

      expect(db.transaction.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(revalidatePath).toHaveBeenCalledWith('/transacoes');
      expect(result).toEqual({ success: true });
    });

    it('returns error when delete fails', async () => {
      (db.transaction.delete as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      const result = await deleteTransaction('1');

      expect(result).toEqual({ 
        error: 'Failed to delete transaction with ID 1' 
      });
    });
  });
});