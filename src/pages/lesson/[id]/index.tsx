import { Breadcrumbs, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import sanitizeHtml from "sanitize-html";
import { MainLayout } from "~/layout/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { getServerSideProps } from "~/server/serverProps";

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
    return (
      <div className="flex justify-center items-center h-full">
        <Loader color="green" />
      </div>
    );
  }

  if (lessonPlanQuery.isError) {
    return <div>Something weng wrong..</div>;
  }

  const sanitizeContent = sanitizeHtml(lessonPlanQuery?.data?.content ?? "");

  return (
    <div>
      <BreadcrumbsItems
        title={lessonPlanQuery?.data?.title}
        lessonPlanId={lessonPlanQuery?.data?.id}
        classId={lessonPlanQuery?.data?.classes[0]?.classId}
      />

      <h1>Lesson Plan title: {lessonPlanQuery?.data?.title}</h1>
      <div
        className="sanitize-container"
        dangerouslySetInnerHTML={{ __html: sanitizeContent }}
      />
    </div>
  );
}

// Create Generic Breadcrumbs component and adjust as needed

function BreadcrumbsItems({
  title,
  lessonPlanId,
  classId,
}: {
  title?: string;
  lessonPlanId?: string;
  classId?: string;
}) {
  const [activeLink, setActiveLink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === `/lesson/${lessonPlanId as string}`) {
      setActiveLink(true);
    }
  }, [router, lessonPlanId]);

  const items = [
    { title: "Home", href: "/home", activeLink },
    { title: "Class", href: `/class/${classId as string}`, activeLink },
    {
      title: `${title as string}`,
      href: `${lessonPlanId as string}`,
      activeLink,
    },
  ].map((item, index) => (
    <Link
      key={index}
      className={cn(
        ` hover:text-primary underline underline-offset-4 ${
          item.activeLink && item.title === title
            ? "text-white"
            : "text-secondary"
        }`
      )}
      href={item.href}
    >
      {item.title}
    </Link>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
