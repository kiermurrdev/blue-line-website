import { getSite } from "@/lib/content";
import { cn, stripPhoneDigits } from "@/lib/utils";
import Link from "next/link";

const site = getSite();

/** Footer — contact block, service links, company nav, legal line. */
export function Footer() {
  const hasDot = Boolean(site.dotNumber);
  const hasInsurance = Boolean(site.insuranceStatement);
  const hasAddress = Boolean(site.address);
  const hasHours = Boolean(site.hours);

  return (
    <footer className="border-t border-steel/30 bg-navy text-foam">
      <div className="mx-auto max-w-container-xl px-4 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-foam">Blue Line Marine Transport</h3>
            <p className="text-sm leading-relaxed text-steel">
              Professional boat transportation across the East Coast.
              {hasDot && hasInsurance ? (
                <> Licensed &amp; insured.</>
              ) : null}
            </p>
          </div>

          {/* Services */}
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
                <a href={`tel:${stripPhoneDigits(site.phone)}`} className="hover:text-signal transition-colors">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-signal transition-colors">
                  {site.email}
                </a>
              </p>
              {hasAddress && (
                <p>{site.address}</p>
              )}
              {hasHours && (
                <p>{site.hours}</p>
              )}
            </address>

            {/* Social links */}
            {site.socials?.length ? (
              <div className="mt-4 flex gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.platform} profile`}
                    className="text-steel transition-colors hover:text-signal"
                  >
                    <span className="sr-only">{social.platform}</span>
                    {/* Simple icon placeholder — replace with actual SVG when social icons are decided */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Legal line */}
        <div className={cn(
          "mt-10 border-t border-steel/30 pt-6 text-center text-xs text-steel",
          hasDot && "text-left"
        )}>
          <p>&copy; {new Date().getFullYear()} Blue Line Marine Transport. All rights reserved.</p>
          {hasDot && (
            <p className="mt-1">DOT #{site.dotNumber}</p>
          )}
          {hasInsurance && (
            <p className="mt-1">{site.insuranceStatement}</p>
          )}
        </div>
      </div>

      {/* Bottom padding for mobile StickyCallBar */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
