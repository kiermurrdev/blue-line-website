"use client";

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [active, setActive] = useState<string>("All");

  // Always include "All" as the first option
  const options = ["All", ...categories];

  return (
    <nav aria-label="Gallery category filter">
      <div className="flex flex-wrap gap-2 border-b border-gray/15 pb-[1px]">
        {options.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 ${
                isActive ? "text-navy" : "text-slate hover:text-navy"
              }`}
              aria-pressed={isActive}
            >
              {cat}
              {/* Blue-line active indicator */}
              <span
                className={`absolute bottom-[10px] left-4 right-4 h-[2px] bg-blue transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
