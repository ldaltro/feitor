import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoteFormClient } from "@/components/lote-form-client";
import { createLote, updateLote } from "@/lib/actions/lotes";

// Mock do módulo de ações
jest.mock("@/lib/actions/lotes", () => ({
  createLote: jest.fn().mockResolvedValue({}),
  updateLote: jest.fn().mockResolvedValue({}),
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

  it("should render create mode correctly", () => {
    render(<LoteFormClient mode="create" />);
    expect(screen.getByText("Criar Lote")).toBeInTheDocument();
  });

  it("should render edit mode correctly", () => {
    const mockLote = {
      id: "1",
      nome: "Test Lote",
      descricao: "Test Description",
      finalidade: "Cria",
    };
    render(<LoteFormClient mode="edit" lote={mockLote} />);
    expect(screen.getByText("Atualizar Lote")).toBeInTheDocument();
  });

  it("should handle form submission in create mode", async () => {
    render(<LoteFormClient mode="create" />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText("Nome do Lote"), {
      target: { value: "New Lote" },
    });
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "New Description" },
    });
    
    // Submit form
    fireEvent.click(screen.getByText("Criar Lote"));
    
    await waitFor(() => {
      expect(createLote).toHaveBeenCalledWith({
        nome: "New Lote",
        descricao: "New Description",
        finalidade: "Cria"
      });
      expect(mockPush).toHaveBeenCalledWith("/lotes");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("should handle form submission in edit mode", async () => {
    const mockLote = {
      id: "1",
      nome: "Test Lote",
      descricao: "Test Description",
      finalidade: "Cria",
    };
    render(<LoteFormClient mode="edit" lote={mockLote} />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText("Nome do Lote"), {
      target: { value: "Updated Lote" },
    });
    
    // Submit form
    fireEvent.click(screen.getByText("Atualizar Lote"));
    
    await waitFor(() => {
      expect(updateLote).toHaveBeenCalledWith({
        id: "1",
        nome: "Updated Lote",
        descricao: "Test Description",
        finalidade: "Cria"
      });
      expect(mockPush).toHaveBeenCalledWith("/lotes");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
