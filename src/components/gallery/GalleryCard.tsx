/** GalleryCard — single gallery item with image, caption, hover effects. */

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[6px] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Image container — explicit aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
        <Image
          src={item.imageRef}
          alt={item.caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Caption area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-navy group-hover:text-blue transition-colors duration-200">
            {item.caption}
          </h3>
          {item.category && (
            <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
              {item.category}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
