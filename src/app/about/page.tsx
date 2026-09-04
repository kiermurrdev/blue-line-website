import type { Metadata } from "next";
import { getAboutPageContent, getTestimonials } from "@/lib/content";
import { getSite } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/sections/TrustBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { QuoteCta } from "@/components/sections/QuoteCta";

const site = getSite();

const CONFIRMED_STATS: { numeral: string | number; label: string }[] = [];

/** Per-page metadata for the about page. */
export const metadata: Metadata = {
  title: "About — Blue Line Marine Transport",
  description:
    (site.dotNumber && site.insuranceStatement)
      ? "Learn about Blue Line Marine Transport — licensed & insured boat transportation across the East Coast. Safety, experience, and care on every move."
      : "Learn about Blue Line Marine Transport — professional boat transportation across the East Coast. Safety, experience, and care on every move.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    title: "About — Blue Line Marine Transport",
    description:
      (site.dotNumber && site.insuranceStatement)
        ? "Learn about Blue Line Marine Transport — licensed & insured boat transportation across the East Coast. Safety, experience, and care on every move."
        : "Learn about Blue Line Marine Transport — professional boat transportation across the East Coast. Safety, experience, and care on every move.",
    siteName: "Blue Line Marine Transport",
    locale: "en_US",
    url: "/about",
  },
};

export default function AboutPage() {
  const content = getAboutPageContent();
  const testimonials = getTestimonials();

  if (!content) return null;

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-dark section-rhythm">
        <Container>
          <div className="mx-auto max-w-[65ch] text-center">
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-foam" style={{ fontFamily: "var(--font-display)" }}>
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-steel">
              {content.hero.lede}
            </p>
          </div>
        </Container>
      </section>

      {/* TrustBar — reused from home; renders nothing when no confirmed stats */}
      <TrustBar stats={CONFIRMED_STATS} />

      {/* Story */}
      <section className="bg-surface-section" aria-label="Our story">
        <Container>
          <div className="mx-auto max-w-[65ch]">
            <SectionHeading eyebrow="Who We Are" title={content.story.heading} />
            <p className="text-base leading-relaxed text-ink">{content.story.body}</p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-surface-section-alt section-rhythm" aria-label="Our values">
        <Container>
          <SectionHeading eyebrow="Our Values" title="Built on What Matters" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.values.map((v, i) => (
              <div key={i} className="rounded-[6px] border border-steel/20 bg-surface-section px-6 py-7">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink" style={{ fontFamily: "var(--font-display)" }}>
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials — reused from home; renders only when owner-supplied testimonials exist */}
      {testimonials.length > 0 && <Testimonials />}

      {/* CTA */}
      <QuoteCta
        eyebrow="Let's Talk"
        title="Move Your Boat with Confidence"
        lede="We'll walk you through the process, answer your questions, and get you a quote — no obligation."
      />
    </>
  );
}
