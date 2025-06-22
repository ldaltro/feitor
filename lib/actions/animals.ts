"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
    console.log("🐄 getAnimals - Starting to fetch animals");
    
    // Get farm ID from headers (set by middleware)
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return { error: "Farm ID not found", animals: [] };
    }

    console.log("🔍 Fetching animals for farm:", farmId);
    
    const animals = await prisma.animal.findMany({
      where: { farmId },
      orderBy: { name: "asc" },
    });

    console.log("📊 Found animals:", animals.length);

    return { animals };
  } catch (error) {
    console.error("❌ Failed to fetch animals:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return { error: "Failed to fetch animals", animals: [] };
  }
}

// Get animal by ID
export async function getAnimalById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found", animal: null };
    }

    const animal = await prisma.animal.findFirst({
      where: { 
        id,
        farmId // Ensure user can only access animals from their farm
      },
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createAnimalSchema.parse(data);

    const animal = await prisma.animal.create({
      data: {
        ...validatedData,
        farmId, // Add farmId to the animal
      },
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = updateAnimalSchema.parse(data);
    const { id, ...updateData } = validatedData;

    // First check if the animal belongs to the user's farm
    const existingAnimal = await prisma.animal.findFirst({
      where: { id, farmId },
    });

    if (!existingAnimal) {
      return { error: "Animal not found or access denied" };
    }

    const animal = await prisma.animal.update({
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
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // First check if the animal belongs to the user's farm
    const existingAnimal = await prisma.animal.findFirst({
      where: { id, farmId },
    });

    if (!existingAnimal) {
      return { error: "Animal not found or access denied" };
    }

    await prisma.animal.delete({
      where: { id },
    });

    revalidatePath("/animais");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete animal with ID ${id}:`, error);
    return { error: `Failed to delete animal with ID ${id}` };
  }
}
