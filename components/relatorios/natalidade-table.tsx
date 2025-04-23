"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown } from "lucide-react"
import { type NatalidadeData } from "@/lib/actions/natalidade-actions"

interface NatalidadeTableProps {
  data: NatalidadeData['tableData']
}

export function NatalidadeTable({ data }: NatalidadeTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("tag")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter data based on search term
  const filteredData = data.filter(animal => 
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.reproductiveStatus.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort data based on sort field and direction
  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = a[sortField as keyof typeof a] || ""
    const valueB = b[sortField as keyof typeof b] || ""
    
    // For string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA)
    }
    
    // For number or other comparisons
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Handle sort click
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render sorted icon
  const renderSortIcon = (field: string) => {
    if (field !== sortField) return null
    
    return (
      <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
    )
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    let variant = "default"
    
    if (status === "Gestante") variant = "secondary"
    else if (status === "Inseminada") variant = "default"
    else if (status === "Aborto") variant = "destructive"
    else if (status === "Não gestante") variant = "outline"
    
    return <Badge variant={variant as any}>{status}</Badge>
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar animais..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredData.length} animais
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("tag")}
              >
                Tag {renderSortIcon("tag")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Nome {renderSortIcon("name")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("birthDate")}
              >
                Data Nasc. {renderSortIcon("birthDate")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("reproductiveStatus")}
              >
                Status Reprodutivo {renderSortIcon("reproductiveStatus")}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("inseminationDate")}
              >
                Data Inseminação {renderSortIcon("inseminationDate")}
              </TableHead>
              <TableHead 
                className="cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("expectedBirthDate")}
              >
                Previsão de Parto {renderSortIcon("expectedBirthDate")}
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum animal encontrado.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-medium">{animal.tag}</TableCell>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.birthDate}</TableCell>
                  <TableCell>
                    {renderStatusBadge(animal.reproductiveStatus)}
                  </TableCell>
                  <TableCell>{animal.inseminationDate}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {animal.expectedBirthDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/animais/${animal.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
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
