import { getCurrentUser } from "@/lib/session";
import { AuthForm } from "./AuthForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm />
    </div>
  );
}
