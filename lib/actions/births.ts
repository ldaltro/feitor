"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
    const births = await db.birth.findMany({
      include: {
        mother: true,
        father: true,
      },
      orderBy: { birthDate: "desc" },
    });

    return { births };
  } catch (error) {
    console.error("Failed to fetch births:", error);
    return { error: "Failed to fetch births" };
  }
}

// Get birth by ID
export async function getBirthById(id: string) {
  try {
    const birth = await db.birth.findUnique({
      where: { id },
      include: {
        mother: true,
        father: true,
      },
    });

    return { birth };
  } catch (error) {
    console.error(`Failed to fetch birth with ID ${id}:`, error);
    return { error: `Failed to fetch birth with ID ${id}` };
  }
}

// Create birth
export async function createBirth(data: z.infer<typeof createBirthSchema>) {
  try {
    const validatedData = createBirthSchema.parse(data);

    // Extract newbornCount as it's not in the Prisma schema
    const { newbornCount, ...birthData } = validatedData;

    const birth = await db.birth.create({
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
    await db.birth.delete({
      where: { id },
    });

    revalidatePath("/nascimentos");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete birth with ID ${id}:`, error);
    return { error: `Failed to delete birth with ID ${id}` };
  }
}
