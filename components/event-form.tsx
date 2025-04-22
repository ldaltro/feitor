"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  type: z.string({
    required_error: "Selecione o tipo de evento.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
  animals: z.array(z.string()).nonempty({
    message: "Selecione pelo menos um animal.",
  }),
  description: z.string().min(5, {
    message: "A descrição deve ter pelo menos 5 caracteres.",
  }),
})

type EventFormValues = z.infer<typeof formSchema>

export function EventForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - would be fetched from API in a real app
  const animals = [
    { id: "1", name: "Mimosa (A001)" },
    { id: "2", name: "Estrela (A002)" },
    { id: "3", name: "Trovão (A003)" },
    { id: "4", name: "Boneca (A004)" },
    { id: "5", name: "Sultão (A005)" },
  ]

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      date: new Date(),
      animals: [],
      description: "",
    },
  })

  function onSubmit(values: EventFormValues) {
    setIsLoading(true)

    // In a real app, send data to API
    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/calendario")
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título do evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Evento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Manejo Sanitário">Manejo Sanitário</SelectItem>
                    <SelectItem value="Manejo Reprodutivo">Manejo Reprodutivo</SelectItem>
                    <SelectItem value="Pesagem">Pesagem</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data do Evento</FormLabel>
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
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="animals"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Animais</FormLabel>
                <FormDescription>Selecione os animais envolvidos neste evento</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {animals.map((animal) => (
                  <FormField
                    key={animal.id}
                    control={form.control}
                    name="animals"
                    render={({ field }) => {
                      return (
                        <FormItem key={animal.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(animal.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, animal.id])
                                  : field.onChange(field.value?.filter((value) => value !== animal.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{animal.name}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva os detalhes do evento" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/calendario")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Adicionar Evento"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
