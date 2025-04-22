"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Edit, Trash, Calendar, CreditCard, Baby } from "lucide-react"

export function AnimalDetails({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - would be fetched from API in a real app
  const animal = {
    id: "1",
    name: "Mimosa",
    tag: "A001",
    breed: "Nelore",
    gender: "Fêmea",
    birthDate: "10/03/2020",
    age: "3 anos",
    purchaseDate: "15/05/2020",
    purchaseValue: "R$ 2.500,00",
    weight: "450 kg",
    status: "Saudável",
    notes: "Animal saudável e produtivo.",
  }

  const events = [
    {
      id: "1",
      title: "Vacinação",
      date: "12/05/2023",
      type: "Manejo Sanitário",
      description: "Vacinação contra febre aftosa",
    },
    {
      id: "2",
      title: "Inseminação",
      date: "10/04/2023",
      type: "Manejo Reprodutivo",
      description: "Inseminação artificial",
    },
    {
      id: "3",
      title: "Pesagem",
      date: "05/03/2023",
      type: "Pesagem",
      description: "Peso: 450 kg",
    },
  ]

  const births = [
    {
      id: "1",
      childName: "Filhote 1",
      childTag: "A010",
      birthDate: "15/06/2022",
      gender: "Fêmea",
      status: "Saudável",
    },
    {
      id: "2",
      childName: "Filhote 2",
      childTag: "A015",
      birthDate: "20/07/2023",
      gender: "Macho",
      status: "Saudável",
    },
  ]

  const transactions = [
    {
      id: "1",
      type: "Compra",
      date: "15/05/2020",
      value: "R$ 2.500,00",
      description: "Compra inicial",
    },
  ]

  function handleDelete() {
    setIsLoading(true)

    // In a real app, send delete request to API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/animais")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{animal.name}</h1>
          <p className="text-muted-foreground">
            {animal.tag} • {animal.breed} • {animal.gender}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/animais/${id}/editar`}>
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
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o animal e todos os dados associados a
                  ele.
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
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Detalhes do animal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tag</p>
                <p>{animal.tag}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                <p>{animal.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Raça</p>
                <p>{animal.breed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gênero</p>
                <p>{animal.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                <p>{animal.birthDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Idade</p>
                <p>{animal.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peso</p>
                <p>{animal.weight}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge
                  variant={
                    animal.status === "Saudável"
                      ? "default"
                      : animal.status === "Gestante"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {animal.status}
                </Badge>
              </div>
            </div>
            {animal.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Observações</p>
                <p className="text-sm">{animal.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Compra</CardTitle>
            <CardDescription>Detalhes da aquisição</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data de Compra</p>
                <p>{animal.purchaseDate || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor de Compra</p>
                <p>{animal.purchaseValue || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="births" className="flex items-center">
            <Baby className="mr-2 h-4 w-4" />
            Nascimentos
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Transações
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Histórico de Eventos</h3>
            <Button asChild>
              <Link href="/eventos/adicionar">Adicionar Evento</Link>
            </Button>
          </div>
          {events.length === 0 ? (
            <p className="text-muted-foreground">Nenhum evento registrado.</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <Badge>{event.type}</Badge>
                    </div>
                    <CardDescription>{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="births" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Histórico de Nascimentos</h3>
            <Button asChild>
              <Link href="/nascimentos/registrar">Registrar Nascimento</Link>
            </Button>
          </div>
          {births.length === 0 ? (
            <p className="text-muted-foreground">Nenhum nascimento registrado.</p>
          ) : (
            <div className="space-y-4">
              {births.map((birth) => (
                <Card key={birth.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{birth.childName}</CardTitle>
                      <Badge>{birth.gender}</Badge>
                    </div>
                    <CardDescription>{birth.birthDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Tag: </span>
                        {birth.childTag}
                      </div>
                      <div>
                        <span className="font-medium">Status: </span>
                        {birth.status}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/animais/${birth.id}`}>Ver Detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Histórico de Transações</h3>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/transacoes/compra">Registrar Compra</Link>
              </Button>
              <Button asChild>
                <Link href="/transacoes/venda">Registrar Venda</Link>
              </Button>
            </div>
          </div>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma transação registrada.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{transaction.type}</CardTitle>
                      <Badge variant={transaction.type === "Compra" ? "outline" : "default"}>{transaction.value}</Badge>
                    </div>
                    <CardDescription>{transaction.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{transaction.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
