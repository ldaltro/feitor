import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RecentAnimals() {
  const animals = [
    {
      id: "1",
      name: "Mimosa",
      breed: "Nelore",
      age: "3 anos",
      status: "Saudável",
    },
    {
      id: "2",
      name: "Estrela",
      breed: "Gir",
      age: "2 anos",
      status: "Gestante",
    },
    {
      id: "3",
      name: "Trovão",
      breed: "Angus",
      age: "4 anos",
      status: "Saudável",
    },
    {
      id: "4",
      name: "Boneca",
      breed: "Holandesa",
      age: "1 ano",
      status: "Em tratamento",
    },
  ]

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
                  {animal.breed} • {animal.age}
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
