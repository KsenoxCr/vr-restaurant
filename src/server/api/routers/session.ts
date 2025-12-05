import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from
  "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      seatNumber: z.number().min(1),
    })).mutation(async ({ ctx, input }) => {
      const defaultSessionLength = 30 * 60 * 1000; // 30 minutes
      const now = new Date();
      const expiresAt = new Date(now.getTime() + defaultSessionLength);

      const session = await ctx.db.session.create({
        data: {
          seatNumber: input.seatNumber,
          createdAt: now,
          lastActivity: now,
          expiresAt: expiresAt,
        },
      });

      return { sessionId: session.id, expiresAt: session.expiresAt };
    })
});
