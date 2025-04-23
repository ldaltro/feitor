import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getAnimals } from "@/lib/actions/animals";
import { AnimalsListClient } from "@/components/animals-list-client";

export default async function AnimalsPage() {
  // Fetch animals data on the server
  const { animals, error } = await getAnimals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Animais</h1>
        <Link href="/animais/adicionar">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Animal
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <AnimalsListClient animals={animals || []} />
      )}
    </div>
  );
}
