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
import { trpc } from "@/lib/trpc/client";

// Define Animal type based on your schema
interface Animal {
  id: string;
  name: string;
  tag: string;
  gender: string;
  status: string;
  breed: string;
}

const formSchema = z.object({
  motherId: z.string({
    required_error: "Selecione a mãe.",
  }),
  fatherId: z.string({
    required_error: "Selecione o pai.",
  }),
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
  weight: z.string().optional(),
  status: z.string({
    required_error: "Selecione o status do animal.",
  }),
  notes: z.string().optional(),
});

type BirthFormValues = z.infer<typeof formSchema>;

export function BirthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mothers, setMothers] = useState<
    { id: string; name: string; breed: string }[]
  >([]);
  const [fathers, setFathers] = useState<
    { id: string; name: string; breed: string }[]
  >([]);

  // Fetch all animals from the database using tRPC
  const { data: animals, isLoading: isLoadingAnimals } =
    trpc.animals.getAll.useQuery({});

  // Filter for female animals to use as mothers and male animals for fathers
  useEffect(() => {
    if (animals) {
      // Log the data structure to debug
      console.log("Animals data structure:", animals);

      // Make sure we're working with an array
      let animalsArray: Animal[] = [];

      // Handle different possible structures
      if (Array.isArray(animals)) {
        animalsArray = animals;
      } else if (typeof animals === "object" && animals !== null) {
        // Try to extract animals if it's nested in a property
        // Check common patterns
        if (Array.isArray((animals as any).data)) {
          animalsArray = (animals as any).data;
        } else if (Array.isArray((animals as any).animals)) {
          animalsArray = (animals as any).animals;
        } else {
          console.warn("Unknown animals data structure:", animals);
        }
      }

      // Filter for female animals (mothers)
      const femaleAnimals = animalsArray.filter(
        (animal: Animal) =>
          animal && animal.gender === "Fêmea" && animal.status !== "Debilitado"
      );

      const formattedMothers = femaleAnimals.map((animal: Animal) => ({
        id: animal.id,
        name: `${animal.name} (${animal.tag})`,
        breed: animal.breed,
      }));

      // Filter for male animals (fathers)
      const maleAnimals = animalsArray.filter(
        (animal: Animal) =>
          animal && animal.gender === "Macho" && animal.status !== "Debilitado"
      );

      const formattedFathers = maleAnimals.map((animal: Animal) => ({
        id: animal.id,
        name: `${animal.name} (${animal.tag})`,
        breed: animal.breed,
      }));

      console.log("Formatted mothers:", formattedMothers);
      console.log("Formatted fathers:", formattedFathers);
      setMothers(formattedMothers);
      setFathers(formattedFathers);
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
      weight: "",
      status: "Saudável",
      notes: "",
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

  function onSubmit(values: BirthFormValues) {
    setIsLoading(true);

    // In a real app, send data to API
    console.log(values);

    // Call the TRPC mutation to create a birth record
    trpc.births.create.mutate(
      {
        motherId: values.motherId,
        fatherId: values.fatherId,
        childName: values.childName,
        childTag: values.childTag,
        childBreed: values.breed,
        childGender: values.gender,
        birthDate: values.birthDate,
        childStatus: values.status,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/nascimentos");
        },
        onError: (error) => {
          console.error("Error creating birth:", error);
          setIsLoading(false);
        },
      }
    );
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
                  disabled={isLoadingAnimals}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingAnimals ? "Carregando..." : "Selecione a mãe"
                        }
                      />
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
                  disabled={isLoadingAnimals}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingAnimals ? "Carregando..." : "Selecione o pai"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fathers.map((father) => (
                      <SelectItem key={father.id} value={father.id}>
                        {father.name}
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Registrar Nascimento"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
