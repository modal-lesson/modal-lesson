import { Editor } from "~/components/Editor";
import { api } from "~/utils/api";

export default function Page() {
  const postMutation = api.post.create.useMutation();

  return <Editor postMutation={postMutation} />;
}
