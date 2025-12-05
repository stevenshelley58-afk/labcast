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

        {/* Services */}
        <MarketingSection />
        <CreativeSection />
        <DesignSystemSection />

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

        {/* How It Works */}
        <PageSection border="top">
          <p className="text-sm text-muted mb-4">Working together</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">Simple engagement. Real results.</h2>

          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-medium mb-4">Start where it hurts</h3>
              <p className="text-muted leading-relaxed mb-6">
                You don&apos;t need all three services. Pick the one that&apos;s costing you the most — whether that&apos;s underperforming ads, weak
                creative, or a website that doesn&apos;t convert.
              </p>
              <p className="text-muted leading-relaxed">
                We&apos;ll dig in, figure out what&apos;s broken, and fix it. Then we can talk about what&apos;s next.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Monthly or project</h3>
              <p className="text-muted leading-relaxed mb-6">
                Ongoing marketing and creative works best on retainer. Clear scope, predictable cost, continuous
                improvement.
              </p>
              <p className="text-muted leading-relaxed">
                Build projects are scoped and priced upfront. You know exactly what you&apos;re getting and what it costs.
              </p>
            </div>
          </div>
        </PageSection>

        {/* FAQ */}
        <PageSection tone="surface" border="top">
          <p className="text-sm text-muted mb-4">Questions</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">Before you ask</h2>

          <div className="grid max-w-4xl gap-x-16 gap-y-12 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">What industries do you work with?</h3>
              <p className="text-muted leading-relaxed">
                Ecommerce brands selling physical products. That&apos;s where our experience is deepest. If you&apos;re in SaaS or services, we&apos;re
                probably not the right fit.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What if I only need one service?</h3>
              <p className="text-muted leading-relaxed">
                That&apos;s fine. Most clients start with one thing and expand later. No pressure to buy a bundle you don&apos;t need.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How is this different from an agency?</h3>
              <p className="text-muted leading-relaxed">
                We&apos;re founders first. We run our own brand with our own money. You get direct access to the people doing the work, not layers of
                account management.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What does working together look like?</h3>
              <p className="text-muted leading-relaxed">
                Quick call to understand your situation. If we think we can help, we&apos;ll send a proposal. No decks, no dog and pony show.
              </p>
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
