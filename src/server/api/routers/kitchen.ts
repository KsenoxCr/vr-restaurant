import { SessionRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { serialize } from "cookie";
import { z } from "zod";
import { newExpiresAt } from "~/lib/utils";
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

      if (pinCorrect && (!ctx.session || ctx.session.role !== "KITCHEN")) {
        const session = await ctx.db.session.create({
          data: {
            seatNumber: -1,
            expiresAt: newExpiresAt(480),
            role: SessionRole.KITCHEN,
          },
        });

        const isProd = process.env.NODE_ENV === "production";

        const cookieName = isProd ? "__Host-session" : "session";
        const cookieValue = session.id;

        ctx.headers.append(
          "Set-Cookie",
          serialize(cookieName, cookieValue, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          }),
        );

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
