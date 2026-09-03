/** Accordion — single-open, chevron rotation, hairline dividers, aria-expanded/aria-controls. */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ id, title, children }: AccordionItemProps) {
  return (
    <div className="border-b border-steel/20 last:border-b-0">
      <h3>
        <button
          type="button"
          id={`accordion-heading-${id}`}
          aria-expanded={false}
          aria-controls={`accordion-panel-${id}`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold leading-snug text-ink transition-colors duration-150 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          <span>{title}</span>
          <ChevronIcon />
        </button>
      </h3>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-heading-${id}`}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <div className="pb-5 text-sm leading-relaxed text-steel">{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{ id: string; title: string; content: React.ReactNode }>;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("divide-y divide-steel/20", className)} role="presentation">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <AccordionItemWithState
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            isOpen={isOpen}
            onToggle={() => setOpenId(isOpen ? null : item.id)}
          />
        );
      })}
    </div>
  );
}

function AccordionItemWithState({
  id,
  title,
  content,
  isOpen,
  onToggle,
}: {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-steel/20 last:border-b-0">
      <h3>
        <button
          type="button"
          id={`accordion-heading-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold leading-snug text-ink transition-colors duration-150 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          <span>{title}</span>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-heading-${id}`}
        className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0px" }}
      >
        <div className="pb-5 text-sm leading-relaxed text-steel">{content}</div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn(
        "shrink-0 text-steel transition-transform duration-200",
        open && "rotate-180"
      )}
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
