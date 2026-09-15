import Script from "next/script";

type JsonLdProps = {
  data: Record<string, unknown>;
  /** Optional — defaults to true. */
  noModule?: boolean;
};

/** Injects JSON-LD structured data via a <script type="application/ld+json"> tag. */
export function JsonLd({ data, noModule = true }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${JSON.stringify(data).slice(0, 64)}`}
      type="application/ld+json"
      noModule={noModule}
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}

/**
 * Schema.org LocalBusiness for Blue Line Marine Transport.
 *
 * Uses only values from site.ts — no invented service areas or facts.
 */
export function LocalBusinessJsonLd({
  name = "Blue Line Marine Transport",
  description,
  phone,
  email,
  url = "https://bluelinemarinetransport.com",
}: {
  name?: string;
  description: string;
  phone: string;
  email: string;
  url?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        description,
        url,
        telephone: phone.replace(/[^0-9+]/g, ""),
        email,
        areaServed: {
          "@type": "Place",
          name: "East Coast United States",
          description:
            "New York, New Jersey, Connecticut, Rhode Island, Massachusetts, New Hampshire, Maine, Maryland, Virginia, North Carolina, South Carolina, Georgia, and Florida",
        },
      }}
    />
  );
}

/**
 * Schema.org Service for a single service page.
 */
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
          "@type": "LocalBusiness",
          name: "Blue Line Marine Transport",
          url: "https://bluelinemarinetransport.com",
        },
        areaServed: {
          "@type": "Place",
          name: "East Coast United States",
        },
        url,
      }}
    />
  );
}

/**
 * Schema.org FAQPage for the FAQ page.
 */
export function FaqPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "AcceptedAnswer",
            text: q.answer,
          },
        })),
      }}
    />
  );
}
