import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        available: z.boolean().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.menuItem.findMany({
        where: {
          ...(input?.categoryId && { categoryId: input.categoryId }),
          ...(input?.available && { available: input.available }),
        },
        include: {
          category: true,
        },
        orderBy: [
          {
            category: {
              displayOrder: "asc",
            },
          },
          {
            name: "asc",
          },
        ],
      });
    }),
  getCategories: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findMany({
        where: {
          ...(input?.type && { type: input.type }),
        },
        orderBy: {
          displayOrder: "asc",
        },
      });
    }),
  getById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const item = await ctx.db.menuItem.findUnique({
        where: { id: input },
        include: {
          category: true,
        },
      });
      if (!item) {
        throw new TRPCError({ code: 'NOT_FOUND', message: `Menu item with id ${input} not found` });
      }
      return item;
    }),
});
