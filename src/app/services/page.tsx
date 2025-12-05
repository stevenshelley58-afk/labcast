"use client";

import Link from "next/link";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";
import styles from "./services.module.css";

/**
 * Services overview page showing the three core service offerings.
 * Each service links to its detailed page.
 *
 * @example
 * ```tsx
 * <ServicesPage />
 * ```
 */
export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <Navigation />

      <main className="min-h-screen">
        {/* Hero */}
        <section className={styles.hero}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-text-ink mb-4">
            What <em className="italic">we do</em>
          </h1>
          <p className="text-lg text-text-subtle">Three ways we help you grow</p>
        </section>

        {/* Services */}
        <section className={styles.services}>
          {/* Marketing */}
          <article className={styles.service}>
            <span className={styles.serviceNumber}>01</span>
            <div className={styles.serviceContent}>
              <h2 className={styles.serviceTitle}>Marketing</h2>
              <p className={styles.serviceDescription}>
                Meta ads, email flows, growth strategy. The exact playbook we use to profitably scale BHM — now applied to your brand.
              </p>
              <ul className={styles.serviceList}>
                <li>Meta ads management &amp; creative strategy</li>
                <li>Analytics &amp; attribution setup</li>
              </ul>
              <Link href="/services/marketing" className={styles.serviceLink}>
                Learn about our marketing services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>

          {/* Creative */}
          <article className={styles.service}>
            <span className={styles.serviceNumber}>02</span>
            <div className={styles.serviceContent}>
              <h2 className={styles.serviceTitle}>Creative</h2>
              <p className={styles.serviceDescription}>
                Product imagery without the photoshoot price tag. AI-powered visuals that look natural, not plastic. Powered by RenderVault.
              </p>
              <ul className={styles.serviceList}>
                <li>AI product photography</li>
                <li>Lifestyle &amp; hero imagery</li>
                <li>Ad creative at scale</li>
              </ul>
              <Link href="/render-vault" className={styles.serviceLink}>
                Learn about RenderVault
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>

          {/* Build */}
          <article className={styles.service}>
            <span className={styles.serviceNumber}>03</span>
            <div className={styles.serviceContent}>
              <h2 className={styles.serviceTitle}>Build</h2>
              <p className={styles.serviceDescription}>
                Websites and apps that convert, not just look good. Clean code, fast load times, built for real business outcomes.
              </p>
              <ul className={styles.serviceList}>
                <li>Shopify &amp; custom ecom builds</li>
                <li>Landing pages that convert</li>
                <li>Web &amp; mobile apps</li>
              </ul>
              <Link href="/services/website" className={styles.serviceLink}>
                Learn about our build services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-text-ink mb-4">
              Start where <em className="italic">it hurts</em>
            </h2>
            <p className="text-text-subtle mb-8">
              You don&apos;t need all three services. Pick the one that&apos;s costing you the most — we&apos;ll dig in and fix it.
            </p>
            <Link href="/#contact" className={styles.btn}>
              Get in touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
