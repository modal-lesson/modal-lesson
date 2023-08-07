import { Day } from "@prisma/client";
import * as z from "zod";

export const courseFormSchema = z.object({
  courseName: z.string().nonempty(),
  gradeLevel: z.string().nonempty(),
  numberOfStudents: z.coerce.number(),
  courseStartDate: z.coerce.date(),
  courseEndDate: z.coerce.date(),
  courseStartTime: z.string(),
  courseEndTime: z.string(),
  day: z.nativeEnum(Day),
});

export type CourseFormSchema = z.infer<typeof courseFormSchema>;
