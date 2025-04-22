import { EventForm } from "@/components/event-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface RouteParams {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: RouteParams) {
  const { id } = params;

  const event = await db.event.findUnique({
    where: { id },
    include: {
      animals: {
        include: {
          animal: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  // Format the data for the form
  const formattedEvent = {
    id: event.id,
    title: event.title,
    type: event.type,
    date: event.date,
    description: event.description,
    animals: event.animals.map((relation) => relation.animal.id),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Evento</h1>
        <p className="text-muted-foreground">Atualize os detalhes do evento</p>
      </div>
      <EventForm event={formattedEvent} />
    </div>
  );
}
