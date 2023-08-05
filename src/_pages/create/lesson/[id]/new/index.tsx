import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import { MainLayout } from "~/layout/MainLayout";
import { getServerSideProps } from "~/server/serverProps";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const courseQuery = api.course.find.useQuery(
    { courseId: id as string },
    { enabled: !!id }
  );
  const courseName = courseQuery.data?.name;

  const lessonPlanMutation = api.lessonPlan.create.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Post created successfully",
        color: "green",
      });

      await router.push(`/course/${id as string}`);
    },
  });

  if (courseQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader color="green" />
      </div>
    );
  }

  return (
    <div>
      <h1>Lesson Plan</h1>
      <p>Creating a Lesson plan for: {courseName}</p>
      <Editor id={id as string} lessonPlanMutation={lessonPlanMutation} />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
