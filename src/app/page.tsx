/** Home — final-composition pass per Issue #9. */

import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { getSite, getTestimonials } from "@/lib/content";

// Owner-confirmed stats (CONTENT_MODEL §3): render only confirmed values
const CONFIRMED_STATS: { numeral: string | number; label: string }[] = [];

/** Per-page metadata for the homepage. */
export const metadata: Metadata = {
  title: "Blue Line Marine Transport — Professional Boat Transportation",
  description:
    "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Blue Line Marine Transport — Professional Boat Transportation",
    description:
      "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
    siteName: "Blue Line Marine Transport",
    locale: "en_US",
    url: "/",
  },
};

/** JSON-LD structured data for LocalBusiness on the homepage. */
const site = getSite();
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description:
    "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
  url: "https://bluelinemarinetransport.com",
  telephone: site.phone,
  email: site.email,
  areaServed: {
    "@type": "State",
    name: "East Coast, United States",
  },
  serviceType: [
    "Powerboat Transportation",
    "Sailboat Transportation",
    "Heavy Vessel Hauling",
    "Door-to-Door Boat Delivery",
  ],
};

export default function HomePage() {
  const testimonials = getTestimonials();

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

      {/* Section 5: Coverage Area */}
      <CoverageSection />

      {/* Section 6: Gallery */}
      <GalleryStrip />

      {/* Section 7: Testimonials — renders only when owner-supplied testimonials exist */}
      {testimonials.length > 0 && <Testimonials />}

      {/* Section 8: FAQ (general) */}
      <FaqAccordion context="general" />

      {/* Section 9: CTA */}
      <QuoteCta />

      {/* JSON-LD structured data — injected via script tag for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
