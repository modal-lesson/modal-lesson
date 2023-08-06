import { Container } from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modal Lesson - Dashboard",
  description: "An easy way to manage your lesson plans",
};

export default function Page() {
  return (
    <Container>
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </Container>
  );
}
