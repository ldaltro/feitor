"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Search, Edit, Trash, Eye, Layers } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { deleteAnimal } from "@/lib/actions/animals";
import { addAnimalToLote } from "@/lib/actions/lotes";
import { useTranslations } from "@/hooks/useTranslations";
import { ptBR } from "date-fns/locale";

type Animal = {
  id: string;
  name: string;
  tag: string;
  breed: string;
  gender: string;
  birthDate: Date;
  status: string;
  loteId: string | null;
};

interface AnimalsListClientProps {
  animals: Animal[];
}

export function AnimalsListClient({ animals }: AnimalsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loteId = searchParams.get("addToLote");
  const { lotes: t } = useTranslations();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Filter animals based on search term
  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter animals that can be added to lote (those not in any lote or in a different lote)
  const availableAnimals = loteId
    ? filteredAnimals.filter((animal) => animal.loteId !== loteId)
    : filteredAnimals;

  useEffect(() => {
    if (loteId) {
      // Reset search and selection when loteId changes
      setSearchTerm("");
      setSelectedAnimals([]);
      setSelectAllChecked(false);
    }
  }, [loteId]);

  const handleSelectAll = () => {
    if (selectAllChecked) {
      // If already checked, unselect all
      setSelectedAnimals([]);
    } else {
      // Select all available animals
      setSelectedAnimals(availableAnimals.map((animal) => animal.id));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  useEffect(() => {
    // Update selectAll checkbox state based on whether all available animals are selected
    if (
      availableAnimals.length > 0 &&
      selectedAnimals.length === availableAnimals.length
    ) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedAnimals, availableAnimals]);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este animal?")) {
      setIsDeleting(true);
      try {
        await deleteAnimal(id);
      } catch (error) {
        console.error("Failed to delete animal:", error);
        alert("Erro ao excluir animal");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSelectAnimal = (id: string) => {
    setSelectedAnimals((prev) => {
      if (prev.includes(id)) {
        return prev.filter((animalId) => animalId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAddToLote = async () => {
    if (selectedAnimals.length === 0) {
      alert(t.selectAtLeastOne);
      return;
    }

    if (!loteId) return;

    setIsAdding(true);
    try {
      // Adicionar cada animal ao lote
      const promises = selectedAnimals.map((animalId) =>
        addAnimalToLote(loteId, animalId)
      );

      await Promise.all(promises);
      router.push(`/lotes/${loteId}`);
    } catch (error) {
      console.error("Failed to add animals to lote:", error);
      alert(t.addError);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, tag, raça ou gênero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {loteId && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAddToLote}
              disabled={selectedAnimals.length === 0 || isAdding}
            >
              <Layers className="mr-2 h-4 w-4" />
              {t.addToLote} ({selectedAnimals.length})
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/lotes/${loteId}`)}
            >
              {t.cancel}
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {loteId && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectAllChecked}
                    onCheckedChange={handleSelectAll}
                    aria-label="Selecionar todos"
                  />
                </TableHead>
              )}
              <TableHead>Tag</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Raça</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Status</TableHead>
              {loteId && <TableHead>Lote Atual</TableHead>}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableAnimals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={loteId ? 9 : 7}
                  className="h-24 text-center"
                >
                  Nenhum animal disponível encontrado.
                </TableCell>
              </TableRow>
            ) : (
              availableAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  {loteId && (
                    <TableCell>
                      <Checkbox
                        checked={selectedAnimals.includes(animal.id)}
                        onCheckedChange={() => handleSelectAnimal(animal.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{animal.tag}</TableCell>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.gender}</TableCell>
                  <TableCell>
                    {format(new Date(animal.birthDate), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        animal.status === "Saudável"
                          ? "default"
                          : animal.status === "Gestante"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {animal.status}
                    </Badge>
                  </TableCell>
                  {loteId && (
                    <TableCell>
                      {animal.loteId ? "Em outro lote" : "Nenhum"}
                    </TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/animais/${animal.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/animais/${animal.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        {loteId && (
                          <DropdownMenuItem
                            onClick={() => handleSelectAnimal(animal.id)}
                          >
                            <Layers className="mr-2 h-4 w-4" />
                            {selectedAnimals.includes(animal.id)
                              ? "Remover da seleção"
                              : t.addToLote}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(animal.id)}
                          disabled={isDeleting}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
