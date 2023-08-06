import { Container } from "@/components/Container";
import { getCurrentUser } from "@/lib/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchUserCourses } from "@/server/api/courses/course";
import { Courses } from "./course";

export const metadata: Metadata = {
  title: "Modal Lesson - Dashboard",
  description: "An easy way to manage your lesson plans",
};

export default async function Page() {
  const user = await getCurrentUser();
  const courses = await fetchUserCourses();

  if (!user) {
    redirect("/login?callback_url=/dashboard" || "/");
  }

  return (
    <Container>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex my-10">
        <Courses courses={courses} />
      </div>
    </Container>
  );
}
