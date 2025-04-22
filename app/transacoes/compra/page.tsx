import { TransactionForm } from "@/components/transaction-form"

export default function PurchasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Compra</h1>
        <p className="text-muted-foreground">Registre a compra de um animal</p>
      </div>
      <TransactionForm type="compra" />
    </div>
  )
}
