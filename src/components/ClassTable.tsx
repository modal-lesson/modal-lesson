import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import { type RouterOutputs } from "~/utils/api";

type ClassTableProps = {
  classes?: RouterOutputs["class"]["get"];
};

export function ClassTable({ classes }: ClassTableProps) {
  const router = useRouter();

  async function handleRoute(id: string) {
    await router.push(`/class/${id}`);
  }

  const rows = classes?.map((c) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => void handleRoute(c.id)}
      key={c.name}
    >
      <td>{c.name}</td>
      <td>{c.gradeLevel}</td>
      <td>{c.numberOfStudents}</td>
      <td>{c.day}</td>
    </tr>
  ));

  return (
    <>
      {classes?.length === 0 ? (
        <div>No classes found. Create one to get started!</div>
      ) : (
        <Table verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Grade Level</th>
              <th>Number of Students</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </>
  );
}
