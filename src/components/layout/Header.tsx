import { siteConfig } from "@/content/site";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      {/* Blue-line rule at bottom of header */}
      <div className="blue-line" />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="mx-auto flex max-w-container-xl items-center justify-between px-4 py-3 md:px-8"
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
                className="text-sm font-medium text-ink transition-colors hover:text-brand hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            className="text-sm font-semibold text-ink hover:text-brand"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-signal-dark"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
