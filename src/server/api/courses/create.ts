// "use server";

// import { getCurrentUser } from "@/lib/session";
// import { prisma } from "@/server/db";
// import dayjs from "dayjs";

// export async function createCourse() {
//   const user = await getCurrentUser();
//   const createCourse = await prisma.course.create({
//     data: {
//       ...input,
//       startTime: dayjs(input.startTime, "HH:mm").toDate(),
//       endTime: dayjs(input.endTime, "HH:mm").toDate(),
//       user: {
//         connect: {
//           id: user?.id,
//         },
//       },
//     },
//   });

//   return createCourse;
// }
