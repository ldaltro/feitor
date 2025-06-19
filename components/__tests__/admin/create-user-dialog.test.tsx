import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUserDialog } from '../../admin/create-user-dialog';
import { UserRole } from '@/lib/types/auth';

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('CreateUserDialog', () => {
  const mockFarms = [
    { id: 'farm1', name: 'Farm One' },
    { id: 'farm2', name: 'Farm Two' },
  ];

  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    onSuccess: jest.fn(),
    farms: mockFarms,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dialog when open', () => {
    render(<CreateUserDialog {...defaultProps} />);

    expect(screen.getByText('Novo Usuário')).toBeInTheDocument();
    expect(screen.getByText('Crie um novo usuário no sistema. Todos os campos são obrigatórios.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome de usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Função')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument();
  });

  it('should not render the dialog when closed', () => {
    render(<CreateUserDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Novo Usuário')).not.toBeInTheDocument();
  });

  it('should show farm selector when non-admin role is selected', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    // Initially, farm selector should not be visible
    expect(screen.queryByLabelText('Fazenda')).not.toBeInTheDocument();

    // Select owner role
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Proprietário'));

    // Farm selector should now be visible
    expect(screen.getByLabelText('Fazenda')).toBeInTheDocument();
  });

  it('should not show farm selector for admin role', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    // Select admin role
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Administrador'));

    // Farm selector should not be visible
    expect(screen.queryByLabelText('Fazenda')).not.toBeInTheDocument();
  });

  it('should handle form submission with valid data', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        user: { 
          id: 'new-user', 
          username: 'testuser',
          role: 'EMPLOYEE',
          farmId: 'farm1'
        } 
      }),
    } as Response);

    render(<CreateUserDialog {...defaultProps} />);

    // Fill out the form
    await user.type(screen.getByLabelText('Nome de usuário'), 'testuser');
    await user.type(screen.getByLabelText('Email'), 'test@farm.com');
    await user.type(screen.getByLabelText('Nome completo'), 'Test User');
    
    // Select role
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Funcionário'));
    
    // Select farm
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));
    
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.type(screen.getByLabelText('Confirmar senha'), 'password123');

    // Submit the form
    await user.click(screen.getByText('Criar Usuário'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@farm.com',
          fullName: 'Test User',
          role: 'EMPLOYEE',
          farmId: 'farm1',
          password: 'password123',
        }),
      });
    });

    await waitFor(() => {
      expect(defaultProps.onSuccess).toHaveBeenCalled();
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('should handle admin user creation without farm', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        user: { 
          id: 'new-admin', 
          username: 'admin',
          role: 'ADMIN',
          farmId: null
        } 
      }),
    } as Response);

    render(<CreateUserDialog {...defaultProps} />);

    // Fill out the form for admin
    await user.type(screen.getByLabelText('Nome de usuário'), 'admin');
    await user.type(screen.getByLabelText('Email'), 'admin@system.com');
    await user.type(screen.getByLabelText('Nome completo'), 'System Admin');
    
    // Select admin role
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Administrador'));
    
    await user.type(screen.getByLabelText('Senha'), 'adminpass123');
    await user.type(screen.getByLabelText('Confirmar senha'), 'adminpass123');

    // Submit the form
    await user.click(screen.getByText('Criar Usuário'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          email: 'admin@system.com',
          fullName: 'System Admin',
          role: 'ADMIN',
          password: 'adminpass123',
          farmId: '',
        }),
      });
    });
  });

  it('should validate password confirmation', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    // Fill out form with mismatched passwords
    await user.type(screen.getByLabelText('Nome de usuário'), 'testuser');
    await user.type(screen.getByLabelText('Email'), 'test@farm.com');
    await user.type(screen.getByLabelText('Nome completo'), 'Test User');
    
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Funcionário'));
    
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));
    
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.type(screen.getByLabelText('Confirmar senha'), 'different123');

    // Submit the form
    await user.click(screen.getByText('Criar Usuário'));

    await waitFor(() => {
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should validate password length', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    // Fill out form with short password
    await user.type(screen.getByLabelText('Nome de usuário'), 'testuser');
    await user.type(screen.getByLabelText('Email'), 'test@farm.com');
    await user.type(screen.getByLabelText('Nome completo'), 'Test User');
    
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Funcionário'));
    
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));
    
    await user.type(screen.getByLabelText('Senha'), 'short');
    await user.type(screen.getByLabelText('Confirmar senha'), 'short');

    // Submit the form
    await user.click(screen.getByText('Criar Usuário'));

    await waitFor(() => {
      expect(screen.getByText('A senha deve ter pelo menos 8 caracteres')).toBeInTheDocument();
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Usuário já existe com esse nome de usuário' }),
    } as Response);

    render(<CreateUserDialog {...defaultProps} />);

    // Fill out valid form
    await user.type(screen.getByLabelText('Nome de usuário'), 'existing');
    await user.type(screen.getByLabelText('Email'), 'test@farm.com');
    await user.type(screen.getByLabelText('Nome completo'), 'Test User');
    
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Funcionário'));
    
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));
    
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.type(screen.getByLabelText('Confirmar senha'), 'password123');

    await user.click(screen.getByText('Criar Usuário'));

    await waitFor(() => {
      expect(screen.getByText('Usuário já existe com esse nome de usuário')).toBeInTheDocument();
    });

    expect(defaultProps.onSuccess).not.toHaveBeenCalled();
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockFetch.mockReturnValueOnce(promise as any);

    render(<CreateUserDialog {...defaultProps} />);

    // Fill out form
    await user.type(screen.getByLabelText('Nome de usuário'), 'testuser');
    await user.type(screen.getByLabelText('Email'), 'test@farm.com');
    await user.type(screen.getByLabelText('Nome completo'), 'Test User');
    
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Funcionário'));
    
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));
    
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.type(screen.getByLabelText('Confirmar senha'), 'password123');

    await user.click(screen.getByText('Criar Usuário'));

    // Should show loading state
    expect(screen.getByText('Criando...')).toBeInTheDocument();
    expect(screen.getByText('Criando...')).toBeDisabled();

    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ user: { id: 'new-user', username: 'testuser' } }),
    });

    await waitFor(() => {
      expect(screen.queryByText('Criando...')).not.toBeInTheDocument();
    });
  });

  it('should call onOpenChange when cancel is clicked', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    await user.click(screen.getByText('Cancelar'));

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should clear farmId when admin role is selected', async () => {
    const user = userEvent.setup();
    
    render(<CreateUserDialog {...defaultProps} />);

    // First select owner role and farm
    await user.click(screen.getByText('Selecione a função'));
    await user.click(screen.getByText('Proprietário'));
    
    await user.click(screen.getByText('Selecione a fazenda'));
    await user.click(screen.getByText('Farm One'));

    // Then switch to admin role
    await user.click(screen.getByText('Proprietário'));
    await user.click(screen.getByText('Administrador'));

    // Farm selector should be hidden
    expect(screen.queryByLabelText('Fazenda')).not.toBeInTheDocument();
  });
});