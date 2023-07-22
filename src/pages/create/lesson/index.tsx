import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import { Editor } from "~/components/Editor";
import { MainLayout } from "~/layout/MainLayout";
import { getServerSideProps } from "~/pages/serverProps";

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

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
