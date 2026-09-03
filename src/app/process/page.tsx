/** /process — How It Works + boat prep guide + quote process. */

import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBoatPrepGuide, getQuoteProcessInfo, getFaqs } from "@/lib/content";

/** Per-page metadata for the process page. */
export const metadata: Metadata = {
  title: "How It Works — Blue Line Marine Transport",
  description:
    "Learn how Blue Line Marine Transport moves your boat safely: quote, prep & pickup, secure transport, and delivery. Plus a complete boat preparation checklist.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    type: "website",
    title: "How It Works — Blue Line Marine Transport",
    description:
      "Learn how Blue Line Marine Transport moves your boat safely: quote, prep & pickup, secure transport, and delivery. Plus a complete boat preparation checklist.",
    siteName: "Blue Line Marine Transport",
    locale: "en_US",
    url: "/process",
  },
};

/** Boat preparation checklist — scannable sections with headings + lists. */
function PrepGuide() {
  const guide = getBoatPrepGuide();
  if (!guide) return null;

  return (
    <section className="bg-surface-section section-rhythm" aria-labelledby="prep-heading">
      <Container>
        <SectionHeading
          eyebrow="Preparation"
          title={guide.heading}
          lede={guide.lede}
        />

        <div className="mx-auto grid gap-10 md:grid-cols-3">
          {guide.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-4 font-display text-lg font-semibold leading-snug text-ink">
                {section.heading}
              </h3>
              <ul className="space-y-3" role="list">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/90">
                    {/* Bullet — blue-line motif */}
                    <span
                      className="mt-[5px] block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Quote process explanation — numbered steps. */
function QuoteProcess() {
  const info = getQuoteProcessInfo();
  if (!info) return null;

  return (
    <section className="bg-surface-section-alt section-rhythm" aria-labelledby="quote-heading">
      <Container>
        <SectionHeading
          eyebrow="Getting Started"
          title={info.heading}
          lede={info.lede}
        />

        <ol className="mx-auto grid gap-8 md:grid-cols-3">
          {info.steps.map((step, idx) => (
            <li key={step.title} className="relative flex flex-col text-center">
              {/* Step number */}
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-surface-section text-sm font-bold text-brand"
                aria-hidden="true"
              >
                {idx + 1}
              </span>

              {/* Content */}
              <div className="mt-4">
                <h3 className="font-display text-base font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-steel md:mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Connector line — desktop only */}
              {idx < info.steps.length - 1 && (
                <span
                  className="absolute top-5 hidden h-[2px] w-full -translate-x-1/2 translate-x-full bg-brand/30 md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** How It Works — the process page. */
export default function ProcessPage() {
  return (
    <>
      {/* Hero — single H1 on this page */}
      <Hero
        title="How We Move Your Boat"
        subtitle="From your first call to delivery at the destination, here's exactly what happens — and how to prepare."
      />

      {/* Section 2: ProcessSteps (full form) */}
      <ProcessSteps />

      {/* Section 3: Boat preparation checklist */}
      <PrepGuide />

      {/* Section 4: Quote process explanation */}
      <QuoteProcess />

      {/* Section 5: Prep-focused FAQ */}
      <FaqAccordion context="prep" />

      {/* Section 6: CTA */}
      <QuoteCta
        eyebrow="Ready to Get Started?"
        title="Move Your Boat with Confidence"
        lede="Request a free, no-obligation quote or call us directly — we respond within one business day."
      />
    </>
  );
}
