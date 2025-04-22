import { AnimalDetails } from "@/components/animal-details";

export default async function AnimalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <AnimalDetails id={params.id} />
    </div>
  );
}
