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
  const data = await getLotes();

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <div className="flex justify-end">
          <Link href="/lotes/adicionar">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t.add}
            </Button>
          </Link>
        </div>
        {data.error ? (
          <div className="p-4 bg-red-50 text-red-500 rounded-md">
            Erro ao carregar dados: {data.error}
          </div>
        ) : (
          <LotesListClient lotes={data.lotes || []} />
        )}
      </div>
    </div>
  );
}
