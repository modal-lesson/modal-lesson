import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import { type RouterOutputs } from "~/utils/api";

type ClassTableProps = {
  lessons?: RouterOutputs["lessonPlan"]["find"];
};

export function LessonPlanTable({ lessons }: ClassTableProps) {
  const router = useRouter();

  async function handleRoute(id: string) {
    await router.push(`/lesson/${id}`);
  }

  const rows = lessons?.map((lesson) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => void handleRoute(lesson.id)}
      key={lesson.id}
    >
      <td>{lesson.title}</td>
      <td>{lesson.content}</td>
    </tr>
  ));

  return (
    <>
      {lessons?.length === 0 ? (
        <div>No classes found. Create one to get started!</div>
      ) : (
        <Table verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>Lesson Plan Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </>
  );
}
