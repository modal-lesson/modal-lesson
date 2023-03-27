import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //TODO connect user to author
      // author: { connect: { id: ctx.user.id } }
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });

      return post;
    }),
});
