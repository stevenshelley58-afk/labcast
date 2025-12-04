"use client";

import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";

export default function WebsiteServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        <section className="pt-40 pb-24 px-6 max-w-[900px] mx-auto text-center">
          <p className="text-sm text-muted mb-3 uppercase tracking-[0.2em]">
            Services
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-normal leading-[1.1] mb-6">
            Website services.
          </h1>
          <p className="text-lg text-muted max-w-[600px] mx-auto">
            Detailed layout coming soon. This page will cover your Shopify and
            web build packages in more depth.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}


