export interface EnquiryValues {
  name: string;
  whatsapp: string;
  email: string;
  classLevel: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

/** Normalise an Indian mobile number: strip spaces/dashes, leading +91 / 91 / 0. */
export function normaliseIndianMobile(input: string): string {
  let d = input.replace(/[^\d+]/g, "");
  d = d.replace(/^\+/, "");
  d = d.replace(/^[-\s]*/, "");
  if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0") && d.length === 11) d = d.slice(1);
  return d;
}

export function validateWhatsapp(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "Please enter your active WhatsApp number.";
  const digits = normaliseIndianMobile(v);
  if (!/^\d+$/.test(digits))
    return "WhatsApp number should contain digits only (you may include +91).";
  if (digits.length !== 10)
    return "Enter a valid 10-digit Indian mobile number (e.g. 98765 43210).";
  if (!/^[6-9]/.test(digits))
    return "Indian mobile numbers start with 6, 7, 8, or 9. Please check the number.";
  return null;
}

export function validateEmailOptional(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (v.length > 254) return "Email address looks too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
    return "Enter a valid email address, or leave this field blank.";
  return null;
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.name.trim()) errors.name = "Please enter the student's name.";
  else if (values.name.trim().length < 2)
    errors.name = "Name should have at least 2 characters.";
  else if (values.name.trim().length > 80)
    errors.name = "Name should be under 80 characters.";
  const w = validateWhatsapp(values.whatsapp);
  if (w) errors.whatsapp = w;
  const e = validateEmailOptional(values.email);
  if (e) errors.email = e;
  if (!values.classLevel) errors.classLevel = "Please select a class.";
  return errors;
}
