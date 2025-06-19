import { middleware } from "../middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, isAdmin } from "@/lib/middleware-auth";
import { UserRole } from "@/lib/types/auth";

// Mock middleware auth module
jest.mock("@/lib/middleware-auth", () => ({
  verifyToken: jest.fn(),
  isAdmin: jest.fn(),
}));

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>;
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>;

describe("Multi-tenant Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Public paths", () => {
    it("should allow access to login page without token", async () => {
      const request = new NextRequest("http://localhost:3000/login");
      const response = await middleware(request);

      expect(response.status).not.toBe(302); // Not a redirect
      expect(verifyToken).not.toHaveBeenCalled();
    });

    it("should allow access to login API without token", async () => {
      const request = new NextRequest("http://localhost:3000/api/auth/login");
      const response = await middleware(request);

      expect(response.status).not.toBe(302); // Not a redirect
      expect(verifyToken).not.toHaveBeenCalled();
    });
  });

  describe("Protected paths without authentication", () => {
    it("should redirect to login if no token", async () => {
      const request = new NextRequest("http://localhost:3000/dashboard");
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should redirect admin routes to login if no token", async () => {
      const request = new NextRequest("http://localhost:3000/admin");
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should redirect to login if token is invalid", async () => {
      mockVerifyToken.mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/dashboard");
      request.cookies.set("auth-token", "invalid-token");

      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/login");
      expect(verifyToken).toHaveBeenCalledWith("invalid-token");
    });
  });

  describe("Protected paths with valid authentication", () => {
    it("should allow access with valid user token", async () => {
      const mockPayload = {
        userId: "user123",
        username: "testuser",
        role: UserRole.OWNER,
        farmId: "farm123",
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(false);

      const request = new NextRequest("http://localhost:3000/dashboard");
      request.cookies.set("auth-token", "valid-token");

      const response = await middleware(request);

      expect(response.status).not.toBe(302); // Not a redirect
      expect(verifyToken).toHaveBeenCalledWith("valid-token");
    });

    it("should inject user headers for authenticated requests", async () => {
      const mockPayload = {
        userId: "user123",
        username: "testuser",
        role: UserRole.EMPLOYEE,
        farmId: "farm456",
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(false);

      const request = new NextRequest("http://localhost:3000/api/animals");
      request.cookies.set("auth-token", "valid-token");

      const response = await middleware(request);

      // Check that user info headers are injected
      const requestHeaders = response.request?.headers;
      if (requestHeaders) {
        expect(requestHeaders.get("x-user-id")).toBe("user123");
        expect(requestHeaders.get("x-user-role")).toBe(UserRole.EMPLOYEE);
        expect(requestHeaders.get("x-user-farm-id")).toBe("farm456");
      }
    });
  });

  describe("Admin route protection", () => {
    it("should allow admin access to admin routes", async () => {
      const mockPayload = {
        userId: "admin123",
        username: "admin",
        role: UserRole.ADMIN,
        farmId: null,
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(true);

      const request = new NextRequest("http://localhost:3000/admin");
      request.cookies.set("auth-token", "valid-admin-token");

      const response = await middleware(request);

      expect(response.status).not.toBe(302); // Not a redirect
      expect(isAdmin).toHaveBeenCalledWith(UserRole.ADMIN);
    });

    it("should redirect non-admin users away from admin routes", async () => {
      const mockPayload = {
        userId: "user123",
        username: "testuser",
        role: UserRole.OWNER,
        farmId: "farm123",
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(false);

      const request = new NextRequest("http://localhost:3000/admin");
      request.cookies.set("auth-token", "valid-user-token");

      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/");
      expect(isAdmin).toHaveBeenCalledWith(UserRole.OWNER);
    });

    it("should protect admin sub-routes", async () => {
      const mockPayload = {
        userId: "user123",
        username: "testuser",
        role: UserRole.EMPLOYEE,
        farmId: "farm123",
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(false);

      const request = new NextRequest("http://localhost:3000/admin/users");
      request.cookies.set("auth-token", "valid-user-token");

      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/");
    });
  });

  describe("Header injection for admins", () => {
    it("should handle null farmId for admin users", async () => {
      const mockPayload = {
        userId: "admin123",
        username: "admin",
        role: UserRole.ADMIN,
        farmId: null,
      };
      
      mockVerifyToken.mockResolvedValue(mockPayload);
      mockIsAdmin.mockReturnValue(true);

      const request = new NextRequest("http://localhost:3000/api/admin/farms");
      request.cookies.set("auth-token", "valid-admin-token");

      const response = await middleware(request);

      const requestHeaders = response.request?.headers;
      if (requestHeaders) {
        expect(requestHeaders.get("x-user-id")).toBe("admin123");
        expect(requestHeaders.get("x-user-role")).toBe(UserRole.ADMIN);
        expect(requestHeaders.get("x-user-farm-id")).toBe(""); // null becomes empty string
      }
    });
  });
});