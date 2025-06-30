import { AnimalEditForm } from "@/components/animal-edit-form"

export default function EditAnimalPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Animal</h1>
        <p className="text-muted-foreground">Atualize os dados do animal</p>
      </div>
      <AnimalEditForm animalId={params.id} />
    </div>
  )
}
