import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kitchenRouter = createTRPCRouter({
  validatePin: publicProcedure
    .input(z.string().length(4))
    .mutation(async ({ input }) => {
      if (!/^\d+$/.test(input))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "PIN: digits only",
        });

      return input === process.env.KITCHEN_PIN;
    }),
});
