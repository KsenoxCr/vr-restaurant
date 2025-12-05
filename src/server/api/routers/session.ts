import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from
  "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { SessionRole } from "@prisma/client";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.number().min(1))
    .mutation(async ({ ctx, input }) => {
      const defaultSessionLength = 30 * 60 * 1000; // 30 minutes
      const expiresAt = new Date(Date.now() + defaultSessionLength);

      const session = await ctx.db.session.create({
        data: {
          seatNumber: input,
          expiresAt: expiresAt,
          role: SessionRole.CUSTOMER,
        },
      });

      return { sessionId: session.id, expiresAt: session.expiresAt };
    }),
  kitchenLogin: publicProcedure
    .input(z.string().length(4))
    .mutation(async ({ ctx, input }) => {
      if (input !== process.env.KITCHEN_PIN) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid kitchen PIN",
        });
      }

      const defaultSessionLength = 2 * 60 * 60 * 1000; // 2 hour
      const expiresAt = new Date(Date.now() + defaultSessionLength);

      const session = await ctx.db.session.create({
        data: {
          seatNumber: 0,
          expiresAt: expiresAt,
          role: SessionRole.KITCHEN,
        },
      });

      return { sessionId: session.id, expiresAt: session.expiresAt };
    }),
  cleanup: publicProcedure // Auth required for production
    .mutation(async ({ ctx }) => {
      const result = await ctx.db.session.deleteMany({
        where: {
          expiresAt: { lt: new Date() },
        }
      });
      return { deletedCount: result.count };
    }),
});
