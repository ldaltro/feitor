"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Presentation } from "lucide-react"

export function ExportButton() {
  return (
    <Button>
      <Presentation className="mr-2 h-4 w-4" />
      Exportar Todos
    </Button>
  )
}

export function ReportButton({ href }: { href: string }) {
  return (
    <Button asChild className="w-full">
      <Link href={href}>Ver Relatório</Link>
    </Button>
  )
}
