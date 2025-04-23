// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
require('@testing-library/jest-dom');

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    route: '/default-mocked-route',
  }),
  usePathname: () => '/default-mocked-path',
  useSearchParams: () => new URLSearchParams(),
})); 