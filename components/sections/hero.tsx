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
    <section className="grid h-screen grid-cols-1 md:grid-cols-2">
      {/* Men's Collection - Left Side */}
      <FadeIn variants={heroImageVariants} className="group relative overflow-hidden">
        <Link
          href="/collections/homme"
          className="relative block h-full w-full"
          aria-label="Collection Homme"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.2em] text-white md:text-5xl lg:text-6xl">
              Homme
            </h2>
            <div className="mt-4 h-px w-16 bg-white/60" />
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
      <FadeIn variants={heroImageVariants} className="group relative overflow-hidden">
        <Link
          href="/collections/femme"
          className="relative block h-full w-full"
          aria-label="Collection Femme"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <h2 className="font-display text-4xl font-light uppercase tracking-[0.2em] text-white md:text-5xl lg:text-6xl">
              Femme
            </h2>
            <div className="mt-4 h-px w-16 bg-white/60" />
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
