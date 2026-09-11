import HeroSection from "@/components/HeroSection";
import { Suspense, lazy } from "react";

// Lazy load sections that are below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const InvestmentSection = lazy(() => import("@/components/InvestmentSection"));
const DirectorsSection = lazy(() => import("@/components/DirectorsSection"));
const HowWeWork = lazy(() => import("@/components/HowWeWork"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionPlaceholder = () => <div className="min-h-[600px] w-full" />;

const Index = () => {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<SectionPlaceholder />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <DirectorsSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <InvestmentSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <HowWeWork />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ContactSection />
      </Suspense>
    </>
  );
};

export default Index;

