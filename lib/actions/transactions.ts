"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// Schema validators
const createTransactionSchema = z.object({
  date: z.date(),
  type: z.string(),
  value: z.number(),  // Changed from amount to value to match schema
  person: z.string(),
  description: z.string().optional(),
  animalId: z.string(),
});

// Get all transactions
export async function getTransactions() {
  try {
    console.log("💰 getTransactions - Starting to fetch transactions");
    
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return { transactions: [], error: "Farm ID not found" };
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        animal: { farmId },
      },
      include: {
        animal: true,
      },
      orderBy: { date: "desc" },
    });

    console.log("📊 Found transactions:", transactions.length);
    return { transactions, error: null };
  } catch (error) {
    console.error("❌ Failed to fetch transactions:", error);
    return { transactions: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get transaction by ID
export async function getTransactionById(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { transaction: null, error: "Farm ID not found" };
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        animal: { farmId },
      },
      include: {
        animal: true,
      },
    });

    return { transaction, error: null };
  } catch (error) {
    console.error(`Failed to fetch transaction with ID ${id}:`, error);
    return { transaction: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Create transaction
export async function createTransaction(
  data: z.infer<typeof createTransactionSchema>
) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    const validatedData = createTransactionSchema.parse(data);

    // Verify that the animal belongs to the user's farm
    const animal = await prisma.animal.findFirst({
      where: { id: validatedData.animalId, farmId },
    });

    if (!animal) {
      return { error: "Animal not found or access denied" };
    }

    const transaction = await prisma.transaction.create({
      data: validatedData,
    });

    revalidatePath("/transacoes");
    return { transaction };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }

    console.error("Failed to create transaction:", error);
    return { error: "Failed to create transaction" };
  }
}

// Delete transaction
export async function deleteTransaction(id: string) {
  try {
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    
    if (!farmId) {
      return { error: "Farm ID not found" };
    }

    // First check if the transaction belongs to the user's farm
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        animal: { farmId },
      },
    });

    if (!existingTransaction) {
      return { error: "Transaction not found or access denied" };
    }

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/transacoes");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete transaction with ID ${id}:`, error);
    return { error: `Failed to delete transaction with ID ${id}` };
  }
}
