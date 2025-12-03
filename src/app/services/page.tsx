"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-40 pb-24 px-6 max-w-[900px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6">
            Packages that <em className="italic">actually</em> deliver.
          </h1>
          <p className="text-lg text-muted max-w-[600px] mx-auto mb-10">
            No retainers that bleed you dry. No scope creep. Just clear
            deliverables, hard numbers, and real accountability.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              View packages
            </a>
            <a
              href="#bundle"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-transparent text-foreground border border-border-dark hover:bg-background-alt transition-colors"
            >
              See the full stack
            </a>
          </div>
        </section>

        {/* Package Navigation */}
        <div className="sticky top-[60px] bg-background border-b border-border py-4 px-6 z-40 overflow-x-auto">
          <div className="max-w-[1200px] mx-auto flex gap-2 justify-center">
            <a
              href="#package-rebuild"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "rebuild"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              Site Rebuild
            </a>
            <a
              href="#package-imagery"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "imagery"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              AI Imagery
            </a>
            <a
              href="#package-copy"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "copy"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              Product Copy
            </a>
            <a
              href="#package-tracking"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "tracking"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              Tracking + Meta
            </a>
            <a
              href="#package-creative"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "creative"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              Creative Engine
            </a>
            <a
              href="#package-growth"
              className={`px-4 py-2 rounded-full text-xs text-muted no-underline whitespace-nowrap transition-all border border-transparent hover:bg-background-alt hover:text-foreground ${
                activeSection === "growth"
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
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
            className="bg-background-alt border border-border rounded-xl mb-12 overflow-hidden scroll-mt-[140px] animate-fade-up"
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
            </div>
          </article>
        </section>

        {/* Bundle Section */}
        <section
          className="bg-foreground text-background py-20 px-6 my-16"
          id="bundle"
        >
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-block bg-background/15 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
              Full Stack 360
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4">
              Everything. One price.
            </h2>
            <p className="text-background/70 max-w-[600px] mx-auto mb-8">
              Site rebuild, imagery, copy, tracking, creative, and 3 months of
              managed growth. The complete system. Total commitment: $16,000 to $20,000 across 3 months.
            </p>
            <div className="text-5xl font-semibold mb-2">$10,000 – $14,000</div>
            <div className="text-background/60 text-sm mb-10">
              Once off + $2,000/month for 3 months
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                Site Rebuild
              </span>
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                AI Imagery
              </span>
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                Product Copy
              </span>
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                Tracking Setup
              </span>
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                Creative Engine
              </span>
              <span className="bg-background/10 px-4 py-2 rounded-md text-sm">
                Growth Ops
              </span>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium bg-background text-foreground hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Talk about the full stack
            </Link>
          </div>
        </section>

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
        <section className="py-24 px-6 text-center bg-background-alt">
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4">
            Ready to talk?
          </h2>
          <p className="text-muted max-w-[500px] mx-auto mb-8">
            Tell us what&apos;s broken. No sales pitch — just a conversation to see
            if we can help.
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
