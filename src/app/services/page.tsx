import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { QuoteCta } from "@/components/sections/QuoteCta";

const services = getServices();

/** Derive SEO keywords from actual service content (not hardcoded strings). */
function getServiceKeywords(): string[] {
  const titles = services.map((s) => s.title.toLowerCase());
  return [
    "marine transport",
    "boat transportation",
    ...titles,
    "East Coast boat hauling",
    "port pickup delivery",
  ];
}

export const metadata: Metadata = {
  title: "Services — Blue Line Marine Transport",
  description: `Professional ${getServiceKeywords().slice(0, 3).join(", ")} across the East Coast. Get a free quote for your boat transport today.`,
};

/** Services overview — grid of service cards linking to detail pages. */
export default function ServicesPage() {
  return (
    <main id="main" role="main">
      {/* Page intro: single H1 + SectionHeading */}
      <section className="bg-surface-section section-rhythm" aria-label="Our Services">
        <Container>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-ink mb-8 sm:mb-12" style={{ fontFamily: "var(--font-display)" }}>
            Our Services
          </h1>

          <SectionHeading
            eyebrow="What We Do"
            title="Marine Transport Services"
            lede="From powerboats to heavy vessels, we move your boat with professional care — door-to-door across the East Coast."
          />
        </Container>
      </section>

      {/* Reuse existing ServiceGrid (self-contained section + grid) */}
      <ServiceGrid />

      {/* CTA reachable without scrolling past the fold on desktop; sticky bar covers mobile */}
      <QuoteCta />
    </main>
  );
}
