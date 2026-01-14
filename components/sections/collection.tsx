'use client';

import Image from "next/image";
import Link from "next/link";
import { type Variants } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/motion/reveal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Collection() {
  return (
    <section id="collection" className="mt-20 md:mt-24">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <Text variant="caption" className="text-muted-foreground">
            Featured collection
          </Text>
          <Text variant="h2" className="mt-4 text-foreground">
            Frames for edited lives.
          </Text>
        </div>
        <Text
          variant="small"
          className="hidden max-w-xs leading-relaxed text-muted-foreground md:block"
        >
          A tightly curated set of optical and sun silhouettes, produced in
          deliberate quantities and released only when the details feel
          inevitable.
        </Text>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <Reveal
            key={product.slug}
            custom={index}
            variants={cardVariants}
            viewportMargin="-10% 0px -20% 0px"
            as="article"
            className="group relative flex flex-col overflow-hidden rounded-[26px] border border-border/60 bg-card/60 shadow-subtle backdrop-blur-xl"
          >
            <div className="flex flex-1 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.18),_transparent_60%)] opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-5 pb-4 pt-4">
                <div className="space-y-1.5">
                  <Text variant="caption" className="text-muted-foreground tracking-[0.26em]">
                    {product.slug}
                  </Text>
                  <Text variant="h3" className="text-foreground">
                    {product.name}
                  </Text>
                  <Text variant="small" className="text-muted-foreground line-clamp-3">
                    {product.tagline}
                  </Text>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>{product.price}</span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 text-[10px] tracking-[0.28em]"
                  >
                    View details
                    <span className="h-px w-9 bg-muted-foreground/80 transition-all group-hover:w-14 group-hover:bg-accent" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

