import { GET } from "../me/route";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

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
    const userData = { userId: "123", username: "testuser" };
    const token = await createToken(userData);

    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: token }),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toEqual(userData);
  });
});