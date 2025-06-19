import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../page";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("LoginPage", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  it("should render login form", () => {
    render(<LoginPage />);

    expect(screen.getByText("VDG")).toBeInTheDocument();
    expect(screen.getByText("Sistema de Gestão de Animais")).toBeInTheDocument();
    expect(screen.getByLabelText("Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("should show error when login fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText("Usuário");
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should redirect on successful login", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: { id: "123", username: "testuser" } }),
    });

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText("Usuário");
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "correctpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("should disable form while loading", async () => {
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText("Usuário");
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Entrando...")).toBeInTheDocument();
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should show generic error on network failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText("Usuário");
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
    });
  });
});