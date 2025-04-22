"use client";

import { useState } from "react";
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
import { MoreHorizontal, Search, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { trpc } from "@/lib/trpc/client";

export function AnimalsList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch animals from the database using tRPC
  const { data: animalsResponse, isLoading } = trpc.animals.getAll.useQuery({
    // Keep the input object if your procedure expects it
    // If getAll doesn't need input, this can be removed
    // input: { searchTerm },
  });

  console.log("Animals data from useQuery:", animalsResponse);

  // Access the json property where the actual data is stored
  const animals = animalsResponse?.json;

  // Ensure animals is an array before filtering
  const animalsArray = Array.isArray(animals) ? animals : [];

  const filteredAnimals = animalsArray.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, tag ou raça..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredAnimals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum animal encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredAnimals.map((animal) => (
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
                        <Button variant="ghost" size="icon">
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
                        <DropdownMenuItem className="text-destructive">
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
