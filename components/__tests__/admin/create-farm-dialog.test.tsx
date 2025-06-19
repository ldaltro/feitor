import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateFarmDialog } from '../../admin/create-farm-dialog';

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('CreateFarmDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dialog when open', () => {
    render(<CreateFarmDialog {...defaultProps} />);

    expect(screen.getByText('Nova Fazenda')).toBeInTheDocument();
    expect(screen.getByText('Crie uma nova fazenda no sistema. Os campos com * são obrigatórios.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome *')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
  });

  it('should not render the dialog when closed', () => {
    render(<CreateFarmDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Nova Fazenda')).not.toBeInTheDocument();
  });

  it('should handle form submission with valid data', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ farm: { id: 'new-farm', name: 'Test Farm' } }),
    } as Response);

    render(<CreateFarmDialog {...defaultProps} />);

    // Fill out the form
    await user.type(screen.getByLabelText('Nome *'), 'Test Farm');
    await user.type(screen.getByLabelText('Endereço'), '123 Farm Street');
    await user.type(screen.getByLabelText('Telefone'), '555-0123');

    // Submit the form
    await user.click(screen.getByText('Criar Fazenda'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/admin/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Farm',
          address: '123 Farm Street',
          phone: '555-0123',
        }),
      });
    });

    await waitFor(() => {
      expect(defaultProps.onSuccess).toHaveBeenCalled();
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('should require name field', async () => {
    const user = userEvent.setup();
    
    render(<CreateFarmDialog {...defaultProps} />);

    // Try to submit without name
    await user.click(screen.getByText('Criar Fazenda'));

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText('Nome *');
    expect(nameInput).toBeRequired();
  });

  it('should handle API errors', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Nome da fazenda já existe' }),
    } as Response);

    render(<CreateFarmDialog {...defaultProps} />);

    // Fill out and submit the form
    await user.type(screen.getByLabelText('Nome *'), 'Existing Farm');
    await user.click(screen.getByText('Criar Fazenda'));

    await waitFor(() => {
      expect(screen.getByText('Nome da fazenda já existe')).toBeInTheDocument();
    });

    // Dialog should not close on error
    expect(defaultProps.onOpenChange).not.toHaveBeenCalledWith(false);
    expect(defaultProps.onSuccess).not.toHaveBeenCalled();
  });

  it('should handle network errors', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<CreateFarmDialog {...defaultProps} />);

    // Fill out and submit the form
    await user.type(screen.getByLabelText('Nome *'), 'Test Farm');
    await user.click(screen.getByText('Criar Fazenda'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar fazenda')).toBeInTheDocument();
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock a delayed response
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockFetch.mockReturnValueOnce(promise as any);

    render(<CreateFarmDialog {...defaultProps} />);

    // Fill out and submit the form
    await user.type(screen.getByLabelText('Nome *'), 'Test Farm');
    await user.click(screen.getByText('Criar Fazenda'));

    // Should show loading state
    expect(screen.getByText('Criando...')).toBeInTheDocument();
    expect(screen.getByText('Criando...')).toBeDisabled();

    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ farm: { id: 'new-farm', name: 'Test Farm' } }),
    });

    await waitFor(() => {
      expect(screen.queryByText('Criando...')).not.toBeInTheDocument();
    });
  });

  it('should reset form when dialog closes and reopens', async () => {
    const user = userEvent.setup();
    
    const { rerender } = render(<CreateFarmDialog {...defaultProps} />);

    // Fill out the form
    await user.type(screen.getByLabelText('Nome *'), 'Test Farm');

    // Close the dialog
    rerender(<CreateFarmDialog {...defaultProps} open={false} />);

    // Reopen the dialog
    rerender(<CreateFarmDialog {...defaultProps} open={true} />);

    // Form should be reset
    expect(screen.getByLabelText('Nome *')).toHaveValue('');
  });

  it('should call onOpenChange when cancel is clicked', async () => {
    const user = userEvent.setup();
    
    render(<CreateFarmDialog {...defaultProps} />);

    await user.click(screen.getByText('Cancelar'));

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should handle optional fields correctly', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ farm: { id: 'new-farm', name: 'Test Farm' } }),
    } as Response);

    render(<CreateFarmDialog {...defaultProps} />);

    // Fill out only required field
    await user.type(screen.getByLabelText('Nome *'), 'Minimal Farm');

    // Submit the form
    await user.click(screen.getByText('Criar Fazenda'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/admin/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Minimal Farm',
          address: '',
          phone: '',
        }),
      });
    });
  });
});