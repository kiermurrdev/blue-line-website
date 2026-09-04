import assert from "node:assert/strict";
import { test } from "node:test";

import { validateQuoteForm, type QuoteFormData } from "./quote-form.ts";

const emptyForm: QuoteFormData = {
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

test("validateQuoteForm flags every required field on an empty form", () => {
  const errors = validateQuoteForm(emptyForm);

  assert.deepEqual(
    Object.keys(errors).sort(),
    [
      "boatType",
      "dateNeeded",
      "deliveryLocation",
      "email",
      "name",
      "pickupLocation",
      "phone",
      "sizeEstimate",
    ].sort()
  );
});

test("validateQuoteForm treats whitespace-only values as empty", () => {
  const errors = validateQuoteForm({ ...emptyForm, name: "   ", phone: "\t" });

  assert.ok(errors.name);
  assert.ok(errors.phone);
});

test("validateQuoteForm rejects malformed email addresses", () => {
  for (const bad of ["not-an-email", "a@b", "@example.com", "user@", "user @example.com"]) {
    const errors = validateQuoteForm({ ...emptyForm, email: bad });
    assert.ok(errors.email, `expected an error for ${JSON.stringify(bad)}`);
  }
});

test("validateQuoteForm accepts a well-formed email address", () => {
  const errors = validateQuoteForm({ ...emptyForm, email: "sailor@example.com" });

  assert.equal(errors.email, undefined);
});

test("validateQuoteForm rejects phone numbers with too few digits", () => {
  for (const bad of ["12345", "call me"]) {
    const errors = validateQuoteForm({ ...emptyForm, phone: bad });
    assert.ok(errors.phone, `expected an error for ${JSON.stringify(bad)}`);
  }
});

test("validateQuoteForm accepts US-style and international phone numbers", () => {
  for (const good of ["(732) 222-1026", "7322221026", "+1 732 222 1026"]) {
    const errors = validateQuoteForm({ ...emptyForm, phone: good });
    assert.equal(errors.phone, undefined, `expected no error for ${JSON.stringify(good)}`);
  }
});

test("validateQuoteForm rejects a past date needed", () => {
  const errors = validateQuoteForm({ ...emptyForm, dateNeeded: "2020-01-01" });

  assert.ok(errors.dateNeeded);
});

test("validateQuoteForm accepts today's and future dates", () => {
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  assert.equal(validateQuoteForm({ ...emptyForm, dateNeeded: iso(today) }).dateNeeded, undefined);
  assert.equal(validateQuoteForm({ ...emptyForm, dateNeeded: iso(nextWeek) }).dateNeeded, undefined);
});
