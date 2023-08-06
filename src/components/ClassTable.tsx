// import { Table } from "@mantine/core";
// import { useRouter } from "next/router";
// import { type RouterOutputs } from "~/utils/api";

// type CourseTableProps = {
//   courses?: RouterOutputs["course"]["get"];
// };

// export function ClassTable({ courses }: CourseTableProps) {
//   const router = useRouter();

//   async function handleRoute(id: string) {
//     await router.push(`/course/${id}`);
//   }

//   const rows = courses?.map((course) => (
//     <tr
//       style={{ cursor: "pointer" }}
//       onClick={() => void handleRoute(course.id)}
//       key={course.name}
//     >
//       <td>{course.name}</td>
//       <td>{course.gradeLevel}</td>
//       <td>{course.numberOfStudents}</td>
//       <td>{course.day}</td>
//     </tr>
//   ));

//   return (
//     <>
//       {courses?.length === 0 ? (
//         <div>No courses found. Create one to get started!</div>
//       ) : (
//         <Table verticalSpacing="md" highlightOnHover>
//           <thead>
//             <tr>
//               <th>Course Name</th>
//               <th>Grade Level</th>
//               <th>Number of Students</th>
//               <th>Day</th>
//             </tr>
//           </thead>
//           <tbody>{rows}</tbody>
//         </Table>
//       )}
//     </>
//   );
// }
