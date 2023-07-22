import { api } from "~/utils/api";
import { Loader } from "@mantine/core";
import { ClassTable } from "~/components/ClassTable";
import { MainLayout } from "~/layout/MainLayout";
import Link from "next/link";
import { type Session } from "next-auth";
import { getServerSideProps } from "./serverProps";

export default function Page({ session }: { session: Session }) {
  const userName = session?.user.name?.split(" ")[0];
  const classQuery = api.class.get.useQuery();

  if (classQuery.isLoading) {
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
        href="/create/class"
      >
        Create a class
      </Link>

      <div>
        <ClassTable classes={classQuery?.data} />
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
