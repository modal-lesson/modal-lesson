import { Day } from "@prisma/client";
import { z } from "zod";

export const createCourseValidator = z.object({
  name: z.string(),
  gradeLevel: z.string(),
  numberOfStudents: z.number(),
  classStartDate: z.date(),
  classEndDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  day: z.nativeEnum(Day),
});

export type CourseSchemaValidator = z.infer<typeof createCourseValidator>;
