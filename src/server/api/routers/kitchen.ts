import { SessionRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { newExpiresAt, sessionCookiesToContext } from "~/lib/utils/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kitchenRouter = createTRPCRouter({
  validatePin: publicProcedure
    .input(z.string().length(4))
    .mutation(async ({ input, ctx }) => {
      if (!/^\d+$/.test(input))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "PIN: digits only",
        });

      const pinCorrect = input === process.env.KITCHEN_PIN;

      // TODO: just change role if valid session already exists

      if (pinCorrect && ctx.session?.role !== "KITCHEN") {
        const session = await ctx.db.session.create({
          data: {
            seatNumber: 0,
            expiresAt: newExpiresAt(480),
            role: SessionRole.KITCHEN,
          },
        });

        sessionCookiesToContext(ctx, session);

        return {
          success: pinCorrect,
          session: {
            sessionId: session.id,
            expiresAt: session.expiresAt,
            role: session.role,
          },
        };
      }

      return {
        success: pinCorrect,
      };
    }),
});
