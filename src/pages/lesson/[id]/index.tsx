import { Anchor, Breadcrumbs } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const lessonPlanQuery = api.lessonPlan.findOne.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  if (lessonPlanQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BreadcrumbsItems
        title={lessonPlanQuery?.data?.title}
        lessonPlanId={lessonPlanQuery?.data?.id}
        classId={lessonPlanQuery?.data?.classes[0]?.classId}
      />

      <h1>Lesson Plan title: {lessonPlanQuery?.data?.title}</h1>
      {/** Eventually set HTML */}
      <p>{lessonPlanQuery?.data?.content}</p>
    </div>
  );
}

function BreadcrumbsItems({
  title,
  lessonPlanId,
  classId,
}: {
  title?: string;
  lessonPlanId?: string;
  classId?: string;
}) {
  const items = [
    { title: "Home", href: "/home" },
    { title: "Class", href: `/class/${classId as string}` },
    {
      title: `${title as string}`,
      href: `${lessonPlanId as string}`,
    },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
}
