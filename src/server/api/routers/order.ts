import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { Decimal } from "@prisma/client/runtime/library";
import { OrderStatus } from "@prisma/client";

// Create order, get orders for kitchen, update order status

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      items: z.array(
        z.object({
          id: z.number(),
          quantity: z.number().min(1),
        })
      ),
    })).mutation(async ({ ctx, input }) => {
      const menuItems = await ctx.db.menuItem.findMany({
        where: {
          id: { in: input.items.map((item) => item.id) },
          available: true
        },
      });

      if (menuItems.length !== input.items.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "One or more menu items are not available",
        });
      }

      const total = input.items.reduce((sum, item) => {
        const menuItem = menuItems.find(mi => mi.id === item.id);
        return sum.add(menuItem!.price.mul(item.quantity));
      }, new Decimal(0)); // TEST: Ensure no precision loss

      const maxPosition = await ctx.db.order.aggregate({
        _max: { queuePosition: true },
        where: {
          status: {
            in: [OrderStatus.SUBMITTED, OrderStatus.CONFIRMED,
            OrderStatus.PREPARING]
          }
        }
      }) ?? 0;

      const queuePosition = (maxPosition._max.queuePosition ?? 0) + 1;

      const order = await ctx.db.order.create({
        data: {
          sessionId: ctx.session.id,
          seatNumber: ctx.session.seatNumber,
          total: total,
          queuePosition: queuePosition,
          items: {
            create: input.items.map((item) => ({
              menuItemId: item.id,
              quantity: item.quantity,
              priceSnapshot: menuItems.find(mi => mi.id === item.id)!.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });
      return order;
    }),
});
