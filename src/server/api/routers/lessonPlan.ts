import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lessonPlanRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const lessonPlan = await ctx.prisma.lessonPlan.findUnique({
        where: {
          id: input.id,
        },
        include: {
          classes: true,
        },
      });

      return lessonPlan;
    }),
  find: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        lessonPlanId: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userClass = await ctx.prisma.class.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          lessonPlans: true,
        },
      });

      const lessonPlanIds = userClass?.lessonPlans.map((lessonPlan) => {
        return lessonPlan.lessonPlanId;
      });

      const lessonPlans = await ctx.prisma.lessonPlan.findMany({
        where: {
          id: { in: lessonPlanIds },
        },
        select: {
          id: true,
          title: true,
          content: true,
        },
      });

      return lessonPlans;
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        classId: z.string(),
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
          classes: {
            create: {
              class: {
                connect: {
                  id: input.classId,
                },
              },
            },
          },
        },
      });

      return post;
    }),
});
