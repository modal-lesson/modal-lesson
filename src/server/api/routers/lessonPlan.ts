import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lessonPlanRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      const lessonPlan = await ctx.prisma.lessonPlan.findUnique({
        where: {
          id: input.id,
        },
        include: {
          course: true,
        },
      });

      // Other users can't view this lesson plan if it doesn't belong to them
      if (lessonPlan?.course?.userId !== user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this lesson plan",
        });
      }

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
      const course = await ctx.prisma.course.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          lessonPlans: true,
        },
      });

      const lessonPlanIds = course?.lessonPlans.map((lessonPlan) => {
        return lessonPlan.id;
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
        courseId: z.string(),
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
          course: {
            connect: {
              id: input.courseId,
            },
          },
        },
      });

      return post;
    }),
});
