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
  animalId: z.string({
    required_error: "Selecione o animal.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
  value: z.string().min(1, {
    message: "O valor é obrigatório.",
  }),
  buyer: z.string().optional(),
  seller: z.string().optional(),
  notes: z.string().optional(),
})

type TransactionFormValues = z.infer<typeof formSchema>

export function TransactionForm({ type }: { type: "compra" | "venda" }) {
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

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: "",
      date: new Date(),
      value: "",
      buyer: "",
      seller: "",
      notes: "",
    },
  })

  function onSubmit(values: TransactionFormValues) {
    setIsLoading(true)

    // In a real app, send data to API
    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/transacoes")
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="animalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o animal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {animals.map((animal) => (
                      <SelectItem key={animal.id} value={animal.id}>
                        {animal.name}
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
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data da {type === "compra" ? "Compra" : "Venda"}</FormLabel>
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input placeholder="Valor em R$" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === "compra" ? (
            <FormField
              control={form.control}
              name="seller"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do vendedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="buyer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprador</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do comprador" {...field} />
                  </FormControl>
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
                <Textarea placeholder={`Informações adicionais sobre a ${type}`} className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/transacoes")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : type === "compra" ? "Registrar Compra" : "Registrar Venda"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
