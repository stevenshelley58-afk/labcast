"use client";

import Link from "next/link";
import { Footer } from "@/app/components/footer";
import { Navigation } from "@/app/components/navigation";

/**
 * Website/Build services page placeholder.
 * Will be expanded with detailed offerings.
 *
 * @example
 * ```tsx
 * <WebsiteServicesPage />
 * ```
 */
export default function WebsiteServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        <section className="pt-40 pb-24 px-6 max-w-[900px] mx-auto text-center">
          <p className="text-sm text-muted mb-3 uppercase tracking-[0.2em]">
            Services / Build
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-normal leading-[1.1] mb-6">
            Websites that <em className="italic">convert</em>
          </h1>
          <p className="text-lg text-muted max-w-[600px] mx-auto mb-8">
            Clean code, fast load times, built for real business outcomes. Coming soon.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-foreground border-b border-border-dark pb-0.5 hover:border-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to services
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
