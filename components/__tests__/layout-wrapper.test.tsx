import { render, screen } from "@testing-library/react";
import { LayoutWrapper } from "../layout-wrapper";
import { useAuth } from "../auth-provider";
import { usePathname } from "next/navigation";

// Mock dependencies
jest.mock("../auth-provider");
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));
jest.mock("../sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("LayoutWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not show sidebar on login page", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should ALWAYS show sidebar when not authenticated but not loading (let middleware handle redirects)", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    // CRITICAL: Sidebar should show even when user is null - middleware will handle auth redirects
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should not show sidebar while loading", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: "123", username: "testuser" },
      loading: true,
    });

    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });

  it("should show sidebar when authenticated and not on login page", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: "123", username: "testuser" },
      loading: false,
    });

    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should apply correct padding when sidebar is shown", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: "123", username: "testuser" },
      loading: false,
    });

    const { container } = render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    const main = container.querySelector("main");
    expect(main).toHaveClass("p-4", "pt-16", "md:p-8", "md:pt-8");
  });

  it("should not apply padding when sidebar is hidden", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    const { container } = render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    const main = container.querySelector("main");
    expect(main).not.toHaveClass("p-4", "pt-16", "md:p-8", "md:pt-8");
  });

  it("CRITICAL: should never hide sidebar unexpectedly on protected pages", () => {
    const protectedPages = ["/", "/animais", "/admin", "/lotes", "/nascimentos"];
    
    protectedPages.forEach(pathname => {
      (usePathname as jest.Mock).mockReturnValue(pathname);
      
      // Test various auth states that might cause sidebar to disappear
      const authStates = [
        { user: null, loading: false }, // No user but not loading
        { user: { userId: "123", username: "test" }, loading: false }, // Authenticated
      ];
      
      authStates.forEach(authState => {
        (useAuth as jest.Mock).mockReturnValue(authState);
        
        const { unmount } = render(
          <LayoutWrapper>
            <div>Content</div>
          </LayoutWrapper>
        );
        
        // CRITICAL: Sidebar must ALWAYS be present when not loading
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        
        unmount();
      });
    });
  });
});