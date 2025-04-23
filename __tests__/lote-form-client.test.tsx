import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoteFormClient } from "@/components/lote-form-client";
import { createLote, updateLote } from "@/lib/actions/lotes";

// Mock do módulo de ações
jest.mock("@/lib/actions/lotes", () => ({
  createLote: jest.fn(),
  updateLote: jest.fn(),
}));

// Mock do useRouter
const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe("LoteFormClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o formulário de adição corretamente", () => {
    render(<LoteFormClient />);

    // Verificar se os campos estão presentes
    expect(screen.getByLabelText("Nome do Lote")).toBeInTheDocument();
    expect(screen.getByLabelText("Finalidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();

    // Verificar se os botões estão presentes
    expect(
      screen.getByRole("button", { name: "Cancelar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar Lote" })
    ).toBeInTheDocument();
  });

  it("renderiza o formulário de edição corretamente", () => {
    const mockLote = {
      id: "1",
      nome: "Lote Teste",
      descricao: "Descrição do lote teste",
      finalidade: "Cria",
    };

    render(<LoteFormClient initialData={mockLote} isEditing />);

    // Verificar se os campos estão com os valores corretos
    expect(screen.getByLabelText("Nome do Lote")).toHaveValue("Lote Teste");
    expect(screen.getByLabelText("Descrição")).toHaveValue(
      "Descrição do lote teste"
    );

    // Verificar se o botão de atualizar está presente
    expect(
      screen.getByRole("button", { name: "Atualizar Lote" })
    ).toBeInTheDocument();
  });

  it("chama a função de criar lote quando o formulário é submetido", async () => {
    render(<LoteFormClient />);

    // Preencher os campos
    fireEvent.change(screen.getByLabelText("Nome do Lote"), {
      target: { value: "Novo Lote" },
    });

    // Abrir o dropdown e selecionar uma finalidade
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Engorda" }));

    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Descrição do novo lote" },
    });

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: "Criar Lote" }));

    // Verificar se a função de criar foi chamada com os valores corretos
    await waitFor(() => {
      expect(createLote).toHaveBeenCalledWith({
        nome: "Novo Lote",
        finalidade: "Engorda",
        descricao: "Descrição do novo lote",
      });
    });

    // Verificar se a navegação ocorreu
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/lotes");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("chama a função de atualizar lote quando o formulário é submetido em modo de edição", async () => {
    const mockLote = {
      id: "1",
      nome: "Lote Teste",
      descricao: "Descrição do lote teste",
      finalidade: "Cria",
    };

    render(<LoteFormClient initialData={mockLote} isEditing />);

    // Modificar os campos
    fireEvent.change(screen.getByLabelText("Nome do Lote"), {
      target: { value: "Lote Atualizado" },
    });

    // Abrir o dropdown e selecionar uma nova finalidade
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Leite" }));

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: "Atualizar Lote" }));

    // Verificar se a função de atualizar foi chamada com os valores corretos
    await waitFor(() => {
      expect(updateLote).toHaveBeenCalledWith({
        id: "1",
        nome: "Lote Atualizado",
        finalidade: "Leite",
        descricao: "Descrição do lote teste",
      });
    });

    // Verificar se a navegação ocorreu
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/lotes");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("valida campos obrigatórios", async () => {
    render(<LoteFormClient />);

    // Submeter o formulário sem preencher os campos
    fireEvent.click(screen.getByRole("button", { name: "Criar Lote" }));

    // Verificar se as mensagens de erro são exibidas
    await waitFor(() => {
      expect(
        screen.getByText("Nome deve ter pelo menos 2 caracteres")
      ).toBeInTheDocument();
    });

    // Verificar se a função de criar não foi chamada
    expect(createLote).not.toHaveBeenCalled();
  });
});
