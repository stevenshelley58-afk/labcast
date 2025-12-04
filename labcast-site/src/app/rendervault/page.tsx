import type { Metadata } from "next";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";
import Hero from "@/rendervault/components/Hero";
import ProofWall from "@/rendervault/components/ProofWall";
import PainContrast from "@/rendervault/components/PainContrast";
import HowItWorks from "@/rendervault/components/HowItWorks";
import FounderSection from "@/rendervault/components/FounderSection";
import Pricing from "@/rendervault/components/Pricing";
import FAQ from "@/rendervault/components/FAQ";
import Contact from "@/rendervault/components/Contact";

export const metadata: Metadata = {
  title: "RenderVault by Labcast — AI product photography that looks real",
  description:
    "AI product imagery, lifestyle scenes, and ad creative that look natural, not plastic. Built for ecommerce brands who want believable visuals fast.",
  alternates: {
    canonical: "https://labcast.com.au/rendervault",
  },
  openGraph: {
    title: "RenderVault by Labcast",
    description:
      "AI product imagery, lifestyle scenes, and ad creative that look natural, not plastic.",
    url: "https://labcast.com.au/rendervault",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Labcast — Marketing. Creative. Build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RenderVault by Labcast",
    description:
      "AI product imagery, lifestyle scenes, and ad creative that look natural, not plastic.",
    images: ["/twitter-image"],
  },
};

export default function RenderVaultPage() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="flex flex-col">
        <Hero />
        <ProofWall />
        <PainContrast />
        <HowItWorks />
        <FounderSection />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
