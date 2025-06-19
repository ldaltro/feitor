import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../auth-provider";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

// Test component that uses useAuth
function TestComponent() {
  const { user, loading, logout } = useAuth();
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {user && <div>User: {user.username}</div>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthProvider", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should show loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should load user data on mount", async () => {
    const mockUser = { userId: "123", username: "testuser" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User: testuser")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/api/auth/me");
  });

  it("should handle authentication check failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.queryByText(/User:/)).not.toBeInTheDocument();
    });
  });

  it("should handle logout", async () => {
    const mockUser = { userId: "123", username: "testuser" };
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("User: testuser")).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    
    await act(async () => {
      logoutButton.click();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
      expect(mockPush).toHaveBeenCalledWith("/login");
      expect(screen.queryByText("User: testuser")).not.toBeInTheDocument();
    });
  });

  it("should throw error when useAuth is used outside AuthProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuth must be used within an AuthProvider");

    consoleSpy.mockRestore();
  });
});