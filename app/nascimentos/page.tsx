import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getBirths } from "@/lib/actions/births";
import { BirthsListClient } from "@/components/births-list-client";

export default async function BirthsPage() {
  // Fetch births data on the server
  const { births, error } = await getBirths();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nascimentos</h1>
        <Link href="/nascimentos/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Nascimento
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <BirthsListClient births={births || []} />
      )}
    </div>
  );
}
