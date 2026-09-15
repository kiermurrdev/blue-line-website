import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Get back to Blue Line Marine Transport or request a boat transportation quote.",
};

/** Branded 404 — keeps user on site with primary CTAs. */
export default function NotFoundPage() {
  return (
    <main id="main-content" role="main">
      <section className="bg-surface-dark section-rhythm">
        <div className="mx-auto max-w-container-xl px-4 py-20 md:px-8">
          <div className="text-center">
            {/* Blue-line motif */}
            <div
              className="mx-auto mb-8 h-[2px] w-24 bg-blue"
              aria-hidden="true"
            />

            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-tight tracking-tight text-foam">
              404
            </h1>

            <p className="mt-4 text-lg font-medium text-foam sm:text-xl">
              Page not found
            </p>

            <p className="mt-3 max-w-[50ch] mx-auto text-base leading-relaxed text-steel">
              This page doesn't exist. Get back to our homepage or request a quote
              for your boat transportation.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[6px] bg-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go Home
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[6px] border border-steel/30 px-6 py-3 text-sm font-semibold text-foam transition-colors duration-150 hover:bg-foam/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
