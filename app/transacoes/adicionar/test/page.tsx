// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

export default function TestTransactionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Test - Adicionar Transação</h1>
      <div className="p-4 bg-green-50 text-green-700 rounded-md">
        Se você consegue ver esta página, o problema não é no servidor.
        O erro está no componente TransactionFormClient.
      </div>
      <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
        Server está funcionando corretamente ✅
      </div>
    </div>
  );
}