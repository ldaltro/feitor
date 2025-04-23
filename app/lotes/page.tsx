import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getLotes } from "@/lib/actions/lotes";
import { LotesListClient } from "@/components/lotes-list-client";
import { useTranslations } from "@/hooks/useTranslations";

export default async function LotesPage() {
  // Get translations
  const { lotes: t } = useTranslations();

  // Fetch lotes data on the server
  const { lotes, error } = await getLotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <Link href="/lotes/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.add}
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <LotesListClient lotes={lotes || []} />
      )}
    </div>
  );
}
