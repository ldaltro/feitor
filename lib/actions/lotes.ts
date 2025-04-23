"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Schema validators
const createLoteSchema = z.object({
  nome: z.string(),
  descricao: z.string().optional(),
  finalidade: z.enum(["Cria", "Recria", "Engorda", "Leite"]),
});

const updateLoteSchema = z.object({
  id: z.string(),
  nome: z.string(),
  descricao: z.string().optional(),
  finalidade: z.enum(["Cria", "Recria", "Engorda", "Leite"]),
});

// Get all lotes with animal counts
export async function getLotes() {
  try {
    const lotes = await db.lote.findMany({
      include: {
        _count: {
          select: { animais: true },
        },
        animais: {
          select: {
            breed: true,
          },
        },
      },
      orderBy: { nome: "asc" },
    });

    // Process to count animal breeds
    const lotesWithBreedCount = lotes.map((lote) => {
      const breedCounts: Record<string, number> = {};

      lote.animais.forEach((animal) => {
        breedCounts[animal.breed] = (breedCounts[animal.breed] || 0) + 1;
      });

      return {
        ...lote,
        animalCount: lote._count.animais,
        breedCounts,
      };
    });

    return { lotes: lotesWithBreedCount };
  } catch (error) {
    console.error("Failed to fetch lotes:", error);
    return { error: "Failed to fetch lotes" };
  }
}

// Get lote by ID with animals
export async function getLoteById(id: string) {
  try {
    const lote = await db.lote.findUnique({
      where: { id },
      include: {
        animais: true,
      },
    });

    return { lote };
  } catch (error) {
    console.error(`Failed to fetch lote with ID ${id}:`, error);
    return { error: `Failed to fetch lote with ID ${id}` };
  }
}

// Create lote
export async function createLote(data: z.infer<typeof createLoteSchema>) {
  try {
    const validatedData = createLoteSchema.parse(data);

    const lote = await db.lote.create({
      data: validatedData,
    });

    revalidatePath("/lotes");
    return { lote };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to create lote:", error);
    return { error: "Failed to create lote" };
  }
}

// Update lote
export async function updateLote(data: z.infer<typeof updateLoteSchema>) {
  try {
    const validatedData = updateLoteSchema.parse(data);
    const { id, ...updateData } = validatedData;

    const lote = await db.lote.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/lotes");
    revalidatePath(`/lotes/${id}`);
    return { lote };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to update lote:", error);
    return { error: "Failed to update lote" };
  }
}

// Delete lote
export async function deleteLote(id: string) {
  try {
    // First update all animals to remove them from the lote
    await db.animal.updateMany({
      where: { loteId: id },
      data: { loteId: null },
    });

    // Then delete the lote
    await db.lote.delete({
      where: { id },
    });

    revalidatePath("/lotes");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete lote with ID ${id}:`, error);
    return { error: `Failed to delete lote with ID ${id}` };
  }
}

// Add animal to lote
export async function addAnimalToLote(loteId: string, animalId: string) {
  try {
    await db.animal.update({
      where: { id: animalId },
      data: { loteId },
    });

    revalidatePath("/lotes");
    revalidatePath(`/lotes/${loteId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to add animal to lote:`, error);
    return { error: `Failed to add animal to lote` };
  }
}

// Remove animal from lote
export async function removeAnimalFromLote(animalId: string) {
  try {
    const animal = await db.animal.update({
      where: { id: animalId },
      data: { loteId: null },
    });

    revalidatePath("/lotes");
    if (animal.loteId) {
      revalidatePath(`/lotes/${animal.loteId}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`Failed to remove animal from lote:`, error);
    return { error: `Failed to remove animal from lote` };
  }
}
