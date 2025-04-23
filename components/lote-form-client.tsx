"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLote, updateLote } from "@/lib/actions/lotes";

// Schema validator
const loteFormSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  descricao: z
    .string()
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres" })
    .optional(),
  finalidade: z.enum(["Cria", "Recria", "Engorda", "Leite"], {
    required_error: "Selecione uma finalidade",
  }),
});

interface LoteFormProps {
  initialData?: {
    id: string;
    nome: string;
    descricao: string | null;
    finalidade: string;
  } | null;
  isEditing?: boolean;
}

export function LoteFormClient({
  initialData,
  isEditing = false,
}: LoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loteFormSchema>>({
    resolver: zodResolver(loteFormSchema),
    defaultValues: {
      nome: initialData?.nome || "",
      descricao: initialData?.descricao || "",
      finalidade:
        (initialData?.finalidade as "Cria" | "Recria" | "Engorda" | "Leite") ||
        "Cria",
    },
  });

  const onSubmit = async (values: z.infer<typeof loteFormSchema>) => {
    try {
      setLoading(true);

      if (isEditing && initialData) {
        await updateLote({
          id: initialData.id,
          ...values,
        });
      } else {
        await createLote(values);
      }

      router.push("/lotes");
      router.refresh();
    } catch (error) {
      console.error("Error saving lote:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Lote</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do lote" {...field} />
                </FormControl>
                <FormDescription>
                  Identifique o lote com um nome único
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="finalidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finalidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma finalidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cria">Cria</SelectItem>
                    <SelectItem value="Recria">Recria</SelectItem>
                    <SelectItem value="Engorda">Engorda</SelectItem>
                    <SelectItem value="Leite">Leite</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  A finalidade principal do lote
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição detalhada do lote"
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Adicione informações adicionais sobre o lote
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/lotes")}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Salvando..."
              : isEditing
              ? "Atualizar Lote"
              : "Criar Lote"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
