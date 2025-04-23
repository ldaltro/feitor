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
import { MoreHorizontal, Search, Edit, Trash, Eye, Users } from "lucide-react";
import Link from "next/link";
import { deleteLote } from "@/lib/actions/lotes";
import { useTranslations } from "@/hooks/useTranslations";

type Lote = {
  id: string;
  nome: string;
  descricao: string | null;
  finalidade: string;
  animalCount: number;
  breedCounts: Record<string, number>;
};

interface LotesListClientProps {
  lotes: Lote[];
}

export function LotesListClient({ lotes }: LotesListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { lotes: t } = useTranslations();

  // Filter lotes based on search term
  const filteredLotes = lotes.filter(
    (lote) =>
      lote.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lote.descricao &&
        lote.descricao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lote.finalidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm(t.deleteConfirm)) {
      setIsDeleting(true);
      try {
        await deleteLote(id);
      } catch (error) {
        console.error("Failed to delete lote:", error);
        alert(t.deleteError);
      } finally {
        setIsDeleting(false);
      }
    }
  };

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

  const formatBreedList = (breedCounts: Record<string, number>) => {
    const breeds = Object.entries(breedCounts)
      .map(([breed, count]) => `${breed} (${count})`)
      .join(", ");
    return breeds || t.none;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.description}</TableHead>
              <TableHead>{t.purpose}</TableHead>
              <TableHead>{t.animals}</TableHead>
              <TableHead>{t.breeds}</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t.noLotes}
                </TableCell>
              </TableRow>
            ) : (
              filteredLotes.map((lote) => (
                <TableRow key={lote.id}>
                  <TableCell className="font-medium">{lote.nome}</TableCell>
                  <TableCell>{lote.descricao || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={getFinalidadeBadgeVariant(lote.finalidade)}>
                      {lote.finalidade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{lote.animalCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatBreedList(lote.breedCounts)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t.actions}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/lotes/${lote.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            {t.view}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/lotes/${lote.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            {t.edit}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(lote.id)}
                          disabled={isDeleting}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          {t.delete}
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
