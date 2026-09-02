# Brand & Assets Checklist — Blue Line Marine Transport

Stage gate before visual implementation (Phase 1 finalization / Phase 2). Updated 2026-09-02.

## A. Confirmed business information ✅
| Item | Value |
|---|---|
| Company name | Blue Line Marine Transport |
| Phone | (732) 222-1026 |
| Email | bluelinemarinetransport@gmail.com |

These three unblock: header/footer contact CTA, quote/contact page core, `SiteConfig` base.

## B. Missing business information
### Required before launch
- [ ] **Service area / coverage** — states or regions served (★ blocks Coverage page + SEO geo-targeting)
- [ ] **Business address** — city/state minimum; full street if public (footer, LocalBusiness schema, "based in" trust line)
- [ ] **DOT number / MC authority** — legal footer + "licensed" claim (★ do NOT ship without it)
- [ ] **Insurance statement** — carrier + limits, or an accurate one-liner ("fully insured") the owner signs off on
- [ ] **Years in business / founding year** — trust bar stat
- [ ] **Fleet & capability facts** — trucks/trailers count, max vessel weight/length handled (capability claims)
- [ ] **Service list sign-off** — confirm assumed categories: powerboat, sailboat, heavy/large vessel, port pickup & delivery (add/remove/rename)
- [ ] **Testimonials ×3+** — quote + name + town (+ boat type if possible); real customers only
- [ ] **Business hours** — for contact block/footer

### Nice to have (non-blocking)
- [ ] Certifications / marina or industry memberships
- [ ] Tagline/slogan, if one exists (otherwise we draft 2–3 options for owner pick)
- [ ] Social media accounts
- [ ] Quote-process details: what a quote needs, response-time promise ("we reply within 1 business day")

## C. Required brand assets
| Asset | Spec | Notes |
|---|---|---|
| **Logo** | SVG (vector) + PNG fallback; light & dark variants for header/footer | ★ gates final visual identity; WIP may use a text wordmark only, marked temporary |
| **Brand colors** | Hex values if the business has them | Otherwise we proceed with proposed navy/safety-orange tokens and re-skin after logo review — flag as provisional |
| **Hero photo** | Boat on trailer in transit or loading; landscape ≥ 2000px wide, real job | ★ gates home hero (no stock posing as our work) |
| **Gallery photos ×6–9** | Real jobs: loading, secured loads, fleet/trucks, deliveries; each with location + vessel caption | ★ gates gallery section/page |

## D. Optional but valuable assets
- Owner/team photo for About page
- Equipment close-ups (air-ride trailer, tie-downs) — supports capability claims
- Certification badges as images
- Customer/marina logos (social proof strip)
- Short video of a load being secured (post-launch enhancement, not needed now)

## E. Blocker map by workstream
| Workstream | Blocked on | Can start without owner input? |
|---|---|---|
| Homepage | Hero photo; trust stats (years/DOT/insurance); service list sign-off; coverage area; testimonials | Structure & copy drafts: **yes** (marked `TODO(owner-content)`) |
| Navigation/header | Logo (final); everything else uses confirmed name + phone | **Yes** — text wordmark placeholder in WIP only |
| Quote/contact page | Nothing hard — phone/email confirmed. Address/hours are gaps to fill, not blockers | **Yes** — build now with confirmed contact info |
| Trust/credibility sections | Years, DOT/MC #, insurance statement, fleet facts | **No** — no placeholders allowed (see F) |
| Gallery | Real photos ×6–9 with captions | Empty-state frames in WIP only; never stock-as-real |
| SEO metadata | Service area + address for geo keywords & LocalBusiness JSON-LD | Drafts possible now; final titles/schema need B items |

## F. Placeholder policy (explicit)
**Safe to draft as placeholders (WIP branches, marked `TODO(owner-content)`):**
- Marketing copy: headings, section body text, process-step wording, FAQ drafts — it's our voice, not a business fact; owner reviews before launch.
- Nav structure, page skeletons, form fields, CTA labels.
- Text wordmark in header/footer until logo lands (temporary, never ships).

**Never use placeholders for:**
- **Stats & capability claims** (years, boats moved, fleet size, max weight) — false advertising risk; trust is the product we're selling. Omit the stat rather than fake it.
- **DOT/MC number, insurance statement, "licensed" language** — legal liability; a fabricated authority number is worse than none.
- **Testimonials** — invented customer quotes are deceptive (and FTC-exposed). Section ships only with real ones.
- **Photos presented as our work** — boat owners spot stock imagery instantly; credibility dies on contact. Use clearly-marked empty frames in WIP.
- **Address & hours** — factual data; omit until provided, don't guess.
