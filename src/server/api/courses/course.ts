"use server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/server/db";

export async function fetchUserCourses() {
  const user = await getCurrentUser();

  const getAll = await prisma.course.findMany({
    where: {
      user: {
        id: user?.id,
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
    throw new Error("No courses found");
  }

  return getAll;
}
