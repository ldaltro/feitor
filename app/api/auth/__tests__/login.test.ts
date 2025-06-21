import { POST } from "../login/route";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextRequest } from "next/server";

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if username or password is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "test" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Username and password are required");
  });

  it("should return 401 if user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "nonexistent", password: "password" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid credentials");
  });

  it("should return 401 if password is incorrect", async () => {
    const hashedPassword = await hashPassword("correctpassword");
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "123",
      username: "testuser",
      password: hashedPassword,
    });

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "wrongpassword" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid credentials");
  });

  it("should login successfully with correct credentials", async () => {
    const password = "correctpassword";
    const hashedPassword = await hashPassword(password);
    const mockUser = {
      id: "123",
      username: "testuser",
      password: hashedPassword,
      email: "test@example.com",
      fullName: "Test User",
      role: "OWNER",
      farmId: "farm123",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      farm: { id: "farm123", name: "Test Farm" }
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user).toEqual({
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      fullName: mockUser.fullName,
      role: mockUser.role,
      farmId: mockUser.farmId,
      farmName: mockUser.farm.name,
    });

    // Check if auth-token cookie is set
    const setCookieHeader = response.headers.get("set-cookie");
    expect(setCookieHeader).toContain("auth-token=");
    expect(setCookieHeader.toLowerCase()).toContain("httponly");
  });
});