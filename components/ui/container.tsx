import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const sizeClasses = {
    default: "container-shell",
    wide: "container-shell max-w-7xl",
    narrow: "container-shell max-w-3xl",
  };

  return <div className={cn(sizeClasses[size], className)}>{children}</div>;
}
