import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modal Lesson",
  description: "An easy way to manage your lesson plans",
};

export default async function Page() {
  return (
    <main>
      <p>Landing page</p>
    </main>
  );
}
