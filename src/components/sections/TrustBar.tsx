/** TrustBar — dark band of owner-confirmed stats; hidden when none confirmed. */

import { Container } from "../ui/Container";
import { Stat } from "../ui/Badge";

interface StatItem {
  numeral: string | number;
  label: string;
}

export function TrustBar({ stats }: { stats: StatItem[] }) {
  // If no confirmed stats, render nothing — never fake
  if (!stats.length) return null;

  return (
    <section className="bg-navy" aria-label="Company statistics">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-3 md:gap-x-12 lg:py-16">
          {stats.map((stat) => (
            <Stat key={stat.label} numeral={stat.numeral} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
