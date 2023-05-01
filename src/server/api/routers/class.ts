import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { Day } from "@prisma/client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TRPCError } from "@trpc/server";

dayjs.extend(customParseFormat);

export const classRouter = createTRPCRouter({
  find: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ ctx, input }) => {
      const findClass = await ctx.prisma.class.findUnique({
        where: {
          id: input.classId,
        },
      });

      if (!findClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class not found",
        });
      }

      return findClass;
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    //TODO: Pagination
    const getAll = await ctx.prisma.class.findMany({
      where: {
        user: {
          id: ctx?.session?.user.id,
        },
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
    .input(
      z.object({
        name: z.string(),
        gradeLevel: z.string(),
        numberOfStudents: z.number(),
        classStartDate: z.date(),
        classEndDate: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        day: z.nativeEnum(Day),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: startTime and endTime gets the job done but explore if there's a better way
      const createClass = await ctx.prisma.class.create({
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

      return createClass;
    }),
});
