class MockNextResponse {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = new Map();
    this.cookies = {
      set: jest.fn((name, value, options) => {
        this.headers.set('set-cookie', `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join('; ')}`);
      }),
      delete: jest.fn((name) => {
        this.headers.set('set-cookie', `${name}=; Max-Age=0`);
      }),
    };
  }

  static json(body, init) {
    const response = new MockNextResponse(JSON.stringify(body), init);
    response.headers.set('content-type', 'application/json');
    return response;
  }

  static redirect(url) {
    const response = new MockNextResponse(null, { status: 307 });
    response.headers.set('location', url.toString());
    return response;
  }

  static next() {
    return new MockNextResponse(null, { status: 200 });
  }

  async json() {
    return JSON.parse(this.body);
  }
}

class MockNextRequest {
  constructor(url, init) {
    this.url = url;
    this.method = init?.method || 'GET';
    this.headers = new Map(Object.entries(init?.headers || {}));
    this.body = init?.body;
    this._bodyUsed = false;
    this._cookies = new Map();
    this.cookies = {
      get: jest.fn((name) => {
        return this._cookies.get(name);
      }),
      set: jest.fn((name, value) => {
        this._cookies.set(name, { value });
      }),
    };
    this.nextUrl = {
      pathname: new URL(url).pathname,
    };
  }

  async json() {
    if (this._bodyUsed) throw new Error('Body already read');
    this._bodyUsed = true;
    return JSON.parse(this.body);
  }
}

module.exports = {
  NextResponse: MockNextResponse,
  NextRequest: MockNextRequest,
};