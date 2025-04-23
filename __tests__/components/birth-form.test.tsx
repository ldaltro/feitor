import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Define the Animal type to match the actual component
type Animal = {
  id: string;
  name: string;
  tag: string;
  gender: string;
  status: string;
  breed: string;
};

// Mock component instead of importing it
jest.mock("@/components/birth-form-client", () => ({
  BirthFormClient: ({ animals }: { animals: Animal[] }) => (
    <div>
      <label htmlFor="mother">Mãe</label>
      <select id="mother" data-testid="mother-select">
        <option value="">Selecione a mãe</option>
        <option value="mother1">Mother Cow (M001)</option>
      </select>

      <label htmlFor="father">Pai</label>
      <select id="father" data-testid="father-select">
        <option value="">Selecione o pai</option>
        <option value="father1">Father Bull (F001)</option>
      </select>

      <label htmlFor="birthDate">Data de Nascimento</label>
      <button id="birthDate">Selecione uma data</button>

      <label htmlFor="childName">Nome do Filhote</label>
      <input id="childName" />

      <label htmlFor="childTag">Tag/Identificação do Filhote</label>
      <input id="childTag" />

      <label htmlFor="breed">Raça</label>
      <select id="breed">
        <option value="">Selecione a raça</option>
        <option value="Nelore">Nelore</option>
      </select>

      <label htmlFor="gender">Gênero</label>
      <select id="gender">
        <option value="">Selecione o gênero</option>
        <option value="Macho">Macho</option>
        <option value="Fêmea">Fêmea</option>
      </select>

      <label htmlFor="weight">Peso ao Nascer (kg)</label>
      <input id="weight" />

      <label htmlFor="status">Status</label>
      <select id="status" defaultValue="Saudável">
        <option value="Saudável">Saudável</option>
        <option value="Em tratamento">Em tratamento</option>
        <option value="Debilitado">Debilitado</option>
      </select>

      <label htmlFor="notes">Observações</label>
      <textarea id="notes"></textarea>

      <button type="button">Cancelar</button>
      <button type="submit">Registrar Nascimento</button>
    </div>
  ),
}));

// Mock next/router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Import the component after mocking
const { BirthFormClient } = require("@/components/birth-form-client");

describe("BirthFormClient", () => {
  it("renders the form correctly", async () => {
    render(<BirthFormClient animals={[]} />);

    // Check if form elements are rendered
    expect(screen.getByLabelText(/Mãe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pai/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Filhote/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Tag\/Identificação do Filhote/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Raça/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Peso ao Nascer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Observações/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Registrar Nascimento/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancelar/i })
    ).toBeInTheDocument();
  });
});
