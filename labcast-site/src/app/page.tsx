"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";

export default function Home() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong.");
      }

      setFormState("success");
      form.reset();
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  return (
    <div className="bg-background text-foreground">
      <main className="min-h-screen">
        {/* Hero */}
        <Hero />

        {/* The Problem */}
        <section className="py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm text-muted mb-4">The problem</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-8">
                Agencies talk.
                <br />
                We ship.
              </h2>
              <div className="space-y-6 text-lg text-muted leading-relaxed">
                <p>
                  You&apos;ve been here before. The slick pitch deck. The
                  promises about &quot;growth hacking&quot; and
                  &quot;omnichannel strategies&quot;. Then months later —
                  reports full of vanity metrics, burnt
                  budget, and account managers who&apos;ve never spent a dollar
                  of their own money on ads.
                </p>
                <p>
                  We got tired of it too. So we learned everything ourselves and
                  built{" "}
                  <a
                    href="https://bhm.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    bhm.com.au
                  </a>{" "}
                  from scratch — Meta ads, email, creative, web, the lot.
                </p>
                <p className="text-foreground">
                  Now we do the same for other founders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="py-32 px-6 bg-background-alt border-t border-border scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted mb-4">What we do</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">
              Three ways we help you grow
            </h2>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  01
                </div>
                <h3 className="text-xl font-medium mb-3">Marketing</h3>
                <p className="text-muted leading-relaxed mb-4">
                  Meta ads, email flows, growth strategy. The exact playbook we
                  use to profitably scale BHM — now applied to your brand.
                </p>
                <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                  <li>Meta ads management &amp; creative strategy</li>
                  <li>Email &amp; SMS flows that convert</li>
                  <li>Analytics &amp; attribution setup</li>
                </ul>
              </div>

              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  02
                </div>
                <h3 className="text-xl font-medium mb-3">Creative</h3>
                <p className="text-muted leading-relaxed mb-4">
                  Product imagery without the photoshoot price tag. AI-powered
                  visuals that look natural, not plastic. Powered by RenderVault.
                </p>
                <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                  <li>AI product photography</li>
                  <li>Lifestyle &amp; hero imagery</li>
                  <li>Ad creative at scale</li>
                </ul>
                <Link
                  href="/rendervault"
                  className="inline-block mt-4 text-sm text-foreground hover:underline"
                >
                  Learn about RenderVault →
                </Link>
              </div>

              <div>
                <div className="text-6xl font-serif italic text-muted/30 mb-4">
                  03
                </div>
                <h3 className="text-xl font-medium mb-3">Build</h3>
                <p className="text-muted leading-relaxed mb-4">
                  Websites and apps that convert, not just look good. Clean code,
                  fast load times, built for real business outcomes.
                </p>
                <ul className="space-y-2 text-sm text-muted list-disc list-inside">
                  <li>Shopify &amp; custom ecom builds</li>
                  <li>Landing pages that convert</li>
                  <li>Web &amp; mobile apps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
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
                  <h3 className="font-medium mb-2">
                    We run BHM with our own money
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Every strategy we recommend is one we&apos;ve tested
                    ourselves. We know what works because we pay for the ads,
                    not just manage them.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">
                    You talk to the people doing the work
                  </h3>
                  <p className="text-muted leading-relaxed">
                    No account managers relaying messages. No junior staff
                    learning on your dime. Direct access to the people actually
                    building and optimising.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">
                    We only take clients we can help
                  </h3>
                  <p className="text-muted leading-relaxed">
                    We&apos;re not trying to scale an agency. If we don&apos;t
                    think we can move the needle for you, we&apos;ll say so
                    upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section
          id="about"
          className="py-32 px-6 bg-foreground text-background scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm text-background/60 mb-4">The proof</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-8">
                We&apos;re Em &amp; Steve.
                <br />
                We built BHM.
              </h2>
              <div className="space-y-6 text-lg text-background/80 leading-relaxed">
                <p>
                  BHM is a premium teak furniture brand. We source reclaimed
                  pieces from artisans in Rajasthan and sell them across
                  Australia.
                </p>
                <p>
                  We&apos;ve handled every part of the business ourselves —
                  from Meta ads and email flows to product photography and the
                  Shopify store. No agencies. No outsourcing. Just figuring out
                  what actually works.
                </p>
                <p className="text-background">
                  Labcast is that knowledge, packaged for other founders.
                </p>
              </div>
              <a
                href="https://bhm.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-background text-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Visit bhm.com.au
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted mb-4">Working together</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">
              Simple engagement. Real results.
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl font-medium mb-4">Start where it hurts</h3>
                <p className="text-muted leading-relaxed mb-6">
                  You don&apos;t need all three services. Pick the one that&apos;s
                  costing you the most — whether that&apos;s underperforming ads,
                  weak creative, or a website that doesn&apos;t convert.
                </p>
                <p className="text-muted leading-relaxed">
                  We&apos;ll dig in, figure out what&apos;s broken, and fix it.
                  Then we can talk about what&apos;s next.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Monthly or project</h3>
                <p className="text-muted leading-relaxed mb-6">
                  Ongoing marketing and creative works best on retainer. Clear
                  scope, predictable cost, continuous improvement.
                </p>
                <p className="text-muted leading-relaxed">
                  Build projects are scoped and priced upfront. You know exactly
                  what you&apos;re getting and what it costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 bg-background-alt border-t border-border">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted mb-4">Questions</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">
              Before you ask
            </h2>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
              <div>
                <h3 className="font-medium mb-2">
                  What industries do you work with?
                </h3>
                <p className="text-muted leading-relaxed">
                  Ecommerce brands selling physical products. That&apos;s where our
                  experience is deepest. If you&apos;re in SaaS or services,
                  we&apos;re probably not the right fit.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  What if I only need one service?
                </h3>
                <p className="text-muted leading-relaxed">
                  That&apos;s fine. Most clients start with one thing and expand
                  later. No pressure to buy a bundle you don&apos;t need.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  How is this different from an agency?
                </h3>
                <p className="text-muted leading-relaxed">
                  We&apos;re founders first. We run our own brand with our own
                  money. You get direct access to the people doing the work, not
                  layers of account management.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">
                  What does working together look like?
                </h3>
                <p className="text-muted leading-relaxed">
                  Quick call to understand your situation. If we think we can
                  help, we&apos;ll send a proposal. No decks, no dog and pony show.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-32 px-6 border-t border-border scroll-mt-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <p className="text-sm text-muted mb-4">Get in touch</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-8">
                Ready to talk?
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-12">
                Tell us about your brand and what&apos;s not working. No sales pitch —
                just a conversation to see if we can help.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium mb-2"
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    autoComplete="url"
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors"
                    placeholder="https://yourbrand.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    What&apos;s not working?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    autoComplete="off"
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Tell us about your brand and what you&apos;re struggling with..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  aria-busy={formState === "submitting"}
                  className="px-8 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "submitting" ? "Sending..." : "Send message"}
                </button>
                {formState === "success" && (
                  <p className="text-sm text-muted" role="status" aria-live="polite">
                    Thanks for reaching out. We&apos;ll get back to you soon.
                  </p>
                )}
                {formState === "error" && (
                  <p className="text-sm text-red-600" role="alert" aria-live="assertive">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
