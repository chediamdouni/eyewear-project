'use client';

import * as React from "react";
import { motion, type Transition, type Variants } from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Reveal({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  viewportMargin = "-10% 0px -20% 0px",
  custom,
  transition,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  viewportMargin?: string;
  custom?: number;
  transition?: Transition;
  as?: React.ElementType;
}) {
  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
      custom={custom}
      transition={transition || { delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

