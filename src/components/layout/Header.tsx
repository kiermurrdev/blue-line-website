"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { cn, stripPhoneDigits } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

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
 * Site header — sticky, transparent over hero → solid ink after scroll.
 * Logo left (public/brand/logo.svg), nav center-right, phone + CTA right.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = scrolled ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent";
  const borderColor = scrolled ? "border-brand/30" : "border-brand";

  return (
    <>
      <header className={cn("sticky top-0 z-50 w-full transition-colors duration-200", headerBg)}>
        {/* Blue-line rule at bottom of header */}
        <div className={cn("blue-line transition-opacity duration-200", scrolled ? "opacity-100" : "opacity-40")} />

        <nav
          role="navigation"
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex max-w-container-xl items-center justify-between px-4 py-3 md:px-8",
            scrolled && "border-b border-brand/20"
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="Blue Line Marine Transport home">
            <Image
              src="/brand/logo.svg"
              alt="Blue Line Marine Transport"
              width={220}
              height={60}
              className="h-10 w-auto md:h-14"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand hover:underline underline-offset-4",
                    scrolled ? "text-foam" : "text-ink"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${stripPhoneDigits(site.phone)}`}
              data-site-phone
              className={cn(
                "hidden text-sm font-semibold transition-colors hover:text-brand md:inline",
                scrolled ? "text-foam" : "text-ink"
              )}
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className={cn(
                "rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-signal-dark",
                scrolled ? "" : "bg-signal/90"
              )}
            >
              Get a Quote
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "ml-2 flex h-10 w-10 items-center justify-center md:hidden",
                scrolled ? "text-foam" : "text-ink"
              )}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen nav */}
      {mobileOpen && <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
