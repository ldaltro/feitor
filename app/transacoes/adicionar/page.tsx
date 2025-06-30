import { getAnimals } from "@/lib/actions/animals";
import { TransactionFormDebug } from "@/components/transaction-form-debug";

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

export default async function AddTransactionPage() {
  try {
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
          <TransactionFormDebug animals={animals || []} />
        )}
      </div>
    );
  } catch (serverError) {
    console.error("Server error in AddTransactionPage:", serverError);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Transação</h1>
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro interno do servidor. Verifique se você tem animais cadastrados na fazenda.
        </div>
      </div>
    );
  }
}
