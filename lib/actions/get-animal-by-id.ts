"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getAnimalById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { animal: null, error: "Farm ID not found" };
    }

    const animal = await prisma.animal.findFirst({
      where: {
        id,
        farmId,
      },
    });

    if (!animal) {
      return { animal: null, error: "Animal not found" };
    }

    return { animal, error: null };
  } catch (error) {
    console.error(`Failed to fetch animal with ID ${id}:`, error);
    return { animal: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}