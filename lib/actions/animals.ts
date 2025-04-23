"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Schema validators
const createAnimalSchema = z.object({
  name: z.string(),
  tag: z.string(),
  breed: z.string(),
  gender: z.string(),
  birthDate: z.date(),
  status: z.string(),
});

const updateAnimalSchema = z.object({
  id: z.string(),
  name: z.string(),
  tag: z.string(),
  breed: z.string(),
  gender: z.string(),
  birthDate: z.date(),
  status: z.string(),
});

// Get all animals
export async function getAnimals() {
  try {
    const animals = await db.animal.findMany({
      orderBy: { name: "asc" },
    });

    return { animals };
  } catch (error) {
    console.error("Failed to fetch animals:", error);
    return { error: "Failed to fetch animals" };
  }
}

// Get animal by ID
export async function getAnimalById(id: string) {
  try {
    const animal = await db.animal.findUnique({
      where: { id },
    });

    return { animal };
  } catch (error) {
    console.error(`Failed to fetch animal with ID ${id}:`, error);
    return { error: `Failed to fetch animal with ID ${id}` };
  }
}

// Create animal
export async function createAnimal(data: z.infer<typeof createAnimalSchema>) {
  try {
    const validatedData = createAnimalSchema.parse(data);

    const animal = await db.animal.create({
      data: validatedData,
    });

    revalidatePath("/animais");
    return { animal };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to create animal:", error);
    return { error: "Failed to create animal" };
  }
}

// Update animal
export async function updateAnimal(data: z.infer<typeof updateAnimalSchema>) {
  try {
    const validatedData = updateAnimalSchema.parse(data);
    const { id, ...updateData } = validatedData;

    const animal = await db.animal.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/animais");
    revalidatePath(`/animais/${id}`);
    return { animal };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to update animal:", error);
    return { error: "Failed to update animal" };
  }
}

// Delete animal
export async function deleteAnimal(id: string) {
  try {
    await db.animal.delete({
      where: { id },
    });

    revalidatePath("/animais");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete animal with ID ${id}:`, error);
    return { error: `Failed to delete animal with ID ${id}` };
  }
}
