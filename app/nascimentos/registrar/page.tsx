import { getAnimals } from "@/lib/actions/animals";
import { BirthFormClient } from "@/components/birth-form-client";

export default async function RegisterBirthPage() {
  const { animals } = await getAnimals();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nascimento</h1>
        <p className="text-muted-foreground">Registre o nascimento de um novo animal</p>
      </div>
      <BirthFormClient animals={animals || []} />
    </div>
  );
}
