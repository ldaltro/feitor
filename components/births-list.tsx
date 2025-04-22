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
import { MoreHorizontal, Search, Eye } from "lucide-react"
import Link from "next/link"

export function BirthsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - would be fetched from API in a real app
  const births = [
    {
      id: "1",
      motherName: "Mimosa",
      motherTag: "A001",
      childName: "Filhote 1",
      childTag: "A010",
      birthDate: "15/06/2022",
      gender: "Fêmea",
      status: "Saudável",
    },
    {
      id: "2",
      motherName: "Estrela",
      motherTag: "A002",
      childName: "Filhote 2",
      childTag: "A015",
      birthDate: "20/07/2023",
      gender: "Macho",
      status: "Saudável",
    },
    {
      id: "3",
      motherName: "Boneca",
      motherTag: "A004",
      childName: "Filhote 3",
      childTag: "A020",
      birthDate: "05/01/2023",
      gender: "Fêmea",
      status: "Em tratamento",
    },
  ]

  const filteredBirths = births.filter(
    (birth) =>
      birth.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.motherTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.childTag.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            {filteredBirths.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum nascimento encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredBirths.map((birth) => (
                <TableRow key={birth.id}>
                  <TableCell>{birth.birthDate}</TableCell>
                  <TableCell>
                    {birth.motherName} ({birth.motherTag})
                  </TableCell>
                  <TableCell>{birth.childName}</TableCell>
                  <TableCell>{birth.childTag}</TableCell>
                  <TableCell>{birth.gender}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        birth.status === "Saudável"
                          ? "default"
                          : birth.status === "Em tratamento"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {birth.status}
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
                          <Link href={`/animais/${birth.id}`}>
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
  )
}
