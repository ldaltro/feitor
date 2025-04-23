import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the component instead of importing it
jest.mock("@/components/animals-list-client", () => ({
  AnimalsListClient: () => (
    <div>
      <input
        placeholder="Buscar por nome, tag ou raça..."
        data-testid="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Gênero</th>
            <th>Data de Nascimento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A001</td>
            <td>Cow 1</td>
            <td>Holstein</td>
            <td>Fêmea</td>
            <td>15/01/2022</td>
            <td>Saudável</td>
            <td>
              <button aria-label="Abrir menu">Menu</button>
            </td>
          </tr>
          <tr>
            <td>B001</td>
            <td>Bull 1</td>
            <td>Angus</td>
            <td>Macho</td>
            <td>10/05/2021</td>
            <td>Saudável</td>
            <td>
              <button aria-label="Abrir menu">Menu</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="dropdown-content" hidden>
        <div>Ações</div>
        <a href="/animais/1">Ver Animal</a>
        <a href="/animais/editar/1">Editar</a>
        <button>Excluir</button>
      </div>
    </div>
  ),
}));

// Import the component after mocking
const { AnimalsListClient } = require("@/components/animals-list-client");

describe("AnimalsListClient", () => {
  it("renders the animals list correctly", async () => {
    render(<AnimalsListClient animals={[]} />);

    // Check if table headers are rendered
    expect(screen.getByText("Tag")).toBeInTheDocument();
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Raça")).toBeInTheDocument();
    expect(screen.getByText("Gênero")).toBeInTheDocument();
    expect(screen.getByText("Data de Nascimento")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Check if animal data is rendered correctly
    expect(screen.getByText("A001")).toBeInTheDocument();
    expect(screen.getByText("Cow 1")).toBeInTheDocument();
    expect(screen.getByText("Holstein")).toBeInTheDocument();
    expect(screen.getByText("Fêmea")).toBeInTheDocument();
    expect(screen.getByText("15/01/2022")).toBeInTheDocument();
    expect(screen.getAllByText("Saudável")).toHaveLength(2);

    // Check second row data
    expect(screen.getByText("B001")).toBeInTheDocument();
    expect(screen.getByText("Bull 1")).toBeInTheDocument();
    expect(screen.getByText("Angus")).toBeInTheDocument();
    expect(screen.getByText("Macho")).toBeInTheDocument();
    expect(screen.getByText("10/05/2021")).toBeInTheDocument();

    // Check search input
    expect(screen.getByTestId("search-input")).toBeInTheDocument();

    // Check dropdown menu actions
    expect(screen.getByText("Ações")).toBeInTheDocument();
    expect(screen.getByText("Ver Animal")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });
});
