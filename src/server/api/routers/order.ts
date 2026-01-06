import { z } from "zod";
import {
  createTRPCRouter,
  kitchenProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { OrderStatus } from "@prisma/client";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            id: z.number(),
            quantity: z.number().min(1),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        // Use serializable isolation level if race conditions become problematic

        const menuItems = await tx.menuItem.findMany({
          where: {
            id: { in: input.items.map((item) => item.id) },
            available: true,
          },
        });

        if (menuItems.length !== input.items.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "One or more menu items are not available",
          });
        }

        const totalCents = input.items.reduce((sum, item) => {
          const menuItem = menuItems.find((mi) => mi.id === item.id);

          return sum + menuItem!.priceCents * item.quantity;
        }, 0);

        const maxPosition =
          (await tx.order.aggregate({
            _max: { queuePosition: true },
            where: {
              status: {
                in: [
                  OrderStatus.SUBMITTED,
                  OrderStatus.CONFIRMED,
                  OrderStatus.PREPARING,
                ],
              },
            },
          })) ?? 0;

        const queuePosition = (maxPosition._max.queuePosition ?? 0) + 1;

        return tx.order.create({
          data: {
            sessionId: ctx.session.id,
            seatNumber: ctx.session.seatNumber,
            totalCents: totalCents,
            queuePosition: queuePosition,
            items: {
              create: input.items.map((item) => ({
                menuItemId: item.id,
                quantity: item.quantity,
                priceSnapshotCents: menuItems.find((mi) => mi.id === item.id)!
                  .priceCents,
              })),
            },
          },
          include: {
            items: {
              include: {
                menuItem: true,
              },
            },
          },
        });
      });
    }),
  getById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.order.findFirst({
        where: {
          id: input,
          sessionId: ctx.session.id,
        },
      });
    }),
  getAll: kitchenProcedure.query(async ({ ctx }) => {
    return ctx.db.order.findMany({
      where: {
        status: {
          in: [
            OrderStatus.SUBMITTED,
            OrderStatus.CONFIRMED,
            OrderStatus.PREPARING,
          ],
        },
      },
      orderBy: {
        queuePosition: "asc",
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }),
  updateStatus: kitchenProcedure
    .input(
      z.object({}).extend({
        orderId: z.number(),
        status: z.nativeEnum(OrderStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
      });
      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      return ctx.db.order.update({
        where: { id: input.orderId },
        data: {
          status: input.status,
        },
      });
    }),
});
