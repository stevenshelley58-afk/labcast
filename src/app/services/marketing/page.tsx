"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";
import { Footer } from "@/app/components/footer";
import { Navigation } from "@/app/components/navigation";
import styles from "./marketing.module.css";

/**
 * Marketing services page featuring Meta ads offerings.
 * Includes chaos-to-signal hero animation, comparison table, timeline, and pricing.
 *
 * @example
 * ```tsx
 * <MarketingServicesPage />
 * ```
 */
export default function MarketingServicesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(`.${styles.fadeIn}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Suppress unused variable warning - scrollY used for potential scroll effects
  void scrollY;

  return (
    <div className="bg-background text-foreground">
      <Navigation />

      <main className="min-h-screen">
        {/* Hero - SVG Chaos to Signal */}
        <section className={styles.hero}>
          <div className={styles.svgContainer}>
            <svg viewBox="0 0 900 200" className={styles.heroSvg}>
              <defs>
                <linearGradient id="fade-left" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--rv-color-canvas)" />
                  <stop offset="100%" stopColor="var(--rv-color-canvas)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="fade-right" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--rv-color-canvas)" stopOpacity="0" />
                  <stop offset="100%" stopColor="var(--rv-color-canvas)" />
                </linearGradient>
              </defs>

              {/* Chaotic Lines (Left) */}
              <g style={{ opacity: 0.5 }}>
                <path
                  className={styles.squiggle1}
                  d="M0,50 Q80,20 120,80 T200,40 T280,100 T380,60"
                  fill="none"
                  stroke="var(--rv-color-ink)"
                  strokeWidth="1.5"
                />
                <path
                  className={styles.squiggle2}
                  d="M0,100 Q60,140 100,80 T180,130 T260,70 T380,100"
                  fill="none"
                  stroke="var(--rv-color-ink)"
                  strokeWidth="1.5"
                />
                <path
                  className={styles.squiggle3}
                  d="M0,150 Q90,110 140,160 T220,100 T300,150 T380,100"
                  fill="none"
                  stroke="var(--rv-color-ink)"
                  strokeWidth="1.5"
                />
                <path
                  className={styles.squiggle4}
                  d="M0,80 Q40,60 80,100 T160,60 T240,110 T320,80 T380,100"
                  fill="none"
                  stroke="var(--rv-color-muted)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </g>

              {/* Center Box */}
              <g transform="translate(380, 50)">
                <rect x="0" y="0" width="140" height="100" fill="var(--rv-color-ink)" rx="4" />
              </g>

              {/* Clean Lines (Right) */}
              <g transform="translate(520, 0)">
                <line x1="0" y1="70" x2="380" y2="70" stroke="var(--rv-color-ink)" strokeWidth="2" style={{ opacity: 0.8 }} />
                <line x1="0" y1="100" x2="380" y2="100" stroke="var(--rv-color-ink)" strokeWidth="2" style={{ opacity: 0.8 }} />
                <line x1="0" y1="130" x2="380" y2="130" stroke="var(--rv-color-ink)" strokeWidth="2" style={{ opacity: 0.8 }} />

                <circle className={styles.packet} cx="0" cy="70" r="4" fill="var(--rv-color-ink)" />
                <circle className={`${styles.packet} ${styles.packet2}`} cx="0" cy="100" r="4" fill="var(--rv-color-ink)" />
                <circle className={`${styles.packet} ${styles.packet3}`} cx="0" cy="130" r="4" fill="var(--rv-color-ink)" />
              </g>

              {/* Fade edges */}
              <rect x="0" y="0" width="80" height="200" fill="url(#fade-left)" />
              <rect x="820" y="0" width="80" height="200" fill="url(#fade-right)" />
            </svg>
          </div>
          <div className={styles.heroCenter}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-text-ink mb-5">
              Hate Ads?
            </h1>
            <p className={styles.heroSub}>
              We verify your data infrastructure and reset your Meta system to move you from ad chaos into a measurable, scalable system.
            </p>
          </div>
        </section>

        {/* The Approach */}
        <section className={styles.section}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-10`}>
            Stop fighting Meta. Partner with it.
          </h2>
          <div className={`${styles.fadeIn} ${styles.heroSub}`} style={{ maxWidth: "650px" }}>
            <p className="mb-6">
              You can&apos;t beat a trillion-dollar algorithm with $50 hacks and audience exclusions.
            </p>
            <p className="mb-6">The algorithm isn&apos;t your enemy. It&apos;s your employee.</p>
            <p className="mb-6">
              But lately, the rules of the house have changed. Old account structures are breaking under the weight of Meta&apos;s new AI models. If you&apos;re still running ads the way you did last year, you&apos;re fighting an uphill battle.
            </p>
            <p>
              We don&apos;t fight the platform changes; we lean into them. We modernize your setup to match what the algorithm now wants, turning a volatile account into a predictable one.
            </p>
          </div>

          {/* Founder Proof */}
          <div className={`${styles.fadeIn} ${styles.founderBlock}`}>
            <h3 className="font-serif text-2xl font-normal text-text-ink mb-4">
              Run by founders, not account managers.
            </h3>
            <div className="text-text-subtle leading-relaxed" style={{ maxWidth: "600px" }}>
              <p className="mb-4">We aren&apos;t just an agency; we are the owners of BHM.com.au.</p>
              <p className="mb-4">
                Every strategy, creative format, or bidding tactic we suggest for you has already been battle-tested on our own store, with our own credit card.
              </p>
              <p>We treat your ad account with the same paranoia and discipline we treat our own.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className={`${styles.fadeIn} ${styles.comparisonSection}`}>
            <div className={styles.comparisonTable}>
              <div className={styles.comparisonHeader}>
                <div></div>
                <div className={styles.colAgency}>Agencies</div>
                <div className={styles.colLabcast}>Labcast</div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.comparisonCat}>Strategy</div>
                <div className={`${styles.comparisonCell} ${styles.agency}`}>
                  <h4>Guess &amp; Pray</h4>
                  <p>Random boosts, testing based on &quot;feel,&quot; hoping for a hit.</p>
                </div>
                <div className={`${styles.comparisonCell} ${styles.labcast}`}>
                  <h4>Scientific Method</h4>
                  <p>Isolated tests for Offer, Angle, and Creative. Don&apos;t scale until it prints money.</p>
                </div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.comparisonCat}>Creative</div>
                <div className={`${styles.comparisonCell} ${styles.agency}`}>
                  <h4>Pretty Pictures</h4>
                  <p>Looks great in portfolio, ignored in feed.</p>
                </div>
                <div className={`${styles.comparisonCell} ${styles.labcast}`}>
                  <h4>Performance Assets</h4>
                  <p>Stop the scroll. If it doesn&apos;t convert, kill it.</p>
                </div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.comparisonCat}>Metric</div>
                <div className={`${styles.comparisonCell} ${styles.agency}`}>
                  <h4>Platform ROAS</h4>
                  <p>Credit for customers buying anyway.</p>
                </div>
                <div className={`${styles.comparisonCell} ${styles.labcast}`}>
                  <h4>Bank Balance</h4>
                  <p>MER only. No profit = no ad.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Growth Framework */}
        <section className={styles.frameworkSection}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-4`}>
            The Growth Framework
          </h2>
          <p className={`${styles.fadeIn} ${styles.heroSub}`} style={{ maxWidth: "600px", margin: "0 0 32px 0" }}>
            We start every project the same way. Four weeks to fix what&apos;s broken, test what might work, and build a plan you can actually execute.
          </p>

          <div className={styles.timeline}>
            <div className={`${styles.fadeIn} ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineWeek}>Week 1</span>
              <h4 className="font-serif text-xl text-text-ink mb-2">Fix the tracking</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We validate or install your Pixel and Conversions API. Events get mapped properly. Deduplication gets configured. No more guessing if your data is right.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineWeek}>Week 2</span>
              <h4 className="font-serif text-xl text-text-ink mb-2">Test what converts</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We deploy 6-8 performance ads with a small test budget. Different angles, different hooks. We&apos;re looking for the one that actually moves people to buy.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineWeek}>Week 3</span>
              <h4 className="font-serif text-xl text-text-ink mb-2">Check the math</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                Platform ROAS lies. We reconcile what Meta says against what your bank account says. MER, LTV, true margins. We find the real numbers.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineWeek}>Week 4</span>
              <h4 className="font-serif text-xl text-text-ink mb-2">Build the roadmap</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We deliver a 90-day plan: account structure, winning audiences, and the next 12 creative tests. Everything you need to scale or hand off.
              </p>
            </div>
          </div>

          <div className={`${styles.fadeIn} ${styles.priceBlock}`}>
            <span className={styles.amount}>$4,500</span>
            <div className={styles.priceDetail}>
              <span>4 weeks, delivered remotely</span>
              <span className={styles.priceDetailSub}>This is where every project starts.</span>
            </div>
          </div>

          <div className={`${styles.fadeIn} ${styles.afterNote}`}>
            <p>
              <strong className="text-text-ink">What you get:</strong> Your data infrastructure fully installed and verified, plus a detailed framework on how to keep scaling. Custom-built over four weeks specifically for your business, never a copy/paste solution. Use it internally, or partner with us ongoing.
            </p>
          </div>

          <div className={`${styles.fadeIn} ${styles.customCallout}`}>
            <p className={styles.calloutMain}>We work with businesses at every stage.</p>
            <p className={styles.calloutSub}>Need rapid creative, a quick install, or something custom? Get in touch below and we&apos;ll put together a plan.</p>
          </div>
        </section>

        {/* Footer CTA */}
        <section className={styles.footerCta}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-6`}>
            Ready to talk?
          </h2>
          <p className={`${styles.fadeIn} text-text-subtle mb-8`} style={{ maxWidth: "400px", textAlign: "center" }}>
            Tell us about your brand and what&apos;s not working.
            <br />
            No sales pitch, just a conversation to see if we can help.
          </p>
          <Button as="a" href="/#contact" size="lg" className={styles.fadeIn}>
            Get in touch
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
