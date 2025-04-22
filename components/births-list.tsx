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
import { MoreHorizontal, Search, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { trpc } from "@/lib/trpc/client";

export function BirthsList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch births from the database using tRPC
  const { data, isLoading } = trpc.births.getAll.useQuery();

  // Ensure data is an array before filtering
  const birthsArray = Array.isArray(data) ? data : [];

  const filteredBirths = birthsArray.filter(
    (birth) =>
      birth.mother.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.mother.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.child.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Mãe</TableHead>
              <TableHead>Filhote</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Gênero</TableHead>
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
            ) : filteredBirths.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum nascimento encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredBirths.map((birth) => (
                <TableRow key={birth.id}>
                  <TableCell>
                    {format(new Date(birth.birthDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {birth.mother.name} ({birth.mother.tag})
                  </TableCell>
                  <TableCell>{birth.child.name}</TableCell>
                  <TableCell>{birth.child.tag}</TableCell>
                  <TableCell>{birth.child.gender}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        birth.child.status === "Saudável"
                          ? "default"
                          : birth.child.status === "Em tratamento"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {birth.child.status}
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
                          <Link href={`/animais/${birth.child.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Filhote
                          </Link>
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
