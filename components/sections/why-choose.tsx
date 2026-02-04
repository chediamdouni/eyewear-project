"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { Text } from "@/components/ui/text";

export function WhyChoose() {
  return (
    <section className="mt-24 md:mt-40 px-4 md:px-10 xl:px-20">
      {/* Title and Description - Centered */}
      <FadeIn className="mb-12 text-center md:mb-16">
        <Text
          variant="caption"
          className="mb-3 text-[11px] font-medium tracking-[0.3em] uppercase text-amber-900/70"
        >
          Une optique pensée comme un soin
        </Text>
        <Text
          variant="h2"
          className="mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl tracking-tight"
        >
          Pourquoi choisir Clevard Eyewear
        </Text>
        <Text
          variant="body"
          className="mx-auto max-w-2xl text-center text-muted-foreground"
        >
          Clevards allie artisanat traditionnel et design contemporain pour créer des
          montures qui transcendent les tendances. Chaque paire est pensée pour ceux qui
          valorisent la qualité, l&apos;élégance discrète et la durabilité. Découvrez une
          nouvelle façon de voir le monde, avec des lunettes qui s&apos;adaptent à votre
          style de vie, pas l&apos;inverse.
        </Text>
      </FadeIn>

      {/* Full Screen Image */}
      <FadeIn className="relative h-[60vh] w-full overflow-hidden rounded-3xl border border-black/5 bg-zinc-950/90 backdrop-blur-xl md:h-[80vh] shadow-[0_32px_120px_rgba(15,23,42,0.55)]">
        <Image
          src="/images/affiche2.png"
          alt="Clevard Eyewear - Artisanat et Qualité"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
        {/* <div className="absolute left-6 bottom-8 max-w-md rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-left text-sm leading-relaxed text-zinc-50/90 backdrop-blur-2xl shadow-lg md:left-10 md:bottom-12">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-100/85">
            Lumière, matière, confort
          </p>
          <p>
            Des silhouettes inspirées des studios de soins de la peau&nbsp;: lignes épurées,
            transparences maîtrisées et reflets ambrés qui composent une expérience
            chaleureuse, tactile et quotidienne.
          </p>
        </div> */}
      </FadeIn>
    </section>
  );
}
