import { router } from "../trpc";
import { animalRouter } from "./animals";
import { birthRouter } from "./births";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  animals: animalRouter,
  births: birthRouter,
  transactions: transactionRouter,
});

export type AppRouter = typeof appRouter;
