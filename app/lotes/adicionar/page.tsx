import { LoteFormClient } from "@/components/lote-form-client";

export default function AddLotePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Lote</h1>
        <p className="text-muted-foreground mt-2">
          Crie um novo lote para agrupar animais com características similares
        </p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <LoteFormClient />
      </div>
    </div>
  );
}
