import { hashPassword, verifyPassword, createToken, verifyToken } from "../auth";

describe("Auth utilities", () => {
  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const password = "testpassword123";
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it("should generate different hashes for the same password", async () => {
      const password = "testpassword123";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyPassword", () => {
    it("should verify a correct password", async () => {
      const password = "testpassword123";
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject an incorrect password", async () => {
      const password = "testpassword123";
      const wrongPassword = "wrongpassword";
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });

  describe("createToken and verifyToken", () => {
    it("should create and verify a valid token", async () => {
      const payload = { userId: "123", username: "testuser" };
      const token = await createToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      
      const verified = await verifyToken(token);
      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.username).toBe(payload.username);
    });

    it("should return null for an invalid token", async () => {
      const invalidToken = "invalid.token.here";
      const verified = await verifyToken(invalidToken);
      
      expect(verified).toBeNull();
    });

    it("should return null for a malformed token", async () => {
      const malformedToken = "malformed";
      const verified = await verifyToken(malformedToken);
      
      expect(verified).toBeNull();
    });
  });
});