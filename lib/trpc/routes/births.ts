import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const birthRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.birth.findMany({
      include: {
        mother: true,
        father: true,
        child: true,
      },
      orderBy: { birthDate: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.birth.findUnique({
        where: { id: input.id },
        include: {
          mother: true,
          father: true,
          child: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        motherId: z.string(),
        fatherId: z.string(),
        childName: z.string(),
        childTag: z.string(),
        childBreed: z.string(),
        childGender: z.string(),
        birthDate: z.date(),
        childStatus: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // First create the child animal
      const child = await ctx.db.animal.create({
        data: {
          name: input.childName,
          tag: input.childTag,
          breed: input.childBreed,
          gender: input.childGender,
          birthDate: input.birthDate,
          status: input.childStatus,
        },
      });

      // Then create the birth record
      return ctx.db.birth.create({
        data: {
          birthDate: input.birthDate,
          motherId: input.motherId,
          fatherId: input.fatherId,
          childId: child.id,
        },
        include: {
          mother: true,
          father: true,
          child: true,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Find the birth record to get the childId
      const birth = await ctx.db.birth.findUnique({
        where: { id: input.id },
        select: { childId: true },
      });

      if (!birth) {
        throw new Error("Birth record not found");
      }

      // Delete the birth record
      await ctx.db.birth.delete({
        where: { id: input.id },
      });

      // Delete the child animal
      return ctx.db.animal.delete({
        where: { id: birth.childId },
      });
    }),
});
