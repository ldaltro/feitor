import { notFound } from "next/navigation";
import { getLoteById } from "@/lib/actions/lotes";
import { LoteDetails } from "@/components/lote-details";

interface LoteDetailsPageProps {
  params: {
    loteId: string;
  };
}

export default async function LoteDetailsPage({
  params,
}: LoteDetailsPageProps) {
  const { loteId } = params;
  const { lote, error } = await getLoteById(loteId);

  if (error || !lote) {
    notFound();
  }

  return (
    <div>
      <LoteDetails lote={lote} />
    </div>
  );
}
