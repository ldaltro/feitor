import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getTransactions } from "@/lib/actions/transactions";
import { TransactionsListClient } from "@/components/transactions-list-client";

export default async function TransactionsPage() {
  // Fetch transactions data on the server
  const { transactions, error } = await getTransactions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
        <Link href="/transacoes/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Transação
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <TransactionsListClient transactions={transactions || []} />
      )}
    </div>
  );
}
