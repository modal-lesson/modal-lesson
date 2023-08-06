import { getCurrentUser } from "@/lib/session";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <header className="flex p-5 items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-4">
          <span>LOGO</span>
          <MainNav />
        </div>
        <div className="flex items-center gap-4">
          <Search />
          <UserNav user={user} />
        </div>
      </header>
      {children}
    </>
  );
}
