import { TransactionForm } from "@/components/transaction-form"

export default function SalePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Venda</h1>
        <p className="text-muted-foreground">Registre a venda de um animal</p>
      </div>
      <TransactionForm type="venda" />
    </div>
  )
}
