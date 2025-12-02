"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
        <section className="pt-40 pb-20 px-6 max-w-[750px] mx-auto text-center">
          <p className="text-sm text-muted mb-4 uppercase tracking-[0.2em]">
            Pricing
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-6">
            Clear pricing. <em className="italic">No surprises.</em>
          </h1>
          <p className="text-lg text-muted max-w-[550px] mx-auto mb-10">
            Pick what you need. Everything has a fixed price. No retainers, no
            scope creep, no awkward conversations.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#website"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              View services
            </a>
            <a
              href="#bundle"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-transparent text-foreground border border-border-dark hover:bg-background-alt transition-colors"
            >
              See the bundle
            </a>
          </div>
        </section>

        <div className="pricing-nav sticky top-[60px] bg-background border-b border-border py-4 px-6 z-40 overflow-x-auto">
          <div className="max-w-[1100px] mx-auto flex gap-2 justify-center">
            {categoryLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 rounded-full text-xs no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                  activeCategory === link.id
                    ? "bg-foreground text-background"
                    : "text-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
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
                className={`border rounded-2xl p-8 bg-background-alt ${
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
                className="bg-background-alt border border-border rounded-2xl overflow-hidden"
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
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden">
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
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden">
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
          <article className="bg-background-alt border border-border rounded-2xl overflow-hidden">
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

        <section
          id="bundle"
          className="scroll-mt-[140px] py-20 px-6 max-w-[900px] mx-auto"
        >
          <div className="bg-foreground text-background rounded-3xl p-10 text-center">
            <div className="inline-block bg-background/15 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.3em] mb-6">
              360 Ecommerce Bundle
            </div>
            <h2 className="font-serif text-4xl font-normal mb-3">
              Everything. 30 days of ads.
            </h2>
            <p className="text-background/70 max-w-[500px] mx-auto mb-6">
              Website rebuild, product content, tracking setup, and a full month
              of managed Meta ads.
            </p>
            <div className="text-4xl md:text-5xl font-semibold mb-2">
              $8,800 – $14,400
            </div>
            <p className="text-background/60 text-sm mb-8">
              Depends on Basic vs Custom website
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {bundleIncludes.map((item) => (
                <span
                  key={item}
                  className="bg-background/10 px-4 py-2 rounded-md text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-background text-foreground hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Talk about the bundle
            </Link>
          </div>
        </section>

        <section className="py-24 px-6 text-center bg-background-alt">
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4">
            Ready to talk?
          </h2>
          <p className="text-muted max-w-[500px] mx-auto mb-8">
            Tell us what you need. No pitch deck — just a conversation to see if
            we can help.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
        </section>

        <Footer />
      </main>
    </div>
  );
}

