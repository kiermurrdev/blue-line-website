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
- Images via `next/image` with explicit dimensions; assets in `public/images/`, named by purpose (`hero-trailer.webp`).

## Do not
- Don't imitate the reference sites (njboathauler.com, haulmyboat.com) — they informed content needs only, never design or copy.
- Don't add Sanity, a backend, forms endpoints, or analytics until explicitly tasked.
- Don't restructure `src/` outside of what ARCHITECTURE.md defines without updating that doc in the same PR.
