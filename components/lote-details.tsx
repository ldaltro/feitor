"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Animal } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Edit,
  PenSquare,
  PlusCircle,
  Trash,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { removeAnimalFromLote } from "@/lib/actions/lotes";

type LoteWithAnimals = {
  id: string;
  nome: string;
  descricao: string | null;
  finalidade: string;
  animais: Animal[];
};

interface LoteDetailsProps {
  lote: LoteWithAnimals;
}

export function LoteDetails({ lote }: LoteDetailsProps) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const { id, nome, descricao, finalidade, animais } = lote;

  const getFinalidadeBadgeVariant = (finalidade: string) => {
    switch (finalidade) {
      case "Cria":
        return "default";
      case "Recria":
        return "secondary";
      case "Engorda":
        return "outline";
      case "Leite":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleRemoveAnimal = async (animalId: string) => {
    if (confirm("Tem certeza que deseja remover este animal do lote?")) {
      setIsRemoving(true);
      try {
        await removeAnimalFromLote(animalId);
        router.refresh();
      } catch (error) {
        console.error("Failed to remove animal from lote:", error);
        alert("Erro ao remover animal do lote");
      } finally {
        setIsRemoving(false);
      }
    }
  };

  const groupAnimalsByBreed = () => {
    const groups: Record<string, number> = {};

    animais.forEach((animal) => {
      groups[animal.breed] = (groups[animal.breed] || 0) + 1;
    });

    return Object.entries(groups)
      .map(([breed, count]) => ({ breed, count }))
      .sort((a, b) => b.count - a.count);
  };

  const animalsByBreed = groupAnimalsByBreed();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{nome}</h1>
            <Badge variant={getFinalidadeBadgeVariant(finalidade)}>
              {finalidade}
            </Badge>
          </div>
          {descricao && (
            <p className="text-muted-foreground mt-1">{descricao}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/lotes/${id}/editar`}>
            <Button variant="outline" size="sm">
              <PenSquare className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Link href={`/animais?addToLote=${id}`}>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Animais
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total de Animais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{animais.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Raças Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {animalsByBreed.length > 0 ? (
                <div className="space-y-1">
                  {animalsByBreed.slice(0, 3).map(({ breed, count }) => (
                    <div key={breed} className="flex justify-between">
                      <span>{breed}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">
                  Nenhum animal no lote
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Finalidade</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={getFinalidadeBadgeVariant(finalidade)}
              className="text-sm"
            >
              {finalidade}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <div className="p-4 bg-muted/50">
          <h2 className="text-lg font-medium">Animais neste Lote</h2>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Raça</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animais.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum animal neste lote.
                  </TableCell>
                </TableRow>
              ) : (
                animais.map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell className="font-medium">{animal.tag}</TableCell>
                    <TableCell>{animal.name}</TableCell>
                    <TableCell>{animal.breed}</TableCell>
                    <TableCell>{animal.gender}</TableCell>
                    <TableCell>
                      {format(new Date(animal.birthDate), "dd/MM/yyyy")}
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isRemoving}
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
                              Visualizar Animal
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRemoveAnimal(animal.id)}
                            disabled={isRemoving}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Remover do Lote
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
    </div>
  );
}
