import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { LessonPlanTable } from "~/components/LessonPlanTable";
import { MainLayout } from "~/layout/MainLayout";
import { api } from "~/utils/api";
import { getServerSideProps } from "~/server/serverProps";

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;

  const lessonPlanQuery = api.lessonPlan.find.useQuery(
    { id },
    { enabled: !!id }
  );

  const classQuery = api.class.find.useQuery(
    { classId: id },
    { enabled: !!id }
  );

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
      <Link
        className="w-full bg-primary text-white text-sm font-bold px-4 py-3 rounded-md hover:!bg-primary-hover"
        href={`/create/lesson/${id}/new`}
      >
        Create a Lesson Plan
      </Link>

      <LessonPlanTable lessons={lessonPlanQuery.data} />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
