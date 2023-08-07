import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/server/db";
import { courseFormSchema } from "@/validation/course";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { NextRequest, NextResponse } from "next/server";

// format: "HH:mm",
dayjs.extend(customParseFormat);

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You are not authorized to create a course.");
  }

  try {
    const body = await req.json();

    const {
      courseEndDate,
      courseEndTime,
      courseName,
      courseStartDate,
      courseStartTime,
      gradeLevel,
      numberOfStudents,
      day,
    } = courseFormSchema.parse(body);

    await prisma.course.create({
      data: {
        name: courseName,
        courseStartDate,
        courseEndDate,
        day,
        gradeLevel,
        numberOfStudents,
        startTime: dayjs(courseStartTime, "HH:mm").toDate(),
        endTime: dayjs(courseEndTime, "HH:mm").toDate(),
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json("Success", { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return NextResponse.json("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
