import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { LessonPlanTable } from "~/components/LessonPlanTable";
import { MainLayout } from "~/layout/MainLayout";
import { api } from "~/utils/api";
import { getServerSideProps } from "~/server/serverProps";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export default function Page() {
  const [queryError, setQueryError] = useState("");
  const router = useRouter();
  const id = router.query.id as string;

  const lessonPlanQuery = api.lessonPlan.find.useQuery(
    { id },
    { enabled: !!id }
  );

  const courseQuery = api.course.find.useQuery(
    { courseId: id },
    {
      onError: (error) => {
        if (error instanceof TRPCClientError) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          setQueryError(error?.shape?.message);
        }
      },
      enabled: !!id,
    }
  );

  if (lessonPlanQuery.isLoading || courseQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader color="green" />
      </div>
    );
  }

  if (courseQuery.isError) {
    return <p>{queryError}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">{courseQuery.data?.name}</h1>
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
