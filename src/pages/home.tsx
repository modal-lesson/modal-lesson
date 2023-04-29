import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";

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
      <h1>Welcome blah</h1>
      <Button
        component="a"
        href="/create"
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a Lesson Plan
      </Button>
      <Editor lessonPlanMutation={lessonPlanMutation} />
    </div>
  );
}
