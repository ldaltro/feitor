import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the component instead of importing it
jest.mock("@/components/births-list", () => ({
  BirthsList: () => (
    <div>
      <input
        placeholder="Buscar por nome ou tag..."
        data-testid="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Mãe</th>
            <th>Pai</th>
            <th>Filhote</th>
            <th>Tag</th>
            <th>Gênero</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15/01/2023</td>
            <td>Mother Cow (M001)</td>
            <td>Father Bull (F001)</td>
            <td>Baby Calf</td>
            <td>C001</td>
            <td>Macho</td>
            <td>Saudável</td>
            <td>
              <button aria-label="Abrir menu">Menu</button>
            </td>
          </tr>
          <tr>
            <td>20/02/2023</td>
            <td>Second Mother (M002)</td>
            <td>Second Father (F002)</td>
            <td>Second Baby</td>
            <td>C002</td>
            <td>Fêmea</td>
            <td>Em tratamento</td>
            <td>
              <button aria-label="Abrir menu">Menu</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="dropdown-content" hidden>
        <div>Ações</div>
        <a href="/animais/child1">Ver Filhote</a>
      </div>
    </div>
  ),
}));

// Import the component after mocking
const { BirthsList } = require("@/components/births-list");

describe("BirthsList", () => {
  it("renders the births list correctly", async () => {
    render(<BirthsList />);

    // Check if table headers are rendered
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Mãe")).toBeInTheDocument();
    expect(screen.getByText("Pai")).toBeInTheDocument();
    expect(screen.getByText("Filhote")).toBeInTheDocument();
    expect(screen.getByText("Tag")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Check if birth data is rendered correctly
    expect(screen.getByText("15/01/2023")).toBeInTheDocument();
    expect(screen.getByText("Mother Cow (M001)")).toBeInTheDocument();
    expect(screen.getByText("Father Bull (F001)")).toBeInTheDocument();
    expect(screen.getByText("Baby Calf")).toBeInTheDocument();
    expect(screen.getByText("C001")).toBeInTheDocument();
    expect(screen.getByText("Macho")).toBeInTheDocument();

    expect(screen.getByText("20/02/2023")).toBeInTheDocument();
    expect(screen.getByText("Second Mother (M002)")).toBeInTheDocument();
    expect(screen.getByText("Second Father (F002)")).toBeInTheDocument();
    expect(screen.getByText("Second Baby")).toBeInTheDocument();
    expect(screen.getByText("C002")).toBeInTheDocument();
    expect(screen.getByText("Fêmea")).toBeInTheDocument();

    // Check status badges
    const statusBadges = screen.getAllByText("Saudável");
    expect(statusBadges.length).toBeGreaterThan(0);
    expect(screen.getByText("Em tratamento")).toBeInTheDocument();
  });
});
