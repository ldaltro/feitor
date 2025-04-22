import { PrismaClient } from "./generated/prisma";

// This file ensures that Prisma is initialized properly before any routes are loaded

// Prevent multiple instances in development
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Force initialization by accessing a method
prisma.$connect();

console.log("Prisma client initialized successfully");

export default prisma;
