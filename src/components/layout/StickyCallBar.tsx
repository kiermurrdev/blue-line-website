"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { stripPhoneDigits } from "@/lib/utils";

const site = getSite();

/**
 * Fixed bottom bar on mobile (below md breakpoint).
 * Primary: tel: call button. Secondary: Get a Quote link.
 * Hides when the contact form is in view (when /contact is active).
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(true);

  // Hide on contact page (form is the conversion surface there)
  useEffect(() => {
    const checkContactPage = () => {
      const formEl = document.getElementById("quote-form");
      if (!formEl) return;
      const rect = formEl.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight);
    };

    // Check on mount and scroll
    checkContactPage();
    window.addEventListener("scroll", checkContactPage, { passive: true });
    return () => window.removeEventListener("scroll", checkContactPage);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-brand/20 bg-navy px-4 py-3 md:hidden">
      {/* Call button */}
      <a
        href={`tel:${stripPhoneDigits(site.phone)}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-signal px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-dark"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        {site.phone}
      </a>

      {/* Get a Quote */}
      <Link
        href="/contact"
        className="ml-3 flex items-center justify-center rounded-md border border-brand px-4 py-3 text-sm font-semibold text-signal transition-colors hover:bg-brand/10"
      >
        Get a Quote
      </Link>
    </div>
  );
}
