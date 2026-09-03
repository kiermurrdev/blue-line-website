/** CoverageSection — semantic region list + static SVG map of service states. */

import { getCoverageAreas } from "@/lib/content";
import type { CoverageArea } from "@/types/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

const SERVICE_STATES = [
  "delaware",
  "florida",
  "maryland",
  "new-jersey",
  "new-york",
  "connecticut",
];

/** Static SVG map of the six service states — no JS interactivity. */
function CoverageMap({ areas }: { areas: CoverageArea[] }) {
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

  return (
    <svg
      viewBox="0 0 320 300"
      className="h-auto w-full"
      role="img"
      aria-label="Map showing Blue Line Marine Transport service area along the East Coast"
    >
      {/* Background — subtle grid */}
      <rect width="100%" height="100%" fill="var(--color-foam)" rx="6" />

      {/* Water background */}
      <rect x="2" y="2" width="316" height="296" fill="var(--color-mist)" rx="5" />

      {/* State outlines — inactive (steel) */}
      {Object.entries(statePaths).map(([slug, path]) => (
        <path
          key={slug}
          d={path.d}
          fill={isActive(slug) ? "var(--color-brand)" : "var(--color-foam)"}
          stroke="var(--color-steel)"
          strokeWidth={isActive(slug) ? 2 : 1.5}
          className="transition-colors duration-300"
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
            style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: isActive(slug) ? 700 : 500 }}
            fill={isActive(slug) ? "white" : "var(--color-steel)"}
          >
            {slug === "new-york" || slug === "new-jersey" ? slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </text>
        </g>
      ))}

      {/* Service area callout */}
      <line x1="260" y1="30" x2="305" y2="30" stroke="var(--color-brand)" strokeWidth="1" />
      <circle cx="260" cy="30" r="4" fill="var(--color-brand)" />
      <text x="308" y="34" style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600 }} fill="var(--color-steel)">
        Service Area
      </text>

      {/* Compass */}
      <g transform="translate(290, 270)">
        <line x1="0" y1="15" x2="0" y2="-15" stroke="var(--color-steel)" strokeWidth="1" />
        <polygon points="0,-18 -4,-10 4,-10" fill="var(--color-brand)" />
        <text x="0" y="-22" textAnchor="middle" style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700 }} fill="var(--color-ink)">N</text>
      </g>
    </svg>
  );
}

/** CoverageSection — renders on home, /coverage, and /gallery. */
export function CoverageSection({ variant = "default" }: { variant?: "default" | "compact" }) {
  const areas = getCoverageAreas();
  const hasConfirmed = areas.some((a) => a.notes?.includes("TODO(owner-content)") === false);

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
                    href="tel:+17322221026"
                    className="text-sm font-semibold text-brand underline decoration-steel/30 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand"
                  >
                    (732) 222-1026
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
