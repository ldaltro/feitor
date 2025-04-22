import { BirthForm } from "@/components/birth-form"

export default function RegisterBirthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nascimento</h1>
        <p className="text-muted-foreground">Registre o nascimento de um novo animal</p>
      </div>
      <BirthForm />
    </div>
  )
}
