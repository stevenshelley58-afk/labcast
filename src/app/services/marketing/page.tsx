"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";
import { Footer } from "@/app/components/footer";
import { Navigation } from "@/app/components/navigation";
import styles from "./marketing.module.css";

/**
 * Marketing services page featuring Meta ads offerings.
 * Includes chaos-to-signal hero animation, comparison table, and pricing cards.
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
                <text
                  x="70"
                  y="45"
                  fill="var(--rv-color-panel)"
                  textAnchor="middle"
                  fontFamily="var(--rv-font-sans)"
                  fontSize="10"
                  fontWeight="600"
                  letterSpacing="0.15em"
                >
                  30 DAY
                </text>
                <text
                  x="70"
                  y="62"
                  fill="var(--rv-color-panel)"
                  textAnchor="middle"
                  fontFamily="var(--rv-font-sans)"
                  fontSize="10"
                  fontWeight="600"
                  letterSpacing="0.15em"
                >
                  RESET
                </text>
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
              Give us 30 days to clean up tracking, reset your Meta setup and turn the chaos into a system that works.
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

        {/* Pricing */}
        <section className={styles.pricingSection}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-4`}>
            How we can help
          </h2>
          <p className={`${styles.fadeIn} ${styles.heroSub}`}>
            Most brands start with the Reset. Then you decide if you want us to stay on, or just buy the creative fuel.
          </p>

          {/* Main Offer: 30 Day Reset */}
          <div className={`${styles.fadeIn} ${styles.bundleFeatured}`}>
            <div className={styles.bundleHeader}>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-text-ink mb-2">
                  30 Day Meta Reset
                </h3>
                <p className="text-text-subtle" style={{ maxWidth: "420px" }}>
                  One month to fix tracking, simplify structure, and find at least one angle we can scale profitably.
                </p>
              </div>
              <div className={styles.bundlePrice}>
                <span className={styles.amount}>$3,500</span>
                <span className="text-sm text-text-subtle">for 30 days</span>
              </div>
            </div>

            <div className={styles.deliverablesGrid}>
              <div className={styles.deliverableItem}>
                Tracking fixed. Pixel and CAPI installed or repaired and tested.
              </div>
              <div className={styles.deliverableItem}>
                Account restructured into a simple, scalable setup.
              </div>
              <div className={styles.deliverableItem}>
                8 ready to run ads created, launched, and tested.
              </div>
              <div className={styles.deliverableItem}>
                Clear read on what is working, what is wasting spend, and what to test next.
              </div>
            </div>

            <div className={styles.bundleNote}>
              <p>
                <strong className="text-text-ink">What happens after:</strong> At the end of 30 days you choose: keep us on weekly, keep the system and just buy creative, or pause.
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className={styles.optionsGrid}>
            <div className={`${styles.fadeIn} ${styles.optionCard}`}>
              <h4>Meta ads management</h4>
              <p className={styles.optionDesc}>
                Ongoing account management. We are in the account daily, testing, optimising, and scaling what works.
              </p>
              <div className={styles.optionIncludes}>
                <p>Includes</p>
                <ul>
                  <li>Daily account monitoring and optimisation</li>
                  <li>Weekly performance reporting</li>
                  <li>Ongoing creative rotation recommendations</li>
                  <li>Budget pacing and scaling decisions</li>
                  <li>Direct Slack or email access</li>
                </ul>
              </div>
              <div className={styles.optionPrice}>
                $400 <span>per week</span>
              </div>
              <p className={styles.optionBest}>
                Best if you want someone in the account every day while you focus on the rest of the business.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.optionCard}`}>
              <h4>Tracking and CAPI setup</h4>
              <p className={styles.optionDesc}>
                Full pixel and Conversions API setup, with events mapped properly to your funnel.
              </p>
              <div className={styles.optionIncludes}>
                <p>Includes</p>
                <ul>
                  <li>Meta Pixel installation or repair</li>
                  <li>Conversions API server-side setup</li>
                  <li>Event mapping for your specific funnel</li>
                  <li>Event deduplication configured</li>
                  <li>Testing and validation report</li>
                </ul>
              </div>
              <div className={styles.optionPrice}>
                $1,000 <span>once</span>
              </div>
              <p className={styles.optionBest}>
                Best if you manage ads yourself but need the foundation fixed first.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.optionCard}`}>
              <h4>Ready to run ads</h4>
              <p className={styles.optionDesc}>
                Static images, carousels, or simple video built to match your brand but look native in the feed.
              </p>
              <div className={styles.optionIncludes}>
                <p>Includes</p>
                <ul>
                  <li>Scroll-stopping concept and hook</li>
                  <li>Design matched to your brand</li>
                  <li>Primary text and headline copy</li>
                  <li>Multiple aspect ratios (1:1, 4:5, 9:16)</li>
                  <li>Source files included</li>
                </ul>
              </div>
              <div className={styles.optionPrice}>
                $200 <span>per ad</span>
              </div>
              <p className={styles.optionBest}>
                Best if you have strategy handled but need fresh creative on a regular basis.
              </p>
            </div>
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
