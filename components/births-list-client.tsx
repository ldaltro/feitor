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
import { MoreHorizontal, Trash } from "lucide-react";
import { format } from "date-fns";
import { deleteBirth } from "@/lib/actions/births";

type Animal = {
  id: string;
  name: string;
  tag: string;
};

type Birth = {
  id: string;
  birthDate: Date;
  newbornCount: number;
  notes?: string;
  mother: Animal;
  father?: Animal;
};

interface BirthsListClientProps {
  births: Birth[];
}

export function BirthsListClient({ births }: BirthsListClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (
      confirm("Tem certeza que deseja excluir este registro de nascimento?")
    ) {
      setIsDeleting(true);
      try {
        await deleteBirth(id);
      } catch (error) {
        console.error("Failed to delete birth record:", error);
        alert("Erro ao excluir registro de nascimento");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Mãe</TableHead>
            <TableHead>Pai</TableHead>
            <TableHead>Quantidade de Filhotes</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {births.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhum registro de nascimento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            births.map((birth) => (
              <TableRow key={birth.id}>
                <TableCell>
                  {format(new Date(birth.birthDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {birth.mother.name} ({birth.mother.tag})
                </TableCell>
                <TableCell>
                  {birth.father
                    ? `${birth.father.name} (${birth.father.tag})`
                    : "-"}
                </TableCell>
                <TableCell>{birth.newbornCount}</TableCell>
                <TableCell>{birth.notes || "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isDeleting}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(birth.id)}
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
  );
}
