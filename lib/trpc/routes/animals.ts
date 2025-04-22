import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const animalRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.animal.findMany({
      orderBy: { name: "asc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.animal.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        tag: z.string(),
        breed: z.string(),
        gender: z.string(),
        birthDate: z.date(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.animal.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        tag: z.string(),
        breed: z.string(),
        gender: z.string(),
        birthDate: z.date(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.animal.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.animal.delete({
        where: { id: input.id },
      });
    }),
});
