// Section: Imports
import Footer from "@/components/Footer";
import DiamondScrollHero from "@/components/Hero/DiamondScrollHero";
import StaticHero from "@/components/sections/StaticHero";
import Navbar from "@/components/Navbar";
import CredentialRow from "@/components/sections/CredentialRow";
import CaseStudySection from "@/components/sections/CaseStudySection";
import CommercialModelSection from "@/components/sections/CommercialModelSection";
import ContactSection from "@/components/sections/ContactSection";
import FounderSection from "@/components/FounderSection";
import PricingSection from "@/components/sections/PricingSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import SectionEight from "@/components/sections/SectionEight";

// Note: SectionOne–Seven were verbatim duplicates of the helix diamond captions
// and have been removed (Phase 1 collapse). SectionEight is retained as the
// Rescue-Audit CTA beat and now sits immediately before ContactSection.
export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-[var(--sgc-gradient-bg)]">
      <Navbar />
      <StaticHero />
      <CredentialRow />
      <DiamondScrollHero />
      <ProblemSection />
      <SolutionSection />
      <CaseStudySection />
      <FounderSection />
      <CommercialModelSection />
      <PricingSection />
      <SectionEight />
      <ContactSection />
      <Footer />
    </main>
  );
}
