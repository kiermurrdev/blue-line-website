/** Simple class join — no external deps needed at this scale. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Strip non-digit characters from a phone number for tel: links. */
export function stripPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
