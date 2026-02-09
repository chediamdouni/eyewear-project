export const metadata = {
  title: "About — Clevards Eyewear",
  description: "Clevards is a study in precision optics and quiet confidence. Eyewear crafted to sharpen how you see and how you are seen.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-24 md:pt-28 md:pb-32 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),transparent_55%),_#fdf8f1]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-black mb-2">
          About
        </h1>
        <p className="text-sm text-black/60 mb-12">
          Eyewear crafted to sharpen how you see and how you are seen.
        </p>

        <div className="space-y-10 text-black/80">
          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-black/70 mb-4">
              Our story
            </h2>
            <p className="text-sm leading-relaxed">
              Clevards is a study in precision optics and quiet confidence. Our frames are designed to move with you—from the brightness of the street to the glow of the studio to the dim of the cinema. They fit seamlessly into your wardrobe without overpowering it.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-black/70 mb-4">
              Craft
            </h2>
            <p className="text-sm leading-relaxed">
              Every detail is considered as an act of care: softened bridges, hand-finished surfaces, and tints inspired by modern skincare ateliers. We source Japanese acetate and titanium, partnering with craftspeople in Fukui and Sabae to bring each frame to life.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-black/70 mb-4">
              What we believe
            </h2>
            <p className="text-sm leading-relaxed">
              Sunglasses should be more than a seasonal accessory. They should adapt to your life, protect your eyes, and reflect your style without shouting. At Clevards, we design for clarity—in vision and in intention.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-16 border-t border-black/10">
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">
            Hand-finished in Fukui, Japan
          </p>
        </div>
      </div>
    </main>
  );
}
