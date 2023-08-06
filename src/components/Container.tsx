import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("max-w-7xl mx-auto px-5 my-5", className)} {...props} />
  );
}
