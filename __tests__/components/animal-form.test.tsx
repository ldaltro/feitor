import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { AnimalForm } from '@/components/animal-form';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (fetch as jest.Mock).mockClear();
  mockPush.mockClear();
});

describe('AnimalForm', () => {
  it('should render all required form fields', () => {
    render(<AnimalForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tag\/identificação/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/raça/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar animal/i })).toBeInTheDocument();
  });

  it('should submit form with valid data and create animal', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'animal-123',
        name: 'Test Animal',
        tag: 'T001',
      }),
    });

    render(<AnimalForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/nome/i), 'Test Animal');
    await user.type(screen.getByLabelText(/tag\/identificação/i), 'T001');
    await user.type(screen.getByLabelText(/raça/i), 'Test Breed');
    
    // Select gender
    await user.click(screen.getByRole('combobox', { name: /gênero/i }));
    await user.click(screen.getByRole('option', { name: /macho/i }));
    
    // Select status
    await user.click(screen.getByRole('combobox', { name: /status/i }));
    await user.click(screen.getByRole('option', { name: /saudável/i }));

    // Submit the form
    await user.click(screen.getByRole('button', { name: /adicionar animal/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('Test Animal'),
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/animais');
    });
  });

  it('should display validation errors for required fields', async () => {
    const user = userEvent.setup();
    
    render(<AnimalForm />);

    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /adicionar animal/i }));

    await waitFor(() => {
      expect(screen.getByText(/o nome deve ter pelo menos 2 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/a tag é obrigatória/i)).toBeInTheDocument();
      expect(screen.getByText(/a raça é obrigatória/i)).toBeInTheDocument();
    });

    // Should not make API call
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should handle API errors gracefully', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock API error
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    render(<AnimalForm />);

    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/nome/i), 'Test Animal');
    await user.type(screen.getByLabelText(/tag\/identificação/i), 'T001');
    await user.type(screen.getByLabelText(/raça/i), 'Test Breed');
    
    await user.click(screen.getByRole('combobox', { name: /gênero/i }));
    await user.click(screen.getByRole('option', { name: /macho/i }));
    
    await user.click(screen.getByRole('combobox', { name: /status/i }));
    await user.click(screen.getByRole('option', { name: /saudável/i }));

    // Submit the form
    await user.click(screen.getByRole('button', { name: /adicionar animal/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating animal:', expect.any(Error));
    });

    // Should not navigate away
    expect(mockPush).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should handle optional fields correctly', async () => {
    const user = userEvent.setup();
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'animal-123' }),
    });

    render(<AnimalForm />);

    // Fill required fields only
    await user.type(screen.getByLabelText(/nome/i), 'Test Animal');
    await user.type(screen.getByLabelText(/tag\/identificação/i), 'T001');
    await user.type(screen.getByLabelText(/raça/i), 'Test Breed');
    
    await user.click(screen.getByRole('combobox', { name: /gênero/i }));
    await user.click(screen.getByRole('option', { name: /macho/i }));
    
    await user.click(screen.getByRole('combobox', { name: /status/i }));
    await user.click(screen.getByRole('option', { name: /saudável/i }));

    // Add optional fields
    await user.type(screen.getByLabelText(/peso \(kg\)/i), '450');
    await user.type(screen.getByLabelText(/valor de compra \(r\$\)/i), '2500');
    await user.type(screen.getByLabelText(/observações/i), 'Test notes');

    await user.click(screen.getByRole('button', { name: /adicionar animal/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('450'),
      });
    });

    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);
    
    expect(requestBody.weight).toBe(450);
    expect(requestBody.purchaseValue).toBe(2500);
    expect(requestBody.notes).toBe('Test notes');
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock a delayed API response
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({ id: 'animal-123' }),
        }), 100)
      )
    );

    render(<AnimalForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/nome/i), 'Test Animal');
    await user.type(screen.getByLabelText(/tag\/identificação/i), 'T001');
    await user.type(screen.getByLabelText(/raça/i), 'Test Breed');
    
    await user.click(screen.getByRole('combobox', { name: /gênero/i }));
    await user.click(screen.getByRole('option', { name: /macho/i }));
    
    await user.click(screen.getByRole('combobox', { name: /status/i }));
    await user.click(screen.getByRole('option', { name: /saudável/i }));

    // Submit the form
    await user.click(screen.getByRole('button', { name: /adicionar animal/i }));

    // Should show loading state
    expect(screen.getByRole('button', { name: /salvando\.\.\./i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvando\.\.\./i })).toBeDisabled();

    // Wait for completion
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/animais');
    });
  });
});