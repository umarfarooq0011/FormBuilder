import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CtaSection } from "../Layouts/CtaSection";
import { FaqSection } from "../Layouts/FaqSection";
import { FeaturesSection } from "../Layouts/FeaturesSection";
import { FlowSection } from "../Layouts/FlowSection";
import { HeroSection } from "../Layouts/HeroSection";
import { HowSection } from "../Layouts/HowSection";
import { TemplatesSection } from "../Layouts/TemplatesSection";
import { TestimonialsSection } from "../Layouts/TestimonialsSection";
import { UseCasesSection } from "../Layouts/UseCasesSection";
import { WhatItIsSection } from "../Layouts/WhatItIsSection";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatItIsSection />
      <FeaturesSection />
      <HowSection />
      <FlowSection />
      <TemplatesSection />
      <UseCasesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}