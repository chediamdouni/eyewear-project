import { cn } from "@/lib/utils";

export function SectionContainer({
  children,
  className,
  spacing = "default",
}: {
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "loose";
}) {
  const spacingClasses = {
    default: "space-y-16 md:space-y-20",
    tight: "space-y-12 md:space-y-16",
    loose: "space-y-20 md:space-y-24",
  };

  return <div className={cn(spacingClasses[spacing], className)}>{children}</div>;
}
