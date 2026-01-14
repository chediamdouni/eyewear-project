'use client';

import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    label: "Materials",
    body: "Japanese acetates, beta-titanium and stainless steel sourced from optical suppliers, never fashion excess.",
  },
  {
    label: "Optics",
    body: "High-contrast, low-bloom lens profiles tuned for both screen fatigue and sun-lit commutes.",
  },
  {
    label: "Process",
    body: "Frames pass through over ninety human touchpoints, from tumbling and beveling to hand-polished rims.",
  },
];

export function Craft() {
  return (
    <section className="mt-20 md:mt-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
        <Reveal
          viewportMargin="-10% 0px -15% 0px"
          transition={{ duration: 0.7, ease: [0.21, 1, 0.34, 1] as const }}
          className="space-y-5"
        >
          <Text variant="caption" className="text-muted-foreground">
            Craft &amp; quality
          </Text>
          <Text variant="h2" className="text-foreground">
            Minimal lines, maximal calibration.
          </Text>
          <Text variant="body" className="max-w-md text-muted-foreground">
            Each Clevards frame is treated as an optical instrument first, a
            fashion object second. The result is a kind of luxury you feel over
            years, not just in first light.
          </Text>
        </Reveal>

        <div className="space-y-4">
          {items.map((item, index) => (
            <Reveal
              key={item.label}
              viewportMargin="-10% 0px -20% 0px"
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="rounded-[24px] border border-border/60 bg-card/60 p-5 shadow-subtle backdrop-blur-xl md:p-6"
            >
              <article>
                <Text variant="label" className="mb-2 text-muted-foreground">
                  {item.label}
                </Text>
                <Text variant="body" className="text-muted-foreground">
                  {item.body}
                </Text>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

