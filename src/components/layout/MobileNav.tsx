"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn, stripPhoneDigits } from "@/lib/utils";
import { getSite } from "@/lib/content";

const site = getSite();

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/coverage", label: "Coverage" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Full-screen mobile navigation panel.
 * Opens on hamburger click, closes on Escape or link click.
 * Locks body scroll while open; traps focus inside the panel.
 */
export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Focus trap inside the panel
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const el = panelRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = panelRef.current;
      if (!el) return;
      const focusable = Array.from(
        el.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
          'a[href]:not([tabindex="-1"]):not(.sr-only), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        )
      ) as (HTMLAnchorElement | HTMLButtonElement)[];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus first link when opened
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-navy md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      ref={panelRef}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close menu"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-foam transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Nav links */}
      <nav aria-label="Mobile navigation" className="flex h-full flex-col items-center justify-center gap-8 pt-16">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={i === 0 ? firstLinkRef : undefined}
            {...(i === NAV_LINKS.length - 1 && { ref: lastLinkRef })}
            onClick={handleClose}
            className="text-2xl font-semibold text-foam transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-white"
          >
            {link.label}
          </Link>
        ))}

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={`tel:${stripPhoneDigits(site.phone)}`}
            aria-label={`Call us at ${site.phone}`}
            className="text-lg font-semibold text-foam underline decoration-transparent hover:decoration-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            Call Us
          </a>
          <Link
            href="/contact"
            onClick={handleClose}
            aria-label="Get a quote"
            className="inline-flex items-center justify-center rounded-md bg-signal px-8 py-3 text-base font-semibold text-ink underline decoration-transparent hover:decoration-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            Get a Quote
          </Link>
        </div>
      </nav>

      {/* Blue-line rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand/40" />
    </div>
  );
}
