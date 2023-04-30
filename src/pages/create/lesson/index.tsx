import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import { Editor } from "~/components/Editor";

export default function Page() {
  const lessonPlanMutation = api.lessonPlan.create.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Post created successfully",
        color: "green",
      });
    },
  });

  return (
    <div>
      <p>Creating a lesson plan for</p>
      <Editor lessonPlanMutation={lessonPlanMutation} />
    </div>
  );
}
