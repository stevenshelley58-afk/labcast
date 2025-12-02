import type { Metadata } from "next";
import { PricingPageContent } from "./pricing-content";

export const metadata: Metadata = {
  title: "Services & Pricing — Labcast",
  description:
    "Fixed-fee Shopify builds, creative, content, tracking, and Meta ads management from the Labcast team.",
  alternates: {
    canonical: "https://labcast.com.au/pricing",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}

