import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const transactionRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.transaction.findMany({
      include: {
        animal: true,
      },
      orderBy: { date: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.transaction.findUnique({
        where: { id: input.id },
        include: {
          animal: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["Compra", "Venda"]),
        animalId: z.string(),
        date: z.date(),
        value: z.number(),
        person: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction.create({
        data: input,
        include: {
          animal: true,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction.delete({
        where: { id: input.id },
      });
    }),
});
