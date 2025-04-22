import { AnimalForm } from "@/components/animal-form"

export default function AddAnimalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Animal</h1>
        <p className="text-muted-foreground">Preencha os dados do novo animal</p>
      </div>
      <AnimalForm />
    </div>
  )
}
