/** FAQ — grouped by context, single-open accordion from ui primitive. */

import { getFaqs } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Accordion } from "../ui/Accordion";

interface FaqAccordionProps {
  /** Filter by context group. Omit for all FAQs. */
  context?: "general" | "quote-process" | "prep";
}

export function FaqAccordion({ context }: FaqAccordionProps) {
  const faqs = getFaqs(context);

  // Graceful degradation: no content, no section.
  if (!faqs.length) return null;

  const items = faqs.map((faq) => ({
    id: faq.slug,
    title: faq.question,
    content: <span dangerouslySetInnerHTML={{ __html: faq.answer }} />,
  }));

  return (
    <section className="bg-surface-section-alt section-rhythm" aria-label="Frequently Asked Questions">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions"
          lede={context === "quote-process" ? "Everything you need to know before requesting a quote." : undefined}
        />

        <div className="mx-auto max-w-[48rem]">
          <Accordion items={items} />
        </div>
      </Container>
    </section>
  );
}
