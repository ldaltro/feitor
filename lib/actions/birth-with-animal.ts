"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// Schema for creating birth with animal
const createBirthWithAnimalSchema = z.object({
  // Birth data
  birthDate: z.date(),
  motherId: z.string(),
  fatherId: z.string().optional(),
  notes: z.string().optional(),
  newbornCount: z.number().int().positive(),
  
  // Animal data
  childName: z.string().min(2),
  childTag: z.string().min(1),
  breed: z.string(),
  gender: z.string(),
  status: z.string(),
});

export async function createBirthWithAnimal(data: z.infer<typeof createBirthWithAnimalSchema>) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createBirthWithAnimalSchema.parse(data);

    // Verify that both mother and father belong to the user's farm
    const motherPromise = prisma.animal.findFirst({ 
      where: { id: validatedData.motherId, farmId } 
    });
    
    const fatherPromise = validatedData.fatherId 
      ? prisma.animal.findFirst({ where: { id: validatedData.fatherId, farmId } })
      : Promise.resolve(null);

    const [mother, father] = await Promise.all([motherPromise, fatherPromise]);

    if (!mother) {
      return { error: "Mother animal not found or access denied" };
    }

    if (validatedData.fatherId && !father) {
      return { error: "Father animal not found or access denied" };
    }

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // First create the animal
      const animal = await tx.animal.create({
        data: {
          name: validatedData.childName,
          tag: validatedData.childTag,
          breed: validatedData.breed,
          gender: validatedData.gender,
          birthDate: validatedData.birthDate,
          status: validatedData.status,
          farmId: farmId,
          active: true,
        },
      });

      // Then create the birth record
      const birth = await tx.birth.create({
        data: {
          birthDate: validatedData.birthDate,
          motherId: validatedData.motherId,
          fatherId: validatedData.fatherId || validatedData.motherId, // Use mother as father if not provided
          childId: animal.id,
          notes: validatedData.notes,
        },
      });

      // Update mother's reproductive status to "Parto"
      await tx.animal.update({
        where: { id: validatedData.motherId },
        data: { 
          reproductiveStatus: "Parto",
          expectedBirthDate: null, // Clear expected birth date
        },
      });

      return { animal, birth };
    });

    revalidatePath("/nascimentos");
    revalidatePath("/animais");
    revalidatePath(`/animais/${validatedData.motherId}`); // Update mother's page
    
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation error", details: error.errors };
    }

    console.error("Failed to create birth with animal:", error);
    return { error: "Failed to create birth record" };
  }
}