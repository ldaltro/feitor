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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit, Trash, Calendar, CreditCard, Baby, Milestone } from "lucide-react"
import { format, addDays, addMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"
import { updateReproductiveStatus, getAnimalDetails, type ReproductiveStatus } from "@/lib/actions/animal-actions"

interface Animal {
  id: string;
  name: string;
  tag: string;
  breed: string;
  gender: string;
  birthDate: Date;
  age: string;
  purchaseDate: Date;
  purchaseValue: number;
  status: string;
  reproductiveStatus: ReproductiveStatus;
  weight?: number;
  notes?: string;
  inseminationDate?: Date;
  expectedBirthDate?: Date;
  lote?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    nome: string;
    descricao: string | null;
    finalidade: string;
  } | null;
  loteId?: string | null;
}

interface AnimalDetailsProps {
  id: string
  initialData?: Awaited<ReturnType<typeof getAnimalDetails>>
}

export function AnimalDetails({ id, initialData }: AnimalDetailsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPregnancyStatus, setShowPregnancyStatus] = useState(false)
  
  // Use initialData if available, otherwise fallback to defaults
  const animal: Animal = initialData?.animal || {
    id: "1",
    name: "Mimosa",
    tag: "A001",
    breed: "Nelore",
    gender: "Fêmea",
    birthDate: new Date("2020-03-10"),
    age: "3 anos",
    purchaseDate: new Date("2020-05-15"),
    purchaseValue: 2500,
    status: "Saudável",
    reproductiveStatus: "Não gestante" as ReproductiveStatus,
  }
  
  const events = initialData?.events || []
  const births = initialData?.births || []
  const transactions = initialData?.transactions || []
  
  const [pregnancyStatus, setPregnancyStatus] = useState<ReproductiveStatus>(
    animal.reproductiveStatus as ReproductiveStatus || "Não gestante"
  )

  function handleDelete() {
    setIsLoading(true)

    // In a real app, would send delete request to API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/animais")
    }, 1000)
  }

  async function handlePregnancyStatusChange(value: string) {
    try {
      setIsLoading(true)
      
      const result = await updateReproductiveStatus(id, value as ReproductiveStatus)
      
      // Update local state
      setPregnancyStatus(value as ReproductiveStatus)
      
      // Show message to the user
      let message = `Status atualizado para ${value}`
      
      if (value === "Inseminada") {
        const expectedDate = addDays(new Date(), 280)
        message += `. Data prevista para parto: ${format(expectedDate, "dd/MM/yyyy", { locale: ptBR })}`
      }
      
      toast({
        title: "Status atualizado",
        description: message,
      })
      
      // Refresh the page data
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowPregnancyStatus(false)
    }
  }

  // Format helpers
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return ""
    const dateObj = date instanceof Date ? date : new Date(date)
    return format(dateObj, "dd/MM/yyyy", { locale: ptBR })
  }
  
  const formatCurrency = (value: number | null | undefined) => {
    if (!value && value !== 0) return ""
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }
  
  // Calculate age
  const calculateAge = (birthDate: Date | string | null | undefined) => {
    if (!birthDate) return ""
    const birthDateObj = birthDate instanceof Date ? birthDate : new Date(birthDate)
    const ageInMs = new Date().getTime() - birthDateObj.getTime()
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25)
    return `${Math.floor(ageInYears)} anos`
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
                <p>{formatDate(animal.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Idade</p>
                <p>{calculateAge(animal.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peso</p>
                <p>{animal.weight ? `${animal.weight} kg` : "—"}</p>
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

        {animal.gender === "Fêmea" && (
          <Card>
            <CardHeader>
              <CardTitle>Informações Reprodutivas</CardTitle>
              <CardDescription>Status reprodutivo do animal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status Atual</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge
                      variant={
                        pregnancyStatus === "Não gestante"
                          ? "outline"
                          : pregnancyStatus === "Inseminada"
                            ? "default"
                            : pregnancyStatus === "Gestante"
                              ? "secondary"
                              : pregnancyStatus === "Parto"
                                ? "default"
                                : "destructive"
                      }
                    >
                      {pregnancyStatus}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => setShowPregnancyStatus(!showPregnancyStatus)}
                      disabled={isLoading}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  {showPregnancyStatus && (
                    <div className="mt-2">
                      <Select onValueChange={handlePregnancyStatusChange} disabled={isLoading}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Não gestante">Não gestante</SelectItem>
                          <SelectItem value="Inseminada">Inseminada</SelectItem>
                          <SelectItem value="Gestante">Gestante</SelectItem>
                          <SelectItem value="Parto">Parto realizado</SelectItem>
                          <SelectItem value="Aborto">Aborto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Partos</p>
                  <p>{births.length}</p>
                </div>
                {pregnancyStatus === "Gestante" && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data de Inseminação</p>
                      <p>{formatDate(animal.inseminationDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Previsão de Parto</p>
                      <p>{formatDate(animal.expectedBirthDate)}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {(animal.gender !== "Fêmea" || animal.purchaseDate) && (
          <Card>
            <CardHeader>
              <CardTitle>Informações de Compra</CardTitle>
              <CardDescription>Detalhes da aquisição</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Compra</p>
                  <p>{formatDate(animal.purchaseDate) || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor de Compra</p>
                  <p>{formatCurrency(animal.purchaseValue) || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
          {animal.gender === "Fêmea" && (
            <TabsTrigger value="reproductive" className="flex items-center">
              <Milestone className="mr-2 h-4 w-4" />
              Linha do Tempo Reprodutiva
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="events" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Histórico de Eventos</h3>
            <Button asChild>
              <Link href={`/eventos/adicionar?animalId=${id}`}>Adicionar Evento</Link>
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
                    <CardDescription>{formatDate(event.date)}</CardDescription>
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
            {animal.gender === "Fêmea" && (
              <Button asChild>
                <Link href={`/nascimentos/registrar?motherId=${id}`}>Registrar Nascimento</Link>
              </Button>
            )}
          </div>
          {births.length === 0 ? (
            <p className="text-muted-foreground">Nenhum nascimento registrado.</p>
          ) : (
            <div className="space-y-4">
              {births.map((birth) => (
                <Card key={birth.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{birth.child.name}</CardTitle>
                      <Badge>{birth.child.gender}</Badge>
                    </div>
                    <CardDescription>{formatDate(birth.birthDate)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Tag: </span>
                        {birth.child.tag}
                      </div>
                      <div>
                        <span className="font-medium">Status: </span>
                        {birth.child.status}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/animais/${birth.child.id}`}>Ver Detalhes</Link>
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
                <Link href={`/transacoes/compra?animalId=${id}`}>Registrar Compra</Link>
              </Button>
              <Button asChild>
                <Link href={`/transacoes/venda?animalId=${id}`}>Registrar Venda</Link>
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
                      <Badge variant={transaction.type === "Compra" ? "outline" : "default"}>
                        {formatCurrency(transaction.value)}
                      </Badge>
                    </div>
                    <CardDescription>{formatDate(transaction.date)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Pessoa: {transaction.person}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        {animal.gender === "Fêmea" && (
          <TabsContent value="reproductive" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Linha do Tempo Reprodutiva</h3>
            </div>
            <div className="relative border-l-2 border-muted pl-6 ml-4 space-y-8">
              {events
                .filter(event => event.type === "Manejo Reprodutivo")
                .map((event, index) => (
                  <div className="relative" key={event.id}>
                    <div className={`absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full 
                      ${event.title.includes("Inseminação") ? "bg-primary text-primary-foreground" : 
                        event.title.includes("Gestação") ? "bg-secondary text-secondary-foreground" : 
                        event.title.includes("Parto") ? "bg-primary text-primary-foreground" : 
                        event.title.includes("Aborto") ? "bg-destructive text-destructive-foreground" : 
                        "bg-muted text-muted-foreground"}`}>
                      <Milestone className="h-3 w-3" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              
              {events.filter(event => event.type === "Manejo Reprodutivo").length === 0 && (
                <p className="text-muted-foreground">Nenhum evento reprodutivo registrado.</p>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
