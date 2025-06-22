import { PrismaClient } from "@/lib/generated/prisma";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn", "info"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Add connection test
prisma.$connect()
  .then(() => {
    console.log("✅ Prisma client initialized successfully");
  })
  .catch((error) => {
    console.error("❌ Prisma client initialization failed:", error);
  });
