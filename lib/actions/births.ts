"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// Schema validators
const createBirthSchema = z.object({
  birthDate: z.date(),
  motherId: z.string(),
  fatherId: z.string(),
  childId: z.string(),
  notes: z.string().optional(),
  newbornCount: z.number().int().positive(),
});

// Get all births
export async function getBirths() {
  try {
    console.log("👶 getBirths - Starting to fetch births");
    
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return { births: [], error: "Farm ID not found" };
    }

    const births = await prisma.birth.findMany({
      where: {
        mother: { farmId },
        father: { farmId },
      },
      include: {
        mother: true,
        father: true,
      },
      orderBy: { birthDate: "desc" },
    });

    console.log("📊 Found births:", births.length);
    return { births, error: null };
  } catch (error) {
    console.error("❌ Failed to fetch births:", error);
    return { births: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get birth by ID
export async function getBirthById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { birth: null, error: "Farm ID not found" };
    }

    const birth = await prisma.birth.findFirst({
      where: {
        id,
        mother: { farmId },
        father: { farmId },
      },
      include: {
        mother: true,
        father: true,
      },
    });

    return { birth, error: null };
  } catch (error) {
    console.error(`Failed to fetch birth with ID ${id}:`, error);
    return { birth: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Create birth
export async function createBirth(data: z.infer<typeof createBirthSchema>) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createBirthSchema.parse(data);

    // Extract newbornCount as it's not in the Prisma schema
    const { newbornCount, ...birthData } = validatedData;

    // Verify that both mother and father belong to the user's farm
    const [mother, father] = await Promise.all([
      prisma.animal.findFirst({ where: { id: birthData.motherId, farmId } }),
      prisma.animal.findFirst({ where: { id: birthData.fatherId, farmId } })
    ]);

    if (!mother || !father) {
      return { error: "Mother or father animal not found or access denied" };
    }

    const birth = await prisma.birth.create({
      data: birthData,
    });

    revalidatePath("/nascimentos");
    return { birth };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to create birth record:", error);
    return { error: "Failed to create birth record" };
  }
}

// Delete birth
export async function deleteBirth(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // First check if the birth record belongs to the user's farm
    const existingBirth = await prisma.birth.findFirst({
      where: {
        id,
        mother: { farmId },
        father: { farmId },
      },
    });

    if (!existingBirth) {
      return { error: "Birth record not found or access denied" };
    }

    await prisma.birth.delete({
      where: { id },
    });

    revalidatePath("/nascimentos");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete birth with ID ${id}:`, error);
    return { error: `Failed to delete birth with ID ${id}` };
  }
}
