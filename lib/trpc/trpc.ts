import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { db } from "@/lib/db";

// Initialize context for each tRPC request
export const createTRPCContext = async () => {
  return {
    db,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Initialize tRPC API
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Export tRPC components
export const router = t.router;
export const publicProcedure = t.procedure;
