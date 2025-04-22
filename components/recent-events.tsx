import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Stethoscope, Heart, Scale } from "lucide-react"
import Link from "next/link"

export function RecentEvents() {
  const events = [
    {
      id: "1",
      title: "Vacinação",
      date: "12/05/2023",
      type: "Manejo Sanitário",
      animals: 15,
    },
    {
      id: "2",
      title: "Inseminação",
      date: "10/05/2023",
      type: "Manejo Reprodutivo",
      animals: 5,
    },
    {
      id: "3",
      title: "Pesagem Mensal",
      date: "05/05/2023",
      type: "Pesagem",
      animals: 30,
    },
    {
      id: "4",
      title: "Vermifugação",
      date: "01/05/2023",
      type: "Manejo Sanitário",
      animals: 25,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return <Stethoscope className="h-4 w-4" />
      case "Manejo Reprodutivo":
        return <Heart className="h-4 w-4" />
      case "Pesagem":
        return <Scale className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return "default"
      case "Manejo Reprodutivo":
        return "secondary"
      case "Pesagem":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos Recentes</CardTitle>
        <CardDescription>Últimos eventos registrados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                {getIcon(event.type)}
              </div>
              <div className="flex-1 space-y-1">
                <Link href={`/eventos/${event.id}`} className="font-medium hover:underline">
                  {event.title}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {event.date} • {event.animals} animais
                </div>
              </div>
              <Badge variant={getBadgeVariant(event.type)}>{event.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
