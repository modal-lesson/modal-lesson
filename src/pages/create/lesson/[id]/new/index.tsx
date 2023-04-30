import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const classQuery = api.class.find.useQuery(
    { classId: id as string },
    { enabled: !!id }
  );
  const className = classQuery.data?.name;

  const lessonPlanMutation = api.lessonPlan.create.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Post created successfully",
        color: "green",
      });

      await router.push(`/class/${id as string}`);
    },
  });

  if (classQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lesson Plan</h1>
      <p>Creating a Lesson plan for: {className}</p>
      <Editor id={id as string} lessonPlanMutation={lessonPlanMutation} />
    </div>
  );
}
