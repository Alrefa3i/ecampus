import { BenefitsSection } from "@/components/landing/benefits";
import { CommunitySection } from "@/components/landing/community";
import { ContactSection } from "@/components/landing/contact";
import { FAQSection } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero";
import { TeamSection } from "@/components/landing/team";
import { TestimonialSection } from "@/components/landing/testimonial";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  // These components will get translations using client-side hooks
  return (
    <div className={"min-h-screen bg-background container mx-auto px-4"}>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
