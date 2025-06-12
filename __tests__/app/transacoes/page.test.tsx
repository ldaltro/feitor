import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsPage from '@/app/transacoes/page';
import { getTransactions } from '@/lib/actions/transactions';

// Mock the transactions action
jest.mock('@/lib/actions/transactions', () => ({
  getTransactions: jest.fn(),
}));

// Mock the TransactionsListClient component
jest.mock('@/components/transactions-list-client', () => ({
  TransactionsListClient: ({ transactions }: { transactions: any[] }) => (
    <div data-testid="transactions-list">
      {transactions.map((t) => (
        <div key={t.id}>{t.person}</div>
      ))}
    </div>
  ),
}));

// Mock Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('TransactionsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders page title and add button', async () => {
    (getTransactions as jest.Mock).mockResolvedValueOnce({
      transactions: [],
      error: null,
    });

    const { container } = render(await TransactionsPage());

    expect(screen.getByText('Transações')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Transação')).toBeInTheDocument();
    
    const addButton = screen.getByRole('link', { name: /adicionar transação/i });
    expect(addButton).toHaveAttribute('href', '/transacoes/adicionar');
  });

  it('renders transactions when data is loaded successfully', async () => {
    const mockTransactions = [
      {
        id: '1',
        date: new Date('2023-04-23'),
        type: 'Venda',
        value: 1500,
        person: 'João Silva',
        animal: { id: 'a1', name: 'Trovão', tag: 'B001' },
      },
      {
        id: '2',
        date: new Date('2023-04-22'),
        type: 'Compra',
        value: 2000,
        person: 'Maria Santos',
        animal: { id: 'a2', name: 'Estrela', tag: 'B002' },
      },
    ];

    (getTransactions as jest.Mock).mockResolvedValueOnce({
      transactions: mockTransactions,
      error: null,
    });

    render(await TransactionsPage());

    expect(screen.getByTestId('transactions-list')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('renders error message when data loading fails', async () => {
    (getTransactions as jest.Mock).mockResolvedValueOnce({
      transactions: null,
      error: 'Failed to fetch transactions',
    });

    render(await TransactionsPage());

    expect(screen.getByText(/erro ao carregar dados/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch transactions/i)).toBeInTheDocument();
  });

  it('renders empty transactions list when no transactions exist', async () => {
    (getTransactions as jest.Mock).mockResolvedValueOnce({
      transactions: [],
      error: null,
    });

    render(await TransactionsPage());

    expect(screen.getByTestId('transactions-list')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });

  it('handles null transactions gracefully', async () => {
    (getTransactions as jest.Mock).mockResolvedValueOnce({
      transactions: null,
      error: null,
    });

    render(await TransactionsPage());

    expect(screen.getByTestId('transactions-list')).toBeInTheDocument();
  });
});