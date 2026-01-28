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
    <section className="mt-20 md:mt-32 px-4 md:px-6">
      <div className="mb-8">
        <Text variant="h2" className="mb-3 text-foreground">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lensTypes.map((lens, index) => (
          <FadeIn
            key={lens.id}
            delay={index * 0.1}
            className="group relative overflow-hidden rounded-lg"
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
                    "rounded-full bg-white px-6 py-2 text-sm font-medium text-foreground",
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
    </section>
  );
}

