import { Craft } from "@/components/sections/craft";
import { FitForm } from "@/components/sections/fit-form";
import { Hero } from "@/components/sections/hero";
import { Collection } from "@/components/sections/collection";
import { Manifesto } from "@/components/sections/manifesto";
import { SectionContainer } from "@/components/layout/section-container";

export default function LandingPage() {
  return (
    <SectionContainer>
      <Hero />
      <Manifesto />
      <Collection />
      <Craft />
      <FitForm />
    </SectionContainer>
  );
}
