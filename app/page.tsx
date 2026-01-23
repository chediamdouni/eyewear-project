import { Hero } from "@/components/sections/hero";
import { BestSellers } from "@/components/sections/best-sellers";
import { StorySection } from "@/components/sections/story";
import { LensTypes } from "@/components/sections/lens-types";
import { WhyChoose } from "@/components/sections/why-choose";
import { SectionContainer } from "@/components/layout/section-container";

export default function LandingPage() {
  return (
    <SectionContainer>
      <Hero />
      <BestSellers />
      <StorySection />
      <LensTypes />
      <WhyChoose />
    </SectionContainer>
  );
}
