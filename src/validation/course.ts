import * as z from "zod";

export const courseFormSchema = z.object({
  courseName: z.string(),
});

export type CourseFormSchema = z.infer<typeof courseFormSchema>;
