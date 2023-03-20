import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | "warning" | "link";
  inputSize?: "xs" | "sm" | "md" | "lg";
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

export function Input({
  name,
  className = "",
  variant = "primary",
  inputSize = "md",
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={name}></label>
      <input
        id={name}
        className={`${className} ${getVariantClass(variant)} ${getSizeClass(
          inputSize
        )}`}
        {...rest}
      ></input>
    </div>
  );
}

function getVariantClass(variant: string) {
  switch (variant) {
    case "":
      return "";
    case "primary":
    default:
      return "bg-base-100 rounded-lg border-2 border-black focus:outline-none focus:border-primary focus:ring-red-500 placeholder-neutral";
  }
}

function getSizeClass(size: string) {
  switch (size) {
    case "xs":
      return "p-2";
    case "":
      return "";
    case "md":
    default:
      return "p-3";
  }
}
