"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
    console.log("🔢 getLotes - Starting to fetch lotes");
    
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return { lotes: [], error: "Farm ID not found" };
    }

    const lotes = await prisma.lote.findMany({
      where: { farmId },
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

    console.log("📊 Found lotes:", lotes.length);
    return { lotes: lotesWithBreedCount, error: null };
  } catch (error) {
    console.error("❌ Failed to fetch lotes:", error);
    return { lotes: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get lote by ID with animals
export async function getLoteById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { lote: null, error: "Farm ID not found" };
    }

    const lote = await prisma.lote.findFirst({
      where: { 
        id,
        farmId // Ensure user can only access lotes from their farm
      },
      include: {
        animais: true,
      },
    });

    return { lote, error: null };
  } catch (error) {
    return { lote: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Create lote
export async function createLote(data: z.infer<typeof createLoteSchema>) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createLoteSchema.parse(data);

    const lote = await prisma.lote.create({
      data: {
        ...validatedData,
        farmId, // Add farmId to the lote
      },
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = updateLoteSchema.parse(data);
    const { id, ...updateData } = validatedData;

    // First check if the lote belongs to the user's farm
    const existingLote = await prisma.lote.findFirst({
      where: { id, farmId },
    });

    if (!existingLote) {
      return { error: "Lote not found or access denied" };
    }

    const lote = await prisma.lote.update({
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // First check if the lote belongs to the user's farm
    const existingLote = await prisma.lote.findFirst({
      where: { id, farmId },
    });

    if (!existingLote) {
      return { error: "Lote not found or access denied" };
    }

    // First update all animals to remove them from the lote
    await prisma.animal.updateMany({
      where: { loteId: id },
      data: { loteId: null },
    });

    // Then delete the lote
    await prisma.lote.delete({
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // Check both animal and lote belong to the user's farm
    const [animal, lote] = await Promise.all([
      prisma.animal.findFirst({ where: { id: animalId, farmId } }),
      prisma.lote.findFirst({ where: { id: loteId, farmId } })
    ]);

    if (!animal || !lote) {
      return { error: "Animal or lote not found or access denied" };
    }

    await prisma.animal.update({
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // Check animal belongs to the user's farm
    const existingAnimal = await prisma.animal.findFirst({
      where: { id: animalId, farmId },
    });

    if (!existingAnimal) {
      return { error: "Animal not found or access denied" };
    }

    const animal = await prisma.animal.update({
      where: { id: animalId },
      data: { loteId: null },
    });

    revalidatePath("/lotes");
    if (existingAnimal.loteId) {
      revalidatePath(`/lotes/${existingAnimal.loteId}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`Failed to remove animal from lote:`, error);
    return { error: `Failed to remove animal from lote` };
  }
}
