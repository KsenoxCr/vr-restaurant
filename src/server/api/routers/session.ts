import { SessionRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { newExpiresAt } from "~/utils/session";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.number().min(1).max(99))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.$transaction(async (tx) => {
        const existing = await tx.session.findFirst({
          where: {
            seatNumber: input,
            expiresAt: { gt: new Date() }
          }
        })

        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Seat already reserved. Please choose another seat.`,
          });
        }

        const session = await tx.session.create({
          data: {
            seatNumber: input,
            expiresAt: newExpiresAt(30),
            role: SessionRole.CUSTOMER,
          },
        });

        return { sessionId: session.id, expiresAt: session.expiresAt };
      })
    }),
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session
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

      const session = await ctx.db.session.create({
        data: {
          seatNumber: 0,
          expiresAt: newExpiresAt(120),
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
