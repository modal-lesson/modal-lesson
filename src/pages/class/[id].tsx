import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;

  const lessonPlanQuery = api.lessonPlan.find.useQuery(
    { id },
    { enabled: !!id }
  );

  if (lessonPlanQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Class {id}</h1>
      <Button
        component="a"
        href={`/create/lesson/${id}/new`}
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a Lesson Plan
      </Button>

      {lessonPlanQuery.data?.map((lesson) => (
        <div key={lesson.id}>
          <h2>Lesson Title: {lesson.title}</h2>
        </div>
      ))}
    </div>
  );
}
