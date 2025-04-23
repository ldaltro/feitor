import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EventDetails } from "@/components/event-details";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("EventDetails", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders event details correctly", () => {
    render(<EventDetails id="1" />);

    // Check if title and date are rendered
    expect(screen.getByText("Vacinação")).toBeInTheDocument();

    // Check the event type badge
    expect(screen.getByText("Manejo Sanitário")).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/Vacinação contra febre aftosa/)
    ).toBeInTheDocument();

    // Check animals involved
    expect(screen.getByText("Animais Envolvidos")).toBeInTheDocument();
    expect(screen.getByText("5 animais neste evento")).toBeInTheDocument();

    // Check specific animals
    expect(screen.getByText("Mimosa")).toBeInTheDocument();
    expect(screen.getByText("A001")).toBeInTheDocument();
    expect(screen.getByText("Estrela")).toBeInTheDocument();
    expect(screen.getByText("A002")).toBeInTheDocument();
  });

  it("has functional edit button", () => {
    render(<EventDetails id="1" />);

    const editButton = screen.getByText("Editar").closest("a");
    expect(editButton).toHaveAttribute("href", "/eventos/1/editar");
  });

  it("has animal view links", () => {
    render(<EventDetails id="1" />);

    const viewButtons = screen.getAllByText("Ver");
    expect(viewButtons[0].closest("a")).toHaveAttribute("href", "/animais/1");
  });

  it("shows delete confirmation dialog when clicking delete button", async () => {
    render(<EventDetails id="1" />);

    // Dialog content should not be visible initially
    expect(screen.queryByText("Tem certeza?")).not.toBeInTheDocument();

    // Click delete button
    fireEvent.click(screen.getByText("Excluir"));

    // Now dialog should be visible
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
    expect(
      screen.getByText(/Esta ação não pode ser desfeita/)
    ).toBeInTheDocument();
  });

  it("handles deletion and redirects after confirming", async () => {
    // Mock setTimeout to execute immediately
    jest.useFakeTimers();

    render(<EventDetails id="1" />);

    // Open delete dialog
    fireEvent.click(screen.getByText("Excluir"));

    // Confirm deletion
    const deleteConfirmButton = screen
      .getAllByText("Excluir")
      .filter(
        (el) =>
          el.closest("button")?.type === "button" &&
          !el.closest("button")?.hasAttribute("aria-controls")
      )[0];
    fireEvent.click(deleteConfirmButton);

    // Fast-forward timer
    jest.runAllTimers();

    // Should navigate to calendar page
    expect(mockPush).toHaveBeenCalledWith("/calendario");

    jest.useRealTimers();
  });

  it("cancels deletion when clicking cancel button", () => {
    render(<EventDetails id="1" />);

    // Open delete dialog
    fireEvent.click(screen.getByText("Excluir"));

    // Click cancel
    fireEvent.click(screen.getByText("Cancelar"));

    // Dialog should be closed
    expect(screen.queryByText("Tem certeza?")).not.toBeInTheDocument();

    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });
});
