'use client';

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PageContainer } from "./page-container";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pb-20 pt-24 md:pt-28"
      >
        <PageContainer>{children}</PageContainer>
      </motion.main>
    </AnimatePresence>
  );
}

