"use client";

import Image from "next/image";
import Link from "next/link";
import { type Variants } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative grid h-[90vh] grid-cols-1 gap-4 px-4 md:h-[90vh] md:grid-cols-2 md:px-10 lg:px-20">
      {/* Men's Collection - Left Side */}
      <FadeIn
        variants={heroImageVariants}
        className="group relative overflow-hidden rounded-xl  bg-zinc-950/80 backdrop-blur-sm shadow-[0_8px_10px_rgba(15,23,42,0.65)]"
      >
        <Link
          href="/collection/homme"
          className="relative block h-full w-full"
          aria-label="Collection Homme"
        >
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.28),transparent_60%)]" />
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-100/80">
              Collection Homme
            </p>
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.18em] text-white md:text-5xl lg:text-6xl">
              Homme
            </h2>
            <div className="mt-5 h-px w-16 bg-amber-200/80" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-100/85">
              Montures aux lignes nettes, silhouettes sobres et détails précis pour une
              présence discrète au quotidien.
            </p>
          </div>
          <Image
            src="/images/model-homme.jpg"
            alt="Collection Homme - Clevards Eyewear"
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-110"
            priority
          />
        </Link>
      </FadeIn>

      {/* Women's Collection - Right Side */}
      <FadeIn
        variants={heroImageVariants}
        className="group relative overflow-hidden rounded-xl  bg-zinc-950/80 backdrop-blur-sm shadow-[0_8px_10px_rgba(15,23,42,0.65)]"
      >
        <Link
          href="/collection/femme"
          className="relative block h-full w-full"
          aria-label="Collection Femme"
        >
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.28),transparent_60%)]" />
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/45 via-black/10 to-black/70" />
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-100/80">
              Collection Femme
            </p>
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.18em] text-white md:text-5xl lg:text-6xl">
              Femme
            </h2>
            <div className="mt-5 h-px w-16 bg-amber-200/80" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-100/85">
              Verres lumineux, silhouettes souples et finitions tactiles pour une présence
              douce mais affirmée.
            </p>
          </div>
          <Image
            src="/images/model-femme.jpg"
            alt="Collection Femme - Clevards Eyewear"
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-110"
            priority
          />
        </Link>
      </FadeIn>
    </section>
  );
}
