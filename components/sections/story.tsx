"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { Text } from "@/components/ui/text";

export function StorySection() {
  return (
    <section className="mt-24 md:mt-40 px-4 md:px-10 xl:px-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center lg:gap-16">
        {/* Text left */}
        <FadeIn className="space-y-5">
          <Text
            variant="caption"
            className="text-[11px] font-medium tracking-[0.3em] uppercase text-amber-900/70"
          >
            Ce qui se cache derrière les lunettes
          </Text>
          <Text
            variant="h2"
            className="text-foreground text-3xl md:text-4xl lg:text-5xl leading-tight"
          >
            Conçues pour s&apos;adapter à vos mouvements.
          </Text>
          <Text variant="body" className="max-w-md text-muted-foreground">
            Les montures Clevards sont conçues pour s&apos;adapter à la luminosité des rues, à la lumière des studios et à la pénombre des salles de cinéma. Elles s&apos;intègrent parfaitement à votre garde-robe, sans pour autant la dominer.
          </Text>
          <Text variant="body" className="max-w-md text-muted-foreground">
            Chaque détail est pensé comme un geste de soin&nbsp;: des ponts adoucis, des
            finitions polies à la main et des teintes inspirées des ateliers de skincare
            modernes.
          </Text>
        </FadeIn>

        {/* Video right */}
        <FadeIn className="relative aspect-4/5 h-full w-full overflow-hidden rounded-3xl border border-black/5 bg-white/30 backdrop-blur-2xl shadow-[0_32px_120px_rgba(15,23,42,0.28)] md:h-full">
          <video
            src="/images/home-vid.mp4"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="absolute left-6 top-6 z-10 rounded-full bg-black/65 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-100/85">
            Film d&apos;atelier
          </div>
          <div className="absolute left-6 bottom-8 z-10 max-w-xs text-sm leading-relaxed text-zinc-50/90">
            Une lumière douce, des gestes précis et des verres qui captent chaque nuance&nbsp;:
            un rituel de clarté plus proche du soin que de l&apos;accessoire.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

