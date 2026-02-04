"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const lensTypes = [
  {
    id: "blue-light",
    name: "Anti-lumière bleue",
    image: "/images/bluee.png",
    href: "/collections/blue-light",
  },
  {
    id: "photochromatique",
    name: "Photochromatique",
    image: "/images/photochromatique.png",
    href: "/collections/photochromatique",
  },
  {
    id: "anti-fatigue",
    name: "Anti-fatigue",
    image: "/images/anti-fatigue.png",
    href: "/collections/anti-fatigue",
  },
  {
    id: "light-responsive",
    name: "Sensibles à la lumière",
    image: "/images/sensible-lumiere.png",
    href: "/collections/light-responsive",
  },
];

export function LensTypes() {
  return (
    <section className="mt-24 md:mt-40 px-4 md:px-10 xl:px-20">
      <div className="mb-10 md:mb-12">
        <Text
          variant="caption"
          className="mb-2 text-[11px] font-medium tracking-[0.3em] uppercase text-amber-900/70"
        >
          Verres &amp; usages
        </Text>
        <Text variant="h2" className="mb-3 text-foreground text-3xl md:text-4xl lg:text-5xl">
          Choisissez vos montures par type de verres
        </Text>
        <Text variant="body" className="text-muted-foreground">
          Besoin d&apos;aide pour choisir ?{" "}
          <Link
            href="/guide"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Découvrez quel verre vous convient le mieux dans notre guide.
          </Link>
        </Text>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white/40 backdrop-blur-xl px-4 py-6 md:px-8 md:py-10 shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lensTypes.map((lens, index) => (
            <FadeIn
              key={lens.id}
              delay={index * 0.1}
              className="group relative overflow-hidden rounded-2xl bg-amber-50/40 border border-amber-100/70 shadow-sm"
            >
              <Link href={lens.href} className="relative block aspect-[4/5] w-full">
                <Image
                  src={lens.image}
                  alt={lens.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-4">
                  <span
                    className={cn(
                      "rounded-full border border-black/5 bg-white/90 px-6 py-2 text-xs font-medium tracking-wide text-neutral-900",
                      "shadow-sm transition-transform duration-200 group-hover:scale-105",
                    )}
                  >
                    {lens.name}
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

