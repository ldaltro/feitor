import { middleware } from "../middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Mock auth module
jest.mock("@/lib/auth", () => ({
  verifyToken: jest.fn(),
}));

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Public paths", () => {
    it("should allow access to login page without token", async () => {
      const request = new NextRequest("http://localhost:3000/login");
      const response = await middleware(request);

      expect(response.status).toBe(200);
      expect(verifyToken).not.toHaveBeenCalled();
    });

    it("should allow access to login API without token", async () => {
      const request = new NextRequest("http://localhost:3000/api/auth/login");
      const response = await middleware(request);

      expect(response.status).toBe(200);
      expect(verifyToken).not.toHaveBeenCalled();
    });
  });

  describe("Protected paths", () => {
    it("should redirect to login if no token", async () => {
      const request = new NextRequest("http://localhost:3000/dashboard");
      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should redirect to login if token is invalid", async () => {
      (verifyToken as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/dashboard");
      request.cookies.set("auth-token", "invalid-token");

      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("http://localhost:3000/login");
      // Cookie deletion is handled by response.cookies.delete
    });

    it("should allow access with valid token", async () => {
      (verifyToken as jest.Mock).mockResolvedValue({
        userId: "123",
        username: "testuser",
      });

      const request = new NextRequest("http://localhost:3000/dashboard");
      request.cookies.set("auth-token", "valid-token");

      const response = await middleware(request);

      expect(response.status).toBe(200);
      expect(verifyToken).toHaveBeenCalledWith("valid-token");
    });
  });

});