import { siteConfig } from "@/content/site";
import Link from "next/link";

/** Minimal footer — contact block, nav links, legal. */
export function Footer() {
  return (
    <footer className="border-t border-steel/30 bg-navy text-foam">
      <div className="mx-auto max-w-container-xl px-4 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-foam">Blue Line Marine Transport</h3>
            <p className="text-sm leading-relaxed text-steel">
              Professional boat transportation across the East Coast. Licensed &amp; insured.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foam/80">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-steel">
              <li>
                <Link href="/services/powerboat" className="hover:text-signal transition-colors">
                  Powerboat Transport
                </Link>
              </li>
              <li>
                <Link href="/services/sailboat" className="hover:text-signal transition-colors">
                  Sailboat Transport
                </Link>
              </li>
              <li>
                <Link href="/services/heavy-vessel" className="hover:text-signal transition-colors">
                  Heavy / Large Vessel
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foam/80">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-steel">
              {(["about", "coverage", "process", "faq"] as const).map((path) => (
                <li key={path}>
                  <Link href={`/${path}`} className="hover:text-signal transition-colors capitalize">
                    {path}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foam/80">
              Contact
            </h4>
            <address className="not-italic space-y-2 text-sm text-steel">
              <p>
                <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="hover:text-signal transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-signal transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-steel/30 pt-6 text-center text-xs text-steel">
          &copy; {new Date().getFullYear()} Blue Line Marine Transport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
