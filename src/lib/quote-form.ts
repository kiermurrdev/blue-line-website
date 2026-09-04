/** Quote form field values — mirrors the fields in ARCHITECTURE.md §6. */
export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  boatType: string;
  sizeEstimate: string;
  pickupLocation: string;
  deliveryLocation: string;
  dateNeeded: string;
  notes: string;
}

/** Per-field validation errors keyed by field name. */
export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Phone numbers need at least 7 digits (local) and no more than 15 (E.164 max). */
function hasInvalidPhone(phone: string): boolean {
  const value = phone.trim();
  if (value === "") return true;
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount < 7 || digitCount > 15;
}

function hasInvalidEmail(email: string): boolean {
  const value = email.trim();
  return value === "" || !EMAIL_PATTERN.test(value);
}

/** Date inputs submit YYYY-MM-DD; reject anything before today (local time). */
function isPastDate(dateNeeded: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateNeeded.trim());
  if (!match) return false; // empty or unparseable — required check covers it

  const [, year, month, day] = match.map(Number);
  const picked = new Date(year, month - 1, day).getTime();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return picked < todayStart;
}

export function validateQuoteForm(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!data.name.trim()) errors.name = "Enter your name.";
  if (hasInvalidPhone(data.phone)) errors.phone = "Enter a phone number with at least 7 digits.";
  if (hasInvalidEmail(data.email)) errors.email = "Enter a valid email address, e.g. name@example.com.";
  if (!data.boatType.trim()) errors.boatType = "Select or enter the boat type.";
  if (!data.sizeEstimate.trim()) errors.sizeEstimate = "Give a rough length or weight estimate.";
  if (!data.pickupLocation.trim()) errors.pickupLocation = "Enter the pickup location.";
  if (!data.deliveryLocation.trim()) errors.deliveryLocation = "Enter the delivery location.";
  if (!data.dateNeeded.trim()) errors.dateNeeded = "Tell us when you need it moved.";
  else if (isPastDate(data.dateNeeded)) errors.dateNeeded = "The date needed can't be in the past.";

  return errors;
}
