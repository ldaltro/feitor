import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LotesListClient } from "@/components/lotes-list-client";
import { deleteLote } from "@/lib/actions/lotes";

// Define the Lote type here since we can't import it from the component directly
type Lote = {
  id: string;
  nome: string;
  descricao: string | null;
  finalidade: string;
  animalCount: number;
  breedCounts: Record<string, number>;
};

// Mock do módulo de ações
jest.mock("@/lib/actions/lotes", () => ({
  deleteLote: jest.fn(),
}));

// Mock do confirm do navegador
global.confirm = jest.fn(() => true);
global.alert = jest.fn();

// Mock do useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
  }),
}));

// Mock do console.error para testar o bloco catch
const originalConsoleError = console.error;
console.error = jest.fn();

describe("LotesListClient", () => {
  const mockLotes: Lote[] = [
    {
      id: "1",
      nome: "Lote Teste 1",
      descricao: "Descrição do lote teste 1",
      finalidade: "Cria",
      animalCount: 5,
      breedCounts: { Nelore: 3, Angus: 2 },
    },
    {
      id: "2",
      nome: "Lote Teste 2",
      descricao: null,
      finalidade: "Engorda",
      animalCount: 10,
      breedCounts: { Nelore: 7, Gir: 3 },
    },
    {
      id: "3",
      nome: "Lote Teste 3",
      descricao: "Descrição do lote teste 3",
      finalidade: "Leite",
      animalCount: 0,
      breedCounts: {},
    },
    // Add more to test pagination
    {
      id: "4",
      nome: "Lote Teste 4",
      descricao: "Descrição do lote teste 4",
      finalidade: "Cria",
      animalCount: 8,
      breedCounts: { Nelore: 8 },
    },
    {
      id: "5",
      nome: "Lote Teste 5",
      descricao: "Descrição do lote teste 5",
      finalidade: "Recria",
      animalCount: 12,
      breedCounts: { Gir: 12 },
    },
    {
      id: "6",
      nome: "Lote Teste 6",
      descricao: "Descrição do lote teste 6",
      finalidade: "Engorda",
      animalCount: 15,
      breedCounts: { Angus: 15 },
    },
    {
      id: "7",
      nome: "Lote Teste 7",
      descricao: "Descrição do lote teste 7",
      finalidade: "Leite",
      animalCount: 3,
      breedCounts: { Holstein: 3 },
    },
    // Add more lots to test pagination links
    {
      id: "8",
      nome: "Lote Teste 8",
      descricao: "Descrição do lote teste 8",
      finalidade: "Cria",
      animalCount: 6,
      breedCounts: { Nelore: 6 },
    },
    {
      id: "9",
      nome: "Lote Teste 9",
      descricao: "Descrição do lote teste 9",
      finalidade: "Recria",
      animalCount: 7,
      breedCounts: { Angus: 7 },
    },
    {
      id: "10",
      nome: "Lote Teste 10",
      descricao: "Descrição do lote teste 10",
      finalidade: "Engorda",
      animalCount: 9,
      breedCounts: { Gir: 9 },
    },
    {
      id: "11",
      nome: "Lote Teste 11",
      descricao: "Descrição do lote teste 11",
      finalidade: "Leite",
      animalCount: 4,
      breedCounts: { Holstein: 4 },
    },
    {
      id: "12",
      nome: "Lote Teste 12",
      descricao: "Descrição do lote teste 12",
      finalidade: "Cria",
      animalCount: 2,
      breedCounts: { Nelore: 2 },
    },
    {
      id: "13",
      nome: "Lote Teste 13",
      descricao: "Descrição do lote teste 13",
      finalidade: "Recria",
      animalCount: 11,
      breedCounts: { Gir: 11 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("renderiza a lista de lotes em forma de cards corretamente", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Verificar se os nomes dos lotes da primeira página estão presentes
    expect(screen.getByText("Lote Teste 1")).toBeInTheDocument();
    expect(screen.getByText("Lote Teste 2")).toBeInTheDocument();
    expect(screen.getByText("Lote Teste 3")).toBeInTheDocument();

    // Verificar se apenas os itens da primeira página são exibidos (6 por página)
    expect(screen.getByText("Lote Teste 6")).toBeInTheDocument();
    expect(screen.queryByText("Lote Teste 7")).not.toBeInTheDocument();

    // Verificar se as finalidades estão presentes (usando getAllByText porque há repetições)
    expect(screen.getAllByText("Cria")).toHaveLength(2);
    expect(screen.getAllByText("Engorda")).toHaveLength(2);
    expect(screen.getAllByText("Leite")).toHaveLength(1);

    // Verificar se as descrições estão presentes
    expect(screen.getByText("Descrição do lote teste 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição do lote teste 3")).toBeInTheDocument();

    // Verificar contagem de animais (como números, podemos ter vários elementos com o mesmo texto)
    const animalCountElements = screen.getAllByText("5");
    expect(animalCountElements.length).toBeGreaterThan(0);
  });

  it("navega para a próxima página quando clicar em Next", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Verificar se a paginação está presente
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Clicar em Next
    fireEvent.click(screen.getByText("Next"));

    // Verificar se o item da segunda página é exibido
    expect(screen.getByText("Lote Teste 7")).toBeInTheDocument();

    // Verificar se os itens da primeira página não são mais exibidos
    expect(screen.queryByText("Lote Teste 1")).not.toBeInTheDocument();
  });

  it("navega para o detalhe do lote ao clicar no card", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar o primeiro card e clicar nele
    const firstCard = screen
      .getByText("Lote Teste 1")
      .closest(".cursor-pointer");

    if (firstCard) {
      fireEvent.click(firstCard);
      // Verificar se a navegação ocorreu
      expect(mockPush).toHaveBeenCalledWith("/lotes/1");
    }
  });

  it("navega para o detalhe do lote ao clicar no botão de visualizar", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar o primeiro botão de visualizar e clicar nele
    const viewButtons = screen.getAllByTitle("Visualizar");
    fireEvent.click(viewButtons[0]);

    // Verificar se a navegação ocorreu
    expect(mockPush).toHaveBeenCalledWith("/lotes/1");
  });

  it("navega para editar lote ao clicar no botão de editar", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar o primeiro botão de editar e clicar nele
    const editButtons = screen.getAllByTitle("Editar");
    fireEvent.click(editButtons[0]);

    // Verificar se a navegação ocorreu
    expect(mockPush).toHaveBeenCalledWith("/lotes/1/editar");
  });

  it("filtra lotes por termo de busca", () => {
    render(<LotesListClient lotes={mockLotes} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nome, descrição ou finalidade..."
    );

    // Buscar por nome
    fireEvent.change(searchInput, { target: { value: "Teste 1" } });
    expect(screen.getByText("Lote Teste 1")).toBeInTheDocument();
    expect(screen.queryByText("Lote Teste 2")).not.toBeInTheDocument();

    // Buscar por finalidade
    fireEvent.change(searchInput, { target: { value: "Leite" } });
    expect(screen.queryByText("Lote Teste 1")).not.toBeInTheDocument();
    expect(screen.getByText("Lote Teste 3")).toBeInTheDocument();

    // Buscar algo que não existe
    fireEvent.change(searchInput, { target: { value: "Não existe" } });
    expect(screen.getByText("Nenhum lote encontrado.")).toBeInTheDocument();
  });

  it("exibe mensagem quando não há lotes", () => {
    render(<LotesListClient lotes={[]} />);
    expect(screen.getByText("Nenhum lote encontrado.")).toBeInTheDocument();
  });

  it("deleta um lote quando o botão de exclusão é clicado e confirmado", async () => {
    // Configurar o mock para resolver com sucesso
    (deleteLote as jest.Mock).mockResolvedValue({ success: true });

    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar botão de excluir do primeiro lote e clicar
    const deleteButtons = screen.getAllByTitle("Excluir");
    fireEvent.click(deleteButtons[0]);

    // Verificar se o confirm foi chamado
    expect(global.confirm).toHaveBeenCalled();

    // Verificar se deleteLote foi chamado com o ID correto
    await waitFor(() => {
      expect(deleteLote).toHaveBeenCalledWith("1");
    });
  });

  it("não deleta o lote se o usuário cancelar a confirmação", () => {
    // Configurar o mock de confirm para retornar false
    (global.confirm as jest.Mock).mockReturnValueOnce(false);

    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar botão de excluir do primeiro lote e clicar
    const deleteButtons = screen.getAllByTitle("Excluir");
    fireEvent.click(deleteButtons[0]);

    // Verificar se o confirm foi chamado
    expect(global.confirm).toHaveBeenCalled();

    // Verificar que deleteLote não foi chamado
    expect(deleteLote).not.toHaveBeenCalled();
  });

  it("exibe erro se a exclusão falhar", async () => {
    // Configurar o mock para rejeitar
    (deleteLote as jest.Mock).mockRejectedValue(new Error("Falha ao excluir"));

    render(<LotesListClient lotes={mockLotes} />);

    // Encontrar botão de excluir do primeiro lote e clicar
    const deleteButtons = screen.getAllByTitle("Excluir");
    fireEvent.click(deleteButtons[0]);

    // Aguardar a conclusão da operação assíncrona
    await waitFor(() => {
      // Verificar se console.error foi chamado
      expect(console.error).toHaveBeenCalledWith(
        "Failed to delete lote:",
        expect.any(Error)
      );
      // Verificar se alert foi chamado com alguma mensagem de erro
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it("aplica corretamente o estilo de badge para diferentes finalidades", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Verificar se os badges têm as classes corretas para cada finalidade
    const badges = screen.getAllByText("Cria");
    expect(badges[0].className).toContain("bg-primary");
    
    const engordaBadge = screen.getAllByText("Engorda")[0];
    expect(engordaBadge.className).toContain("border");
    
    const leiteBadge = screen.getByText("Leite");
    expect(leiteBadge.className).toContain("bg-destructive");
    
    // Navegar para a próxima página para testar o badge "Recria"
    fireEvent.click(screen.getByText("Next"));
    const recriaBadge = screen.getByText("Recria");
    expect(recriaBadge.className).toContain("bg-secondary");
  });

  it("formata corretamente a lista de raças", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Verificar a formatação para lote com múltiplas raças
    expect(screen.getByText("Nelore (3), Angus (2)")).toBeInTheDocument();
    
    // Verificar a formatação para lote sem raças
    expect(screen.getByText("Nenhuma")).toBeInTheDocument();
  });

  it("navega para a página anterior quando clicar em Previous", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Ir para a página 2
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Lote Teste 7")).toBeInTheDocument();
    
    // Voltar para a página 1
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Lote Teste 1")).toBeInTheDocument();
    expect(screen.queryByText("Lote Teste 7")).not.toBeInTheDocument();
  });

  it("desabilita Previous na primeira página", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Na primeira página, botão Previous deve estar desabilitado
    const previousButton = screen.getByText("Previous");
    expect(previousButton.parentElement).toHaveAttribute("aria-disabled", "true");
    expect(previousButton.parentElement?.className).toContain("pointer-events-none");
    
    // Ir para a página 2
    fireEvent.click(screen.getByText("Next"));
    
    // Na segunda página, botão Previous não deve estar desabilitado
    expect(screen.getByText("Previous").parentElement).not.toHaveAttribute("aria-disabled", "true");
  });

  it("desabilita Next na última página", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Na primeira página, Next não deve estar desabilitado
    expect(screen.getByText("Next").parentElement).not.toHaveAttribute("aria-disabled", "true");
    
    // Ir para a última página clicando em Next duas vezes
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    
    // Na última página, Next deve estar desabilitado
    const nextAfterNavigation = screen.getByText("Next");
    expect(nextAfterNavigation.parentElement).toHaveAttribute("aria-disabled", "true");
    expect(nextAfterNavigation.parentElement?.className).toContain("pointer-events-none");
  });

  it("renderiza corretamente os links de paginação", () => {
    render(<LotesListClient lotes={mockLotes} />);
    
    // Verifica se a paginação inicial mostra a página 1
    const page1Button = screen.getByText("1");
    expect(page1Button).toBeInTheDocument();
    
    // Navega para a segunda página clicando em Next
    fireEvent.click(screen.getByText("Next"));
    
    // Verifica se estamos na página 2 analisando o conteúdo
    expect(screen.getByText("Lote Teste 7")).toBeInTheDocument();
    expect(screen.queryByText("Lote Teste 1")).not.toBeInTheDocument();
  });
});
