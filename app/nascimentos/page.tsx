import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { BirthsList } from "@/components/births-list"
import Link from "next/link"

export default function BirthsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nascimentos</h1>
        <Link href="/nascimentos/registrar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Nascimento
          </Button>
        </Link>
      </div>
      <BirthsList />
    </div>
  )
}
