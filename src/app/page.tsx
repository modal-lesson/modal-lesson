import type { Metadata } from "next";
import { SignIn } from "./sign-in";

export const metadata: Metadata = {
  title: "Modal Lesson",
  description: "An easy way to manage your lesson plans",
};

export default function Page() {
  return (
    <main>
      <p>Landing page</p>
      <SignIn />
    </main>
  );
}
