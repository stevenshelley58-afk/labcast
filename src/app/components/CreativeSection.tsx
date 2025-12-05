"use client";

import Link from "next/link";
import { PageSection } from "@/ui/PageSection";
import TactileReveal from "@/rendervault/components/TactileReveal";

/**
 * Creative services section featuring RenderVault before/after imagery.
 * Uses interactive TactileReveal slider to showcase AI product photography transformation.
 *
 * @example
 * ```tsx
 * <CreativeSection />
 * ```
 */
export function CreativeSection() {
  return (
    <PageSection tone="surface" border="top">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm text-muted mb-4">Creative</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-6">
            Creative that doesn&apos;t look AI, but scales like it
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            Product imagery without the photoshoot price tag. AI-powered visuals that look natural, not plastic. Powered by RenderVault.
          </p>
          <ul className="space-y-3 text-base text-muted mb-6">
            <li className="flex items-start">
              <span className="mr-3 text-foreground">—</span>
              <span>AI product photography</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-foreground">—</span>
              <span>Lifestyle &amp; hero imagery</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-foreground">—</span>
              <span>Ad creative at scale</span>
            </li>
          </ul>
          <Link href="/render-vault" className="inline-block text-sm text-foreground hover:underline">
            Learn about Render Vault →
          </Link>
        </div>
        <div className="w-full">
          <TactileReveal
            beforeImage="/images/apparel-before.png"
            afterImage="/images/apparel-after.png"
            className="aspect-square w-full"
            priority={false}
          />
        </div>
      </div>
    </PageSection>
  );
}