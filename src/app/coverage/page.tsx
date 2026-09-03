import type { Metadata } from "next";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Service Area — Blue Line Marine Transport",
  description:
    "Blue Line Marine Transport covers states along the East Coast, from New York to Florida. Door-to-door boat hauling and delivery. Check your area or request a quote.",
};

/** Coverage page — full treatment with map + region list. */
export default function CoveragePage() {
  return (
    <main id="main" role="main">
      {/* Hero stub for coverage page */}
      <section className="bg-navy py-16 md:py-24 lg:py-32">
        <Container>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foam">
            Service Area
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-steel">
            We transport boats across the East Coast — from New York to Florida.
            Enter your location or call us to verify coverage.
          </p>
        </Container>
      </section>

      <CoverageSection variant="full" />
    </main>
  );
}
