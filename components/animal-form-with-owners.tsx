"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { getOwners } from "@/lib/actions/owners"
import Link from "next/link"

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
  purchaseValue: z.string().optional(),
  weight: z.string().optional(),
  status: z.string({
    required_error: "Selecione o status do animal.",
  }),
  ownerId: z.string().optional(),
  notes: z.string().optional(),
})

type AnimalFormValues = z.infer<typeof formSchema>

interface Owner {
  id: string;
  name: string;
  cpfCnpj?: string | null;
}

export function AnimalFormWithOwners({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [owners, setOwners] = useState<Owner[]>([])

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tag: "",
      breed: "",
      gender: "",
      birthDate: new Date(),
      weight: "",
      status: "Saudável",
      ownerId: "",
      notes: "",
    },
  })

  useEffect(() => {
    async function loadOwners() {
      const { owners, error } = await getOwners()
      if (!error && owners) {
        setOwners(owners)
      }
    }
    loadOwners()
  }, [])

  async function onSubmit(values: AnimalFormValues) {
    setIsLoading(true)

    try {
      const animalData = {
        ...values,
        weight: values.weight ? parseFloat(values.weight) || 0 : 0,
        purchaseValue: values.purchaseValue ? parseFloat(values.purchaseValue) || 0 : 0,
        ownerId: values.ownerId || undefined,
      }

      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      })

      if (!response.ok) {
        throw new Error('Failed to create animal')
      }

      router.push("/animais")
      router.refresh()
    } catch (error) {
      console.error('Error creating animal:', error)
      alert("Erro ao criar animal")
    } finally {
      setIsLoading(false)
    }
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
                  <Input placeholder="Peso em kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Compra</FormLabel>
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
                <FormDescription>Deixe em branco se o animal nasceu na fazenda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor de Compra (R$)</FormLabel>
                <FormControl>
                  <Input placeholder="Valor em R$" {...field} />
                </FormControl>
                <FormDescription>Deixe em branco se o animal nasceu na fazenda</FormDescription>
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
          <FormField
            control={form.control}
            name="ownerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proprietário</FormLabel>
                <div className="flex gap-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione o proprietário (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {owners.map((owner) => (
                        <SelectItem key={owner.id} value={owner.id}>
                          {owner.name} {owner.cpfCnpj ? `(${owner.cpfCnpj})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Link href="/proprietarios/adicionar">
                    <Button type="button" variant="outline" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <FormDescription>
                  Selecione o proprietário do animal ou adicione um novo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="button" variant="outline" onClick={() => router.push("/animais")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : id ? "Atualizar Animal" : "Adicionar Animal"}
          </Button>
        </div>
      </form>
    </Form>
  )
}