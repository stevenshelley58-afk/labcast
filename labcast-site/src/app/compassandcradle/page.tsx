import type { Metadata } from "next";
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

const sampleCollections = [
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
              we&apos;d deliver as part of the project — pricing, inclusions, and a sample of the homepage hero we
              would create. This isn&apos;t a contract, just a starting point. We can adjust anything based on your
              feedback.
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
            <div className="text-center text-xs uppercase tracking-[0.2em] text-muted">
              Compass &amp; Cradle mock site
            </div>

            <div className="rounded-2xl border border-[#E8DFD3] overflow-hidden bg-white shadow-sm">
              {/* Announcement */}
              <div className="bg-[#172554] text-white text-center text-sm py-3 px-4">
                ✨ Free shipping on orders over $89 AUD |{" "}
                <a href="#" className="underline underline-offset-2 text-[#D4BC9A]">
                  10% of profits go to Destiny Rescue
                </a>
              </div>

              {/* Header */}
              <div className="px-6 md:px-10 py-6 border-b border-[#E8DFD3] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#172554]">Compass &amp; Cradle</p>
                  <p className="text-xs text-[#64748b]">Perth, Australia</p>
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
              {/* Sample Compass & Cradle homepage hero (placeholder — replace with final design) */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 space-y-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">New arrival</h3>
                  <h2 className="font-serif text-4xl text-[#172554]">
                    <span className="text-[#C4A77D]">Cray Cray</span> on Vacay
                  </h2>
                  <p className="text-lg italic text-[#64748b]">Oversized Beach Bag for families on the go</p>
                  <p className="text-[#64748b] leading-relaxed">
                    Built to handle everyday chaos with style. Handy external pocket for quick-grab items, secure
                    internal pocket for keys or phone. Matches our Kids Terry Toweling Set — so you and your little ones
                    can show off that family bond.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {["10% to Destiny Rescue", "Premium quality", "Free shipping $89+"].map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full border border-[#E8DFD3] text-[#172554]">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172554] text-white text-sm font-medium"
                    >
                      Shop the Bag — $25
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#172554] text-sm font-medium text-[#172554]"
                    >
                      See the full collection
                    </Link>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="relative h-full min-h-[320px] rounded-2xl border border-[#E8DFD3] bg-gradient-to-br from-[#F5F0E8] to-[#E8DFD3] flex items-center justify-center text-center">
                    <div className="space-y-2 text-sm text-[#64748b] px-6">
                      <p className="text-[#172554] font-semibold">Image placeholder</p>
                      <p>Replace with Shopify image banner content.</p>
                      <p className="text-xs">
                        Suggested: lifestyle beach bag hero plus kids set thumbnail layered in corner.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust bar */}
              <div className="grid md:grid-cols-4 gap-4 border-t border-[#E8DFD3] px-6 md:px-10 py-6 text-sm text-[#64748b] bg-white">
                {["Free shipping over $89", "Easy 30-day returns", "Premium materials", "10% to Destiny Rescue"].map(
                  (item) => (
                    <div key={item} className="text-center md:text-left">
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Collections */}
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3]">
                <div className="text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Shop by collection</p>
                  <h3 className="font-serif text-3xl text-[#172554]">Find Your Family&apos;s Vibe</h3>
                  <p className="text-[#64748b]">
                    From beach days to backyard hangs, we&apos;ve got matching looks for every adventure.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {sampleCollections.map((collection) => (
                    <div key={collection.title} className="relative p-6 rounded-2xl bg-[#F5F0E8] text-[#172554]">
                      <h4 className="font-serif text-2xl mb-2">{collection.title}</h4>
                      <p className="text-sm text-[#64748b] mb-4">{collection.text}</p>
                      <span className="text-sm font-semibold inline-flex items-center gap-2">
                        Shop now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3]">
                <div className="text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Customer favourites</p>
                  <h3 className="font-serif text-3xl text-[#172554]">Best Sellers</h3>
                  <p className="text-[#64748b]">The pieces our families can&apos;t stop wearing.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {sampleProducts.map((product) => (
                    <div key={product.title} className="p-4 rounded-xl border border-[#E8DFD3] bg-white">
                      <div className="aspect-square rounded-lg bg-[#F5F0E8] mb-3 relative overflow-hidden">
                        {product.badge && (
                          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] bg-[#172554] text-white px-2 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-[#172554] leading-snug">{product.title}</h4>
                      <p className="text-sm font-serif text-[#172554]">
                        {product.price}{" "}
                        {product.compare && <span className="text-xs text-[#94a3b8] line-through">{product.compare}</span>}
                      </p>
                      {product.reviews && <p className="text-xs text-[#94a3b8]">★★★★★ {product.reviews}</p>}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#172554] text-sm font-medium text-[#172554]"
                  >
                    View all products
                  </Link>
                </div>
              </div>

              {/* Story */}
              <div className="px-6 md:px-10 py-12 space-y-8 border-t border-[#E8DFD3]">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="rounded-xl bg-[#E8DFD3] aspect-[4/5]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D] mb-3">Our story</p>
                    <h3 className="font-serif text-3xl text-[#172554] mb-4">
                      Designed by a Perth Mum, Made with Love
                    </h3>
                    <p className="text-[#64748b] mb-4">
                      Compass &amp; Cradle started with a simple idea: family moments are better when you&apos;re matching.
                      Every piece is designed to be comfortable enough for real life and cute enough for the &quot;gram.
                    </p>
                    <div className="space-y-3 text-sm text-[#172554]">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD3]" />
                        Premium quality materials
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD3]" />
                        10% of profits to Destiny Rescue
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD3]" />
                        Limited batches, unique designs
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission */}
              <div className="px-6 md:px-10 py-12 border-t border-[#E8DFD3] bg-gradient-to-br from-[#172554] to-[#1e3a8a] text-white space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70 text-center">Clothing with a purpose</p>
                <h3 className="font-serif text-3xl text-center">10% of profits go to Destiny Rescue</h3>
                <p className="text-center text-white/80 max-w-3xl mx-auto">
                  When you shop with Compass &amp; Cradle, you&apos;re helping protect children. This CTA block can be swapped
                  for a Shopify rich text section with brand gradient styling.
                </p>
                <div className="text-center">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#172554] text-sm font-medium"
                  >
                    Learn more about the mission
                  </Link>
                </div>
              </div>

              {/* Testimonials */}
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3]">
                <div className="text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">Happy families</p>
                  <h3 className="font-serif text-3xl text-[#172554]">What our customers say</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="p-6 rounded-2xl border border-[#E8DFD3] bg-white shadow-sm">
                      <p className="text-[#C4A77D] text-lg mb-3">★★★★★</p>
                      <p className="text-[#64748b] italic mb-4">{testimonial.quote}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#172554] font-semibold">
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
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3]">
                <div className="text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C4A77D]">@compassandcradle</p>
                  <h3 className="font-serif text-3xl text-[#172554]">Join the squad</h3>
                  <p className="text-[#64748b]">Tag us in your matching moments for a chance to be featured.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="aspect-square rounded-xl bg-[#F5F0E8]" />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="px-6 md:px-10 py-12 space-y-6 border-t border-[#E8DFD3] bg-[#F5F0E8]">
                <div className="text-center space-y-2">
                  <h3 className="font-serif text-3xl text-[#172554]">Join the family</h3>
                  <p className="text-[#64748b] max-w-2xl mx-auto">
                    Be the first to know about new collections, exclusive offers, and family-friendly content.
                  </p>
                </div>
                <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full border border-[#E8DFD3] px-4 py-3 text-sm bg-white"
                  />
                  <button className="rounded-full bg-[#172554] text-white px-6 py-3 text-sm font-medium">
                    Subscribe
                  </button>
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

