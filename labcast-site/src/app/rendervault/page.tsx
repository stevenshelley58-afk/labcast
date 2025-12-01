import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

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
      <main className="min-h-screen">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-4xl">
              <p className="text-sm text-muted mb-4">RenderVault</p>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
                Product imagery that actually looks real.
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-2xl mb-12">
                AI product photography for ecommerce brands. Natural light,
                believable textures, and sets that feel like your brand — without
                studio time or shipping samples around the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Book a quick call
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full text-sm font-medium hover:border-foreground transition-colors"
                >
                  Back to services →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-32 px-6 bg-background-alt border-t border-border">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted mb-4">What you get</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">
              Real-looking creative without the shoot
            </h2>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  01
                </div>
                <h3 className="text-xl font-medium mb-3">AI product photography</h3>
                <p className="text-muted leading-relaxed">
                  Studio-quality packshots, detail crops, and variants. Consistent
                  lighting and framing without a full crew.
                </p>
              </div>
              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  02
                </div>
                <h3 className="text-xl font-medium mb-3">Lifestyle &amp; hero scenes</h3>
                <p className="text-muted leading-relaxed">
                  Place products into believable sets: timber, linen, stone, real
                  shadows. We match your brand palette and keep it natural, not
                  plastic.
                </p>
              </div>
              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  03
                </div>
                <h3 className="text-xl font-medium mb-3">Ad creative at scale</h3>
                <p className="text-muted leading-relaxed">
                  Campaign-ready crops for Meta ads, email banners, and landing
                  pages. Fast iterations so you can test more and waste less.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-sm text-muted mb-4">How it works</p>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]">
                  Simple brief. Fast turnaround.
                </h2>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-2">01. Brand and product intake</h3>
                  <p className="text-muted leading-relaxed">
                    You share your product details, brand notes, and any reference
                    imagery. We map out lighting, surfaces, and angles that suit
                    your range.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">02. First batch in days</h3>
                  <p className="text-muted leading-relaxed">
                    We generate a first set of shots for feedback. You tell us
                    what feels right and what doesn&apos;t. We adjust quickly.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">03. Ready-to-ship library</h3>
                  <p className="text-muted leading-relaxed">
                    Final assets arrive optimised for ads, email, and web. Need
                    new scenes next week? We can spin them up without rebooking a
                    shoot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 border-t border-border bg-background-alt">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm text-muted mb-4">Next steps</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-6">
                Want to see RenderVault on your products?
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Share your site and what you need. We&apos;ll show a small sample and a
                clear scope. No deck, no pressure — just images that look like you
                actually photographed them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Start a project
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full text-sm font-medium hover:border-foreground transition-colors"
                >
                  Back to Labcast →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
