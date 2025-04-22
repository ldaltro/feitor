import { EventForm } from "@/components/event-form"

export default function AddEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Evento</h1>
        <p className="text-muted-foreground">Registre um novo evento no calendário</p>
      </div>
      <EventForm />
    </div>
  )
}
