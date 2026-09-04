import type { Metadata } from "next";
import { getFaqs } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteCta } from "@/components/sections/QuoteCta";

export const metadata: Metadata = {
  title: "FAQ — Blue Line Marine Transport",
  description:
    "Answers to common questions about boat transportation, the quote process, and vessel preparation with Blue Line Marine Transport.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    title: "FAQ — Blue Line Marine Transport",
    description:
      "Answers to common questions about boat transportation, the quote process, and vessel preparation with Blue Line Marine Transport.",
    siteName: "Blue Line Marine Transport",
    locale: "en_US",
    url: "/faq",
  },
};

/** FAQ landing page — grouped accordions + CTA. */
export default function FaqPage() {
  const general = getFaqs("general");
  const quoteProcess = getFaqs("quote-process");
  const prep = getFaqs("prep");

  return (
    <>
      {/* Hero / H1 */}
      <section className="bg-surface-dark section-rhythm">
        <Container>
          <div className="mx-auto max-w-[65ch] text-center">
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-foam" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-steel">
              Everything you need to know before requesting a quote — from our process to vessel preparation.
            </p>
          </div>
        </Container>
      </section>

      {/* General FAQs */}
      <FaqAccordion context="general" />

      {/* Quote Process FAQs */}
      <FaqAccordion context="quote-process" />

      {/* Prep FAQs */}
      <FaqAccordion context="prep" />

      {/* CTA */}
      <QuoteCta
        eyebrow="Still Have Questions?"
        title="Get in Touch"
        lede="Can't find what you're looking for? Reach out directly — we'll get back within one business day."
      />
    </>
  );
}
