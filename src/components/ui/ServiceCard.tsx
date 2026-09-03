/** ServiceCard — foam surface, 1px border, 4:3 image slot, eyebrow/title/summary/arrow link. */

import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  imageAlt?: string;
  eyebrow: string;
  title: string;
  summary: string;
  href?: string;
}

export function ServiceCard({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  summary,
  href,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[6px] border border-steel/30 bg-surface-section transition-colors duration-200 hover:border-brand/40",
        className
      )}
    >
      {/* 4:3 image slot */}
      {imageSrc && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
          <img
            src={imageSrc}
            alt={imageAlt || ""}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Eyebrow */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </p>

        {/* Title */}
        <h3
          className="font-display text-xl font-bold leading-tight tracking-tight text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>

        {/* Summary */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">{summary}</p>

        {/* Arrow link */}
        {href && (
          <a
            href={href}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-150 hover:text-brand-dark group-hover:gap-2"
          >
            Learn more
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
