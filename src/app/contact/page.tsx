import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getSite } from "@/lib/content";
import { stripPhoneDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Quote — Blue Line Marine Transport",
};

const site = getSite();

/** Primary conversion page (ARCHITECTURE §2) — static shell + client form. */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-container-xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="mb-3 text-center font-display text-3xl font-bold md:text-5xl">Get a Quote</h1>
      <p className="mx-auto mb-10 max-w-prose text-center text-steel">
        Tell us about the boat and the route — we&apos;ll get back to you within one business day with a firm number.
      </p>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* The form is the conversion surface here (ARCHITECTURE §6) */}
        <QuoteForm />

        <aside aria-label="Contact details" className="space-y-4 text-sm">
          <h2 className="font-display text-lg font-bold">Prefer to talk it through?</h2>
          <p className="text-steel">Call or email — a real person answers.</p>
          <a
            href={`tel:${stripPhoneDigits(site.phone)}`}
            className="inline-flex min-h-[44px] items-center rounded-[6px] border border-brand px-5 py-2.5 font-semibold text-brand transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            {site.phone}
          </a>
          <p className="break-all">
            <a
              href={`mailto:${site.email}`}
              className="text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              {site.email}
            </a>
          </p>
          <p className="pt-2 text-xs text-steel">
            Serving the East Coast — see our{" "}
            <Link href="/coverage" className="text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark">
              service area
            </Link>{" "}
            for details.
          </p>
        </aside>
      </div>
    </div>
  );
}
