import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionsListClient } from '@/components/transactions-list-client';
import { deleteTransaction } from '@/lib/actions/transactions';

// Mock the deleteTransaction action
jest.mock('@/lib/actions/transactions', () => ({
  deleteTransaction: jest.fn(),
}));

// Mock the router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('TransactionsListClient', () => {
  const mockTransactions = [
    {
      id: '1',
      date: new Date('2023-04-23'),
      type: 'Venda',
      value: 1500.50,
      person: 'João Silva',
      animal: {
        id: 'a1',
        name: 'Trovão',
        tag: 'B001',
      },
    },
    {
      id: '2',
      date: new Date('2023-04-22'),
      type: 'Compra',
      value: 2000.00,
      person: 'Maria Santos',
      animal: {
        id: 'a2',
        name: 'Estrela',
        tag: 'B002',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders transactions table with data', () => {
    render(<TransactionsListClient transactions={mockTransactions} />);

    // Check table headers
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Pessoa')).toBeInTheDocument();
    expect(screen.getByText('Animal')).toBeInTheDocument();

    // Check transaction data
    expect(screen.getByText('23/04/2023')).toBeInTheDocument();
    expect(screen.getByText('22/04/2023')).toBeInTheDocument();
    expect(screen.getByText('Venda')).toBeInTheDocument();
    expect(screen.getByText('Compra')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.500,50')).toBeInTheDocument();
    expect(screen.getByText('R$ 2.000,00')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('Trovão (B001)')).toBeInTheDocument();
    expect(screen.getByText('Estrela (B002)')).toBeInTheDocument();
  });

  it('renders empty state when no transactions', () => {
    render(<TransactionsListClient transactions={[]} />);
    
    expect(screen.getByText('Nenhuma transação encontrada.')).toBeInTheDocument();
  });

  it('renders transaction without animal', () => {
    const transactionWithoutAnimal = [{
      id: '3',
      date: new Date('2023-04-21'),
      type: 'Venda',
      value: 1000,
      person: 'Pedro Costa',
    }];

    render(<TransactionsListClient transactions={transactionWithoutAnimal} />);
    
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('applies correct badge variants for transaction types', () => {
    render(<TransactionsListClient transactions={mockTransactions} />);

    const vendaBadge = screen.getByText('Venda');
    const compraBadge = screen.getByText('Compra');

    expect(vendaBadge.closest('div')).toHaveClass('bg-primary');
    expect(compraBadge.closest('div')).toHaveClass('bg-secondary');
  });

  it('renders dropdown menu buttons', () => {
    render(<TransactionsListClient transactions={mockTransactions} />);
    
    // Check that dropdown menu buttons are present
    const menuButtons = screen.getAllByText('Abrir menu');
    expect(menuButtons).toHaveLength(2); // One for each transaction
  });

  it('formats currency correctly for different values', () => {
    const transactionsWithVariousValues = [
      {
        id: '1',
        date: new Date(),
        type: 'Venda',
        value: 0,
        person: 'Test',
      },
      {
        id: '2',
        date: new Date(),
        type: 'Venda',
        value: 1234567.89,
        person: 'Test',
      },
    ];

    render(<TransactionsListClient transactions={transactionsWithVariousValues} />);

    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.234.567,89')).toBeInTheDocument();
  });
});