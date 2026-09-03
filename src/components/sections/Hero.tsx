/** Hero — full-bleed navy scrim, value prop, dual CTAs, trust strip. */

import Link from "next/link";
import { cn, stripPhoneDigits } from "@/lib/utils";
import { Container } from "../ui/Container";
import { PrimaryLink } from "../ui/Button";
import { getSite } from "@/lib/content";

const site = getSite();

/** Placeholder image treatment: large geometric block with subtle grid pattern. */
function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-navy/95">
      {/* Subtle grid — evokes engineering/blueprint without fake "real" imagery */}
      <svg
        aria-hidden="true"
        className="h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Center label */}
      <div className="relative z-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foam/40">
          Hero image — owner-supplied
        </p>
        <p className="mt-1 text-sm text-steel">TODO(owner-content)</p>
      </div>
    </div>
  );
}

interface HeroProps {
  /** Override the default headline. */
  title?: string;
  /** Override the default subheadline. */
  subtitle?: string;
}

export function Hero({
  title = "Professional boat transportation across the East Coast",
  subtitle = "Licensed & insured. Door-to-door delivery for powerboats, sailboats, and heavy vessels.",
}: HeroProps) {
  return (
    <section className="relative bg-navy" aria-label="Hero">
      {/* Full-bleed image area with navy scrim */}
      <div className="relative h-[60vh] min-h-[480px] w-full md:h-[75vh] lg:h-[85vh]">
        {/* Placeholder — TODO(owner-content) for real photo */}
        <PlaceholderImage />

        {/* Navy scrim overlay — ensures text contrast ≥ 4.5:1 regardless of image */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy" />

        {/* Content */}
        <Container className="relative z-10 flex h-full items-center">
          <div className="max-w-[52ch] pt-16 md:pt-24 lg:pt-32">
            {/* Eyebrow with blue-line rule */}
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand/90">
              <span className="block h-[1px] w-6 bg-brand" />
              Blue Line Marine Transport
            </p>

            {/* H1 — single on page, Archivo display */}
            <h1
              className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight text-foam"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-steel">
              {subtitle}
            </p>

            {/* CTAs — signal accent used once here (≤ 2 per viewport rule) */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <PrimaryLink href="/contact">Get a Free Quote</PrimaryLink>

              <a
                href={`tel:${stripPhoneDigits(site.phone)}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foam/80 transition-colors hover:text-brand underline underline-offset-4 decoration-steel/30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {site.phone}
              </a>
            </div>

            {/* Trust strip — short, factual */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-brand/20 pt-6">
              <span className="text-xs text-steel">Licensed &amp; insured</span>
              <span className="hidden h-3 w-[1px] bg-steel/30 sm:block" />
              <span className="text-xs text-steel">East Coast coverage</span>
              <span className="hidden h-3 w-[1px] bg-steel/30 sm:block" />
              <span className="text-xs text-steel">Door-to-door delivery</span>
            </div>
          </div>
        </Container>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-page to-transparent" />
      </div>
    </section>
  );
}
