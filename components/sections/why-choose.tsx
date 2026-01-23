"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { Text } from "@/components/ui/text";

export function WhyChoose() {
  return (
    <section className="mt-20 md:mt-32">
      {/* Title and Description - Centered */}
      <FadeIn className="mb-12 text-center md:mb-16">
        <Text variant="h2" className="mb-4 text-foreground">
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
      <FadeIn className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
        <Image
          src="/images/affiche2.png"
          alt="Clevard Eyewear - Artisanat et Qualité"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </FadeIn>
    </section>
  );
}
