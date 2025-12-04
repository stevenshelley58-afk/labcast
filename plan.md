## Restore RenderVault Marketing Page

1. **Gather legacy sections**  
   - Files to pull from: `src/rendervault/components/Hero.tsx`, `ProofWall.tsx`, `PainContrast.tsx`, `HowItWorks.tsx`, `FounderSection.tsx`, `FAQ.tsx`, `Pricing.tsx`, and `Contact.tsx`. These already encapsulate the original imagery (TactileReveal grids, before/after cards, etc.).

2. **Rebuild `/rendervault/page.tsx`**  
   - Replace the current placeholder page with a layout that imports and renders the above components in their original order: `<Hero />`, `<ProofWall />`, `<PainContrast />`, `<HowItWorks />`, `<FounderSection />`, `<Pricing />`, `<FAQ />`, `<Contact />`.  
   - Wrap with existing `<Navigation />` and `<Footer />` so the marketing shell stays consistent.

3. **Ensure styling matches original**  
   - Keep section sequencing unmodified to preserve backgrounds/shadows baked into the components.  
   - No extra wrappers or new typography; rely entirely on the component-specific styling so the hero image, proof wall, etc., render exactly as before.

4. **Verify**  
   - `pnpm lint` (scope to `src/app/rendervault/page.tsx`).  
   - `pnpm build` if needed, then reload `/rendervault` locally to confirm visuals match legacy design.

