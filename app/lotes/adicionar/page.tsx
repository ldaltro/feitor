import { LoteFormClient } from "@/components/lote-form-client";
import { useTranslations } from "@/hooks/useTranslations";

export default function AddLotePage() {
  const { lotes: t } = useTranslations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.add}</h1>
        <p className="text-muted-foreground mt-2">{t.addDesc}</p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <LoteFormClient />
      </div>
    </div>
  );
}
