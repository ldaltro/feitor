import { GET } from "../me/route";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

describe("GET /api/auth/me", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no auth token", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Not authenticated");
  });

  it("should return 401 if token is invalid", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "invalid.token" }),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Invalid token");
  });

  it("should return user data for valid token", async () => {
    const tokenPayload = { 
      userId: "123", 
      username: "testuser",
      email: "test@example.com",
      fullName: "Test User",
      role: "OWNER",
      farmId: "farm123"
    };
    
    const mockUser = {
      id: "123",
      username: "testuser",
      email: "test@example.com",
      fullName: "Test User",
      role: "OWNER",
      farmId: "farm123",
      password: "hashed",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      farm: null
    };
    
    const token = await createToken(tokenPayload);

    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: token }),
    });
    
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.id).toBe("123");
    expect(data.user.username).toBe("testuser");
  });
});