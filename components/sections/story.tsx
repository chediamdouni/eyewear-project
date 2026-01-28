"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Text } from "@/components/ui/text";

export function StorySection() {
  return (
    <section className="mt-20 md:mt-28 px-4 md:px-6">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        {/* Text left */}
        <FadeIn className="space-y-5">
          <Text variant="caption" className="text-muted-foreground">
            Ce qui se cache derrière les lunettes
          </Text>
          <Text variant="h2" className="text-foreground">
            Conçues pour s&apos;adapter à vos mouvements.
          </Text>
          <Text variant="body" className="max-w-md text-muted-foreground">
            Les montures Clevards sont conçues pour s&apos;adapter à la luminosité des rues, à la lumière des studios et à la pénombre des salles de cinéma. Elles s&apos;intègrent parfaitement à votre garde-robe, sans pour autant la dominer.
          </Text>
        </FadeIn>

        {/* Video right */}
        <FadeIn className="relative aspect-4/5 h-full w-full overflow-hidden rounded-[5px] border border-border/60 bg-card/60 shadow-subtle md:h-full">
          <video
            src="/images/home-vid.mp4"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </FadeIn>
      </div>
    </section>
  );
}

