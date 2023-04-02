import { useSession } from "next-auth/react";
import { Sidebar } from "~/components/Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <div className="flex">
      <Sidebar session={session} />
      {children}
    </div>
  );
}
