import { Hero } from "@/components/sections/hero";
import { BestSellers } from "@/components/sections/best-sellers";
import { StorySection } from "@/components/sections/story";
import { LensTypes } from "@/components/sections/lens-types";
import { WhyChoose } from "@/components/sections/why-choose";
import { SectionContainer } from "@/components/layout/section-container";

export default function LandingPage() {
  return (
    <SectionContainer
      spacing="loose"
      className="relative pt-24 pb-24 md:pt-28 md:pb-32 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),transparent_55%),_#fdf8f1]"
    >
      <Hero />
      <BestSellers />
      <StorySection />
      <LensTypes />
      <WhyChoose />
    </SectionContainer>
  );
}
