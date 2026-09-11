import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import ScrollToTop from "@/components/ScrollToTop";
import ThankYou from "@/pages/ThankYou";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const InvestmentPage = lazy(() => import("./pages/InvestmentPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WhyUsPage = lazy(() => import("./pages/WhyUsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AuroSapphire = lazy(() => import("./pages/AuroSapphire"));
import logo from "@/assets/logo.png";

const queryClient = new QueryClient();

// A safe fallback component that perfectly copies the luxury design of Preloader
// but strictly removes Framer-Motion AnimatePresence to prevent React from crashing
// ("Failed to execute removeChild on Node") when Suspense forcefully unmounts it.
const SuspenseLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,158,61,0.1),transparent_70%)]" />
    <div className="relative flex flex-col items-center">
      <div className="mb-8">
        <img 
          src={logo} 
          alt="Loading..." 
          className="h-24 md:h-32 w-auto drop-shadow-[0_0_25px_rgba(207,158,61,0.4)]" 
        />
      </div>
      <div className="w-56 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20 animate-pulse" />
      </div>
      <p className="mt-6 text-secondary/70 text-[10px] uppercase tracking-[0.5em] font-medium animate-pulse">
        Elevating Lifestyle
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<SuspenseLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/investment" element={<InvestmentPage />} />
              <Route path="/auro-sapphire" element={<AuroSapphire />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/auro-sapphire/thank-you" element={<ThankYou />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
