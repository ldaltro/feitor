import { AnimalDetails } from "@/components/animal-details"
import { getAnimalDetails } from "@/lib/actions/animal-actions"

interface AnimalDetailsPageProps {
  params: {
    id: string
  }
}

export default async function AnimalDetailsPage({ params }: AnimalDetailsPageProps) {
  const { id } = params
  
  // Fetch the animal data
  const animalData = await getAnimalDetails(id)
  
  return (
    <div className="container py-10">
      <AnimalDetails id={id} initialData={animalData} />
    </div>
  )
}
