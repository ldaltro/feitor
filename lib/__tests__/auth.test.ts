import { hashPassword, verifyPassword, createToken, verifyToken, isAdmin, canAccessFarmData } from "../auth";
import { UserRole } from "../types/auth";

describe("Multi-tenant Auth System", () => {
  describe("Password hashing and verification", () => {
    it("should hash a password", async () => {
      const password = "testpassword123";
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50); // bcrypt hashes are long
    });

    it("should generate different hashes for the same password", async () => {
      const password = "testpassword123";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
      
      // Both should still verify correctly
      expect(await verifyPassword(password, hash1)).toBe(true);
      expect(await verifyPassword(password, hash2)).toBe(true);
    });

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

  describe("JWT tokens with roles and farmId", () => {
    it("should create and verify a valid admin token", async () => {
      const payload = { 
        userId: "admin123", 
        username: "admin", 
        role: UserRole.ADMIN as UserRole,
        farmId: null 
      };
      const token = await createToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      
      const verified = await verifyToken(token);
      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.username).toBe(payload.username);
      expect(verified?.role).toBe(UserRole.ADMIN);
      expect(verified?.farmId).toBeNull();
    });

    it("should create and verify a valid owner token", async () => {
      const payload = { 
        userId: "owner123", 
        username: "farmowner", 
        role: UserRole.OWNER as UserRole,
        farmId: "farm123" 
      };
      const token = await createToken(payload);
      
      const verified = await verifyToken(token);
      expect(verified).toBeDefined();
      expect(verified?.role).toBe(UserRole.OWNER);
      expect(verified?.farmId).toBe("farm123");
    });

    it("should create and verify a valid employee token", async () => {
      const payload = { 
        userId: "emp123", 
        username: "employee", 
        role: UserRole.EMPLOYEE as UserRole,
        farmId: "farm123" 
      };
      const token = await createToken(payload);
      
      const verified = await verifyToken(token);
      expect(verified).toBeDefined();
      expect(verified?.role).toBe(UserRole.EMPLOYEE);
      expect(verified?.farmId).toBe("farm123");
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

  describe("Role-based access control", () => {
    it("should correctly identify admin users", () => {
      expect(isAdmin(UserRole.ADMIN)).toBe(true);
      expect(isAdmin(UserRole.OWNER)).toBe(false);
      expect(isAdmin(UserRole.EMPLOYEE)).toBe(false);
      expect(isAdmin("INVALID_ROLE")).toBe(false);
    });
  });

  describe("Farm data access control", () => {
    it("should allow admins to access any farm data", () => {
      expect(canAccessFarmData(null, "farm123", UserRole.ADMIN)).toBe(true);
      expect(canAccessFarmData("farm456", "farm123", UserRole.ADMIN)).toBe(true);
      expect(canAccessFarmData("differentFarm", "farm123", UserRole.ADMIN)).toBe(true);
    });

    it("should allow owners to access their own farm data only", () => {
      expect(canAccessFarmData("farm123", "farm123", UserRole.OWNER)).toBe(true);
      expect(canAccessFarmData("farm123", "farm456", UserRole.OWNER)).toBe(false);
    });

    it("should allow employees to access their own farm data only", () => {
      expect(canAccessFarmData("farm123", "farm123", UserRole.EMPLOYEE)).toBe(true);
      expect(canAccessFarmData("farm123", "farm456", UserRole.EMPLOYEE)).toBe(false);
    });

    it("should deny access when user has no farm association", () => {
      expect(canAccessFarmData(null, "farm123", UserRole.OWNER)).toBe(false);
      expect(canAccessFarmData(null, "farm123", UserRole.EMPLOYEE)).toBe(false);
    });
  });
});