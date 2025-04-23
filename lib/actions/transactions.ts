"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Schema validators
const createTransactionSchema = z.object({
  date: z.date(),
  type: z.string(),
  amount: z.number(),
  description: z.string(),
  animalId: z.string().optional(),
});

// Get all transactions
export async function getTransactions() {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        animal: true,
      },
      orderBy: { date: "desc" },
    });

    return { transactions };
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return { error: "Failed to fetch transactions" };
  }
}

// Get transaction by ID
export async function getTransactionById(id: string) {
  try {
    const transaction = await db.transaction.findUnique({
      where: { id },
      include: {
        animal: true,
      },
    });

    return { transaction };
  } catch (error) {
    console.error(`Failed to fetch transaction with ID ${id}:`, error);
    return { error: `Failed to fetch transaction with ID ${id}` };
  }
}

// Create transaction
export async function createTransaction(
  data: z.infer<typeof createTransactionSchema>
) {
  try {
    const validatedData = createTransactionSchema.parse(data);

    const transaction = await db.transaction.create({
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
    await db.transaction.delete({
      where: { id },
    });

    revalidatePath("/transacoes");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete transaction with ID ${id}:`, error);
    return { error: `Failed to delete transaction with ID ${id}` };
  }
}
