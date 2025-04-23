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
import { useTranslations } from "@/hooks/useTranslations";

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
  mode: 'create' | 'edit';
  lote?: {
    id: string;
    nome: string;
    descricao: string | null;
    finalidade: string;
  };
}

export function LoteFormClient({ mode = 'create', lote }: LoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { lotes: t } = useTranslations();

  const form = useForm<z.infer<typeof loteFormSchema>>({
    resolver: zodResolver(loteFormSchema),
    defaultValues: {
      nome: lote?.nome || "",
      descricao: lote?.descricao || "",
      finalidade:
        (lote?.finalidade as "Cria" | "Recria" | "Engorda" | "Leite") ||
        "Cria",
    },
  });

  const onSubmit = async (values: z.infer<typeof loteFormSchema>) => {
    try {
      setLoading(true);

      if (mode === 'edit' && lote) {
        await updateLote({
          id: lote.id,
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
                <FormLabel>{t.name}</FormLabel>
                <FormControl>
                  <Input placeholder={t.name} {...field} />
                </FormControl>
                <FormDescription>{t.nameDesc}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="finalidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.purpose}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectPurpose} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cria">{t.cria}</SelectItem>
                    <SelectItem value="Recria">{t.recria}</SelectItem>
                    <SelectItem value="Engorda">{t.engorda}</SelectItem>
                    <SelectItem value="Leite">{t.leite}</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>{t.purposeDesc}</FormDescription>
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
              <FormLabel>{t.description}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.description}
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>{t.descriptionDesc}</FormDescription>
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
            {t.cancel}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t.saving : mode === 'edit' ? t.update : t.create}
          </Button>
        </div>
      </form>
    </Form>
  );
}
