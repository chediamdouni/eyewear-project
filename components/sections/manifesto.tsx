'use client';

import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/motion/reveal";

export function Manifesto() {
  return (
    <section className="mt-20 border-t border-border/40 pt-10 md:mt-24 md:pt-12">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start">
        <Reveal
          viewportMargin="-10% 0px -10% 0px"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Text variant="caption" className="text-muted-foreground">
            Manifesto
          </Text>
        </Reveal>

        <Reveal
          viewportMargin="-10% 0px -20% 0px"
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-6"
        >
          <Text variant="body" className="text-muted-foreground">
            Clevards is built on a simple idea — that eyewear should sharpen
            more than your vision. It should tune the way you enter a room, the
            way you are remembered once you leave.
          </Text>
          <Text variant="body" className="text-muted-foreground">
            We work with small optical ateliers across Japan and Europe, pairing
            high-contrast lenses with measured silhouettes. No noise, no logos
            shouting for attention — just frames that hold their own next to a
            well-cut coat or a considered watch.
          </Text>
          <Text variant="body" className="text-muted-foreground">
            Every line, hinge and bevel is edited down until only what serves
            clarity remains.
          </Text>
        </Reveal>
      </div>
    </section>
  );
}

