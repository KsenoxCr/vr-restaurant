import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kitchenRouter = createTRPCRouter({
  validatePin: publicProcedure
    .input(z.number().int().positive().lte(9999))
    .mutation(async ({ input }) => {
      return input.toString(4) === process.env.KITCHEN_PIN;
    }),
});
