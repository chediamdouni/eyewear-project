import { cn } from "@/lib/utils";
import * as React from "react";

type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "small"
  | "caption"
  | "label";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

const variantStyles: Record<TextVariant, string> = {
  display: "font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl",
  h1: "font-display text-3xl tracking-tight sm:text-4xl md:text-5xl",
  h2: "font-display text-2xl tracking-tight md:text-3xl",
  h3: "font-display text-lg leading-tight tracking-tight",
  body: "text-sm leading-relaxed",
  small: "text-[12px] leading-relaxed",
  caption: "text-[11px] uppercase tracking-[0.3em]",
  label: "text-[11px] uppercase tracking-[0.28em]",
};

const variantElements: Record<TextVariant, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "p",
  caption: "p",
  label: "p",
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = "body", as, className, children, ...props }, ref) => {
    const Component = as || variantElements[variant];
    const baseStyles = variantStyles[variant];

    return (
      <Component ref={ref} className={cn(baseStyles, className)} {...props}>
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
