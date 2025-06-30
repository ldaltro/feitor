import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getOwners } from "@/lib/actions/owners";
import { OwnersListClient } from "@/components/owners-list-client";

export default async function OwnersPage() {
  const { owners, error } = await getOwners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Proprietários</h1>
        <Link href="/proprietarios/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Proprietário
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <OwnersListClient owners={owners || []} />
      )}
    </div>
  );
}