import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { Sidebar } from "~/components/Sidebar";

export default function Page() {
  const postMutation = api.post.create.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Post created successfully",
        color: "green",
      });
    },
  });

  return (
    <>
      <Sidebar />
      <Editor postMutation={postMutation} />
    </>
  );
}
