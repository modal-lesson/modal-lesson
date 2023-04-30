import { Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <h1>Class {id}</h1>
      <Button
        component="a"
        href={`/create/lesson/${id}/new`}
        className="!bg-primary hover:!bg-primary-hover"
      >
        Create a Lesson Plan
      </Button>
    </div>
  );
}
