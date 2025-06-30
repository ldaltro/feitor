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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Owner {
  id: string;
  name: string;
  cpfCnpj?: string | null;
  phone?: string | null;
  email?: string | null;
  _count?: {
    animals: number;
  };
}

interface OwnersListClientProps {
  owners: Owner[];
}

export function OwnersListClient({ owners }: OwnersListClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOwners = owners.filter((owner) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      owner.name.toLowerCase().includes(searchLower) ||
      (owner.cpfCnpj && owner.cpfCnpj.toLowerCase().includes(searchLower)) ||
      (owner.phone && owner.phone.toLowerCase().includes(searchLower)) ||
      (owner.email && owner.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF/CNPJ, telefone ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Animais</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum proprietário encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell>{owner.cpfCnpj || "-"}</TableCell>
                  <TableCell>{owner.phone || "-"}</TableCell>
                  <TableCell>{owner.email || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {owner._count?.animals || 0} animais
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => router.push(`/proprietarios/${owner.id}`)}
                        >
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/proprietarios/${owner.id}/editar`)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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