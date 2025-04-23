import { notFound } from "next/navigation";
import { LoteFormClient } from "@/components/lote-form-client";
import { getLoteById } from "@/lib/actions/lotes";

interface EditLotePageProps {
  params: {
    loteId: string;
  };
}

export default async function EditLotePage({ params }: EditLotePageProps) {
  const { loteId } = params;
  const { lote, error } = await getLoteById(loteId);

  if (error || !lote) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Lote</h1>
        <p className="text-muted-foreground mt-2">
          Atualize as informações deste lote
        </p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <LoteFormClient initialData={lote} isEditing />
      </div>
    </div>
  );
}
