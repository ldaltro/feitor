import { EventDetails } from "@/components/event-details"

export default function EventDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <EventDetails id={params.id} />
    </div>
  )
}
