import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | "warning" | "link";
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export function Button({
  className = "",
  variant = "primary",
  children,
  href,
  anchorProps,
  buttonProps,
}: ButtonProps) {
  if (href && variant === "link") {
    return (
      <Link
        className={`${className} ${getVariantClass(variant)}`}
        href={href}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${className} ${getVariantClass(variant)}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

//TODO: Spike out proper color variants
function getVariantClass(variant?: string) {
  switch (variant) {
    case "secondary":
      return "uppercase w-fit rounded-md px-4 py-2 bg-secondary text-white hover:bg-[#004a2b]";
    case "outline":
      return "uppercase w-fit rounded-md px-4 py-2 border border-primary hover:border-secondary";
    case "warning":
      return "uppercase text-yellow-400";
    case "danger":
      return "uppercase text-red-400";
    case "link":
      return "text-primary hover:text-secondary";
    case "primary":
    default:
      return "uppercase w-fit rounded-md px-4 py-2 bg-neutral text-white hover:bg-[#222222]";
  }
}
