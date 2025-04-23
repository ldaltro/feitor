import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NatalidadeContent } from '../natalidade-content';
import { getNatalidadeData } from '@/lib/actions/natalidade-actions';
import { createAndDownloadExcel } from '@/lib/utils/client-excel';
import userEvent from '@testing-library/user-event';

// Mock the required modules
jest.mock('@/lib/actions/natalidade-actions', () => ({
  getNatalidadeData: jest.fn(),
}));

jest.mock('@/lib/utils/client-excel', () => ({
  createAndDownloadExcel: jest.fn(),
}));

// Mock useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('NatalidadeContent', () => {
  const mockNatalidadeData = {
    stats: {
      totalAnimals: 100,
      femaleAnimals: 60,
      pregnantAnimals: 30,
      inseminatedAnimals: 5,
      birthsThisMonth: 10,
      birthsLastMonth: 8
    },
    chartData: {
      labels: ['Jan', 'Fev', 'Mar'],
      datasets: [{
        label: 'Nascimentos',
        data: [5, 8, 10],
      }]
    },
    tableData: [
      {
        id: '1',
        tag: 'A001',
        name: 'Mimosa',
        status: 'Ativo',
        birthDate: '01/01/2020',
        reproductiveStatus: 'Gestante',
        inseminationDate: '01/05/2023',
        expectedBirthDate: '01/02/2024'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getNatalidadeData as jest.Mock).mockResolvedValue(mockNatalidadeData);
  });

  it('renders correctly', async () => {
    render(<NatalidadeContent />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Relatório de Natalidade')).toBeInTheDocument();
    });
    
    // Check if export button exists
    expect(screen.getByText('Exportar Excel')).toBeInTheDocument();
  });

  it('exports Excel file when button is clicked', async () => {
    const user = userEvent.setup();
    render(<NatalidadeContent />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Exportar Excel')).toBeInTheDocument();
    });
    
    // Click the export button
    await user.click(screen.getByText('Exportar Excel'));
    
    // Verify getNatalidadeData was called
    expect(getNatalidadeData).toHaveBeenCalled();
    
    // Wait for createAndDownloadExcel to be called
    await waitFor(() => {
      expect(createAndDownloadExcel).toHaveBeenCalled();
    });
    
    // Verify createAndDownloadExcel was called with correct parameters
    expect(createAndDownloadExcel).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Estatísticas',
          data: expect.any(Array)
        }),
        expect.objectContaining({
          name: 'Dados Detalhados',
          data: expect.any(Array)
        })
      ]),
      expect.stringMatching(/Relatório_Natalidade_\d{2}-\d{2}-\d{4}\.xlsx/),
      expect.objectContaining({
        creator: 'Sistema Feitor',
        title: 'Relatório de Natalidade'
      })
    );
  });
});
