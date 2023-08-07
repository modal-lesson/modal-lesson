import { env } from "@/env.mjs";
import { CourseFormSchema } from "@/validation/course";

export async function createCourse(data: CourseFormSchema) {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/course/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}
