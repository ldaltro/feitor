"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Eye, Trash } from "lucide-react"
import Link from "next/link"

export function TransactionsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - would be fetched from API in a real app
  const transactions = [
    {
      id: "1",
      type: "Compra",
      animalName: "Mimosa",
      animalTag: "A001",
      date: "15/05/2020",
      value: "R$ 2.500,00",
      person: "João Silva",
    },
    {
      id: "2",
      type: "Venda",
      animalName: "Trovão",
      animalTag: "A003",
      date: "10/06/2023",
      value: "R$ 3.800,00",
      person: "Fazenda Boa Vista",
    },
    {
      id: "3",
      type: "Compra",
      animalName: "Estrela",
      animalTag: "A002",
      date: "20/03/2021",
      value: "R$ 2.200,00",
      person: "Maria Oliveira",
    },
    {
      id: "4",
      type: "Venda",
      animalName: "Boneca",
      animalTag: "A004",
      date: "05/08/2023",
      value: "R$ 2.900,00",
      person: "Carlos Mendes",
    },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.animalTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por animal, tag, tipo ou pessoa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>{`Comprador/Vendedor`}</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge variant={transaction.type === "Compra" ? "outline" : "default"}>{transaction.type}</Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {transaction.animalName} ({transaction.animalTag})
                  </TableCell>
                  <TableCell>{transaction.value}</TableCell>
                  <TableCell>{transaction.person}</TableCell>
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
                          <Link href={`/animais/${transaction.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Animal
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
  )
}
