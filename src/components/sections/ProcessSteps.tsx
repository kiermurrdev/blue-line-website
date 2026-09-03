/** ProcessSteps — numbered timeline, vertical on mobile → horizontal 4-step row at md+. */

import { getPageContent } from "@/lib/content";
import type { ProcessStep } from "@/types/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function ProcessSteps() {
  const steps = (getPageContent("process") as ProcessStep[] | null) ?? [];

  return (
    <section className="bg-surface-section-alt" aria-label="How It Works">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works"
          lede="Four straightforward steps from quote to delivery — every time."
        />

        {/* Vertical on mobile, horizontal at md+ */}
        <ol className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.order} className="relative flex flex-col items-center text-center">
              {/* Number badge — signal accent, outlined circle */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-surface-section text-lg font-bold text-brand"
                aria-hidden="true"
              >
                {step.order}
              </span>

              {/* Content */}
              <div className="mt-4">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-steel md:mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Connector line between steps — only visible on desktop */}
              {step.order < steps.length && (
                <span
                  className="absolute top-6 hidden h-[2px] w-full -translate-x-1/2 translate-x-full bg-brand/30 md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
