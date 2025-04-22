import { AnimalForm } from "@/components/animal-form"

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
      <AnimalForm id={params.id} />
    </div>
  )
}
