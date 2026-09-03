/** SectionHeading — eyebrow (blue-line motif) + title + lede. */

import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ eyebrow, title, lede, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 sm:mb-16", className)}>
      {/* Eyebrow with blue-line leading rule */}
      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-steel">
        <span className="block h-[1px] w-8 bg-brand" />
        {eyebrow}
      </p>

      {/* Title */}
      <h2
        className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight text-ink"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>

      {/* Lede */}
      {lede && (
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-steel">{lede}</p>
      )}
    </div>
  );
}
