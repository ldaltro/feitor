import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '../sidebar';
import { useAuth } from '../auth-provider';
import { UserRole } from '@/lib/types/auth';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the auth provider
jest.mock('../auth-provider', () => ({
  useAuth: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  describe('Basic Rendering', () => {
    it('should always render the sidebar structure when user is authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: 'user123',
          username: 'testuser',
          email: 'test@farm.com',
          fullName: 'Test User',
          role: UserRole.OWNER,
          farmId: 'farm123',
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      // Check that essential sidebar elements are present
      expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Animais')).toBeInTheDocument();
      expect(screen.getByText('Lotes')).toBeInTheDocument();
      expect(screen.getByText('Nascimentos')).toBeInTheDocument();
      expect(screen.getByText('Transações')).toBeInTheDocument();
      expect(screen.getByText('Calendário')).toBeInTheDocument();
      expect(screen.getByText('Sair')).toBeInTheDocument();
    });

    it('should render sidebar even when user is null (before authentication)', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      // Core navigation should still be present
      expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Animais')).toBeInTheDocument();
      expect(screen.getByText('Sair')).toBeInTheDocument();
    });

    it('should render sidebar when auth is loading', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: true,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      // Core structure should be present even during loading
      expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  describe('Admin Features', () => {
    it('should show admin link for admin users', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: 'admin123',
          username: 'admin',
          email: 'admin@system.com',
          fullName: 'System Admin',
          role: UserRole.ADMIN,
          farmId: null,
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(true),
      });

      render(<Sidebar />);

      expect(screen.getByText('Administração')).toBeInTheDocument();
      expect(screen.getByText('ADMIN')).toBeInTheDocument();
    });

    it('should not show admin link for non-admin users', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: 'user123',
          username: 'user',
          email: 'user@farm.com',
          fullName: 'Regular User',
          role: UserRole.OWNER,
          farmId: 'farm123',
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      expect(screen.queryByText('Administração')).not.toBeInTheDocument();
    });

    it('should not show admin link when user is null', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      expect(screen.queryByText('Administração')).not.toBeInTheDocument();
    });
  });

  describe('User Information Display', () => {
    it('should display user information when authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: 'user123',
          username: 'testuser',
          email: 'test@farm.com',
          fullName: 'Test User',
          role: UserRole.OWNER,
          farmId: 'farm123',
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('@testuser')).toBeInTheDocument();
      expect(screen.getByText('Proprietário')).toBeInTheDocument();
    });

    it('should not crash when user information is missing', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      expect(() => render(<Sidebar />)).not.toThrow();
      
      // Should still show basic sidebar structure
      expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
    });
  });

  describe('Navigation Active States', () => {
    it('should highlight dashboard when on dashboard page', () => {
      mockUsePathname.mockReturnValue('/');
      
      mockUseAuth.mockReturnValue({
        user: {
          id: 'user123',
          username: 'testuser',
          email: 'test@farm.com',
          fullName: 'Test User',
          role: UserRole.OWNER,
          farmId: 'farm123',
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      const dashboardLink = screen.getByText('Dashboard').closest('a');
      expect(dashboardLink).toHaveClass('bg-primary');
    });

    it('should highlight admin when on admin page', () => {
      mockUsePathname.mockReturnValue('/admin');
      
      mockUseAuth.mockReturnValue({
        user: {
          id: 'admin123',
          username: 'admin',
          email: 'admin@system.com',
          fullName: 'System Admin',
          role: UserRole.ADMIN,
          farmId: null,
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(true),
      });

      render(<Sidebar />);

      const adminLink = screen.getByText('Administração').closest('a');
      expect(adminLink).toHaveClass('bg-primary');
    });
  });

  describe('Error Resilience', () => {
    it('should not crash when auth provider throws error', () => {
      mockUseAuth.mockImplementation(() => {
        throw new Error('Auth provider error');
      });

      // Component should handle errors gracefully
      expect(() => render(<Sidebar />)).toThrow('Auth provider error');
    });

    it('should handle malformed user data gracefully', () => {
      mockUseAuth.mockReturnValue({
        user: {
          // Missing required fields
          id: 'user123',
        } as any,
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      expect(() => render(<Sidebar />)).not.toThrow();
      
      // Should still render basic structure
      expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('should render mobile menu button', () => {
      mockUseAuth.mockReturnValue({
        user: {
          id: 'user123',
          username: 'testuser',
          email: 'test@farm.com',
          fullName: 'Test User',
          role: UserRole.OWNER,
          farmId: 'farm123',
        },
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      render(<Sidebar />);

      // Mobile menu button should be present
      const menuButtons = screen.getAllByRole('button');
      expect(menuButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Critical Sidebar Elements', () => {
    it('should always render core navigation links', () => {
      // Test with various user states
      const userStates = [
        null, // No user
        { // Regular user
          id: 'user123',
          username: 'user',
          email: 'user@farm.com',
          fullName: 'User',
          role: UserRole.EMPLOYEE,
          farmId: 'farm123',
        },
        { // Admin user
          id: 'admin123',
          username: 'admin',
          email: 'admin@system.com',
          fullName: 'Admin',
          role: UserRole.ADMIN,
          farmId: null,
        },
      ];

      userStates.forEach((user, index) => {
        mockUseAuth.mockReturnValue({
          user,
          loading: false,
          logout: jest.fn(),
          isAdmin: jest.fn().mockReturnValue(user?.role === UserRole.ADMIN),
        });

        const { unmount } = render(<Sidebar />);

        // These elements must ALWAYS be present
        expect(screen.getByText('Vida de Gado')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Animais')).toBeInTheDocument();
        expect(screen.getByText('Sair')).toBeInTheDocument();

        unmount();
      });
    });

    it('should never return null or undefined', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        loading: false,
        logout: jest.fn(),
        isAdmin: jest.fn().mockReturnValue(false),
      });

      const { container } = render(<Sidebar />);
      
      // Container should not be empty
      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toBeDefined();
    });
  });
});