import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { TransactionsList } from "@/components/transactions-list"
import Link from "next/link"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
        <div className="flex gap-2">
          <Link href="/transacoes/compra">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Registrar Compra
            </Button>
          </Link>
          <Link href="/transacoes/venda">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Registrar Venda
            </Button>
          </Link>
        </div>
      </div>
      <TransactionsList />
    </div>
  )
}
