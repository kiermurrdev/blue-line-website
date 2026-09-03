# Blue Line Marine Transport — Frontend Architecture

## 1. Stack (locked)
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router, latest stable) | RSC by default; client only where needed |
| Language | TypeScript `strict` | No `any` without justification |
| Styling | Tailwind CSS + CSS variables for design tokens | No CSS-in-JS, no UI kit |
| Deployment | Vercel (later) | Static export not required; SSG/ISR pages |
| CMS | **None yet** — content layer abstracted for future Sanity | See `CONTENT_MODEL.md` |

**Dependency budget:** keep it near zero. Allowed without discussion: Next, React, Tailwind (+ its Postchain tooling). Anything else (forms, maps, carousels) must be justified in the PR and preferably replaced with a small hand-rolled component. No UI component libraries — we build our own design system (`DESIGN_SYSTEM.md`).

## 2. Rendering strategy
| Page type | Strategy | Why |
|---|---|---|
| Home, services, about, coverage, process, FAQ | **Static (SSG)** at build time | Marketing pages change rarely; fastest TTFB + SEO |
| Contact / quote page | Static shell + client form | Form is the only dynamic part |
| Gallery | SSG with `next/image` optimization | Images are the payload |

No server components that need runtime data exist yet. When Sanity arrives, content pages flip to **ISR** (revalidate on-demand via revalidation tag) — no architecture change required because content access already goes through a single boundary (§4).

## 3. Directory structure
```
blue-line-website/
├── AGENTS.md                  # durable agent instructions (root)
├── docs/                      # planning docs (this set)
│   ├── PROJECT_BRIEF.md
│   ├── ARCHITECTURE.md        # this file
│   ├── DESIGN_SYSTEM.md
│   └── CONTENT_MODEL.md
├── public/
│   ├── brand/                 # logo + brand marks (logo.svg — transparent, light-surface lockup)
│   └── images/                # optimized photo assets, named by purpose: hero-*.webp etc.
├── src/
│   ├── app/                   # Next.js App Router — routing + layout only
│   │   ├── layout.tsx         # root layout: fonts, metadata, header/footer, call bar
│   │   ├── page.tsx           # / (home)
│   │   ├── globals.css        # Tailwind entry + token definitions
│   │   ├── services/
│   │   │   ├── page.tsx       # /services (overview index)
│   │   │   └── [slug]/page.tsx# /services/:slug (per-service detail, generatedStaticParams)
│   │   ├── about/page.tsx
│   │   ├── coverage/page.tsx  # service area
│   │   ├── process/page.tsx   # how it works + prep guide
│   │   ├── gallery/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx   # quote request (primary conversion page)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/            # Header, Footer, MobileNav, StickyCallBar, SkipLink
│   │   ├── sections/          # composable page sections (see §5)
│   │   ├── ui/                # primitives: Button, Container, SectionHeading, Badge…
│   │   └── forms/             # QuoteForm (client), Field, validation helpers
│   ├── content/               # ★ CMS boundary — typed local content (future Sanity swap point)
│   │   ├── site.ts            # company name, phone, email, address, hours, socials
│   │   ├── services.ts        # service list + per-service detail
│   │   ├── faqs.ts
│   │   ├── testimonials.ts
│   │   └── gallery.ts
│   ├── lib/
│   │   ├── content.ts         # single accessor layer: getServices(), getSite()…
│   │   │                      # today reads src/content/*; tomorrow reads Sanity — same signatures
│   │   └── utils.ts           # cn(), phone formatting, slug helpers
│   └── types/                 # shared TS types (Service, Faq, Testimonial, SiteConfig…)
├── next.config.ts
├── tailwind.config.ts         # tokens mapped to CSS vars from DESIGN_SYSTEM.md
├── tsconfig.json
└── package.json
```

**Rules:**
- `app/` contains routing and page composition only — no business logic, no data fetching beyond calling `lib/content`.
- Components never import from `src/content/*` directly; they receive props or go through `lib/content.ts`. This is the seam where Sanity plugs in.
- One folder per concern; no barrel files needed at this scale.

## 4. Content boundary (the CMS-ready contract)
```ts
// src/types/content.ts (illustrative)
interface SiteConfig { name, phone, email, address, hours, socials[], dotNumber }
interface Service { slug, title, summary, description, vesselTypes[], equipment[], faqs[] }
interface Faq { question, answer }
interface Testimonial { quote, name, location, boatType? }
```
`lib/content.ts` exposes typed getters. Pages and sections consume **types**, not storage. When Sanity ships: implement the same getters against its GROQ queries (ISR + revalidation tags), delete `src/content/*`, done. No component changes.

## 5. Reusable components & page sections
**Primitives (`ui/`):** Button (primary/secondary, as link or submit), Container, SectionHeading (eyebrow + title + lede), Badge/Stat, Card, Accordion (FAQ), ImageFrame.

**Sections (`sections/`) — the building blocks every page composes:**
| Section | Used on | Purpose |
|---|---|---|
| `Hero` | home, service detail | value prop + primary CTA + trust strip |
| `TrustBar` | home, about | licensed · insured · years · DOT # (stats row) |
| `ServiceGrid` / `ServiceCard` | home, services index | category cards → detail pages |
| `ProcessSteps` | home, process | 4-step "how it works" timeline |
| `CoverageSection` | home, coverage | region list/map + service-area statement |
| `GalleryStrip` | home, gallery | photo proof (real jobs) |
| `Testimonials` | home, about | social proof |
| `FaqAccordion` | faq, contact, service detail | objection handling |
| `QuoteCta` / `ContactForm` | every page (CTA), contact (full form) | conversion |
| `StickyCallBar` | all pages (mobile) | persistent phone + "Get a Quote" |

**Layout:** Header (desktop nav + mobile menu, logo left, phone right), Footer (contact block, service links, legal, hours).

## 6. Forms & lead capture
- **QuoteForm** is the only client component with state. Fields: name, phone, email, boat type, length/weight estimate, pickup location, delivery location, date needed, notes. Client-side validation; no server yet — submission target TBD (owner decision: form endpoint / email service). Until then it renders and validates but posts to a stub handler clearly marked `TODO(lead-capture)`.
- Phone CTA uses `tel:` links with formatted numbers from `SiteConfig` — single source of truth.

## 7. Performance budget
- Lighthouse mobile ≥ 90 perf / a11y / best-practices on every page.
- Images: `next/image`, WebP/AVIF, explicit dimensions, lazy below fold, eager hero only.
- No client JS beyond: nav toggle, accordion, form, (optional) gallery lightbox — all small and local.
- Fonts: one self-hosted variable font family via `next/font` (see DESIGN_SYSTEM).

## 8. SEO & metadata
- Per-page `metadata` exports + JSON-LD (`LocalBusiness`/`Service`) on home and service pages.
- One H1 per page; descriptive titles with location/service keywords from content, not hardcoded strings.
- Sitemap + robots generated by Next built-ins once routes are final.

## 9. Testing & quality gates (per PR)
- `next build` passes clean (type-check included).
- Manual: mobile viewport pass on changed pages; keyboard-only pass for interactive elements.
- Lighthouse check on any page whose payload changes significantly.
- No new dependency without a one-line justification in the PR description.
