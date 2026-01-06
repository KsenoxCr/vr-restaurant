import { PrismaClient } from "@prisma/client";
import { publicProcedure } from "../trpc";

type APIErrorDTO = {
  code: "UNATHORIZED" | "NOT_FOUND" | "BAD_REQUEST";
  message?: string;
};

type APIResult<T> = { ok: true; data: T } | { ok: false; error: APIErrorDTO };

type AnyQueryResolver = Parameters<typeof publicProcedure.query>[0];
type AnyMutationResolver = Parameters<typeof publicProcedure.mutation>[0];

type InferResolverOutput<R> = R extends (...args: any[]) => infer Out
  ? Awaited<Out>
  : never;
type InferResolverInput<R> = R extends (opts: infer In) => any ? In : never;

// TODO: Substitute auth middleware with this resolver wrapper:

export const withAuthDTOQuery = <R extends AnyQueryResolver>(handler: R) =>
  (async (opts: InferResolverInput<R>) => {
    if (!opts.ctx.session || opts.ctx.session.expiresAt < new Date()) {
      return {
        ok: false,
        error: {
          code: "UNATHORIZED",
        },
      } as const;
    }

    const data = await handler(opts);

    return { ok: true, data } as const;
  }) satisfies (
    opts: InferResolverInput<R>,
  ) => Promise<APIResult<InferResolverOutput<R>>>;
