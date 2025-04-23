import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { RecentEvents } from "@/components/recent-events";
import { addWeeks, addMonths, format } from "date-fns";

// Mock fetch
global.fetch = jest.fn();

describe("RecentEvents", () => {
  const mockEvents = [
    {
      id: "1",
      title: "Vacinação Anual",
      date: addWeeks(new Date(), 1).toISOString(),
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
      date: addWeeks(new Date(), 2).toISOString(),
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
    {
      id: "3",
      title: "Pesagem Mensal",
      date: addMonths(new Date(), 2).toISOString(), // Outside of default "week" filter
      type: "Pesagem",
      description: "Pesagem de rotina mensal",
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

  it("renders loading state initially", () => {
    render(<RecentEvents />);
    expect(screen.getByText("Carregando eventos...")).toBeInTheDocument();
  });

  it("fetches and displays events for the next week by default", async () => {
    render(<RecentEvents />);

    // Wait for loading to finish and events to appear
    await waitFor(() => {
      expect(
        screen.queryByText("Carregando eventos...")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/api/events");
    expect(screen.queryByText("Pesagem Mensal")).not.toBeInTheDocument(); // Outside week filter

    // Check filter buttons
    const weekButton = screen.getByText("7 dias");
    const monthButton = screen.getByText("1 mês");
    const threeMonthsButton = screen.getByText("3 meses");

    expect(weekButton).toHaveClass("bg-primary");
    expect(monthButton).not.toHaveClass("bg-primary");
    expect(threeMonthsButton).not.toHaveClass("bg-primary");
  });

  it("filters events when changing period filters", async () => {
    render(<RecentEvents />);

    // Wait for initial events to load
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    // Change filter to 3 months - wrap state update trigger in act
    await act(async () => {
      fireEvent.click(screen.getByText("3 meses"));
    });

    // Should now show all events including the monthly weighing
    await waitFor(() => {
      expect(screen.getByText("Pesagem Mensal")).toBeInTheDocument();
    });

    // Change filter to 1 month - wrap state update trigger in act
    await act(async () => {
      fireEvent.click(screen.getByText("1 mês"));
    });

    // Should show events within the next month
    await waitFor(() => {
      expect(screen.queryByText("Pesagem Mensal")).not.toBeInTheDocument();
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument(); // Check if expected event is visible
      expect(screen.getByText("Inseminação")).toBeInTheDocument(); // Check if expected event is visible
    });
  });

  it("handles fetch errors gracefully", async () => {
    console.error = jest.fn();
    (fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    render(<RecentEvents />);

    // Wait for the fetch attempt and subsequent error handling
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/events");
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching events:",
        expect.any(Error)
      );
      expect(
        screen.getByText("Nenhum evento encontrado para este período")
      ).toBeInTheDocument();
    });
  });

  it("shows event details correctly", async () => {
    render(<RecentEvents />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Vacinação Anual")).toBeInTheDocument();
    });

    // Verify only Vacinação Anual is displayed initially in the 7 days view
    expect(screen.getByText(/2 animais/)).toBeInTheDocument();
    expect(screen.getByText("Manejo Sanitário")).toBeInTheDocument();

    // Switch to the 3 months view - wrap state update trigger in act
    await act(async () => {
      fireEvent.click(screen.getByText("3 meses"));
    });

    // Wait for the view to update after filter change
    await waitFor(() => {
      expect(screen.getByText("Inseminação")).toBeInTheDocument();
      expect(screen.getByText(/1 animais/)).toBeInTheDocument(); // Adjusted selector
      expect(screen.getByText("Manejo Reprodutivo")).toBeInTheDocument();
    });
  });
});
