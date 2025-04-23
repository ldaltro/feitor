import * as z from "zod";

// Recreate the schema from the BirthForm component
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

describe("Birth Form Schema Validation", () => {
  it("validates a complete and valid birth form", () => {
    const validData = {
      motherId: "mother1",
      fatherId: "father1",
      childName: "Baby Calf",
      childTag: "C001",
      breed: "Nelore",
      birthDate: new Date(),
      gender: "Macho",
      weight: "25",
      status: "Saudável",
      notes: "Healthy birth",
    };

    const result = formSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("validates with optional fields missing", () => {
    const validDataWithOptionalsMissing = {
      motherId: "mother1",
      fatherId: "father1",
      childName: "Baby Calf",
      childTag: "C001",
      breed: "Nelore",
      birthDate: new Date(),
      gender: "Macho",
      status: "Saudável",
      // weight and notes are optional
    };

    const result = formSchema.safeParse(validDataWithOptionalsMissing);
    expect(result.success).toBe(true);
  });

  it("fails validation with missing required fields", () => {
    const invalidData = {
      // Missing motherId
      fatherId: "father1",
      childName: "Baby Calf",
      childTag: "C001",
      // Missing breed
      birthDate: new Date(),
      gender: "Macho",
      status: "Saudável",
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.motherId?._errors).toBeDefined();
      expect(formattedErrors.breed?._errors).toBeDefined();
    }
  });

  it("fails validation with invalid field values", () => {
    const invalidData = {
      motherId: "mother1",
      fatherId: "father1",
      childName: "A", // Too short
      childTag: "", // Empty
      breed: "Nelore",
      birthDate: new Date(),
      gender: "Macho",
      status: "Saudável",
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.childName?._errors).toBeDefined();
      expect(formattedErrors.childTag?._errors).toBeDefined();
    }
  });

  it("fails validation with wrong data types", () => {
    const invalidTypes = {
      motherId: 123, // Should be string
      fatherId: "father1",
      childName: "Baby Calf",
      childTag: "C001",
      breed: "Nelore",
      birthDate: "2023-01-01", // Should be Date object
      gender: "Macho",
      status: "Saudável",
    };

    const result = formSchema.safeParse(invalidTypes as any);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.motherId?._errors).toBeDefined();
      expect(formattedErrors.birthDate?._errors).toBeDefined();
    }
  });
});
