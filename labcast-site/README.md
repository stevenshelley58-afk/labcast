# Labcast Website

Marketing/creative/build site for Labcast (labcast.com.au) built with Next.js App Router and Tailwind 4.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4 (design tokens in `globals.css`)
- PNPM

## Structure
- `src/app/page.tsx` — homepage with 10 sections per spec
- `src/app/rendervault/page.tsx` — RenderVault service page
- `src/app/components/` — navigation and footer
- `src/app/globals.css` — design system variables, animations, global styles
- `src/app/robots.ts` / `sitemap.ts` — SEO basics
- `src/app/api/contact/route.ts` — contact form handler (Formspree-compatible)
- `src/app/opengraph-image.tsx` / `twitter-image.tsx` — dynamic OG/Twitter images

## Commands
```bash
pnpm dev     # local dev
pnpm lint    # eslint
pnpm build   # production build
pnpm start   # serve production build
```

## Notes
- Metadata and OG info set in `src/app/layout.tsx` with `metadataBase` `https://labcast.com.au`.
- Contact form posts to `/api/contact`. Set `FORMSPREE_ENDPOINT` in `.env.local` (see `.env.example`) to forward submissions. Without it, the endpoint returns a configuration error.
- External links open in new tabs where relevant.
