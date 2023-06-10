import { api } from "~/utils/api";
import { Loader } from "@mantine/core";
import { ClassTable } from "~/components/ClassTable";
import { useSession } from "next-auth/react";
import { MainLayout } from "~/layout/MainLayout";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();
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
      <h1>Welcome {userName}</h1>
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
