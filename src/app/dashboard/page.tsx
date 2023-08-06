import { Container } from "@/components/Container";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Modal Lesson - Dashboard",
  description: "An easy way to manage your lesson plans",
};

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callback_url=/dashboard" || "/");
  }

  return (
    <Container>
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </Container>
  );
}
