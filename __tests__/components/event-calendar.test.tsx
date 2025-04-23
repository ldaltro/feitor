import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EventCalendar } from "@/components/event-calendar";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock fetch and toast
global.fetch = jest.fn();
jest.mock("@/components/ui/use-toast", () => ({
  useToast: jest.fn().mockReturnValue({
    toast: jest.fn(),
  }),
}));

describe("EventCalendar", () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const mockEvents = [
    {
      id: "1",
      title: "Vacinação Anual",
      date: today,
      type: "Manejo Sanitário",
      description: "Vacinação anual de todo o rebanho",
      animals: [
        {
          animal: {
            id: "animal1",
            name: "Vaca 1",
            tag: "A001",
          },
        },
        {
          animal: {
            id: "animal2",
            name: "Vaca 2",
            tag: "A002",
          },
        },
      ],
    },
    {
      id: "2",
      title: "Inseminação",
      date: tomorrow,
      type: "Manejo Reprodutivo",
      description: "Inseminação artificial programada",
      animals: [
        {
          animal: {
            id: "animal3",
            name: "Vaca 3",
            tag: "A003",
          },
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    });
  });

  it("renders the calendar with current month", async () => {
    render(<EventCalendar />);

    // Check if current month is displayed
    await waitFor(() => {
      expect(
        screen.getByText(format(today, "MMMM yyyy", { locale: ptBR }))
      ).toBeInTheDocument();
    });

    // Check if weekday headers are displayed
    expect(screen.getByText("Dom")).toBeInTheDocument();
    expect(screen.getByText("Seg")).toBeInTheDocument();
    expect(screen.getByText("Ter")).toBeInTheDocument();
    expect(screen.getByText("Qua")).toBeInTheDocument();
    expect(screen.getByText("Qui")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Sáb")).toBeInTheDocument();

    // Check if add event button is present
    expect(screen.getByText("Adicionar Evento")).toBeInTheDocument();
  });

  it("fetches and displays events in the calendar", async () => {
    render(<EventCalendar />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/events");
    });

    // Wait for events to be displayed
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
      expect(screen.getByText("Inseminação")).toBeInTheDocument();
    });
  });

  it("navigates between months when clicking navigation buttons", async () => {
    render(<EventCalendar />);

    // Wait for current month to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(format(today, "MMMM yyyy", { locale: ptBR }))
      ).toBeInTheDocument();
    });

    // Find and click the next month button
    const nextButton = screen.getByTestId("next-month");
    fireEvent.click(nextButton);

    // Check if next month is displayed
    expect(
      screen.getByText(
        format(addDays(today, 32), "MMMM yyyy", { locale: ptBR })
      )
    ).toBeInTheDocument();

    // Find and click the previous month button
    const prevButton = screen.getByTestId("prev-month");
    fireEvent.click(prevButton);

    // Check if we're back to the current month
    expect(
      screen.getByText(format(today, "MMMM yyyy", { locale: ptBR }))
    ).toBeInTheDocument();
  });

  it("opens event details dialog when clicking on an event", async () => {
    render(<EventCalendar />);

    // Wait for events to be loaded
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    // Click on an event
    fireEvent.click(screen.getByText("Vacinação Anual"));

    // Check if dialog is opened with event details
    await waitFor(() => {
      expect(screen.getByText("Descrição")).toBeInTheDocument();
      expect(screen.getByText("Animais Envolvidos")).toBeInTheDocument();
      expect(screen.getByText("2 animais")).toBeInTheDocument();
      expect(screen.getByText("Vaca 1 (A001)")).toBeInTheDocument();
      expect(screen.getByText("Vaca 2 (A002)")).toBeInTheDocument();
    });
  });

  it("shows delete confirmation dialog when clicking delete button", async () => {
    render(<EventCalendar />);

    // Wait for events to be loaded
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    // Click on an event
    fireEvent.click(screen.getByText("Vacinação Anual"));

    // Wait for the dialog to open
    await waitFor(() => {
      expect(screen.getByText("Excluir")).toBeInTheDocument();
    });

    // Click delete button
    fireEvent.click(screen.getByText("Excluir"));

    // Check if confirmation dialog is opened
    await waitFor(() => {
      expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
      expect(
        screen.getByText(/Tem certeza que deseja excluir este evento?/)
      ).toBeInTheDocument();
    });
  });

  it("handles successful event deletion", async () => {
    (fetch as jest.Mock).mockImplementation((url, options) => {
      if (options?.method === "DELETE") {
        return Promise.resolve({
          ok: true,
          json: async () => ({}),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => mockEvents,
      });
    });

    const { useToast } = require("@/components/ui/use-toast");
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    render(<EventCalendar />);

    // Wait for events to be loaded
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    // Click on an event
    fireEvent.click(screen.getByText("Vacinação Anual"));

    // Wait for the dialog to open
    await waitFor(() => {
      expect(screen.getByText("Excluir")).toBeInTheDocument();
    });

    // Click delete button
    fireEvent.click(screen.getByText("Excluir"));

    // Click confirm in confirmation dialog
    await waitFor(() => {
      expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));

    // Check if DELETE request was made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/events/1", { method: "DELETE" });
    });

    // Check if success toast was shown
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Sucesso",
        description: "Evento excluído com sucesso!",
      })
    );
  });

  it("handles errors in loading events", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { useToast } = require("@/components/ui/use-toast");
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    console.error = jest.fn();

    render(<EventCalendar />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/events");
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching events:",
        expect.any(Error)
      );
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Erro",
          description: "Não foi possível carregar os eventos.",
          variant: "destructive",
        })
      );
    });
  });
});
