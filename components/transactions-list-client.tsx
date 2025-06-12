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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash } from "lucide-react";
import { format } from "date-fns";
import { deleteTransaction } from "@/lib/actions/transactions";

type Animal = {
  id: string;
  name: string;
  tag: string;
};

type Transaction = {
  id: string;
  date: Date;
  type: string;
  value: number;
  person: string;
  animal?: Animal;
};

interface TransactionsListClientProps {
  transactions: Transaction[];
}

export function TransactionsListClient({
  transactions,
}: TransactionsListClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      setIsDeleting(true);
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        alert("Erro ao excluir transação");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Format currency as BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Pessoa</TableHead>
            <TableHead>Animal</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.type === "Venda"
                        ? "default"
                        : transaction.type === "Compra"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(transaction.value)}</TableCell>
                <TableCell>{transaction.person}</TableCell>
                <TableCell>
                  {transaction.animal
                    ? `${transaction.animal.name} (${transaction.animal.tag})`
                    : "-"}
                </TableCell>
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
                        onClick={() => handleDelete(transaction.id)}
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
