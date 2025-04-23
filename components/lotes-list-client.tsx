"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash, Eye, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { lotes: t } = useTranslations();

  const itemsPerPage = 6;

  // Filter lotes based on search term
  const filteredLotes = lotes.filter(
    (lote) =>
      lote.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lote.descricao &&
        lote.descricao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lote.finalidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredLotes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLotes = filteredLotes.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
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
      .slice(0, 3) // Only show top 3 breeds
      .join(", ");
    return breeds || t.none;
  };

  const handleCardClick = (id: string) => {
    router.push(`/lotes/${id}`);
  };

  const renderPaginationLinks = () => {
    const links = [];

    // Always show first page
    links.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i > 1 && i < totalPages) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      links.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there are more than 1 page
    if (totalPages > 1) {
      links.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="max-w-sm"
        />
      </div>

      {filteredLotes.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">{t.noLotes}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentLotes.map((lote) => (
              <Card
                key={lote.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(lote.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{lote.nome}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {lote.descricao || "-"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.purpose}
                      </span>
                      <Badge
                        variant={getFinalidadeBadgeVariant(lote.finalidade)}
                      >
                        {lote.finalidade}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.animals}
                      </span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{lote.animalCount}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {t.breeds}
                      </span>
                      <p className="text-sm truncate">
                        {formatBreedList(lote.breedCounts)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/lotes/${lote.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {t.view}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/lotes/${lote.id}/editar`);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {t.edit}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={(e) => handleDelete(lote.id, e)}
                    disabled={isDeleting}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    {t.delete}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {renderPaginationLinks()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
