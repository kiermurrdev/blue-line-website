# AGENTS.md — Blue Line Marine Transport website

Durable instructions for any agent working in this repo. Read `docs/` before non-trivial work: `PROJECT_BRIEF.md` (goals, open questions), `ARCHITECTURE.md` (structure & rules), `DESIGN_SYSTEM.md` (visual direction), `CONTENT_MODEL.md` (content types), `BRAND_ASSETS_CHECKLIST.md` (confirmed vs. missing business info + placeholder policy).

## Stack
Next.js App Router + React + TypeScript (`strict`) + Tailwind CSS. Deploy target: Vercel. **No new dependencies without a one-line justification in the PR.** No UI component libraries — build with our own primitives in `src/components/ui/`.

## Hard rules
- Content never lives in components or pages. Pages call getters from `src/lib/content.ts`; data types live in `src/types/`. Local content files (`src/content/*`) are a **temporary stand-in for Sanity** — keep them CMS-shaped (flat fields, arrays of objects) and never import them outside `lib/content.ts`.
- One H1 per page; metadata exported per route. Phone/email/address come only from `SiteConfig` in `content/site.ts`.
- Conversion is the point: every page needs a reachable quote CTA or phone action; mobile gets the sticky call bar.
- No fake content ships: stats, testimonials, DOT numbers, and photos must be owner-confirmed (see PROJECT_BRIEF open questions). Placeholder copy is allowed in WIP branches only, marked `TODO(owner-content)`.
- Accessibility: WCAG 2.1 AA — keyboard operable, visible focus states, real alt text, contrast per DESIGN_SYSTEM.md §7.

## Conventions
- Branches: `feat/<short-slug>`, `fix/<short-slug>`; one concern per PR; small commits with imperative messages.
- Quality gate before merge: `next build` clean + mobile viewport pass on changed pages (Lighthouse ≥ 90 when payload changes).
- Styling: Tailwind utilities mapped to the CSS-variable tokens in `globals.css`; don't hardcode hex values that exist as tokens. Accent color is reserved for CTAs only.
- Brand assets: logo lives at `public/brand/logo.svg` (transparent background, light-surface lockup — near-black wordmark + blue tagline). Use it via `<img>`/`next/image`; never recreate the mark in CSS or text. Confirmed brand colors are tokens only (`--color-brand` #0055A5, `--color-ink` #231F20); a reversed dark-surface variant is still needed for footer/hero.
- Images via `next/image` with explicit dimensions; assets in `public/images/`, named by purpose (`hero-trailer.webp`).

## Do not
- Don't imitate the reference sites (njboathauler.com, haulmyboat.com) — they informed content needs only, never design or copy.
- Don't add Sanity, a backend, forms endpoints, or analytics until explicitly tasked.
- Don't restructure `src/` outside of what ARCHITECTURE.md defines without updating that doc in the same PR.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
