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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  motherId: z.string({
    required_error: "Selecione a mãe.",
  }),
  childName: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  childTag: z.string().min(1, {
    message: "A tag é obrigatória.",
  }),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  gender: z.string({
    required_error: "Selecione o gênero do animal.",
  }),
  weight: z.string().optional(),
  status: z.string({
    required_error: "Selecione o status do animal.",
  }),
  notes: z.string().optional(),
})

type BirthFormValues = z.infer<typeof formSchema>

export function BirthForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - would be fetched from API in a real app
  const mothers = [
    { id: "1", name: "Mimosa (A001)" },
    { id: "2", name: "Estrela (A002)" },
    { id: "4", name: "Boneca (A004)" },
  ]

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motherId: "",
      childName: "",
      childTag: "",
      birthDate: new Date(),
      gender: "",
      weight: "",
      status: "Saudável",
      notes: "",
    },
  })

  function onSubmit(values: BirthFormValues) {
    setIsLoading(true)

    // In a real app, send data to API
    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/nascimentos")
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="motherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mãe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a mãe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mothers.map((mother) => (
                      <SelectItem key={mother.id} value={mother.id}>
                        {mother.name}
                      </SelectItem>
                    ))}
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
            name="childName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Filhote</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do filhote" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag/Identificação do Filhote</FormLabel>
                <FormControl>
                  <Input placeholder="Número de identificação" {...field} />
                </FormControl>
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
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso ao Nascer (kg)</FormLabel>
                <FormControl>
                  <Input placeholder="Peso em kg" {...field} />
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
                    <SelectItem value="Debilitado">Debilitado</SelectItem>
                  </SelectContent>
                </Select>
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
                <Textarea placeholder="Informações adicionais sobre o nascimento" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/nascimentos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Registrar Nascimento"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
