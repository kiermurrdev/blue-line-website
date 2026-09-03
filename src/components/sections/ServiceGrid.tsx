/** ServiceGrid — responsive 3/2/1 card grid from getServices(). */

import Link from "next/link";

import { getServices } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";

export function ServiceGrid() {
  const services = getServices();

  return (
    <section className="bg-surface-section" aria-label="Our Services">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Marine Transport Services"
          lede="From powerboats to heavy vessels, we move your boat with professional care — door-to-door across the East Coast."
        />

        {/* Responsive grid: 1-up mobile / 2-up tablet (md) / 3-up desktop (lg) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              eyebrow={service.title}
              title={service.title}
              summary={service.summary}
              href={`/services/${service.slug}`}
              linkLabel={`Learn more about ${service.title}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
