"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// Schema validators
const createOwnerSchema = z.object({
  name: z.string().min(2),
  cpfCnpj: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

const updateOwnerSchema = createOwnerSchema;

// Get all owners
export async function getOwners() {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { owners: [], error: "Farm ID not found" };
    }

    const owners = await prisma.owner.findMany({
      where: { farmId, active: true },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { animals: true }
        }
      }
    });

    return { owners, error: null };
  } catch (error) {
    console.error("Failed to fetch owners:", error);
    return { owners: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get owner by ID
export async function getOwnerById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { owner: null, error: "Farm ID not found" };
    }

    const owner = await prisma.owner.findFirst({
      where: { id, farmId },
      include: {
        animals: true
      }
    });

    return { owner, error: null };
  } catch (error) {
    console.error(`Failed to fetch owner with ID ${id}:`, error);
    return { owner: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Create owner
export async function createOwner(data: z.infer<typeof createOwnerSchema>) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createOwnerSchema.parse(data);

    // Check if owner with same CPF/CNPJ already exists
    if (validatedData.cpfCnpj) {
      const existing = await prisma.owner.findFirst({
        where: { 
          cpfCnpj: validatedData.cpfCnpj,
          farmId 
        }
      });

      if (existing) {
        return { error: "Proprietário com este CPF/CNPJ já existe" };
      }
    }

    const owner = await prisma.owner.create({
      data: {
        ...validatedData,
        farmId,
      },
    });

    revalidatePath("/proprietarios");
    return { owner };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to create owner:", error);
    return { error: "Failed to create owner" };
  }
}

// Update owner
export async function updateOwner(id: string, data: z.infer<typeof updateOwnerSchema>) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = updateOwnerSchema.parse(data);

    // Check if the owner belongs to the user's farm
    const existingOwner = await prisma.owner.findFirst({
      where: { id, farmId },
    });

    if (!existingOwner) {
      return { error: "Owner not found or access denied" };
    }

    // Check if CPF/CNPJ is being changed to one that already exists
    if (validatedData.cpfCnpj && validatedData.cpfCnpj !== existingOwner.cpfCnpj) {
      const duplicate = await prisma.owner.findFirst({
        where: { 
          cpfCnpj: validatedData.cpfCnpj,
          farmId,
          NOT: { id }
        }
      });

      if (duplicate) {
        return { error: "Proprietário com este CPF/CNPJ já existe" };
      }
    }

    const owner = await prisma.owner.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/proprietarios");
    revalidatePath(`/proprietarios/${id}`);
    return { owner };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to update owner:", error);
    return { error: "Failed to update owner" };
  }
}

// Delete owner (soft delete)
export async function deleteOwner(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // Check if the owner belongs to the user's farm
    const existingOwner = await prisma.owner.findFirst({
      where: { id, farmId },
      include: {
        _count: {
          select: { animals: true }
        }
      }
    });

    if (!existingOwner) {
      return { error: "Owner not found or access denied" };
    }

    // Check if owner has animals
    if (existingOwner._count.animals > 0) {
      return { error: "Não é possível excluir proprietário com animais cadastrados" };
    }

    // Soft delete
    await prisma.owner.update({
      where: { id },
      data: { active: false },
    });

    revalidatePath("/proprietarios");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete owner with ID ${id}:`, error);
    return { error: `Failed to delete owner with ID ${id}` };
  }
}