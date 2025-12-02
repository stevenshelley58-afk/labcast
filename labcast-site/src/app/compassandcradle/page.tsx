import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

const bundleItems = [
  {
    title: "Custom Shopify Website",
    value: "$6,000",
    details: [
      "Custom sections",
      "Advanced design",
      "Improved PDP template",
      "Improved collection template",
      "Brand system applied",
      "Animations + UX polish",
    ],
    note: "Not included: Product upload, long-form content, custom apps",
  },
  {
    title: "20 AI Product Images",
    value: "$1,400",
    subtitle: "20 × $70",
    details: ["Studio + lifestyle mix", "Retouched + branded", "Optimised for Shopify"],
  },
  {
    title: "Product Titles + Descriptions",
    value: "$1,000",
    subtitle: "20 products × $50",
    details: ["New title", "Short description", "Long description", "Benefits bullets", "Specs block"],
  },
  {
    title: "Meta Tracking + CAPI Setup",
    value: "$1,000",
    subtitle: "Full configuration",
    details: ["Pixel configuration", "Conversion API setup", "Event tracking"],
  },
  {
    title: "Ad Creative",
    value: "$1,600",
    subtitle: "8 ads (2 per week) × $200",
    details: ["Editing", "Text overlays", "Copy + headline", "Export-ready"],
  },
  {
    title: "Meta Ads Management",
    value: "$1,600",
    subtitle: "1 month (4 weeks × $400)",
    details: [
      "Running + testing ads",
      "Scaling",
      "Weekly reporting",
      "Weekly call",
      "Catalogue management",
      "Creative refreshes",
    ],
  },
];

const sampleProducts = [
  {
    title: "Cray Cray on Vacay | Kids Terry Toweling Set",
    price: "$40.00 AUD",
    badge: "Best Seller",
    reviews: "(3 reviews)",
  },
  {
    title: "Snack Provider | Matching Family T-shirts Beige",
    price: "$26.00 AUD",
    reviews: "(1 review)",
  },
  {
    title: "Requires Snacks | Kids T-shirt Sandy Beige",
    price: "$24.00 AUD",
    reviews: "(3 reviews)",
  },
  {
    title: "Kids Cap (Ages 1-6) | Barefoot Bandit",
    price: "$24.00 AUD",
    compare: "$30.00",
    badge: "Sale",
  },
  {
    title: "Mamacita Mum Cap | Blue",
    price: "$26.00 AUD",
  },
  {
    title: "Cray Cray on Vacay | Beach Bag Beige",
    price: "$25.00 AUD",
    badge: "Popular",
    reviews: "(2 reviews)",
  },
  {
    title: "Baby on Board | Car Sticker White",
    price: "$6.00 AUD",
    compare: "$10.00",
  },
  {
    title: "Little Rippers On Board | Car Sticker",
    price: "$6.00 AUD",
    compare: "$10.00",
  },
];

const testimonials = [
  {
    initials: "SM",
    name: "Sarah M.",
    location: "Sydney, NSW",
    quote:
      '"My daughter lights up every time we match. The quality is amazing and they\'ve survived countless washes. Worth every cent!"',
  },
  {
    initials: "JT",
    name: "Jessica T.",
    location: "Perth, WA",
    quote:
      '"Finally, matching outfits that don\'t look daggy! Our holiday photos were a hit."',
  },
  {
    initials: "LR",
    name: "Lauren R.",
    location: "Melbourne, VIC",
    quote:
      '"My kids love seeing all their outfit matching friends. Great quality and I love that a portion goes to charity."',
  },
];

export const metadata: Metadata = {
  title: "Compass & Cradle Proposal — Labcast",
  description:
    "Labcast’s full 360 ecommerce bundle proposal for Compass & Cradle. Shopify rebuild, AI imagery, copy, tracking, ads, and ongoing management.",
  alternates: {
    canonical: "https://labcast.com.au/compassandcradle",
  },
};

export default function CompassAndCradlePage() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen">
        {/* Intro */}
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
              Proposal for Compass &amp; Cradle
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Hi! This page outlines our recommended bundle for your Shopify rebuild. Everything below is what
              we&apos;d deliver as part of the project, ricing, inclusions, and a sample of the homepage hero we would
              create. This isn&apos;t a contract, just a starting point. We can adjust anything based on your feedback.
            </p>
          </div>
        </section>

        {/* Hero */}
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto text-center border border-border rounded-2xl px-8 py-12 bg-background-alt">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Complete Launch Package</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Full 360 Ecommerce Bundle
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-8">
              Shopify rebuild, 20 product images, 20 product descriptions, 8 ads, tracking setup, and 1 month of
              management.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
              <span className="text-4xl md:text-5xl font-semibold tracking-tight">$7,300</span>
              <span className="text-lg text-muted line-through">$12,600</span>
            </div>
            <p className="text-sm text-muted">
              Save <span className="text-foreground font-semibold">$5,300</span> on bundled services
            </p>
          </div>
        </section>

        {/* Bundle items */}
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">What&apos;s included</p>
            <div className="border border-border rounded-2xl divide-y divide-border bg-background-alt">
              {bundleItems.map((item, index) => (
                <article key={item.title} className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                      {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
                    </div>
                    <span className="text-lg font-semibold text-foreground/90">{item.value}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted mb-3">
                    {item.details.map((detail) => (
                      <span
                        key={detail}
                        className="px-3 py-1 rounded-full border border-border text-foreground/70 bg-background"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  {item.note && (
                    <p className="text-xs text-muted">
                      <span className="font-semibold text-foreground/80">Not included:</span> {item.note.replace("Not included: ", "")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto bg-background-alt border border-border rounded-2xl p-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-muted line-through">
              <span>Total value at normal pricing</span>
              <span>$12,600</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">You save</span>
              <span className="font-semibold text-foreground">$5,300</span>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-lg font-medium">Bundle price</span>
              <span className="text-3xl font-semibold tracking-tight">$7,300</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted mb-6">Ready to launch something that actually works?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Let&apos;s talk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs text-muted mt-4">
              This is a bundled service offering, not a contract. Scope and deliverables confirmed before we start.
            </p>
          </div>
        </section>

        {/* Compass & Cradle sample site mock */}
        <section className="bg-[#FAF8F5] border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
            <div className="max-w-3xl mx-auto text-center text-sm text-muted leading-relaxed">
              The section below is a working mockup. Buttons and links are not active. Its purpose is to show the layout
              and feel of the final homepage. Before development begins, you&apos;ll have the opportunity to request
              changes, adjustments, and refinements.
            </div>
            <div className="text-center text-xs uppercase tracking-[0.2em] text-muted">
              Compass &amp; Cradle mock site
            </div>

            <div className="rounded-2xl border border-[#E8DFD3] overflow-hidden bg-white shadow-sm">
              {/* Announcement */}
              <div className="bg-[#172554] text-white text-center text-sm py-3 px-4">
                Free shipping on orders over $89 AUD |{" "}
                <a href="#" className="underline underline-offset-2 text-[#D4BC9A]">
                  10% of profits go to Destiny Rescue
                </a>
              </div>

              {/* Header */}
              <div className="px-6 md:px-10 py-6 border-b border-[#E8DFD3] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#172554]">Compass &amp; Cradle</p>
                </div>
                <div className="flex gap-3 text-xs text-[#172554]">
                  {["Shop All", "Matching Tees", "Accessories", "Bundles", "Our Story"].map((item) => (
                    <span key={item} className="hidden md:inline hover:underline cursor-pointer">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero */}
              <div className="grid md:grid-cols-[1fr_1.1fr] gap-0 min-h-[600px]">
                {/* Content Side */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 order-2 md:order-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D] mb-3">New arrival</p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#172554] leading-[1.1] mb-3">
                    <span className="text-[#C4A77D]">Cray Cray</span> on Vacay
                  </h2>
                  <p className="text-xl md:text-2xl italic text-[#64748b] font-serif mb-5">
                    Oversized Beach Bag for families on the go
                  </p>
                  <p className="text-[#64748b] leading-relaxed mb-6 max-w-lg">
                    Built for chaos, styled for you. External pocket for quick grabs, internal pocket for valuables.
                    Matches our Kids Terry Toweling Set.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {[
                      { icon: "♡", text: "10% to Destiny Rescue" },
                      { icon: "★", text: "Premium quality" },
                      { icon: "✈", text: "Free shipping $89+" },
                    ].map((feature) => (
                      <span
                        key={feature.text}
                        className="inline-flex items-center gap-2 text-sm text-[#172554] font-medium"
                      >
                        <span className="text-[#C4A77D]">{feature.icon}</span>
                        {feature.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#172554] text-white text-sm font-semibold hover:bg-[#1e3a8a] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Shop the Bag — $25
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#172554] text-sm font-semibold text-[#172554] hover:bg-[#172554] hover:text-white transition-colors"
                    >
                      See the full collection
                    </Link>
                  </div>
                </div>

                {/* Image Composition Side */}
                <div className="relative min-h-[400px] md:min-h-[600px] p-6 md:p-10 order-1 md:order-2">
                  {/* Main Image - Beach Bag Lifestyle */}
                  <div className="absolute left-[6%] top-1/2 -translate-y-1/2 w-[65%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl z-10">
                    <Image
                      src="/cray-cray-lifestyle.jpg"
                      alt="Cray Cray on Vacay beach bag by the pool with matching cap"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Secondary Image - Product Shot */}
                  <div className="absolute right-[6%] bottom-[10%] w-[40%] aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
                    <Image
                      src="/cray-cap.jpg"
                      alt="Cray Cap - Blue washed cap with lobster embroidery"
                      fill
                      className="object-cover"
                    />
                  </div>

                </div>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-t border-b border-[#E8DFD3] px-6 md:px-10 py-5 text-sm text-[#64748b] bg-white">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    ),
                    text: "Free shipping over $89",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    ),
                    text: "Easy 30-day returns",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    ),
                    text: "Premium materials",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    ),
                    text: "10% to Destiny Rescue",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-[#172554]">
                    <span className="text-[#172554]">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Collections */}
              <div className="px-6 md:px-10 py-16 space-y-8 bg-[#FAF8F5]">
                <div className="text-center space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Shop by collection</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#172554]">Find Your Family&apos;s Vibe</h3>
                  <p className="text-[#64748b] max-w-xl mx-auto">
                    From beach days to backyard hangs, we&apos;ve got matching looks for every adventure.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    {
                      title: "Matching Tees",
                      text: "Coordinated looks for the whole crew",
                    },
                    {
                      title: "Vacation Essentials",
                      text: "Holiday-ready matching sets",
                    },
                    {
                      title: "Accessories",
                      text: "Caps, bags & finishing touches",
                    },
                  ].map((collection) => (
                    <div
                      key={collection.title}
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                    >
                      {/* Simple shared gradient placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E6] via-[#e9e1d7] to-[#172554] transition-transform duration-500 group-hover:scale-105" />
                      {/* Soft fade at the top, no icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/40" />
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="font-serif text-2xl mb-2">{collection.title}</h4>
                        <p className="text-sm text-white/80 mb-4">{collection.text}</p>
                        <span className="text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          Shop Now
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="px-6 md:px-10 py-16 space-y-8 bg-white">
                <div className="text-center space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Customer favourites</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#172554]">Best Sellers</h3>
                  <p className="text-[#64748b]">The pieces our families can&apos;t stop wearing.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {sampleProducts.map((product, index) => (
                    <div
                      key={product.title}
                      className="group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                    >
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[#F5F0E8] to-[#e8dfd3] mb-4 relative overflow-hidden">
                        {product.badge && (
                          <span
                            className={`absolute top-3 left-3 text-[10px] uppercase tracking-[0.15em] font-bold px-2.5 py-1 rounded-md ${
                              product.badge === "Sale"
                                ? "bg-[#C4A77D] text-white"
                                : "bg-[#172554] text-white"
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}
                        {/* Quick add button */}
                        <button className="absolute bottom-3 left-3 right-3 bg-[#172554] text-white py-2.5 rounded-lg text-xs font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                          Quick add
                        </button>
                      </div>
                      <h4 className="text-sm font-medium text-[#172554] leading-snug mb-1 line-clamp-2">
                        {product.title}
                      </h4>
                      <p className="text-base font-serif text-[#172554] mb-1">
                        {product.price}{" "}
                        {product.compare && (
                          <span className="text-sm text-[#94a3b8] line-through ml-1">{product.compare}</span>
                        )}
                      </p>
                      {product.reviews && (
                        <p className="text-xs text-[#94a3b8]">
                          <span className="text-[#C4A77D]">★★★★★</span> {product.reviews}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center pt-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#172554] text-sm font-semibold text-[#172554] hover:bg-[#172554] hover:text-white transition-colors"
                  >
                    View all products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Story */}
              <div className="px-6 md:px-10 py-16 space-y-8 bg-[#F5F0E8]">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Image placeholder with illustration */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8dfd3] to-[#d4c4a8]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D] mb-3">Our story</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#172554] mb-5 leading-tight">
                      Designed by a Perth Mum, Made with Love
                    </h3>
                    <p className="text-[#64748b] mb-4 leading-relaxed">
                      Compass &amp; Cradle started with a simple idea: family moments are better when you&apos;re matching.
                      Every piece is designed to be comfortable enough for real life and cute enough for the &quot;gram.
                    </p>
                    <p className="text-[#64748b] mb-6 leading-relaxed">
                      We believe in quality over quantity, and that&apos;s why we release limited batches of each design.
                      When it&apos;s gone, it&apos;s gone.
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          icon: (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                          ),
                          text: "Premium quality materials",
                        },
                        {
                          icon: (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                          ),
                          text: "10% of profits to Destiny Rescue",
                        },
                        {
                          icon: (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                          ),
                          text: "Limited batches, unique designs",
                        },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-4">
                          <span className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD3] flex items-center justify-center text-[#172554]">
                            {item.icon}
                          </span>
                          <span className="text-sm font-medium text-[#172554]">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission */}
              <div className="relative px-6 md:px-10 py-20 bg-gradient-to-br from-[#172554] to-[#1e3a8a] text-white overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/5" />

                <div className="relative max-w-3xl mx-auto text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Clothing with a purpose</p>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                    10% of profits go to Destiny Rescue
                  </h3>
                  <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg">
                    When you shop with Compass &amp; Cradle, you&apos;re helping protect children from trafficking and
                    exploitation. Every purchase makes a difference.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#172554] text-sm font-semibold hover:bg-[#F5F0E8] transition-colors"
                    >
                      Learn more about the mission
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="px-6 md:px-10 py-16 space-y-8 bg-[#FAF8F5]">
                <div className="text-center space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Happy families</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#172554]">What our customers say</h3>
                  <p className="text-[#64748b]">Real reviews from real families across Australia.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.name}
                      className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-[#E8DFD3]/50"
                    >
                      <div className="flex items-center gap-1 text-[#C4A77D] text-lg mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[#64748b] italic mb-6 leading-relaxed">{testimonial.quote}</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-[#E8DFD3]/50">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#172554] to-[#1e3a8a] flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#172554]">{testimonial.name}</p>
                          <p className="text-xs text-[#94a3b8]">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram */}
              <div className="py-16 space-y-8 bg-white overflow-hidden">
                <div className="text-center space-y-3 px-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">@compassandcradle</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#172554]">Join the squad</h3>
                  <p className="text-[#64748b]">Tag us in your matching moments for a chance to be featured.</p>
                </div>
                <div className="flex gap-2 -mx-2">
                  {[
                    "from-[#e8dfd3] to-[#d4c4a8]",
                    "from-[#d4c4a8] to-[#c4a77d]",
                    "from-[#172554]/20 to-[#1e3a8a]/30",
                    "from-[#c4a77d] to-[#d4bc9a]",
                    "from-[#F5F0E8] to-[#e8dfd3]",
                    "from-[#d4bc9a] to-[#e8dfd3]",
                  ].map((gradient, index) => (
                    <div
                      key={index}
                      className="group flex-1 aspect-square relative cursor-pointer overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-[#172554] opacity-0 group-hover:opacity-40 transition-opacity duration-200" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <a
                    href="https://instagram.com/compassandcradle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#172554] hover:text-[#C4A77D] transition-colors"
                  >
                    Follow us on Instagram
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="px-6 md:px-10 py-16 space-y-6 bg-[#F5F0E8]">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#172554]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#172554]">Join the family</h3>
                  <p className="text-[#64748b] max-w-xl mx-auto">
                    Be the first to know about new collections, exclusive offers, and family-friendly content.
                    No spam, just good vibes.
                  </p>
                </div>
                <div className="max-w-lg mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 rounded-lg border border-[#E8DFD3] px-5 py-3.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#172554]/20 focus:border-[#172554] transition-all"
                    />
                    <button className="rounded-lg bg-[#172554] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#1e3a8a] transition-colors whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-[#94a3b8] text-center mt-4">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3] bg-[#172554] text-white rounded-b-2xl">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <p className="text-xs tracking-[0.3em] uppercase">Compass &amp; Cradle</p>
                    <p className="text-sm text-white/70">
                      Matching family apparel designed by a Perth mum. Making memories, one matching outfit at a time.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3 text-white/60">Shop</p>
                    <div className="space-y-2 text-sm text-white/80">
                      {["All products", "Matching tees", "Accessories", "Bundles", "Sale"].map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3 text-white/60">Help</p>
                    <div className="space-y-2 text-sm text-white/80">
                      {["Size guide", "Shipping info", "Returns", "FAQs", "Contact"].map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3 text-white/60">About</p>
                    <div className="space-y-2 text-sm text-white/80">
                      {["Our story", "Destiny Rescue", "Sustainability", "Privacy", "Terms"].map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-white/60 border-t border-white/10 pt-4">
                  © 2025 Compass &amp; Cradle. All rights reserved. Made with ♡ in Perth, Australia.
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

