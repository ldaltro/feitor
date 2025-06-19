module.exports = {
  SignJWT: class SignJWT {
    constructor(payload) {
      this.payload = payload;
    }
    setProtectedHeader() {
      return this;
    }
    setIssuedAt() {
      return this;
    }
    setExpirationTime() {
      return this;
    }
    async sign() {
      return `mocked-jwt-token-${JSON.stringify(this.payload)}`;
    }
  },
  jwtVerify: jest.fn(async (token, secret) => {
    if (token.includes('mocked-jwt-token-')) {
      const payload = JSON.parse(token.replace('mocked-jwt-token-', ''));
      return { payload };
    }
    throw new Error('Invalid token');
  }),
};