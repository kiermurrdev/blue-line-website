import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { getSite } from "@/lib/content";
import { stripPhoneDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Quote — Blue Line Marine Transport",
  description:
    "Request a free boat transportation quote. Tell us about your vessel and route — we respond within one business day.",
};

const site = getSite();

/** Primary conversion page (ARCHITECTURE §2) — static shell + client form. */
export default function ContactPage() {
  return (
    <>
      {/* Hero band — establishes the page's single job immediately */}
      <section className="bg-surface-dark section-rhythm">
        <div className="mx-auto max-w-container-xl px-4 md:px-8">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight tracking-tight text-foam sm:text-5xl lg:text-6xl">
            Get a Quote
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-steel sm:text-lg">
            Tell us about the boat and the route — we&apos;ll get back to you within one business day with a firm number.
          </p>
        </div>
      </section>

      {/* Form + contact details */}
      <section className="bg-surface-section section-rhythm" aria-labelledby="quote-heading">
        <div className="mx-auto max-w-container-xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            {/* The form is the conversion surface here (ARCHITECTURE §6) */}
            <div>
              <h2 id="quote-heading" className="sr-only">Quote request</h2>
              <QuoteForm />
            </div>

            {/* Sidebar — phone/email CTAs and service area context */}
            <aside aria-label="Contact details" className="space-y-6 text-sm">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  Prefer to talk it through?
                </p>
                <h3 className="font-display text-lg font-bold text-ink">A real person answers.</h3>
              </div>

              {/* Phone CTA */}
              {site.phone && (
                <a
                  href={`tel:${stripPhoneDigits(site.phone)}`}
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-[6px] border bg-signal px-5 py-3 text-base font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 0 0 1-.45 2.11L8.09 9.91a16 0 0 0 6 6l1.27-1.27a2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 0 0 1 22 16.92z" />
                  </svg>
                  {site.phone}
                </a>
              )}

              {/* Email CTA */}
              <p className="mt-4">
                Or email us directly:
              </p>
              <p className="break-all mt-1">
                <Link
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-base font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                >
                  {site.email}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </p>

              {/* Service area context — from content, not invented */}
              <div className="pt-6 border-t border-steel/20">
                <p className="text-xs text-steel">
                  Serving the East Coast. See our{" "}
                  <Link href="/coverage" className="text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
                    service area
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ — quote-process context only */}
      <FaqAccordion context="quote-process" />

      {/* Secondary conversion CTA at bottom */}
      <QuoteCta
        eyebrow="Still have questions?"
        title="Ready to Move Your Boat?"
        lede="Request a free, no-obligation quote or call us directly — we respond within one business day."
      />
    </>
  );
}
