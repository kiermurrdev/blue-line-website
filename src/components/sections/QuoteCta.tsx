/** QuoteCta — dark mid-page band with primary CTA + phone action. Reusable on any page. */

import { cn, stripPhoneDigits } from "@/lib/utils";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { PrimaryButtonFull } from "../ui/Button";
import { getSite } from "@/lib/content";

interface QuoteCtaProps {
  /** Override eyebrow label. */
  eyebrow?: string;
  /** Override heading title. */
  title?: string;
  /** Override lede text. */
  lede?: string;
}

export function QuoteCta({
  eyebrow = "Get Started",
  title = "Ready to Move Your Boat?",
  lede = "Request a free, no-obligation quote or call us directly — we respond within one business day.",
}: QuoteCtaProps) {
  const site = getSite();

  return (
    <section className="bg-surface-dark section-rhythm" aria-label="Call to action">
      <Container>
        <div className="mx-auto max-w-[52ch] text-center">
          <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand",
                "w-full sm:w-auto"
              )}
            >
              Request a Free Quote
            </a>

            {site.phone && (
              <a
                href={`tel:${stripPhoneDigits(site.phone)}`}
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-semibold text-foam/80 transition-colors hover:text-brand underline underline-offset-4 decoration-steel/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {site.phone}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
