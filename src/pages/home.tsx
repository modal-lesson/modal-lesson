// import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";
// import { notifications } from "@mantine/notifications";
// import { Button } from "@mantine/core";
import { ClassTable } from "~/components/ClassTable";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const userName = session?.user.name?.split(" ")[0];
  const classQuery = api.class.get.useQuery();

  // const lessonPlanMutation = api.lessonPlan.create.useMutation({
  //   onSuccess: () => {
  //     notifications.show({
  //       title: "Success",
  //       message: "Post created successfully",
  //       color: "green",
  //     });
  //   },
  // });

  if (classQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1>Welcome {userName}</h1>
      {/* <Button
        component="a"
        href="/create"
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a Lesson Plan
      </Button> */}
      <div>
        <ClassTable classes={classQuery?.data} />
      </div>
      {/* <Editor lessonPlanMutation={lessonPlanMutation} /> */}
    </div>
  );
}
