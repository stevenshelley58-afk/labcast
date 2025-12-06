import { PageSection } from "@/ui/PageSection";

/**
 * Marketing services section highlighting Meta ads, email flows, and growth strategy.
 * Focused on outcomes rather than long descriptions.
 *
 * @example
 * ```tsx
 * <MarketingSection />
 * ```
 */
export function MarketingSection() {
  return (
    <PageSection id="services" tone="surface" border="top" className="scroll-mt-24 min-h-[500px] flex items-center">
      <div className="max-w-3xl">
        <p className="text-sm text-muted mb-4">Marketing</p>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-6">
          Marketing that respects your margin
        </h2>
        <p className="text-lg text-muted leading-relaxed mb-6">
          Meta ads and lifecycle marketing for ecommerce brands. Built off the same system we use to profitably scale BHM.
        </p>
        <ul className="space-y-3 text-base text-muted">
          <li className="flex items-start">
            <span className="mr-3 text-foreground">—</span>
            <span>Diagnose what&apos;s actually broken in your account</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-foreground">—</span>
            <span>Design a simple, scalable Meta structure</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-foreground">—</span>
            <span>Tie decisions to MER, not platform ROAS</span>
          </li>
        </ul>
      </div>
    </PageSection>
  );
}