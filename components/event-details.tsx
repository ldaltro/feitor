"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash, Calendar, Stethoscope, Heart, Scale } from "lucide-react"

export function EventDetails({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - would be fetched from API in a real app
  const event = {
    id: "1",
    title: "Vacinação",
    date: new Date(2023, 4, 12), // May 12, 2023
    type: "Manejo Sanitário",
    description:
      "Vacinação contra febre aftosa. Todos os animais adultos foram vacinados conforme o calendário sanitário.",
    animals: [
      { id: "1", name: "Mimosa", tag: "A001" },
      { id: "2", name: "Estrela", tag: "A002" },
      { id: "3", name: "Trovão", tag: "A003" },
      { id: "4", name: "Boneca", tag: "A004" },
      { id: "5", name: "Sultão", tag: "A005" },
    ],
    createdBy: "João Silva",
    createdAt: new Date(2023, 4, 10),
  }

  function handleDelete() {
    setIsLoading(true)

    // In a real app, send delete request to API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/calendario")
    }, 1000)
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Manejo Sanitário":
        return <Stethoscope className="h-5 w-5" />
      case "Manejo Reprodutivo":
        return <Heart className="h-5 w-5" />
      case "Pesagem":
        return <Scale className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getEventIcon(event.type)}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <p className="text-muted-foreground">{format(event.date, "PPP", { locale: ptBR })}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/eventos/${id}/editar`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o evento.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isLoading ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Evento</CardTitle>
            <CardDescription>Informações sobre o evento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <Badge className="mt-1">{event.type}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data</p>
              <p>{format(event.date, "PPP", { locale: ptBR })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Descrição</p>
              <p className="text-sm">{event.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Criado por</p>
              <p>
                {event.createdBy} em {format(event.createdAt, "PPP", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Animais Envolvidos</CardTitle>
            <CardDescription>{event.animals.length} animais neste evento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {event.animals.map((animal) => (
                <div key={animal.id} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="font-medium">{animal.name}</p>
                    <p className="text-sm text-muted-foreground">{animal.tag}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/animais/${animal.id}`}>Ver</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/animais">Ver Todos os Animais</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
