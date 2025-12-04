"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/ui/Button";
import { PageSection } from "@/ui/PageSection";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState<string>("rebuild");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[id^="package-"]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(
      '.package-nav a[href^="#"]'
    );

    const observerOptions = {
      root: null,
      rootMargin: "-150px 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("package-", "");
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Smooth scroll for nav links
    const handleClick = (e: Event) => {
      e.preventDefault();
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const linkClasses = (id: string) =>
    clsx(
      "rounded-full px-4 py-2 text-xs font-medium no-underline transition",
      activeSection === id
        ? "bg-panel text-text-ink shadow-soft"
        : "text-text-subtle hover:bg-panel/80 hover:text-text-ink",
    );

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        {/* Hero */}
        <PageSection className="pt-32 text-center">
          <div className="mx-auto max-w-[900px]">
            <h1 className="mb-6 font-serif text-4xl font-normal leading-[1.1] text-text-ink md:text-6xl lg:text-7xl">
              Packages that <em className="italic">actually</em> deliver.
            </h1>
            <p className="mx-auto mb-10 max-w-[600px] text-lg text-text-subtle">
              No retainers that bleed you dry. No scope creep. Just clear deliverables, hard numbers, and real
              accountability.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button as="a" href="#packages" size="lg">
                View packages
              </Button>
              <Button as="a" href="#bundle" size="lg" variant="ghost">
                See the full stack
              </Button>
            </div>
          </div>
        </PageSection>

        {/* Package Navigation */}
        <div className="package-nav sticky top-[64px] z-40 border-b border-border/60 bg-panel/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto">
            <a href="#package-rebuild" className={linkClasses("rebuild")}>
              Site Rebuild
            </a>
            <a href="#package-imagery" className={linkClasses("imagery")}>
              AI Imagery
            </a>
            <a href="#package-copy" className={linkClasses("copy")}>
              Product Copy
            </a>
            <a href="#package-tracking" className={linkClasses("tracking")}>
              Tracking + Meta
            </a>
            <a href="#package-creative" className={linkClasses("creative")}>
              Creative Engine
            </a>
            <a href="#package-growth" className={linkClasses("growth")}>
              Growth Ops
            </a>
          </div>
        </div>

        {/* Section Intro */}
        <section className="py-20 px-6 max-w-[700px] mx-auto text-center">
          <h2 className="font-serif text-3xl font-normal mb-4">
            Six packages. No fluff.
          </h2>
          <p className="text-muted">
            Each package has hard deliverables you can hold us to. Start with
            what hurts most, or stack them for a complete growth system.
          </p>
        </section>

        {/* Packages */}
        <section className="py-8 px-6 pb-24 max-w-[1200px] mx-auto" id="packages">
          {/* Package 1: Shopify Rebuild */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] shadow-soft animate-fade-up"
            id="package-rebuild"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 01
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  Shopify Rebuild
                </h3>
                <p className="text-muted">
                  Fix structure, speed, and conversion. The foundation everything
                  else sits on.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $5,000 – $8,000
                </div>
                <div className="text-sm text-muted mt-1">One-time</div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Complete home page rebuild (8–10 sections)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    PDP redesign with 6–8 content blocks
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Collection pages with hero banners and filters
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Cart and checkout optimisation
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    CRO improvements: nav, CTAs, offer placement
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Speed fixes: lazy loading, compression, render blocking
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Basic SEO: metadata, URLs, alt tags
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    App stack audit and setup
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Email/SMS capture integration
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Home page sections</span>
                    <span className="font-medium text-right">8–10</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">PDP content blocks</span>
                    <span className="font-medium text-right">6–8</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Products per collection</span>
                    <span className="font-medium text-right">12–24</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">LCP target</span>
                    <span className="font-medium text-right">&lt; 2.5s</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">Page weight target</span>
                    <span className="font-medium text-right">&lt; 2MB</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Slow sites, bad conversion rates, messy structure
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>

          {/* Package 2: AI Product Imagery */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up animate-delay-100"
            id="package-imagery"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 02
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  AI Product Imagery
                </h3>
                <p className="text-muted">
                  Replace or upgrade product visuals. Consistent, professional, no
                  photoshoot required.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $20 – $35
                </div>
                <div className="text-sm text-muted mt-1">
                  Per product (6 images)
                </div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    AI product photography
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Consistent lighting, backgrounds, style
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Studio renders (front, angle, detail)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Lifestyle scene renders
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Variant set composites if needed
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Files optimised for Shopify
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Original files supplied separately
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Images per product</span>
                    <span className="font-medium text-right">6 minimum</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Studio shots</span>
                    <span className="font-medium text-right">3</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Lifestyle scenes</span>
                    <span className="font-medium text-right">2</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Variant composite</span>
                    <span className="font-medium text-right">1</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">File size (web)</span>
                    <span className="font-medium text-right">&lt; 200KB each</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Poor photos, inconsistent imagery, new product lines
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>

          {/* Package 3: Product Copy */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up animate-delay-200"
            id="package-copy"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 03
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  Product Titles & Descriptions
                </h3>
                <p className="text-muted">
                  Make the catalog conversion-ready and SEO clean. Words that sell.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $15 – $30
                </div>
                <div className="text-sm text-muted mt-1">Per product</div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Product title rewrite framework
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Short descriptions (50–80 words)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Long descriptions (120–200 words)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Benefit-first bullet points
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Technical specs cleanup
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    SEO keyword pass
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Alt tag recommendations
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Base scope</span>
                    <span className="font-medium text-right">Up to 20 products</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Short description</span>
                    <span className="font-medium text-right">50–80 words</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Long description</span>
                    <span className="font-medium text-right">120–200 words</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Benefit bullets</span>
                    <span className="font-medium text-right">3–5 per product</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">Specs table</span>
                    <span className="font-medium text-right">1 per product</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Weak copy, poor readability, inconsistent naming
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>

          {/* Package 4: Tracking + Meta Setup */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up animate-delay-300"
            id="package-tracking"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 04
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  Tracking & Meta Setup
                </h3>
                <p className="text-muted">
                  Give Meta the data it needs to perform. No data, no scale.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $1,000 – $1,800
                </div>
                <div className="text-sm text-muted mt-1">One-time</div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Pixel setup and configuration
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    CAPI (server or Gateway)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Domain verification
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Event prioritisation
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Custom conversions setup
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    UTM structure documentation
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Naming conventions for campaigns
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Account restructure
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Custom conversions</span>
                    <span className="font-medium text-right">6–8</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Campaigns structured</span>
                    <span className="font-medium text-right">3–5</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Events configured</span>
                    <span className="font-medium text-right">6 core events</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">Documentation</span>
                    <span className="font-medium text-right">
                      Naming + UTM guides
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Anyone wanting ads that actually scale
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>

          {/* Package 5: Creative Engine */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up animate-delay-400"
            id="package-creative"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 05
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  Creative Engine
                </h3>
                <p className="text-muted">
                  Weekly ad variation that doesn&apos;t die. Fresh creative, always.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $800 – $1,200
                </div>
                <div className="text-sm text-muted mt-1">Per month</div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Creative strategy: hooks, angles, messages
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Weekly creative batches
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Static and short video variations
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Monthly testing plan
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Branded visual system
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Feed ads and catalog creative
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Landing page updates as needed
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">New ads per week</span>
                    <span className="font-medium text-right">4–6</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Statics per week</span>
                    <span className="font-medium text-right">2</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Video variations</span>
                    <span className="font-medium text-right">2</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">New angles per month</span>
                    <span className="font-medium text-right">3 minimum</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">Monthly roadmap</span>
                    <span className="font-medium text-right">Included</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Weak creative, creative fatigue, lack of fresh ads
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>

          {/* Package 6: Growth Ops */}
          <article
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up animate-delay-500"
            id="package-growth"
          >
            <div className="p-10 border-b border-border grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted mb-2">
                  Package 06
                </div>
                <h3 className="font-serif text-3xl font-normal mb-3">
                  Growth Ops
                </h3>
                <p className="text-muted">
                  Full Meta ads management for 3 months. Actual revenue, not
                  reports.
                </p>
              </div>
              <div className="text-right md:text-left md:text-right min-w-[200px]">
                <div className="text-2xl font-semibold text-foreground">
                  $1,500 – $2,500
                </div>
                <div className="text-sm text-muted mt-1">
                  Per month (3 months)
                </div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  What&apos;s included
                </h4>
                <ul className="list-none space-y-2">
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Full Meta ads management
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Weekly reporting and strategy
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Offer testing and iteration
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Scaling rules and kill rules
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Landing page builds for campaigns
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Basic Klaviyo flows (welcome, abandoned cart,
                    post-purchase)
                  </li>
                  <li className="py-2 pl-6 relative text-muted text-[0.95rem]">
                    <span className="absolute left-0 top-[1.4rem] w-1.5 h-1.5 bg-border-dark rounded-full"></span>
                    Monthly account audits
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted mb-4">
                  Hard numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Strategy adjustments</span>
                    <span className="font-medium text-right">2/week</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Live ads rotated</span>
                    <span className="font-medium text-right">12–20</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Active test ads</span>
                    <span className="font-medium text-right">3–5</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border text-sm">
                    <span className="text-muted">Creative refresh cycle</span>
                    <span className="font-medium text-right">Max 10 days</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-muted">Kill rule</span>
                    <span className="font-medium text-right">
                      &lt;1% CTR @ 1k impr.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-alt border-t border-border py-5 px-10 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted">
                <strong className="text-foreground font-medium">Best for:</strong>{" "}
                Anyone wanting actual revenue results, not consulting
              </div>
              <Button as="a" href="/#contact" size="md">
                Get started
              </Button>
            </div>
          </article>
        </section>

        {/* Bundle Section */}
        <PageSection
          id="bundle"
          tone="surface"
          border="top"
          className="my-16"
          containerClassName="max-w-[900px]"
        >
          <div className="rounded-3xl bg-foreground p-10 text-center text-background shadow-shell">
            <div className="mb-6 inline-flex rounded-full bg-background/15 px-4 py-1.5 text-xs uppercase tracking-wider">
              Full Stack 360
            </div>
            <h2 className="mb-4 font-serif text-4xl font-normal md:text-5xl">Everything. One price.</h2>
            <p className="mx-auto mb-8 max-w-[600px] text-background/70">
              Site rebuild, imagery, copy, tracking, creative, and 3 months of managed growth. The complete system. Total
              commitment: $16,000 to $20,000 across 3 months.
            </p>
            <div className="mb-2 text-5xl font-semibold">$10,000 – $14,000</div>
            <div className="mb-10 text-sm text-background/60">Once off + $2,000/month for 3 months</div>
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {["Site Rebuild", "AI Imagery", "Product Copy", "Tracking Setup", "Creative Engine", "Growth Ops"].map(
                (item) => (
                  <span key={item} className="rounded-md bg-background/12 px-4 py-2 text-sm">
                    {item}
                  </span>
                ),
              )}
            </div>
            <Button as="a" href="/#contact" variant="secondary" size="lg">
              Talk about the full stack
            </Button>
          </div>
        </PageSection>

        {/* Decision Matrix */}
        <section className="py-20 px-6 max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl font-normal text-center mb-12">
            Not sure where to start?
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-background-alt border border-border rounded-lg items-center">
              <div className="text-muted">Site is slow or outdated</div>
              <div className="flex gap-2 flex-wrap md:justify-end">
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 1
                </span>
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 2
                </span>
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 3
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-background-alt border border-border rounded-lg items-center">
              <div className="text-muted">Tracking is weak or broken</div>
              <div className="flex gap-2 flex-wrap md:justify-end">
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 4
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-background-alt border border-border rounded-lg items-center">
              <div className="text-muted">Ads aren&apos;t performing</div>
              <div className="flex gap-2 flex-wrap md:justify-end">
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 5
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-background-alt border border-border rounded-lg items-center">
              <div className="text-muted">Want actual revenue growth</div>
              <div className="flex gap-2 flex-wrap md:justify-end">
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  Package 6
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-background-alt border border-border rounded-lg items-center">
              <div className="text-muted">No idea what&apos;s wrong</div>
              <div className="flex gap-2 flex-wrap md:justify-end">
                <span className="bg-background-alt px-3 py-1.5 rounded text-sm font-medium">
                  All 6
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <PageSection tone="surface" border="top" className="text-center">
          <h2 className="mb-4 font-serif text-4xl font-normal md:text-5xl">Ready to talk?</h2>
          <p className="mx-auto mb-8 max-w-[500px] text-text-subtle">
            Tell us what&apos;s broken. No sales pitch — just a conversation to see if we can help.
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
