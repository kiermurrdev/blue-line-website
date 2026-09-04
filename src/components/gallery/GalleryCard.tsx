import Image from "next/image";
import type { GalleryItem } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

interface GalleryCardProps {
  item: GalleryItem;
}

/** Check if this is a placeholder entry (no real image yet). */
function isPlaceholder(item: GalleryItem): boolean {
  return !item.imageRef || item.imageRef === "" || item.imageRef.includes("placeholder");
}

export default function GalleryCard({ item }: GalleryCardProps) {
  const placeholder = isPlaceholder(item);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[4px] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Image container — explicit aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
        {placeholder ? (
          /* Intentional placeholder — clearly marked, no stock imagery */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--mist)" }}
            role="img"
            aria-label={`Placeholder for ${item.caption}`}
          >
            {/* Blue-line motif as placeholder indicator */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-15"
              aria-hidden="true"
            >
              <rect x="6" y="6" width="36" height="36" rx="2" stroke="var(--blue)" strokeWidth="2" />
              <line x1="6" y1="24" x2="42" y2="24" stroke="var(--blue)" strokeWidth="1.5" />
            </svg>
          </div>
        ) : (
          <Image
            src={item.imageRef}
            alt={item.caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        )}

        {/* Category badge — top-left overlay */}
        {item.category && (
          <div className="absolute left-3 top-3">
            <Badge variant="blue" size="sm">
              {item.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Caption area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-navy group-hover:text-blue transition-colors duration-200">
            {item.caption}
          </h3>
        </div>

        {/* Metadata row */}
        {item.category && (
          <footer className="mt-4 flex items-center gap-3 border-t border-gray/15 pt-3">
            <span className="text-xs font-steel text-slate uppercase tracking-wider">
              {item.category}
            </span>
          </footer>
        )}
      </div>
    </article>
  );
}
