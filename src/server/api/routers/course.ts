import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TRPCError } from "@trpc/server";
import { createCourseValidator } from "~/lib/validator";

dayjs.extend(customParseFormat);

export const courseRouter = createTRPCRouter({
  find: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      const findCourse = await ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
      });

      if (findCourse?.userId !== user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized to access this course",
        });
      }

      if (!findCourse) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class not found",
        });
      }

      return findCourse;
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    //TODO: Pagination
    const getAll = await ctx.prisma.course.findMany({
      where: {
        user: {
          id: ctx?.session?.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        gradeLevel: true,
        numberOfStudents: true,
        day: true,
      },
    });

    if (!getAll) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No classes found",
      });
    }

    return getAll;
  }),
  create: protectedProcedure
    .input(createCourseValidator)
    .mutation(async ({ ctx, input }) => {
      // TODO: startTime and endTime gets the job done but explore if there's a better way
      const createCourse = await ctx.prisma.course.create({
        data: {
          ...input,
          startTime: dayjs(input.startTime, "HH:mm").toDate(),
          endTime: dayjs(input.endTime, "HH:mm").toDate(),
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return createCourse;
    }),

  delete: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.course.delete({
        where: {
          id: input.courseId,
        },
      });
    }),
});
