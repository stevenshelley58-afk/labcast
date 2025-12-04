"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/app/components/navigation";

// Dynamically import components to avoid SSR issues with framer-motion
const Hero = dynamic(() => import("@/rendervault/components/Hero"), { ssr: false });
const FounderSection = dynamic(() => import("@/rendervault/components/FounderSection"), { ssr: false });
const PainContrast = dynamic(() => import("@/rendervault/components/PainContrast"), { ssr: false });
const HowItWorks = dynamic(() => import("@/rendervault/components/HowItWorks"), { ssr: false });
const Pricing = dynamic(() => import("@/rendervault/components/Pricing"), { ssr: false });
const Contact = dynamic(() => import("@/rendervault/components/Contact"), { ssr: false });
const FAQ = dynamic(() => import("@/rendervault/components/FAQ"), { ssr: false });
const IntakeWizard = dynamic(() => import("@/rendervault/components/IntakeWizard"), { ssr: false });

export default function RenderVaultHome() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <main className="bg-bg-paper min-h-screen relative selection:bg-accent/20">
      <Navigation />
      <div className="pt-24 md:pt-28">
        <Hero />
        <FounderSection />
        <PainContrast />
        <HowItWorks onOpenWizard={() => setIsWizardOpen(true)} />
        <Pricing />
        <Contact />
        <FAQ />
      </div>

      {isWizardOpen && <IntakeWizard onClose={() => setIsWizardOpen(false)} />}
    </main>
  );
}


