import { PageSection } from "@/ui/PageSection";
import { Footer } from "./components/footer";
import { FoundersIntro } from "./components/FoundersIntro";
import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import Contact from "./components/contact";
import { MarketingSection } from "./components/MarketingSection";
import { CreativeSection } from "./components/CreativeSection";
import { DesignSystemSection } from "./components/DesignSystemSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        {/* Hero */}
        <Hero />

        {/* Founders Intro */}
        <FoundersIntro />

        {/* Services */}
        <DesignSystemSection />
        <MarketingSection />
        <CreativeSection />

        {/* The Problem */}
        <PageSection border="top">
          <div className="max-w-3xl">
            <p className="text-sm text-muted mb-4">The problem</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-8">
              Agencies talk.
              <br />
              We ship.
            </h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed">
              <p>
                You&apos;ve been here before. The slick pitch deck. The promises about &quot;growth hacking&quot; and
                &quot;omnichannel strategies&quot;. Then months later — reports full of vanity metrics, burnt budget,
                and account managers who&apos;ve never spent a dollar of their own money on ads.
              </p>
              <p>
                We got tired of it too. So we learned everything ourselves and built{' '}
                <a href="https://bhm.com.au" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                  bhm.com.au
                </a>{' '}
                from scratch — Meta ads, email, creative, web, the lot.
              </p>
              <p className="text-foreground">Now we do the same for other founders.</p>
            </div>
          </div>
        </PageSection>

        {/* Why Us */}
        <PageSection border="top">
          <div className="grid items-start gap-16 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted mb-4">Why us</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]">
                We have skin
                <br />
                in the game.
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-2">We run BHM with our own money</h3>
                <p className="text-muted leading-relaxed">
                  Every strategy we recommend is one we&apos;ve tested ourselves. We know what works because we pay for
                  the ads, not just manage them.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">You talk to the people doing the work</h3>
                <p className="text-muted leading-relaxed">
                  No account managers relaying messages. No junior staff learning on your dime. Direct access to the
                  people actually building and optimising.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">We only take clients we can help</h3>
                <p className="text-muted leading-relaxed">
                  We&apos;re not trying to scale an agency. If we don&apos;t think we can move the needle for you,
                  we&apos;ll say so upfront.
                </p>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Contact */}
        <Contact
          heading="Ready to talk?"
          subheading="Tell us about your brand and what's not working. No sales pitch — just a conversation to see if we can help."
          messagePlaceholder="Tell us about your brand and what you're struggling with..."
        />

        <Footer />
      </main>
    </div>
  );
}
