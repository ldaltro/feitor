import { getAnimals } from "@/lib/actions/animals";
import { BirthFormClient } from "@/components/birth-form-client";

export default async function AddBirthPage() {
  // Fetch animals data on the server
  const { animals, error } = await getAnimals();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Registrar Nascimento
      </h1>

      {error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Erro ao carregar dados: {error}
        </div>
      ) : (
        <BirthFormClient animals={animals || []} />
      )}
    </div>
  );
}
