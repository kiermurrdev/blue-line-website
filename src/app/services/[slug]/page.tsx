import type { Metadata, ResolvingMetadata } from "next";
import type { Service, Faq } from "@/types/content";
import { getServices, getService, getFaqs } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { QuoteCta } from "@/components/sections/QuoteCta";

// ── Static params — one route per service slug ────────────────────────

export function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({ slug: service.slug }));
}

// ── Metadata — derived per-slug from content layer ───────────────────

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found — Blue Line Marine Transport" };
  }

  const baseUrl = "https://bluelinemarine.com";
  const pageUrl = `${baseUrl}/services/${slug}`;

  return {
    title: `${service.title} — Blue Line Marine Transport`,
    description: service.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      title: `${service.title} | Blue Line Marine Transport`,
      description: service.summary,
      url: pageUrl,
      siteName: "Blue Line Marine Transport",
    },
  };
}

// ── JSON-LD — Service schema per slug ────────────────────────────────

function JsonLd({ service }: { service: Service }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "LocalBusiness",
      name: "Blue Line Marine Transport",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Page — hero + long description + vessel types + equipment + prep + FAQs ──

export default async function ServiceDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const service = getService(slug);

  if (!service) {
    return (
      <main id="main" role="main">
        <section className="bg-surface-section section-rhythm">
          <Container>
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-ink mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Service Not Found
            </h1>
            <p className="text-base text-steel">The requested service page could not be found.</p>
          </Container>
        </section>
      </main>
    );
  }

  // Resolve per-service FAQs via faqRefs; fall back to empty array
  const serviceFaqs = (service.faqRefs?.length ? getFaqs().filter((f) => service.faqRefs!.includes(f.slug)).map((faq) => ({ id: faq.slug, title: faq.question, content: faq.answer })) : []) as { id: string; title: string; content: React.ReactNode }[];

  return (
    <>
      <JsonLd service={service} />

      {/* Hero variant — title + summary + CTA */}
      <section className="bg-surface-section section-rhythm" aria-label={`${service.title} overview`}>
        <Container>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-ink mb-6" style={{ fontFamily: "var(--font-display)" }}>
            {service.title}
          </h1>

          <p className="max-w-[65ch] text-lg leading-relaxed text-steel mb-8">{service.summary}</p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            {service.ctaLabel || "Get a quote"}
          </a>
        </Container>
      </section>

      {/* Long description */}
      <section className="bg-surface section-rhythm" aria-label={`${service.title} details`}>
        <Container>
          <div className="mx-auto max-w-[65ch]">
            <SectionHeading eyebrow={service.title} title="Details" />

            <p className="text-base leading-relaxed text-steel">{service.description || "Content coming soon."}</p>
          </div>
        </Container>
      </section>

      {/* Vessel types */}
      {service.vesselTypes?.length ? (
        <section className="bg-surface-section-alt section-rhythm" aria-label={`${service.title} vessel types`}>
          <Container>
            <div className="mx-auto max-w-[65ch]">
              <SectionHeading eyebrow={service.title} title="Vessel Types We Transport" />

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {service.vesselTypes.map((vessel) => (
                  <li key={vessel} className="flex items-center gap-3 rounded-[6px] border border-steel/20 bg-surface-section px-5 py-4 text-sm font-medium text-ink">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-brand" aria-hidden="true">
                      <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {vessel}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Equipment */}
      {service.equipment?.length ? (
        <section className="bg-surface section-rhythm" aria-label={`${service.title} equipment`}>
          <Container>
            <div className="mx-auto max-w-[65ch]">
              <SectionHeading eyebrow={service.title} title="Equipment &amp; Trailers" />

              <ul className="space-y-3">
                {service.equipment.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-steel">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5 text-brand" aria-hidden="true">
                      <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Prep notes */}
      {service.prepNotes ? (
        <section className="bg-surface-section-alt section-rhythm" aria-label={`${service.title} preparation`}>
          <Container>
            <div className="mx-auto max-w-[65ch]">
              <SectionHeading eyebrow={service.title} title="Preparation Notes" />

              <p className="text-base leading-relaxed text-steel">{service.prepNotes}</p>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Per-service FAQs */}
      {serviceFaqs.length ? (
        <section className="bg-surface-section section-rhythm" aria-label={`${service.title} FAQs`}>
          <Container>
            <SectionHeading eyebrow={service.title} title="Common Questions" />

            <div className="mx-auto max-w-[48rem]">
              <Accordion items={serviceFaqs} />
            </div>
          </Container>
        </section>
      ) : null}

      {/* Bottom CTA */}
      <QuoteCta />
    </>
  );
}
