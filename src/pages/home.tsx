import { api } from "~/utils/api";
import { Button } from "@mantine/core";
import { ClassTable } from "~/components/ClassTable";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const userName = session?.user.name?.split(" ")[0];
  const classQuery = api.class.get.useQuery();

  if (classQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1>Welcome {userName}</h1>
      <Button
        component="a"
        href="/create/class"
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a class
      </Button>
      <div>
        <ClassTable classes={classQuery?.data} />
      </div>
    </div>
  );
}
