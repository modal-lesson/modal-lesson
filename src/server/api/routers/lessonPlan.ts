import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lessonPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.lessonPlan.create({
        data: {
          title: input.title,
          content: input.content,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return post;
    }),
});
