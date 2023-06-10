import { Button, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { LessonPlanTable } from "~/components/LessonPlanTable";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;

  const lessonPlanQuery = api.lessonPlan.find.useQuery(
    { id },
    { enabled: !!id }
  );

  const classQuery = api.class.find.useQuery({ classId: id });

  if (lessonPlanQuery.isLoading || classQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader color="green" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">{classQuery.data?.name}</h1>
      <Button
        component="a"
        href={`/create/lesson/${id}/new`}
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a Lesson Plan
      </Button>

      <LessonPlanTable lessons={lessonPlanQuery.data} />
    </div>
  );
}
