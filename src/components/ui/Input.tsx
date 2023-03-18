type InputProps = {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | "warning" | "link";
  size?: "sm" | "md" | "lg";
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export function Input({
  className = "",
  variant = "primary",
  size = "md",
  inputProps,
}: InputProps) {
  return (
    <input className={`${className} ${variant} ${size}`} {...inputProps} />
  );
}

function getVariantClass(variant: string) {
  switch (variant) {
    case "":
      return "";
    case "":
      return "";
  }
}
