import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex gap-2", className)} {...props}>
      <Link
        className="text-sm font-medium transition-colors hover:text-primary"
        href="/dashboard"
      >
        Home
      </Link>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        href="/plans"
      >
        My plans
      </Link>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        href="/calendar"
      >
        Calendar
      </Link>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        href="/dashboard/settings"
      >
        Settings
      </Link>
    </nav>
  );
}
