# Blue Line Marine Transport — Design System & Direction

## 1. Art direction (the "feel")
**Premium marine logistics — not SaaS, not generic landing page.** The reference to aim at is the visual language of high-end freight/logistics and yacht services: confident, engineered, calm. Think deep water + industrial precision.

Core principles:
1. **Photography-led.** Real job photos (boats on trailers, loading, fleet) carry the hero moments — full-bleed with a navy scrim for text legibility. No stock clichés (no handshakes, no generic yacht-at-sunset). If real photos aren't available yet, use a restrained placeholder treatment and flag it; never fake "real" imagery.
2. **Restrained color.** A dark marine base + one high-visibility accent used *only* for conversion actions. The page should feel like a well-run operation, not a carnival.
3. **The "blue line" motif.** Thin rules as a brand device: hairline section dividers, underline-on-hover nav, eyebrow labels with a short leading rule. Subtle, repeated, consistent.
4. **Whitespace and scale over decoration.** Large type, generous spacing, flat surfaces, 1px borders instead of heavy shadows. No glassmorphism, no gradient text, no aurora blobs.
5. **Motion is optional and quiet.** At most: fade/rise on section entry (≤300ms), hover states with clear feedback. Always honor `prefers-reduced-motion`.

## 2. Color tokens
Defined as CSS variables in `globals.css`, mapped into Tailwind config. Final hex values are **proposals** pending brand assets from the owner (§Open Questions #8).

| Token | Proposed value | Role |
|---|---|---|
| `--color-ink` (navy 950) | `#0A1B2E` | Primary dark surface, footer, hero scrim base |
| `--color-navy` (800) | `#12304F` | Secondary dark surface, header on scroll |
| `--color-steel` (500) | `#4A6B8A` | Muted text on light, borders on dark |
| `--color-mist` (100) | `#E9EEF3` | Light section backgrounds |
| `--color-foam` (white) | `#FAFBFC` | Page background base |
| `--color-signal` (accent) | `#FF7A1A` (safety orange) | **CTAs only** — buttons, key links, focus rings on dark |
| `--color-signal-dark` | `#E05F00` | Accent hover/active |

Rules:
- Signal accent appears in ≤ 2 places per viewport. It means "act now."
- Body text is navy-on-foam or foam-on-navy; never mid-gray on white (contrast).
- Dark sections (hero, footer, trust bar) use ink/navy with foam text and steel borders.

## 3. Typography
One self-hosted variable family pair via `next/font` (final pick pending brand assets):

| Role | Proposed face | Usage |
|---|---|---|
| Display / headings | **Archivo** (variable, weights 500–800; use expanded feel at large sizes) | H1–H3, hero, stats |
| Body / UI | **Inter** or **Public Sans** (400/500/600) | paragraphs, forms, nav |

- Eyebrow labels: 12px, uppercase, `letter-spacing: 0.12em`, steel color, with a short leading rule (the blue-line motif).
- Type scale (mobile → desktop): H1 `clamp(2.25rem, 6vw, 4.5rem)` / weight 700–800; H2 `clamp(1.75rem, 3.5vw, 2.75rem)`; body `1rem/1.7`; small `0.875rem`.
- Line lengths: prose max ~65ch.

## 4. Layout & spacing
- **Container:** max-width `72rem` (1152px), horizontal padding `1rem` mobile / `2rem` desktop.
- **Section rhythm:** vertical padding `clamp(4rem, 8vw, 7rem)`; alternate foam / mist backgrounds for section separation; dark sections break the rhythm at hero + footer (+ one mid-page dark band on home).
- **Grid:** 12-col conceptual grid; content in 6/12 or split 5/7 layouts. Cards: 3-up desktop, 2-up tablet, 1-up mobile.
- **Corners:** `rounded-md` (6px) for cards/buttons — crisp, not pill-shaped. Images may be full-bleed with no radius.
- **Borders over shadows:** 1px `--color-steel/30` borders; shadow only on interactive hover lift (`shadow-sm → md`).

## 5. Component specs (summary — details live in code)
| Component | Spec |
|---|---|
| Button (primary) | Signal bg, ink text, weight 600, `px-6 py-3`, radius 6px; hover: signal-dark + slight lift; focus-visible ring 2px offset. Full-width on mobile in CTAs. |
| Button (secondary) | Transparent, 1px foam/steel border, current-color text; for dark sections. |
| Header | Sticky, transparent over hero → solid ink with hairline bottom border after scroll; logo left; nav center-right; phone number + "Get a Quote" button right. Mobile: hamburger → full-screen navy panel. |
| StickyCallBar (mobile) | Fixed bottom bar on small screens only: `tel:` call button (primary) + "Get a Quote" link; hidden when the contact form is in view. |
| Card (service) | Foam surface, 1px border, image top (4:3), eyebrow + title + summary + arrow link; hover: border darkens + arrow shifts. |
| Stat / TrustBar | Dark band, 3–5 stats (years, boats moved, states served, DOT #), large display numerals in foam, steel labels. |
| ProcessSteps | Numbered vertical timeline on mobile → horizontal 4-step row desktop; numbers in signal accent inside outlined circles. |
| Accordion (FAQ) | Single-open, chevron rotates, hairline dividers, `aria-expanded` managed. |
| Form fields | Label above input, 1px border inputs on foam, focus: navy ring; error text red-700 with icon; submit = primary button full-width mobile. |

## 6. Iconography & imagery treatment
- Icons: one consistent stroke set (e.g., Lucide — single small dependency, justified) at 24px, `strokeWidth` 1.5–2, steel/navy color. No emoji as icons.
- Photos: consistent treatment — slight desaturation + navy tint via CSS filter for cohesion; captions in footer of gallery items (location, vessel type).
- Map/coverage: simple stylized region list or static SVG map with service states highlighted — no heavy JS map library at this stage.

## 7. Accessibility requirements (WCAG 2.1 AA)
- Contrast ≥ 4.5:1 body text, ≥ 3:1 large text & UI components (verify signal-on-ink and ink-on-signal pairs).
- Full keyboard operability: nav, mobile menu, accordion, form; visible `focus-visible` styles everywhere.
- Semantic landmarks (`header/nav/main/footer`), skip-to-content link, one H1 per page, logical heading order.
- Form labels always associated; errors announced via `aria-describedby`; no color-only meaning.
- Images: meaningful alt text (vessel + action + location); decorative images `alt=""`.
- Touch targets ≥ 44×44px; sticky call bar doesn't obscure content (add bottom padding to body on mobile).

## 8. Responsive strategy
Mobile-first breakpoints: base → `sm` 640 → `md` 768 → `lg` 1024 → `xl` 1280.
- Mobile: single column, sticky call bar is the primary conversion surface; nav collapses to menu.
- Tablet: 2-up cards, split layouts begin at `md`.
- Desktop: full nav visible, 3-up grids, hero with side CTA panel.

## 9. Anti-patterns (explicitly banned)
- Gradient text / aurora backgrounds / glassmorphism.
- Generic SaaS hero ("Ship your boat in seconds" style copy + dashboard mockups).
- Stock-photo clichés; fake testimonials or stats before owner confirms them.
- More than one accent color; decorative animation that doesn't serve hierarchy.
- Rounded-everything (pill buttons, 24px+ radii) — it reads consumer-app, not logistics.
