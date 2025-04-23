import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LotesListClient } from "@/components/lotes-list-client";
import { deleteLote } from "@/lib/actions/lotes";

// Mock do módulo de ações
jest.mock("@/lib/actions/lotes", () => ({
  deleteLote: jest.fn(),
}));

// Mock do confirm do navegador
global.confirm = jest.fn(() => true);
global.alert = jest.fn();

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("LotesListClient", () => {
  const mockLotes = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza a lista de lotes corretamente", () => {
    render(<LotesListClient lotes={mockLotes} />);

    // Verificar se os nomes dos lotes estão presentes
    expect(screen.getByText("Lote Teste 1")).toBeInTheDocument();
    expect(screen.getByText("Lote Teste 2")).toBeInTheDocument();
    expect(screen.getByText("Lote Teste 3")).toBeInTheDocument();

    // Verificar se as finalidades estão presentes
    expect(screen.getByText("Cria")).toBeInTheDocument();
    expect(screen.getByText("Engorda")).toBeInTheDocument();
    expect(screen.getByText("Leite")).toBeInTheDocument();

    // Verificar se as descrições estão presentes
    expect(screen.getByText("Descrição do lote teste 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição do lote teste 3")).toBeInTheDocument();
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
});
