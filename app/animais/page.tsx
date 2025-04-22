import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AnimalsList } from "@/components/animals-list"
import Link from "next/link"

export default function AnimalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Animais</h1>
        <Link href="/animais/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Animal
          </Button>
        </Link>
      </div>
      <AnimalsList />
    </div>
  )
}
