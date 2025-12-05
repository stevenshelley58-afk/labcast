"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/ui/Button";
import { PageSection } from "@/ui/PageSection";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

const categoryLinks = [
  { id: "website", label: "Website" },
  { id: "content", label: "Product Content" },
  { id: "creative", label: "Ad Creative" },
  { id: "management", label: "Ad Management" },
  { id: "tracking", label: "Tracking" },
  { id: "bundle", label: "Bundle" },
];

const websiteTiers = [
  {
    label: "Option 1",
    name: "Basic Shopify Website",
    price: "$3,500 – $5,000",
    priceNote: "once-off",
    features: [
      "New theme setup",
      "Section layouts",
      "CRO improvements",
      "Speed fixes",
      "Basic SEO (titles, alt tags)",
      "Homepage + core templates",
    ],
    excluded: ["Product upload", "Custom sections", "Custom apps"],
    featured: false,
  },
  {
    label: "Option 2",
    name: "Custom Shopify Website",
    price: "$6,000 – $10,000",
    priceNote: "once-off",
    features: [
      "Advanced design",
      "Custom sections",
      "Animations and interactions",
      "Improved PDP layouts",
      "Improved collection layouts",
      "Brand system applied across site",
    ],
    excluded: ["Product upload", "Long-form content", "Custom app development"],
    featured: true,
  },
];

const contentServices = [
  {
    name: "AI Product Images",
    tagline: "Studio-quality visuals without the photoshoot",
    price: "$70",
    unit: "per image",
    included: [
      "1 final image (studio or lifestyle)",
      "Retouching",
      "Consistent lighting and style",
      "Optimised for Shopify",
    ],
    notIncluded: ["Ad creative", "Copywriting"],
  },
  {
    name: "Product Titles + Descriptions",
    tagline: "Copy that converts and ranks",
    price: "$50",
    unit: "per product",
    included: [
      "New product title",
      "Short description",
      "Long description",
      "3–5 bullet points",
      "Specs block",
    ],
    notIncluded: ["Uploading products (sold separately)"],
  },
];

const creativeService = {
  name: "Single Image Ad",
  tagline: "Complete ad ready for Meta",
  price: "$200",
  unit: "per ad",
  included: [
    "You provide source image",
    "Image editing",
    "Text overlays + design",
    "Copy + headline written for you",
    "Export-ready ad file",
  ],
  notIncluded: ["Running the ad", "Weekly optimisation"],
};

const managementService = {
  name: "Meta Ads Management",
  tagline: "Hands-on campaign management, not consulting",
  price: "$400",
  unit: "per week",
  included: [
    "Running ads",
    "Testing + scaling",
    "Weekly strategy call",
    "Weekly reporting",
    "Catalog management",
    "Ad creation as needed during the week",
  ],
  notIncluded: [
    "One-off creative purchases (unless produced as part of weekly cycle)",
  ],
};

const trackingService = {
  name: "Meta Tracking + CAPI Setup",
  tagline: "Give Meta the data it needs to perform",
  price: "$1,000",
  unit: "once-off",
  included: [
    "Pixel setup",
    "CAPI setup",
    "Event mapping",
    "Custom conversions",
    "UTM structure",
    "Naming conventions",
    "Account restructure",
  ],
  notIncluded: ["Ongoing ad management"],
};

const bundleIncludes = [
  "Shopify Website",
  "AI Product Images",
  "Product Copy",
  "Tracking Setup",
  "4 Weeks Ads Management",
];

export function PricingPageContent() {
  const [activeCategory, setActiveCategory] = useState("website");

  useEffect(() => {
    const sections = categoryLinks
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(
      '.pricing-nav a[href^="#"]',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-150px 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleClick = (event: Event) => {
      event.preventDefault();
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    navLinks.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleClick),
      );
    };
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        <PageSection className="pt-32 text-center">
          <div className="mx-auto max-w-[750px]">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-text-subtle">Pricing</p>
            <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-text-ink md:text-6xl">
              Clear pricing. <em className="italic">No surprises.</em>
            </h1>
            <p className="mx-auto mb-10 max-w-[550px] text-lg text-text-subtle">
              Pick what you need. Everything has a fixed price. No retainers, no scope creep, no awkward conversations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button as="a" href="#website" size="lg">
                View services
              </Button>
              <Button as="a" href="#bundle" size="lg" variant="ghost">
                See the bundle
              </Button>
            </div>
          </div>
        </PageSection>

        <div className="pricing-nav sticky top-[64px] z-40 border-b border-border/60 bg-panel/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-[750px] justify-center gap-2 overflow-x-auto">
            {categoryLinks.map((link) => {
              const active = activeCategory === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={clsx(
                    "rounded-full px-4 py-2 text-xs font-medium no-underline transition",
                    active
                      ? "bg-panel text-text-ink shadow-soft"
                      : "text-text-subtle hover:bg-panel/80 hover:text-text-ink",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <section
          id="website"
          className="scroll-mt-[140px] py-20 px-6 max-w-[900px] mx-auto"
        >
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
              Website
            </p>
            <h2 className="font-serif text-3xl font-normal">
              Shopify Builds
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websiteTiers.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-2xl p-8 bg-background-alt shadow-soft ${
                  tier.featured
                    ? "border-border-dark shadow-lg shadow-black/5"
                    : "border-border"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-[0.3em] mb-2 ${
                    tier.featured ? "text-foreground" : "text-muted"
                  }`}
                >
                  {tier.label}
                </p>
                <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
                <div className="text-2xl font-semibold mb-2">{tier.price}</div>
                <p className="text-sm text-muted mb-6">{tier.priceNote}</p>
                <ul className="list-none space-y-2 mb-6">
                  {tier.features.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="h-px bg-border mb-6" />
                <ul className="list-none space-y-2">
                  {tier.excluded.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="content"
          className="scroll-mt-[140px] py-16 px-6 max-w-[900px] mx-auto"
        >
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
              Product Content
            </p>
            <h2 className="font-serif text-3xl font-normal">
              Images &amp; Copy
            </h2>
          </div>
          <div className="space-y-6">
            {contentServices.map((service) => (
              <article
                key={service.name}
                className="bg-background-alt border border-border rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted">{service.tagline}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-2xl font-semibold">
                      {service.price}
                    </div>
                    <p className="text-sm text-muted">{service.unit}</p>
                  </div>
                </div>
                <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                      Included
                    </h4>
                    <ul className="list-none space-y-2">
                      {service.included.map((item) => (
                        <li
                          key={item}
                          className="relative pl-6 text-sm text-muted leading-relaxed"
                        >
                          <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                      Not included
                    </h4>
                    <ul className="list-none space-y-2">
                      {service.notIncluded.map((item) => (
                        <li
                          key={item}
                          className="relative pl-6 text-sm text-muted leading-relaxed"
                        >
                          <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-border" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="creative"
          className="scroll-mt-[140px] py-16 px-6 max-w-[900px] mx-auto"
        >
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
              Ad Creative
            </p>
            <h2 className="font-serif text-3xl font-normal">Ready-to-Run Ads</h2>
          </div>
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden shadow-soft">
            <div className="p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {creativeService.name}
                </h3>
                <p className="text-sm text-muted">{creativeService.tagline}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-semibold">
                  {creativeService.price}
                </div>
                <p className="text-sm text-muted">{creativeService.unit}</p>
              </div>
            </div>
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Included
                </h4>
                <ul className="list-none space-y-2">
                  {creativeService.included.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Not included
                </h4>
                <ul className="list-none space-y-2">
                  {creativeService.notIncluded.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        <section
          id="management"
          className="scroll-mt-[140px] py-16 px-6 max-w-[900px] mx-auto"
        >
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
              Ad Management
            </p>
            <h2 className="font-serif text-3xl font-normal">Meta Ads</h2>
          </div>
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden shadow-soft">
            <div className="p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {managementService.name}
                </h3>
                <p className="text-sm text-muted">
                  {managementService.tagline}
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-semibold">
                  {managementService.price}
                </div>
                <p className="text-sm text-muted">{managementService.unit}</p>
              </div>
            </div>
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Included
                </h4>
                <ul className="list-none space-y-2">
                  {managementService.included.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Not included
                </h4>
                <ul className="list-none space-y-2">
                  {managementService.notIncluded.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        <section
          id="tracking"
          className="scroll-mt-[140px] py-16 px-6 max-w-[900px] mx-auto"
        >
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
              Tracking + Tech
            </p>
            <h2 className="font-serif text-3xl font-normal">Meta Setup</h2>
          </div>
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden shadow-soft">
            <div className="p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {trackingService.name}
                </h3>
                <p className="text-sm text-muted">{trackingService.tagline}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-semibold">
                  {trackingService.price}
                </div>
                <p className="text-sm text-muted">{trackingService.unit}</p>
              </div>
            </div>
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Included
                </h4>
                <ul className="list-none space-y-2">
                  {trackingService.included.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                  Not included
                </h4>
                <ul className="list-none space-y-2">
                  {trackingService.notIncluded.map((item) => (
                    <li
                      key={item}
                      className="relative pl-6 text-sm text-muted leading-relaxed"
                    >
                      <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        <PageSection
          id="bundle"
          tone="surface"
          border="top"
          className="scroll-mt-[140px]"
          containerClassName="max-w-[750px]"
        >
          <div className="rounded-3xl bg-foreground p-10 text-center text-background shadow-shell">
            <div className="mb-6 inline-flex rounded-full bg-background/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em]">
              360 Ecommerce Bundle
            </div>
            <h2 className="mb-3 font-serif text-4xl font-normal">Everything. 30 days of ads.</h2>
            <p className="mx-auto mb-6 max-w-[500px] text-background/70">
              Website rebuild, product content, tracking setup, and a full month of managed Meta ads.
            </p>
            <div className="mb-2 text-4xl font-semibold md:text-5xl">$8,800 – $14,400</div>
            <p className="mb-8 text-sm text-background/60">Depends on Basic vs Custom website</p>
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {bundleIncludes.map((item) => (
                <span key={item} className="rounded-md bg-background/15 px-4 py-2 text-sm">
                  {item}
                </span>
              ))}
            </div>
            <Button as="a" href="/#contact" variant="secondary" size="lg">
              Talk about the bundle
            </Button>
          </div>
        </PageSection>

        <PageSection tone="surface" border="top" className="text-center">
          <h2 className="mb-4 font-serif text-4xl font-normal md:text-5xl">Ready to talk?</h2>
          <p className="mx-auto mb-8 max-w-[500px] text-text-subtle">
            Tell us what you need. No pitch deck — just a conversation to see if we can help.
          </p>
          <Button as="a" href="/#contact" size="lg">
            Get in touch
          </Button>
        </PageSection>

        <Footer />
      </main>
    </div>
  );
}


