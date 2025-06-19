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

  it("should not show sidebar when not authenticated", () => {
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

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
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
});