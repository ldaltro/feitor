"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { getAnimalById } from "@/lib/actions/get-animal-by-id"
import { updateAnimal } from "@/lib/actions/animals"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  tag: z.string().min(1, {
    message: "A tag é obrigatória.",
  }),
  breed: z.string().min(1, {
    message: "A raça é obrigatória.",
  }),
  gender: z.string({
    required_error: "Selecione o gênero do animal.",
  }),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  purchaseDate: z.date().optional(),
  purchaseValue: z.number().optional(),
  weight: z.number().optional(),
  status: z.string({
    required_error: "Selecione o status do animal.",
  }),
  reproductiveStatus: z.string().optional(),
  notes: z.string().optional(),
})

type AnimalFormValues = z.infer<typeof formSchema>

interface AnimalEditFormProps {
  animalId: string
}

export function AnimalEditForm({ animalId }: AnimalEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "",
      breed: "",
      gender: "",
      birthDate: new Date(),
      weight: 0,
      status: "Saudável",
      notes: "",
    },
  })

  useEffect(() => {
    async function loadAnimal() {
      try {
        const { animal, error } = await getAnimalById(animalId)
        
        if (error || !animal) {
          console.error("Error loading animal:", error)
          alert("Erro ao carregar dados do animal")
          router.push("/animais")
          return
        }

        form.reset({
          name: animal.name,
          tag: animal.tag,
          breed: animal.breed,
          gender: animal.gender,
          birthDate: new Date(animal.birthDate),
          purchaseDate: animal.purchaseDate ? new Date(animal.purchaseDate) : undefined,
          purchaseValue: animal.purchaseValue || undefined,
          weight: animal.weight || undefined,
          status: animal.status,
          reproductiveStatus: animal.reproductiveStatus || undefined,
          notes: animal.notes || "",
        })
      } catch (error) {
        console.error("Error in loadAnimal:", error)
        alert("Erro ao carregar dados do animal")
        router.push("/animais")
      } finally {
        setIsLoadingData(false)
      }
    }

    loadAnimal()
  }, [animalId, form, router])

  async function onSubmit(values: AnimalFormValues) {
    setIsLoading(true)

    try {
      const result = await updateAnimal(animalId, values)

      if (result.error) {
        console.error('Error updating animal:', result.error)
        alert("Erro ao atualizar animal")
        return
      }

      router.push(`/animais/${animalId}`)
      router.refresh()
    } catch (error) {
      console.error('Error updating animal:', error)
      alert("Erro ao atualizar animal")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando dados do animal...</p>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do animal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag/Identificação</FormLabel>
                <FormControl>
                  <Input placeholder="Número de identificação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raça</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a raça" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Nelore">Nelore</SelectItem>
                    <SelectItem value="Gir">Gir</SelectItem>
                    <SelectItem value="Guzerá">Guzerá</SelectItem>
                    <SelectItem value="Brahman">Brahman</SelectItem>
                    <SelectItem value="Senepol">Senepol</SelectItem>
                    <SelectItem value="Angus">Angus</SelectItem>
                    <SelectItem value="Brangus">Brangus</SelectItem>
                    <SelectItem value="Girolando">Girolando</SelectItem>
                    <SelectItem value="Holandês">Holandês</SelectItem>
                    <SelectItem value="Jersey">Jersey</SelectItem>
                    <SelectItem value="Tabapuã">Tabapuã</SelectItem>
                    <SelectItem value="Caracu">Caracu</SelectItem>
                    <SelectItem value="Sindi">Sindi</SelectItem>
                    <SelectItem value="Mestiço">Mestiço</SelectItem>
                    <SelectItem value="Outra">Outra</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Fêmea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Peso em kg" 
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Saudável">Saudável</SelectItem>
                    <SelectItem value="Em tratamento">Em tratamento</SelectItem>
                    <SelectItem value="Gestante">Gestante</SelectItem>
                    <SelectItem value="Lactante">Lactante</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Debilitado">Debilitado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("gender") === "Fêmea" && (
            <FormField
              control={form.control}
              name="reproductiveStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Reprodutivo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status reprodutivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Não gestante">Não gestante</SelectItem>
                      <SelectItem value="Inseminada">Inseminada</SelectItem>
                      <SelectItem value="Gestante">Gestante</SelectItem>
                      <SelectItem value="Parto">Parto recente</SelectItem>
                      <SelectItem value="Aborto">Aborto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea placeholder="Informações adicionais sobre o animal" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(`/animais/${animalId}`)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Atualizar Animal"}
          </Button>
        </div>
      </form>
    </Form>
  )
}