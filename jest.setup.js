// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
require('@testing-library/jest-dom');

// Add TextEncoder/TextDecoder polyfills
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

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

// Polyfills for Next.js server components
global.Request = class Request {
  constructor(input, init) {
    this.url = input;
    this.method = init?.method || 'GET';
    this.headers = new Map(Object.entries(init?.headers || {}));
    this.body = init?.body;
    this._bodyUsed = false;
  }
  
  async json() {
    if (this._bodyUsed) throw new Error('Body already read');
    this._bodyUsed = true;
    return JSON.parse(this.body);
  }
  
  get bodyUsed() {
    return this._bodyUsed;
  }
};

global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.statusText = init?.statusText || 'OK';
    this.headers = new Map(Object.entries(init?.headers || {}));
  }
  
  async json() {
    return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
  }
};