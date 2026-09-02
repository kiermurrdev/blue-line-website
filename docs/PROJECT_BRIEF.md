# Blue Line Marine Transport — Project Brief

**Status:** Planning (no code yet) · **Owner:** kiermurrdev · **Repo:** `github.com/kiermurrdev/blue-line-website`

## 1. What we're building
A premium, responsive marketing website for a boat transportation / hauling business. The single primary objective is to **generate qualified leads** — visitors who request a quote or call the company. Every page and section should move a visitor toward one of those two actions while communicating trust, safety, experience, capability, coverage, and simplicity.

## 2. Business model (from reference research)
Boat transporters move powerboats, sailboats, and heavy/large vessels between marinas, yards, storage facilities, and ports — typically across state lines within a defined region. Revenue is per-move quotes. Buyers are private boat owners, marinas, dealers, and restoration shops.

**What the reference sites confirm as core to this business:**
- Service categories by vessel type (powerboat, sailboat, heavy/large vessel) plus port pickup & delivery.
- Trust signals that actually matter: years in operation, licensed + insured, DOT authority number, cargo condition reports at load/delivery, experienced drivers.
- Equipment capability as a differentiator (air-ride / hydraulic stretch trailers, lowboys).
- Educational content that builds trust and captures SEO ("how to prep your boat," "how to choose a transporter").
- A persistent phone CTA + quote request path on every page.

**What we will NOT copy:** their GoDaddy-builder layouts, dated typography, generic headings ("Hassle-Free Reliable Solutions"), clunky multi-link navs, weak/absent quote forms, and any of their specific wording or branding.

## 3. Goals
| Goal | How it's measured |
|---|---|
| Qualified leads (quote requests + calls) | Form submissions, `tel:` clicks |
| Perceived trust & professionalism | Visitor completes a service page → CTA; bounce rate on home |
| SEO visibility for boat-transport queries | Indexed pages, organic sessions over time |
| Fast, accessible, mobile-first experience | Lighthouse ≥ 90 (perf/a11y/best-practices), WCAG 2.1 AA |

## 4. Non-goals (for now)
- No Sanity CMS yet (architecture must be ready for it — see `CONTENT_MODEL.md`).
- No backend, database, or auth.
- No booking/scheduling system; lead capture is form + phone only.
- No e-commerce / online payment.

## 5. Technical direction
Frontend-first: **Next.js App Router · React · TypeScript (strict) · Tailwind CSS**. Minimal dependencies. Deploy target: Vercel. Content and presentation kept separate so content can later be sourced from Sanity without touching components. See `ARCHITECTURE.md`.

## 6. Delivery model
GitHub Issues for planned work, feature branches, pull requests, small reviewable commits. One concern per PR. Docs live in `docs/`; durable agent instructions live in root `AGENTS.md`.

### Phased implementation plan
| Phase | Scope | Exit criteria |
|---|---|---|
| **0 — Scaffold** | Next.js + TS strict + Tailwind init, token CSS vars, base layout (header/footer/skip link), lint/format config, CI build check on PRs | `next build` green in CI; empty shell renders |
| **1 — Design system & layout** | UI primitives (Button, Container, SectionHeading, Card, Accordion…), Header/Footer/StickyCallBar, section components per ARCHITECTURE §5, responsive pass | All sections render on a dev route at mobile/tablet/desktop; keyboard pass done |
| **2 — Content layer + home page** | `src/content/*` typed files with owner-confirmed or clearly-marked placeholder content, `lib/content.ts` getters, full home page composition (hero → trust bar → services → process → coverage → gallery → testimonials → FAQ → CTA) | Home complete, Lighthouse ≥ 90 mobile, metadata + JSON-LD in place |
| **3 — Service pages** | `/services` index + `[slug]` detail via `generatedStaticParams`, per-service content, service-specific FAQs & CTAs | All service routes build statically; internal linking consistent |
| **4 — Supporting pages** | About, Coverage (region list/SVG map), Process (+ prep guide), Gallery, FAQ, Contact/quote form with validation + stub submission handler | Every page meets Definition of Done (§7) |
| **5 — SEO & polish** | Sitemap/robots, per-page metadata audit, OpenGraph images, 404 page, performance pass (image sizes, font subsets), a11y audit fixes | Lighthouse ≥ 90 all pages; WCAG AA checklist signed off |
| **6 — Launch prep** | Real content/photos swap-in, lead-capture endpoint wired to real target, analytics events for form/call CTAs, Vercel deploy + domain/DNS | Live site with working quote path |
| *(Later)* **Sanity migration** | Schemas per CONTENT_MODEL §4, GROQ-backed getters, ISR revalidation — separate effort after launch | Owner can edit services/FAQs/testimonials/photos without a deploy |

Phases 0–1 need no owner input. Phase 2 onward is gated by the open questions below (★ items block trust content and CTAs).

## 7. Definition of done (per page)
- Renders on mobile / tablet / desktop with no layout breakage.
- Has correct metadata + OpenGraph + a single H1.
- All interactive elements keyboard-accessible; images have alt text.
- At least one clear conversion CTA reachable without scrolling past the fold (or via sticky call bar).
- Passes `next build` and Lighthouse ≥ 90 on mobile.

## 8. Open questions for the business owner
See §11 of this brief — tracked in `docs/PROJECT_BRIEF.md` §Open Questions below.

### Open Questions (blockers marked ★)
| # | Question | Status / Blocking? |
|---|---|---|
| 1 | Legal business name, DOT number / MC authority, insurance carrier & limits | Name ✅ confirmed; DOT/insurance still missing ★ (trust + legal footer) |
| 2 | Phone number(s), email, physical address, service hours | Phone ✅ (732) 222-1026 · Email ✅ bluelinemarinetransport@gmail.com · Address/hours missing ★ (every CTA) |
| 3 | Service area / coverage boundaries (states or regions) | ★ (coverage page + SEO) |
| 4 | Years in business, fleet size, max vessel weight/length handled | trust stats |
| 5 | Real photos: boats on trailers, loading, team, equipment | ★ (gallery + hero — no stock-only) |
| 6 | Testimonials with name + location | social proof |
| 7 | Quote process details / what info a quote needs | form fields |
| 8 | Existing logo / brand assets or colors | design tokens |
| 9 | Social media accounts (if any) | footer |
| 10 | Any certifications, marina partnerships, or memberships | trust bar |
