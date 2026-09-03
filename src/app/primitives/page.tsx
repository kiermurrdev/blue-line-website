/** Primitives Showcase — dev route for viewport validation of all UI primitives. */

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton, SecondaryButton, PrimaryButtonFull } from "@/components/ui/Button";
import { Stat, Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Accordion } from "@/components/ui/Accordion";
import { ImageFrame } from "@/components/ui/ImageFrame";

export default function PrimitivesShowcase() {
  return (
    <div className="min-h-screen bg-surface-page">
      {/* Hero */}
      <section className="bg-navy py-16 sm:py-24">
        <Container>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-steel">
            <span className="block h-[1px] w-8 bg-brand" />
            Design System
          </p>
          <h1
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            UI Primitives
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-steel">
            All Blue Line primitives rendered for viewport validation. Test at 375px, 768px, and 1280px+.
          </p>
        </Container>
      </section>

      {/* Buttons */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Buttons"
            title="Primary &amp; Secondary"
            lede="Signal orange for CTAs only. Bordered variants for dark surfaces."
          />

          {/* Primary */}
          <div className="mb-12">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Primary (signal bg)</h3>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton>Get a Quote</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
              <a href="#test" className="inline-flex items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand">
                As link element
              </a>
            </div>
          </div>

          {/* Secondary */}
          <div className="mb-12">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Secondary (bordered)</h3>
            <div className="flex flex-wrap items-center gap-4">
              <SecondaryButton>Learn More</SecondaryButton>
              <SecondaryButton disabled>Disabled</SecondaryButton>
              <a href="#test" className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-current px-6 py-3 text-sm font-semibold leading-5 transition-colors duration-150 hover:bg-surface-section-alt/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand">
                As link element
              </a>
            </div>
          </div>

          {/* Full-width mobile */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Full-width on mobile</h3>
            <div className="max-w-md space-y-3 sm:max-w-none">
              <PrimaryButtonFull>Get a Quote — Full Width Mobile</PrimaryButtonFull>
              <SecondaryButton className="w-full sm:w-auto">Learn More — Full Width Mobile</SecondaryButton>
            </div>
          </div>

          {/* Focus states demo */}
          <div className="mt-12 rounded-[6px] border border-dashed border-steel/30 p-6">
            <p className="mb-4 text-sm font-medium text-ink">Keyboard focus — tab through:</p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton tabIndex={0}>Focus me</PrimaryButton>
              <SecondaryButton tabIndex={0}>Focus me</SecondaryButton>
              <button tabIndex={0} className="rounded-[6px] border border-steel/30 px-6 py-3 text-sm font-semibold leading-5 transition-colors duration-150 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand">
                Raw button
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Blue line divider */}
      <span className="block h-[1px] w-full bg-brand" aria-hidden="true" />

      {/* SectionHeading & Badge/Stat */}
      <section className="bg-surface-section-alt py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Trust Signals"
            title="Stats &amp; Badges"
            lede="Large numerals for trust bars. Badge variants for inline labels."
          />

          {/* Stats */}
          <div className="mb-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat numeral="15+" label="Years in operation" />
            <Stat numeral="12K" label="Boats moved" />
            <Stat numeral="26" label="States served" />
            <Stat numeral="DOT-12345" label="Licensed &amp; insured" />
          </div>

          {/* Badges */}
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <Badge>Licensed</Badge>
            <Badge variant="outline">Insured</Badge>
            <Badge>Air-Ride Trailers</Badge>
            <Badge variant="outline">Hydraulic Stretch</Badge>
          </div>
        </Container>
      </section>

      {/* Blue line divider */}
      <span className="block h-[1px] w-full bg-brand" aria-hidden="true" />

      {/* ServiceCard */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Service Cards"
            title="Content Cards"
            lede="Foam surface, 1px border, 4:3 image slot. Hover reveals arrow shift."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              imageSrc="/images/placeholder-powerboat.webp"
              imageAlt="Powerboat on trailer being loaded"
              eyebrow="Vessel Type"
              title="Powerboat Transport"
              summary="From 16ft runabouts to 60ft cruisers. Door-to-door marina or storage delivery."
              href="/services/powerboat"
            />
            <ServiceCard
              imageSrc="/images/placeholder-sailboat.webp"
              imageAlt="Sailboat being prepared for transport"
              eyebrow="Vessel Type"
              title="Sailboat Transport"
              summary="Mast-down and mast-up options. Rigging inspection coordination included."
              href="/services/sailboat"
            />
            <ServiceCard
              imageSrc="/images/placeholder-heavy.webp"
              imageAlt="Heavy vessel on lowboy trailer"
              eyebrow="Vessel Type"
              title="Heavy &amp; Large Vessel"
              summary="Custom equipment for vessels over 40ft. Hydraulic stretch trailers available."
              href="/services/heavy-vessel"
            />
          </div>

          {/* Card without image */}
          <h3 className="mt-12 mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Without image</h3>
          <ServiceCard
            eyebrow="Process Step"
            title="Request a Quote"
            summary="Tell us about your boat, route, and timeline. We respond within 2 business hours."
            href="/contact"
          />
        </Container>
      </section>

      {/* Blue line divider */}
      <span className="block h-[1px] w-full bg-brand" aria-hidden="true" />

      {/* Accordion */}
      <section className="bg-surface-section-alt py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Accordion"
            lede="Single-open behavior. Chevron rotates. Hairline dividers. Only client primitive."
          />

          <div className="max-w-3xl">
            <Accordion
              items={[
                {
                  id: "faq-1",
                  title: "How far in advance should I book?",
                  content: (
                    <>
                      We recommend booking at least 2–4 weeks ahead for standard routes. Peak season (May–September) may require earlier notice. Emergency and rush moves are available upon request.
                    </>
                  ),
                },
                {
                  id: "faq-2",
                  title: "What insurance coverage do you provide?",
                  content: (
                    <>
                      All moves include full cargo insurance up to the agreed value of your vessel. We carry $2M general liability and all drivers are certified in heavy equipment transport. Documentation is provided at load-out.
                    </>
                  ),
                },
                {
                  id: "faq-3",
                  title: "Do you handle pickup and delivery locations?",
                  content: (
                    <>
                      Yes — we pick up from any marina, dock, or storage facility and deliver to your destination. We coordinate with both parties for access requirements, draft conditions, and timing.
                    </>
                  ),
                },
                {
                  id: "faq-4",
                  title: "How is pricing determined?",
                  content: (
                    <>
                      Quotes are based on vessel length/weight, distance, route complexity, season, and any special equipment needed. Every quote includes load-out, transport, and delivery — no hidden fees.
                    </>
                  ),
                },
              ]}
            />

            {/* Keyboard demo */}
            <div className="mt-8 rounded-[6px] border border-dashed border-steel/30 p-4">
              <p className="text-sm text-steel">
                <strong className="text-ink">Keyboard:</strong> Tab to accordion heading → Enter or Space to open/close. Chevron rotates. Only one panel open at a time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Blue line divider */}
      <span className="block h-[1px] w-full bg-brand" aria-hidden="true" />

      {/* ImageFrame */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Images"
            title="ImageFrame"
            lede="Wraps next/image with explicit dimensions. Lazy by default, eager opt-in for hero."
          />

          {/* Standard lazy */}
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Lazy loaded (default)</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ImageFrame src="/images/placeholder-powerboat.webp" alt="Powerboat on trailer" width={600} height={450} />
            <ImageFrame src="/images/placeholder-sailboat.webp" alt="Sailboat being prepared" width={600} height={450} />
            <ImageFrame src="/images/placeholder-heavy.webp" alt="Heavy vessel transport" width={600} height={450} />
          </div>

          {/* Priority eager */}
          <h3 className="mt-12 mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Priority (eager load)</h3>
          <ImageFrame src="/images/placeholder-powerboat.webp" alt="Hero powerboat image" width={1200} height={675} priority className="max-h-[48rem]" />

          {/* Decorative */}
          <h3 className="mt-12 mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-steel">Decorative (alt="")</h3>
          <ImageFrame src="/images/placeholder-powerboat.webp" alt="" width={600} height={450} decorative />

          {/* Focus demo */}
          <div className="mt-8 rounded-[6px] border border-dashed border-steel/30 p-4">
            <p className="text-sm text-steel">
              <strong className="text-ink">Accessibility:</strong> Meaningful alt for informative images. Empty alt="" for decorative. Focus visible on interactive wrappers.
            </p>
          </div>
        </Container>
      </section>

      {/* Blue line divider */}
      <span className="block h-[1px] w-full bg-brand" aria-hidden="true" />

      {/* Responsive breakpoints reference */}
      <section className="bg-surface-section-alt py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Validation"
            title="Viewport Sizes"
            lede="Test each primitive at these widths. Mobile-first layout should hold at every breakpoint."
          />

          <div className="overflow-hidden rounded-[6px] border border-steel/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-steel">
                <tr>
                  <th className="border-b border-steel/20 px-6 py-3 font-semibold">Breakpoint</th>
                  <th className="border-b border-steel/20 px-6 py-3 font-semibold">Width</th>
                  <th className="border-b border-steel/20 px-6 py-3 font-semibold">Layout</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-steel/10">
                  <td className="px-6 py-4 font-mono text-brand">Mobile (base)</td>
                  <td className="px-6 py-4 font-mono">375px</td>
                  <td className="px-6 py-4">Single column, sticky call bar</td>
                </tr>
                <tr className="border-b border-steel/10">
                  <td className="px-6 py-4 font-mono text-brand">Tablet (sm/md)</td>
                  <td className="px-6 py-4 font-mono">768–768px</td>
                  <td className="px-6 py-4">2-up cards, split layouts begin</td>
                </tr>
                <tr className="border-b border-steel/10">
                  <td className="px-6 py-4 font-mono text-brand">Desktop (lg)</td>
                  <td className="px-6 py-4 font-mono">1280px</td>
                  <td className="px-6 py-4">3-up grids, full nav visible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Footer note */}
      <footer className="border-t border-steel/20 py-8">
        <Container>
          <p className="text-xs text-steel">
            Blue Line UI Primitives · Built per DESIGN_SYSTEM.md §5 · All tokens from CSS variables
          </p>
        </Container>
      </footer>
    </div>
  );
}
