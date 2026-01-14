'use client';

import Image from "next/image";
import Link from "next/link";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { FadeIn } from "@/components/motion/fade-in";

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 },
  },
};

export function Hero() {
  return (
    <section className="grid gap-10 md:luxury-grid md:items-end">
      <FadeIn variants={heroTextVariants} className="space-y-10">
        <Text variant="caption" className="text-muted-foreground">
          Clevards Eyewear / 2026 Collection
        </Text>
        <div className="space-y-6">
          <Text variant="display" className="text-foreground">
            Clarity,
            <span className="block text-muted-foreground">
              captured in glass.
            </span>
          </Text>
          <Text variant="body" className="max-w-lg text-muted-foreground">
            Precision-crafted frames that disappear in weight but not in
            presence. Made for those who move quietly, but never unnoticed.
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="#collection">Explore the collection</Link>
          </Button>
          <Text
            variant="caption"
            className="text-muted-foreground/80 tracking-[0.26em]"
          >
            Optical &amp; sun / Handmade in small runs
          </Text>
        </div>
      </FadeIn>

      <FadeIn
        variants={heroImageVariants}
        className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-slate-100/6 via-slate-50/2 to-slate-900/40 shadow-subtle"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,255,0.12),_transparent_55%)]" />
        <Image
          src="/clevards-hero.jpg"
          alt="Clevards acetate optical frame on a glass plinth"
          fill
          className="object-cover object-center mix-blend-screen opacity-80"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground/90">
          <p>Modern Craft / Tokyo · Berlin · Paris</p>
          <p>Anti–glare optics · Hand–finished edges</p>
        </div>
      </FadeIn>
    </section>
  );
}

