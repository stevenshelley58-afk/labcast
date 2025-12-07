import { PageSection } from "@/ui/PageSection";

/**
 * Founders introduction section displayed after the hero.
 * Introduces Em & Steve and explains the origin of Labcast.
 *
 * @example
 * ```tsx
 * import { FoundersIntro } from "./components/FoundersIntro";
 *
 * <FoundersIntro />
 * ```
 */
export function FoundersIntro() {
  return (
    <PageSection border="top">
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15]">
          We&apos;re Em &amp; Steve.
        </h2>
        <p className="text-muted">
          We built BHM. It&apos;s not your standard furniture store. We import
          one-of-a-kind vintage pieces and reclaimed treasures from Rajasthan,
          selling them to homes all over Australia.
        </p>
        <p className="text-muted">
          We didn&apos;t hire an agency to do it. We handled every single part
          of the business ourselves—from the Meta ads and email flows to the
          product photography and the Shopify build. No outsourcing. Just
          figuring out what actually works.
        </p>
        <p className="text-foreground font-medium">
          Labcast is that knowledge, packaged for other founders.
        </p>
      </div>
    </PageSection>
  );
}
