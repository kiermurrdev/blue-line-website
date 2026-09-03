/** Home — composed of approved section order with typed placeholder slots. */

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
// Owner-confirmed stats (CONTENT_MODEL §3): render only confirmed values
const CONFIRMED_STATS: { numeral: string | number; label: string }[] = [];

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero />

      {/* Section 2 — TrustBar (hidden when no stats confirmed) */}
      <TrustBar stats={CONFIRMED_STATS} />

      {/* Section 3: Services */}
      <ServiceGrid />

      {/* Section 4: Process */}
      <ProcessSteps />

      {/* ─── Placeholder slots for future sections ─── */}
      {/* Section 5: Coverage */}
      <section className="bg-surface-section" aria-label="Coverage — TODO">
        <div className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-steel">TODO(owner-content) — Coverage section</p>
        </div>
      </section>

      {/* Section 6: Gallery */}
      <section className="bg-surface-section-alt" aria-label="Gallery — TODO">
        <div className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-steel">TODO(owner-content) — Gallery section</p>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="bg-surface-section" aria-label="Testimonials — TODO">
        <div className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-steel">TODO(owner-content) — Testimonials section</p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="bg-surface-section-alt" aria-label="FAQ — TODO">
        <div className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-steel">TODO(owner-content) — FAQ section</p>
        </div>
      </section>

      {/* Section 9: CTA */}
      <section className="bg-surface-section" aria-label="Call to action — TODO">
        <div className="mx-auto max-w-[72rem] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-steel">TODO(owner-content) — CTA section</p>
        </div>
      </section>
    </>
  );
}
