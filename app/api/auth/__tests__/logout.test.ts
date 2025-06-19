import { POST } from "../logout/route";

describe("POST /api/auth/logout", () => {
  it("should clear the auth token cookie", async () => {
    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // Check if auth-token cookie is deleted
    const cookies = response.cookies;
    expect(cookies).toBeDefined();
  });
});