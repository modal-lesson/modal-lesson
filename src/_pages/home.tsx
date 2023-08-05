import { api } from "~/utils/api";
import { Loader } from "@mantine/core";
import { ClassTable } from "~/components/ClassTable";
import { MainLayout } from "~/layout/MainLayout";
import Link from "next/link";
import { type Session } from "next-auth";
import { getServerSideProps } from "../server/serverProps";

export default function Page({ session }: { session: Session }) {
  const userName = session?.user.name?.split(" ")[0];
  const courseQuery = api.course.get.useQuery();

  if (courseQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader color="green" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-5">Welcome {userName}</h1>
      <Link
        className="w-full bg-primary text-white text-sm font-bold px-4 py-3 rounded-md hover:!bg-primary-hover"
        href="/create/course"
      >
        Create a course
      </Link>

      <div>
        <ClassTable courses={courseQuery?.data} />
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
