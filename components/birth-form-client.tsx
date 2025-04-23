"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createBirth } from "@/lib/actions/births";
import { createAnimal } from "@/lib/actions/animals";

// Define Animal type
type Animal = {
  id: string;
  name: string;
  tag: string;
  gender: string;
  status: string;
  breed: string;
};

interface BirthFormClientProps {
  animals: Animal[];
}

const formSchema = z.object({
  motherId: z.string({
    required_error: "Selecione a mãe.",
  }),
  fatherId: z.string().optional(),
  childName: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  childTag: z.string().min(1, {
    message: "A tag é obrigatória.",
  }),
  breed: z.string({
    required_error: "Selecione a raça do animal.",
  }),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  gender: z.string({
    required_error: "Selecione o gênero do animal.",
  }),
  status: z.string({
    required_error: "Selecione o status do animal.",
  }),
  notes: z.string().optional(),
  newbornCount: z.coerce.number().int().positive().default(1),
});

type BirthFormValues = z.infer<typeof formSchema>;

export function BirthFormClient({ animals }: BirthFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mothers, setMothers] = useState<Animal[]>([]);
  const [fathers, setFathers] = useState<Animal[]>([]);

  // Filter animals into mothers and fathers
  useEffect(() => {
    if (animals && animals.length > 0) {
      // Filter for female animals (mothers)
      const femaleAnimals = animals.filter(
        (animal) => animal.gender === "Fêmea" && animal.status !== "Debilitado"
      );

      // Filter for male animals (fathers)
      const maleAnimals = animals.filter(
        (animal) => animal.gender === "Macho" && animal.status !== "Debilitado"
      );

      setMothers(femaleAnimals);
      setFathers(maleAnimals);
    }
  }, [animals]);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motherId: "",
      fatherId: "",
      childName: "",
      childTag: "",
      breed: "",
      birthDate: new Date(),
      gender: "",
      status: "Saudável",
      notes: "",
      newbornCount: 1,
    },
  });

  // Function to set the breed based on mother or father
  const handleParentChange = (
    parentId: string,
    parentType: "mother" | "father"
  ) => {
    const parentArray = parentType === "mother" ? mothers : fathers;
    const parent = parentArray.find((p) => p.id === parentId);

    if (parent) {
      // Set the breed field to the parent's breed
      form.setValue("breed", parent.breed);
    }
  };

  async function onSubmit(values: BirthFormValues) {
    setIsSubmitting(true);

    try {
      // First, create the animal
      const animalResult = await createAnimal({
        name: values.childName,
        tag: values.childTag,
        breed: values.breed,
        gender: values.gender,
        birthDate: values.birthDate,
        status: values.status,
      });

      if (animalResult.error) {
        console.error("Error creating animal:", animalResult.error);
        alert("Erro ao registrar animal");
        setIsSubmitting(false);
        return;
      }

      // Then create the birth record with the child ID
      const birthResult = await createBirth({
        birthDate: values.birthDate,
        motherId: values.motherId,
        fatherId: values.fatherId,
        childId: animalResult.animal.id, // Need the animal ID for the child
        notes: values.notes,
        newbornCount: values.newbornCount,
      });

      if (birthResult.error) {
        console.error("Error creating birth:", birthResult.error);
        alert("Erro ao registrar nascimento");
        setIsSubmitting(false);
        return;
      }

      // Redirect to births page after successful submission
      router.push("/nascimentos");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erro ao processar o formulário");
    } finally {
      setIsSubmitting(false);
    }
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
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleParentChange(value, "mother");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a mãe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mothers.map((mother) => (
                      <SelectItem key={mother.id} value={mother.id}>
                        {mother.name} ({mother.tag})
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
            name="fatherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pai</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleParentChange(value, "father");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o pai (opcional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fathers.map((father) => (
                      <SelectItem key={father.id} value={father.id}>
                        {father.name} ({father.tag})
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
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
            name="newbornCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Filhotes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Quantidade de filhotes nascidos"
                    {...field}
                  />
                </FormControl>
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
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raça</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                    <SelectItem value="Mestiço">Mestiço</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Textarea
                  placeholder="Informações adicionais sobre o nascimento"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/nascimentos")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Registrar Nascimento"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
