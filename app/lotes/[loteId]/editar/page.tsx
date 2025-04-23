import { notFound } from "next/navigation";
import { LoteFormClient } from "@/components/lote-form-client";
import { getLoteById } from "@/lib/actions/lotes";
import { useTranslations } from "@/hooks/useTranslations";

interface EditLotePageProps {
  params: {
    loteId: string;
  };
}

export default async function EditLotePage({ params }: { params: { loteId: string } }) {
  const { loteId } = params;
  const { lotes: t } = useTranslations();
  const data = await getLoteById(loteId);
  
  if (data.error || !data.lote) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{t.edit}</h1>
          <p className="text-muted-foreground">{t.editDesc}</p>
        </div>
        <LoteFormClient mode="edit" lote={data.lote} />
      </div>
    </div>
  );
}
