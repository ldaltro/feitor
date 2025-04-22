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
import { MoreHorizontal, Search, Edit, Trash, Eye } from "lucide-react"
import Link from "next/link"

export function AnimalsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - would be fetched from API in a real app
  const animals = [
    {
      id: "1",
      name: "Mimosa",
      tag: "A001",
      breed: "Nelore",
      gender: "Fêmea",
      birthDate: "10/03/2020",
      status: "Saudável",
    },
    {
      id: "2",
      name: "Estrela",
      tag: "A002",
      breed: "Gir",
      gender: "Fêmea",
      birthDate: "15/05/2021",
      status: "Gestante",
    },
    {
      id: "3",
      name: "Trovão",
      tag: "A003",
      breed: "Angus",
      gender: "Macho",
      birthDate: "22/07/2019",
      status: "Saudável",
    },
    {
      id: "4",
      name: "Boneca",
      tag: "A004",
      breed: "Holandesa",
      gender: "Fêmea",
      birthDate: "05/11/2022",
      status: "Em tratamento",
    },
    {
      id: "5",
      name: "Sultão",
      tag: "A005",
      breed: "Brahman",
      gender: "Macho",
      birthDate: "18/02/2018",
      status: "Saudável",
    },
  ]

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            {filteredAnimals.length === 0 ? (
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
                  <TableCell>{animal.birthDate}</TableCell>
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
  )
}
