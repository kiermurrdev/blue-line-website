/** Testimonials — renders only when owner-supplied testimonials exist. */

import { getTestimonials } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  const items = getTestimonials();

  // Graceful degradation: section renders nothing when no testimonials exist.
  // CONTENT_MODEL §3 — no fake quotes ship.
  if (!items.length) return null;

  return (
    <section className="bg-surface-section" aria-label="Customer Testimonials">
      <Container>
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Boat Owners Along the Coast"
          lede="Real feedback from people who've trusted Blue Line with their vessels."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col justify-between rounded-[6px] border border-steel/20 bg-surface-section-alt px-6 py-6"
            >
              <p className="text-sm leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-3 border-t border-steel/15 pt-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-steel">
                    {t.boatType ? `${t.boatType} · ` : ""}{t.location}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
