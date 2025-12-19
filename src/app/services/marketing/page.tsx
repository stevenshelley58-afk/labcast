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
    let observer: IntersectionObserver | null = null;

    const initObserver = () => {
      // Use data attribute for reliable selection
      const elements = Array.from(
        document.querySelectorAll('[data-fade-in]')
      ) as HTMLElement[];

      if (elements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add(styles.visible);
              observer?.unobserve(target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "0px",
        }
      );

      // Check initial visibility and observe
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < viewportHeight && rect.bottom > 0;

        if (isInView) {
          // Element is already visible, add class immediately
          requestAnimationFrame(() => {
            el.classList.add(styles.visible);
          });
        } else {
          // Observe for scroll
          observer?.observe(el);
        }
      });
    };

    // Initialize with multiple attempts for mobile reliability
    const init = () => {
      initObserver();
      // Retry after a short delay in case DOM isn't ready
      setTimeout(initObserver, 100);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
      // Also try immediately
      setTimeout(init, 0);
    }

    return () => {
      window.removeEventListener('load', init);
      if (observer) {
        observer.disconnect();
      }
    };
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

        {/* Partner Section */}
        <section className={styles.partnerSection}>
          <div className={styles.partnerContainer}>
            <div className={styles.partnerCopy}>
              {/* Beat 1: H2 */}
              <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-10`} data-fade-in>
                Stop fighting Meta.<br />Partner with it.
              </h2>

              {/* Beat 2: Subhead */}
              <p className={`${styles.fadeIn} ${styles.partnerSubhead}`} data-fade-in>
                You can&apos;t beat a trillion-dollar algorithm with $50 hacks and audience exclusions.
              </p>

              {/* Pull quote */}
              <div className={`${styles.fadeIn} ${styles.pullQuote}`} data-fade-in>
                The algorithm isn&apos;t your enemy. It&apos;s your employee.
              </div>

              {/* Body */}
              <div className={`${styles.fadeIn} ${styles.partnerBody}`} data-fade-in>
                <p>The rules changed. Meta&apos;s new AI models broke the old playbook — legacy account structures, manual audiences, last year&apos;s tactics. If you&apos;re still running ads that way, you&apos;re fighting uphill.</p>
                <p>We lean into platform changes, not against them. Modernize your setup. Turn volatile into predictable.</p>
              </div>

              {/* Founder callout */}
              <div className={`${styles.fadeIn} ${styles.founderCallout}`} data-fade-in>
                <h3>Run by founders,<br />not account managers.</h3>
                <p>We own BHM.com.au. Every tactic we suggest has been tested on our own store, with our own money.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Growth Framework */}
        <section className={styles.frameworkSection}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-10`} data-fade-in>
            Growth Framework
          </h2>

          <div className={styles.timeline}>
            <div className={`${styles.fadeIn} ${styles.timelineItem}`} data-fade-in>
              <div className={styles.timelineDot}></div>
              <h4 className="font-serif text-xl text-text-ink mb-2">Fix the tracking</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We validate or install your Pixel and Conversions API. Events get mapped properly. Deduplication gets configured. No more guessing if your data is right.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`} data-fade-in>
              <div className={styles.timelineDot}></div>
              <h4 className="font-serif text-xl text-text-ink mb-2">Test what converts</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We deploy 6-8 performance ads with a small test budget. Different angles, different hooks. We&apos;re looking for the one that actually moves people to buy.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`} data-fade-in>
              <div className={styles.timelineDot}></div>
              <h4 className="font-serif text-xl text-text-ink mb-2">Check the math</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                Platform ROAS lies. We reconcile what Meta says against what your bank account says. MER, LTV, true margins. We find the real numbers.
              </p>
            </div>

            <div className={`${styles.fadeIn} ${styles.timelineItem}`} data-fade-in>
              <div className={styles.timelineDot}></div>
              <h4 className="font-serif text-xl text-text-ink mb-2">Build the roadmap</h4>
              <p className="text-text-subtle text-sm leading-relaxed" style={{ maxWidth: "500px" }}>
                We deliver a 90-day plan: account structure, winning audiences, and the next 12 creative tests. Everything you need to scale or hand off.
              </p>
            </div>
          </div>

          <div className={`${styles.fadeIn} ${styles.priceBlock}`} data-fade-in>
            <span className={styles.amount}>$4,500</span>
            <div className={styles.priceDetail}>
              <span>4 weeks, delivered remotely</span>
              <span className={styles.priceDetailSub}>This is where every project starts.</span>
            </div>
          </div>

          <div className={`${styles.fadeIn} ${styles.afterNote}`} data-fade-in>
            <p>
              <strong className="text-text-ink">What you get:</strong> Your data infrastructure fully installed and verified, plus a detailed framework on how to keep scaling. Custom-built over four weeks specifically for your business, never a copy/paste solution. Use it internally, or partner with us ongoing.
            </p>
          </div>

          <div className={`${styles.fadeIn} ${styles.customCallout}`} data-fade-in>
            <p className={styles.calloutMain}>We work with businesses at every stage.</p>
            <p className={styles.calloutSub}>Need rapid creative, a quick install, or something custom? Get in touch below and we&apos;ll put together a plan.</p>
          </div>
        </section>

        {/* Footer CTA */}
        <section className={styles.footerCta}>
          <h2 className={`${styles.fadeIn} font-serif text-3xl md:text-4xl font-normal text-text-ink mb-6`} data-fade-in>
            Ready to talk?
          </h2>
          <p className={`${styles.fadeIn} text-text-subtle mb-8`} style={{ maxWidth: "400px", textAlign: "center" }} data-fade-in>
            Tell us about your brand and what&apos;s not working.
            <br />
            No sales pitch, just a conversation to see if we can help.
          </p>
          <Button as="a" href="/#contact" size="lg" className={styles.fadeIn} data-fade-in>
            Get in touch
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
