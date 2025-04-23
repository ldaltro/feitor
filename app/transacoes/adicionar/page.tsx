import { getAnimals } from "@/lib/actions/animals";
import { TransactionFormClient } from "@/components/transaction-form-client";

export default async function AddTransactionPage() {
  // Fetch animals data on the server
  const { animals, error } = await getAnimals();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Adicionar Transação</h1>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <TransactionFormClient animals={animals || []} />
      )}
    </div>
  );
}
