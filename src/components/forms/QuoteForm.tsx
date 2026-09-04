"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { validateQuoteForm } from "@/lib/quote-form";
import type { QuoteFormData, QuoteFormErrors } from "@/lib/quote-form";

/** Initial field values — hoisted so the useState default is referentially stable. */
const INITIAL_DATA: QuoteFormData = {
  name: "",
  phone: "",
  email: "",
  boatType: "",
  sizeEstimate: "",
  pickupLocation: "",
  deliveryLocation: "",
  dateNeeded: "",
  notes: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * TODO(lead-capture): real submission target is an owner decision (Open Question #7).
 * Stub handler — no backend exists yet. Resolves so the success state can render;
 * swap this for a fetch to the chosen endpoint when it lands.
 */
async function submitQuote(_data: QuoteFormData): Promise<void> {
  // Intentionally empty stub.
}

/** Inline error message with icon — never color-only (DESIGN_SYSTEM §5, §7). */
function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1 flex items-start gap-1.5 text-sm font-medium text-red-700">
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

interface FieldProps {
  id: keyof QuoteFormData;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

/** Label-above-input wrapper (DESIGN_SYSTEM §5 form spec). */
function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`quote-${id}`} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? <FieldError id={`quote-${id}-error`} message={error} /> : null}
    </div>
  );
}

const inputClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-[6px] border bg-white px-3 py-2.5 text-base leading-6 text-ink placeholder:text-steel/70",
    "min-h-[44px]", // touch target ≥ 44×44 (DESIGN_SYSTEM §7)
    hasError ? "border-red-700" : "border-steel/40",
    "focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
  );

/**
 * QuoteForm — the only stateful client feature on the site (ARCHITECTURE §6).
 * Controlled inputs, hand-rolled validation in lib/quote-form.ts, ARIA-wired errors.
 */
export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Set when a submit fails validation; consumed by the post-commit focus effect.
  const focusFirstInvalidRef = useRef(false);

  // Native date input affordance — today's date as the earliest pickable day.
  const minDate = new Date().toISOString().slice(0, 10);

  // After React commits validation errors from a failed submit, move focus to
  // the first invalid field so keyboard users land on it (DESIGN_SYSTEM §7).
  useEffect(() => {
    if (!focusFirstInvalidRef.current) return;
    focusFirstInvalidRef.current = false;
    const formEl = document.getElementById("quote-form");
    formEl?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  function updateField(field: keyof QuoteFormData) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear or refresh this field's error as the user corrects it.
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next: QuoteFormErrors = { ...prev };
        delete next[field];
        const revalidated = validateQuoteForm({ ...data, [field]: value });
        if (revalidated[field]) next[field] = revalidated[field];
        return next;
      });
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const fieldErrors = validateQuoteForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Focus the first invalid field after React commits the new errors —
      // done in an effect below, not here: aria-invalid isn't in the DOM yet.
      focusFirstInvalidRef.current = true;
      return;
    }

    setStatus("submitting");
    try {
      await submitQuote(data);
      setStatus("success");
    } catch {
      setSubmitError("Something went wrong sending your request. Please call us directly.");
      setStatus("error");
    }
  }

  function resetForm() {
    setData(INITIAL_DATA);
    setErrors({});
    setSubmitError(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div id="quote-form" role="status" className="rounded-[6px] border border-brand/30 bg-mist p-8 text-center">
        <h2 className="text-xl font-bold">Request received</h2>
        <p className="mt-2 text-steel">
          Thanks, {data.name.trim() || "there"} — we&apos;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-[6px] border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        >
          Send another request
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form id="quote-form" noValidate onSubmit={handleSubmit} className="space-y-5">
      {/* Announced to screen readers when submission fails validation */}
      {errorCount > 0 ? (
        <div role="alert" className="rounded-[6px] border border-red-700/40 bg-red-700/10 px-4 py-3 text-sm font-medium text-red-700">
          Please fix the {errorCount === 1 ? "field below" : `${errorCount} fields below`} before sending.
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={updateField("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className={inputClasses(Boolean(errors.name))}
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(732) 555-0100"
            value={data.phone}
            onChange={updateField("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className={inputClasses(Boolean(errors.phone))}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={updateField("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            className={inputClasses(Boolean(errors.email))}
          />
        </Field>

        <Field id="boatType" label="Boat type" error={errors.boatType}>
          <input
            id="quote-boatType"
            name="boatType"
            type="text"
            placeholder="e.g. 24 ft center console"
            value={data.boatType}
            onChange={updateField("boatType")}
            aria-invalid={errors.boatType ? true : undefined}
            aria-describedby={errors.boatType ? "quote-boatType-error" : undefined}
            className={inputClasses(Boolean(errors.boatType))}
          />
        </Field>

        <Field id="sizeEstimate" label="Length / weight estimate" error={errors.sizeEstimate}>
          <input
            id="quote-sizeEstimate"
            name="sizeEstimate"
            type="text"
            placeholder="e.g. 24 ft, about 8,000 lb"
            value={data.sizeEstimate}
            onChange={updateField("sizeEstimate")}
            aria-invalid={errors.sizeEstimate ? true : undefined}
            aria-describedby={errors.sizeEstimate ? "quote-sizeEstimate-error" : undefined}
            className={inputClasses(Boolean(errors.sizeEstimate))}
          />
        </Field>

        <Field id="dateNeeded" label="Date needed" error={errors.dateNeeded}>
          <input
            id="quote-dateNeeded"
            name="dateNeeded"
            type="date"
            min={minDate}
            value={data.dateNeeded}
            onChange={updateField("dateNeeded")}
            aria-invalid={errors.dateNeeded ? true : undefined}
            aria-describedby={errors.dateNeeded ? "quote-dateNeeded-error" : undefined}
            className={inputClasses(Boolean(errors.dateNeeded))}
          />
        </Field>

        <Field id="pickupLocation" label="Pickup location" error={errors.pickupLocation}>
          <input
            id="quote-pickupLocation"
            name="pickupLocation"
            type="text"
            autoComplete="off"
            placeholder="Town, state — or marina/dock"
            value={data.pickupLocation}
            onChange={updateField("pickupLocation")}
            aria-invalid={errors.pickupLocation ? true : undefined}
            aria-describedby={errors.pickupLocation ? "quote-pickupLocation-error" : undefined}
            className={inputClasses(Boolean(errors.pickupLocation))}
          />
        </Field>

        <Field id="deliveryLocation" label="Delivery location" error={errors.deliveryLocation}>
          <input
            id="quote-deliveryLocation"
            name="deliveryLocation"
            type="text"
            autoComplete="off"
            placeholder="Town, state — or marina/dock"
            value={data.deliveryLocation}
            onChange={updateField("deliveryLocation")}
            aria-invalid={errors.deliveryLocation ? true : undefined}
            aria-describedby={errors.deliveryLocation ? "quote-deliveryLocation-error" : undefined}
            className={inputClasses(Boolean(errors.deliveryLocation))}
          />
        </Field>

        <Field id="notes" label="Notes (optional)" className="sm:col-span-2">
          <textarea
            id="quote-notes"
            name="notes"
            rows={4}
            placeholder="Trailer details, access constraints, anything else we should know."
            value={data.notes}
            onChange={updateField("notes")}
            className={cn(inputClasses(false), "min-h-[88px] resize-y")}
          />
        </Field>
      </div>

      {status === "error" && submitError ? (
        <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-red-700">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-base font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request my quote"}
      </button>
    </form>
  );
}
