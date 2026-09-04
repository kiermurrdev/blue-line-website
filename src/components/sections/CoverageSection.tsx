/** CoverageSection — semantic region list + static SVG map of service states. */

import { getCoverageAreas } from "@/lib/content";
import { getSite } from "@/lib/content";
import type { CoverageArea } from "@/types/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { PrimaryButtonFull } from "../ui/Button";

const SERVICE_STATES = [
  "delaware",
  "florida",
  "maryland",
  "new-jersey",
  "new-york",
  "connecticut",
];

/** Static SVG map of the six service states — no JS interactivity. */
function CoverageMap({ areas, size = "default" }: { areas: CoverageArea[]; size?: "default" | "hero" }) {
  const activeSlugs = new Set(SERVICE_STATES);

  /** Check if a state is in our confirmed service area. */
  function isActive(slug: string): boolean {
    return activeSlugs.has(slug) && areas.some((a) => a.slug === slug);
  }

  /** Simple path data for each state outline (simplified, not geographically precise). */
  const statePaths: Record<string, { d: string; labelX: number; labelY: number }> = {
    "new-york": {
      d: "M140,35 L165,28 L175,40 L170,65 L155,72 L135,68 L128,50 Z",
      labelX: 148,
      labelY: 52,
    },
    "new-jersey": {
      d: "M155,72 L165,70 L168,95 L162,130 L150,135 L145,100 Z",
      labelX: 157,
      labelY: 105,
    },
    connecticut: {
      d: "M175,40 L200,38 L205,52 L195,60 L178,58 Z",
      labelX: 188,
      labelY: 52,
    },
    delaware: {
      d: "M168,95 L178,93 L180,110 L174,120 L166,115 Z",
      labelX: 173,
      labelY: 108,
    },
    maryland: {
      d: "M140,120 L174,120 L180,130 L165,140 L135,135 Z",
      labelX: 158,
      labelY: 132,
    },
    florida: {
      d: "M100,170 L140,155 L165,160 L190,175 L210,195 L200,230 L180,260 L155,275 L130,265 L110,240 L95,210 Z",
      labelX: 155,
      labelY: 210,
    },
  };

  const isHero = size === "hero";

  return (
    <svg
      viewBox="0 0 320 300"
      className={isHero ? "mx-auto h-auto w-full max-w-[480px]" : "h-auto w-full"}
      role="img"
      aria-label="Map showing Blue Line Marine Transport service area along the East Coast"
    >
      {/* Background */}
      <rect width="100%" height="100%" fill={isHero ? "#0B1E33" : "var(--color-foam)"} rx="6" />

      {/* Water background */}
      <rect x="2" y="2" width="316" height="296" fill={isHero ? "#0F2740" : "var(--color-mist)"} rx="5" />

      {/* State outlines — inactive (steel) */}
      {Object.entries(statePaths).map(([slug, path]) => (
        <path
          key={slug}
          d={path.d}
          fill={isActive(slug) ? "var(--color-brand)" : isHero ? "#0F2740" : "var(--color-foam)"}
          stroke={isHero ? "#1E3A5F" : "var(--color-steel)"}
          strokeWidth={isActive(slug) ? 2.5 : 1}
        />
      ))}

      {/* State labels */}
      {Object.entries(statePaths).map(([slug, path]) => (
        <g key={`label-${slug}`}>
          <text
            x={path.labelX}
            y={path.labelY}
            textAnchor="middle"
            dominantBaseline="central"
            className="select-none"
            style={{ fontFamily: "var(--font-body)", fontSize: isHero ? "10px" : "9px", fontWeight: isActive(slug) ? 700 : 400 }}
            fill={isActive(slug) ? "white" : isHero ? "#5A748C" : "var(--color-steel)"}
          >
            {slug === "new-york" || slug === "new-jersey" ? slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </text>
        </g>
      ))}

      {/* Service area callout */}
      <line x1="260" y1={isHero ? "30" : "30"} x2="305" y2="30" stroke={isHero ? "#1E3A5F" : "var(--color-brand)"} strokeWidth="1" />
      <circle cx="260" cy="30" r="4" fill="var(--color-brand)" />
      <text x="308" y="34" style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600 }} fill={isHero ? "#5A748C" : "var(--color-steel)"}>{"Service Area"}</text>

      {/* Compass */}
      <g transform="translate(290, 270)">
        <line x1="0" y1="15" x2="0" y2="-15" stroke={isHero ? "#1E3A5F" : "var(--color-steel)"} strokeWidth="1" />
        <polygon points="0,-18 -4,-10 4,-10" fill="var(--color-brand)" />
        <text x="0" y="-22" textAnchor="middle" style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700 }} fill={isHero ? "#5A748C" : "var(--color-ink)"}>{"N"}</text>
      </g>
    </svg>
  );
}

/** CoverageSection — renders on home, /coverage, and /gallery. */
export function CoverageSection({ variant = "default" }: { variant?: "default" | "compact" | "full" }) {
  const areas = getCoverageAreas();
  const site = getSite();
  const hasConfirmed = areas.some((a) => a.notes?.includes("TODO(owner-content)") === false);

  // ─── Full variant: dedicated /coverage page treatment ───
  if (variant === "full") {
    return <FullCoveragePage areas={areas} hasConfirmed={hasConfirmed} phone={site.phone} />;
  }

  return (
    <section className="bg-surface-section section-rhythm" aria-label="Service Area">
      <Container>
        {variant !== "compact" && (
          <SectionHeading
            eyebrow="Where We Operate"
            title="Coast-to-Coast Coverage"
            lede={
              hasConfirmed
                ? `We transport boats across ${areas.length} states along the East Coast — from New York to Florida.`
                : "Service areas pending owner confirmation. Draft regions listed below."
            }
          />
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Semantic region list */}
          <div>
            {variant === "compact" ? (
              <p className="text-sm leading-relaxed text-steel">
                Blue Line Marine Transport provides door-to-door boat hauling across the East Coast.
                Our service area currently includes{" "}
                <strong className="text-ink">{areas.length} states</strong> from New York to Florida,
                with additional regions being added as we expand.
              </p>
            ) : (
              <>
                {/* State list — semantic, no JS */}
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2" role="list">
                  {areas.map((area) => (
                    <li key={area.slug}>
                      <div className="flex items-start gap-3 rounded-[6px] border border-steel/20 bg-surface-section-alt px-4 py-3 transition-colors duration-150 hover:border-brand/30">
                        {/* Blue-line bullet */}
                        <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />

                        <div>
                          <p className="text-sm font-semibold text-ink">{area.name}</p>
                          {area.notes && (
                            <p className="mt-0.5 text-xs leading-relaxed text-steel">
                              {area.notes}
                            </p>
                          )}
                        </div>

                        {/* Active badge for confirmed states */}
                        {SERVICE_STATES.includes(area.slug) && !area.notes?.includes("TODO(owner-content)") && (
                          <Badge variant="default" className="ml-auto shrink-0">
                            Active
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Unconfirmed states notice */}
                {!hasConfirmed && (
                  <p className="mt-6 text-xs leading-relaxed text-steel/80">
                    Service boundaries are draft and pending owner confirmation. Contact us to verify coverage in your area.
                  </p>
                )}

                {/* CTA row */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-[6px] bg-signal px-5 py-2.5 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                  >
                    Check Your Area
                  </a>
                  <span className="text-sm text-steel">or call</span>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-sm font-semibold text-brand underline decoration-steel/30 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand"
                  >
                    {site.phone}
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Static SVG map — desktop only */}
          {variant !== "compact" && (
            <aside className="hidden lg:block">
              <CoverageMap areas={areas} />
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}

// ─── Full coverage page treatment (variant="full") ──────────────────────

/** What's-included panel — renders per-state or as a general list. */
function WhatsIncluded({ hasInsurance }: { hasInsurance?: boolean }) {
  return (
    <div className="rounded-[6px] border border-steel/20 bg-surface-section-alt p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink">What's Included</h3>
      <ul className="space-y-3" role="list">
        {[
          "Door-to-door pickup & delivery",
          ...(hasInsurance ? ["Licensed & insured transport"] : []),
          "Pre- and post-haul condition reports",
          "Experienced crew with tie-down expertise",
          "Air-ride & hydraulic stretch trailers available",
        ].map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-[3px] block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <span className="text-sm leading-relaxed text-ink">{item}</span>
        </li>
      ))}
    </ul>
    <p className="mt-4 text-xs leading-relaxed text-steel">
      Specific capabilities vary by route. Call to confirm what's available for your move.
    </p>
  </div>
);
}

/** Full coverage page — map hero + state list + what's included + CTA. */
function FullCoveragePage({ areas, hasConfirmed, phone }: { areas: CoverageArea[]; hasConfirmed: boolean; phone?: string }) {
  const confirmedAreas = areas.filter((a) => !a.notes?.includes("TODO(owner-content)"));
  const draftAreas = areas.filter((a) => a.notes?.includes("TODO(owner-content)"));

  return (
    <>
      {/* ─── Map band — full-width, dark navy ─── */}
      <section className="bg-navy py-12 md:py-16 lg:py-20" aria-label="Service area map">
        <div className="mx-auto max-w-[72rem] px-4 sm:px-6 lg:px-8">
          <CoverageMap areas={areas} size="hero" />
        </div>
      </section>

      {/* ─── State list + what's included ─── */}
      <section className="bg-surface-section section-rhythm" aria-label="Service states">
        <Container>
          <SectionHeading
            eyebrow="Where We Operate"
            title="East Coast Service States"
            lede={
              hasConfirmed
                ? `We transport boats across ${areas.length} states along the East Coast — from New York to Florida.`
                : "Service areas pending owner confirmation. Draft regions listed below."
            }
          />

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-[1fr_340px]">
            {/* ── State list ── */}
            <div>
              {confirmedAreas.length > 0 && (
                <>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-steel">Confirmed Service States</p>
                  <ul className="space-y-2" role="list">
                    {confirmedAreas.map((area) => (
                      <li key={area.slug}>
                        <div className="flex items-center gap-3 rounded-[6px] border border-brand/10 bg-surface-section-alt px-4 py-3 transition-colors duration-150 hover:border-brand/25">
                          <span className="block h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          <p className="text-sm font-semibold text-ink">{area.name}</p>
                          {SERVICE_STATES.includes(area.slug) && !area.notes?.includes("TODO(owner-content)") && (
                            <Badge variant="default" className="ml-auto shrink-0">Active</Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {draftAreas.length > 0 && (
                <>
                  <p className="mt-8 mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-steel">Draft — Pending Confirmation</p>
                  <ul className="space-y-2" role="list">
                    {draftAreas.map((area) => (
                      <li key={area.slug}>
                        <div className="flex items-center gap-3 rounded-[6px] border border-dashed border-steel/30 bg-surface-section-alt px-4 py-3">
                          <span className="block h-2 w-2 shrink-0 rounded-full bg-steel/50" aria-hidden="true" />
                          <p className="text-sm text-steel">{area.name}</p>
                          {area.notes && (
                            <Badge variant="outline" className="ml-auto shrink-0">Draft</Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* CTA row */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-[6px] bg-signal px-5 py-2.5 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand">
                  Check Your Area
                </a>
                <span className="text-sm text-steel">or call</span>
                <a href={`tel:${phone}`} className="text-sm font-semibold text-brand underline decoration-steel/30 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand">
                  {phone}
                </a>
              </div>
            </div>

            {/* ── Sidebar: map + what's included ── */}
            <aside className="space-y-6" aria-label="Coverage details">
              <div className="hidden lg:block">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-steel">Service Area</p>
                <CoverageMap areas={areas} size="default" />
              </div>
              <WhatsIncluded hasInsurance={Boolean(phone)} />
            </aside>
          </div>
        </Container>
      </section>

      {/* ─── Quote CTA band ─── */}
      <section className="bg-surface-dark section-rhythm" aria-label="Call to action">
        <Container>
          <div className="mx-auto max-w-[52ch] text-center">
            <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-steel/70">
              <span className="block h-[1px] w-8 bg-brand/40" />
              Get Started
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-tight text-foam">
              Not sure if we cover your area?
            </h2>
            <p className="mt-4 max-w-[60ch] mx-auto text-base leading-relaxed text-steel">
              We add routes regularly. Call or request a quote and we'll confirm coverage for your location.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand w-full sm:w-auto">
                Request a Free Quote
              </a>
              <a href={`tel:${phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-foam underline decoration-steel/30 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal w-full sm:w-auto justify-center">
                {phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
