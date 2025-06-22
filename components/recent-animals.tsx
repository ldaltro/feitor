import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Animal {
  id: string
  name: string
  breed: string
  birthDate: Date
  status: string
}

interface RecentAnimalsProps {
  animals?: Animal[]
}

export function RecentAnimals({ animals = [] }: RecentAnimalsProps) {
  if (animals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Animais Recentes</CardTitle>
          <CardDescription>Últimos animais adicionados ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nenhum animal cadastrado ainda.</p>
        </CardContent>
      </Card>
    )
  }

  const getAge = (birthDate: Date) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    return `${age} ${age === 1 ? 'ano' : 'anos'}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animais Recentes</CardTitle>
        <CardDescription>Últimos animais adicionados ao sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {animals.map((animal) => (
            <div key={animal.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{animal.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <Link href={`/animais/${animal.id}`} className="font-medium hover:underline">
                  {animal.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {animal.breed} • {getAge(animal.birthDate)}
                </p>
              </div>
              <Badge
                variant={
                  animal.status === "Saudável" ? "default" : animal.status === "Gestante" ? "secondary" : "destructive"
                }
              >
                {animal.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
