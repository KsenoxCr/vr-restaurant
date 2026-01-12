import "server-only";

import { PrismaClient, SessionRole } from "@prisma/client";
import type { Session } from "@prisma/client";
import { serialize } from "cookie";
import type { TRPCContext } from "~/server/api/trpc";

export function sessionCookiesToContext(ctx: TRPCContext, session: Session) {
  const isProd = process.env.NODE_ENV === "production";

  const cookies = [
    {
      name: isProd ? "__Host-sessionId" : "sessionId",
      value: session.id.toString(),
    },
    { name: "seatNumber", value: session.seatNumber.toString() },
  ];

  for (const c of cookies) {
    ctx.cookiesToSet.push(
      serialize(c.name, c.value, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    );
  }
}

export function newExpiresAt(defaultLenMins: number) {
  const defaultSessionLength = defaultLenMins * 60 * 1000;
  return new Date(Date.now() + defaultSessionLength);
}

export async function prolongSession(db: PrismaClient, session: Session) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const maxExpiryMilliseconds =
    session.role === SessionRole.CUSTOMER
      ? 4 * 60 * 60 * 1000
      : 12 * 60 * 60 * 1000; // 4 hours for customers, 12 hours for staff

  const maxExpiryDate = new Date(
    session.createdAt.getTime() + maxExpiryMilliseconds,
  );

  const SessionIncrementLength = 30 * 60 * 1000; // 30 minutes

  if (
    session.lastActivity < fiveMinutesAgo &&
    session.expiresAt < maxExpiryDate
  ) {
    const newExpiry = new Date(
      session.expiresAt.getTime() + SessionIncrementLength,
    );

    await db.session.update({
      where: { id: session.id },
      data: {
        lastActivity: new Date(),
        expiresAt: newExpiry <= maxExpiryDate ? newExpiry : maxExpiryDate,
      },
    });
  }
}
