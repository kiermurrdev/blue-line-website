# Blue Line Marine Transport — Content Model

Goal: every piece of content has a **type**, lives behind one accessor layer (`src/lib/content.ts`), and can later be sourced from Sanity with zero component changes. Today the source is typed local files in `src/content/`; tomorrow it's GROQ queries against Sanity (ISR + revalidation tags).

## 1. Content types → CMS mapping
| Type | Local file now | Future Sanity schema | Notes |
|---|---|---|---|
| `SiteConfig` | `content/site.ts` | singleton document | company name, phone(s), email, address, hours, socials, DOT/MC #, insurance blurb. **Single source of truth** for every CTA/footer. |
| `Service` (list + detail) | `content/services.ts` | `service` document type (array or reference list) | slug, title, summary, long description, vessel types, equipment used, prep notes, per-service FAQs, gallery refs, CTA label. Drives `/services/[slug]`. |
| `Faq` | `content/faqs.ts` | `faq` (or array on service/site docs) | question + answer; grouped by context (general / quote process / prep). |
| `Testimonial` | `content/testimonials.ts` | `testimonial` document type | quote, name, location, boat type. **Only real ones — owner-supplied.** |
| `GalleryItem` | `content/gallery.ts` | `galleryImage` (Sanity asset store) | image ref, caption (location + vessel), category tag. |
| `ProcessStep` | inline in `content/site.ts` or own file | array on a singleton | the 4-step "how it works" — short enough to stay in site config initially. |
| `CoverageArea` | `content/coverage.ts` | array on singleton or document type | region/state names + notes; feeds coverage page + SEO copy. |
| `PageContent` (about, process) | `content/pages/about.ts`, `pages/process.ts` | structured blocks (portable text) | long-form marketing copy the owner will edit. |

## 2. What stays in code (never CMS)
- Navigation structure & route slugs (derived from service list order).
- Component markup, design tokens, form field definitions.
- Legal boilerplate *text* may be CMS later, but its placement is code.
- SEO metadata templates (title patterns); the variable parts come from content types above.

## 3. Content rules for authors (owner-facing)
- **Stats and claims must be real.** Years in business, boats moved, DOT number — no placeholders ship to production. Until confirmed, pages render without that stat rather than with a fake one.
- Photos: real jobs only; each needs location + vessel caption. Minimum set before launch: 1 hero (boat on trailer), 6–9 gallery images across categories.
- Testimonials need name + town at minimum.
- Copy voice: plain, confident, specific. No "hassle-free," no exclamation marks, no superlatives without a fact behind them.

## 4. Migration path to Sanity (when we get there)
1. Create Sanity schemas mirroring the TS types in `src/types/content.ts` (they are already written CMS-shaped: flat fields + arrays of objects).
2. Implement `lib/content.ts` getters against GROQ; keep identical signatures and return types.
3. Enable ISR (`revalidate` or on-demand revalidation tags per document type) so edited content publishes without a deploy.
4. Delete `src/content/*`. Components never change — they only ever see the typed getters/props.

## 5. Launch content checklist (what we need from the owner)
- [ ] SiteConfig: name, phone, email, address, hours, DOT #, insurance statement
- [ ] Services: final list + one paragraph each + equipment per service
- [ ] Coverage areas (states/regions)
- [ ] 4 process steps wording
- [ ] FAQ set (~8–12 questions) — draft available from reference research, needs owner sign-off
- [ ] Testimonials (3+)
- [ ] Photos: hero + gallery (see §3 minimums)
- [ ] About page story (founding year, fleet, people)
