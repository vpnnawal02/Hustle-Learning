"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CLASS_OPTIONS } from "../Home/hero/hero-slides";
import { submitLead } from "../Home/hero/lead-service";
import { validateWhatsapp } from "../Home/hero/validation";

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Accountancy",
  "Business Studies",
  "Economics",
  "Political Science",
  "History",
  "Geography",
  "All Subjects",
] as const;

const BOARD_OPTIONS = ["CBSE", "ICSE", "IB", "State Board", "Other"] as const;

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-red-500">
      {" *"}
    </span>
  );
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  classLevel: string;
  subject: string;
  school: string;
  board: string;
  address: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  classLevel: "",
  subject: "",
  school: "",
  board: "",
  address: "",
  message: "",
};

function validate(values: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const name = values.name.trim();
  if (!name) errors.name = "Please enter the student / parent name.";
  else if (name.length < 2) errors.name = "Name should have at least 2 characters.";
  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Enter a valid email address.";
  const phoneError = validateWhatsapp(values.phone);
  if (phoneError) errors.phone = phoneError;
  if (!values.classLevel) errors.classLevel = "Please select a class.";
  if (!values.subject) errors.subject = "Please select a subject.";
  if (!values.school.trim()) errors.school = "Please enter the school name.";
  if (!values.address.trim()) errors.address = "Please enter your address with a landmark.";
  return errors;
}

/**
 * Vertical home-tuition demo form: name, email, mobile, class, subjects,
 * school, board, address and message — one field per row.
 */
export default function HomeTuitionEnquiryForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setStatus(null);
    if (!consent) {
      setConsentError("Please tick the checkbox to agree before submitting.");
    } else {
      setConsentError(null);
    }
    if (Object.keys(errs).length > 0 || !consent) {
      formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.focus();
      return;
    }
    setSending(true);
    const details = [
      `Subject: ${values.subject}`,
      `School: ${values.school.trim()}`,
      ...(values.board ? [`Board: ${values.board}`] : []),
      `Address: ${values.address.trim()}`,
      ...(values.message.trim() ? [`Message: ${values.message.trim()}`] : []),
    ]
      .join(" | ")
      .slice(0, 500);
    const res = await submitLead({
      name: values.name.trim(),
      whatsapp: values.phone.trim(),
      email: values.email.trim(),
      classLevel: values.classLevel,
      service: "home-tuition",
      slideId: "demo-form",
      source: `home-tuitions:demo-form | ${details}`,
    });
    setSending(false);
    if (!res.ok) {
      setStatus(res.message);
      return;
    }
    setReferenceId(res.referenceId ?? null);
    setDone(true);
  }

  const inputCls = (invalid: boolean) =>
    `h-12 w-full rounded border bg-white px-3.5 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:outline-none focus:ring-2 ${
      invalid
        ? "border-red-500 focus:ring-red-500/25"
        : "border-black/[0.06] focus:border-accent focus:ring-accent/30"
    }`;

  const errCls = "mt-1 text-[13px] font-medium text-red-600 dark:text-red-400";

  if (done) {
    return (
      <div role="status" className="flex flex-col items-start gap-2 py-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded bg-accent text-base font-bold text-on-accent"
        >
          ✓
        </span>
        <h3 className="font-sans text-lg font-bold text-text-primary">
          Demo request received
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          Thanks{values.name.trim() ? `, ${values.name.trim()}` : ""}! Our
          counsellor will call you back on WhatsApp shortly to confirm your
          free home tuition demo.
        </p>
        {referenceId && (
          <p className="text-[12px] text-text-muted">Ref: {referenceId}</p>
        )}
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setValues(EMPTY);
            setErrors({});
            setConsent(false);
            setStatus(null);
            setReferenceId(null);
          }}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          New enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Book your free home tuition demo">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor={`${uid}-name`} className="text-sm font-semibold text-text-primary">
            Student / Parents Name<RequiredMark />
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Rahul Kumar"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            data-invalid={!!errors.name}
            className={`${inputCls(!!errors.name)} mt-1.5`}
          />
          {errors.name && <p role="alert" className={errCls}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="text-sm font-semibold text-text-primary">
            Email Address<RequiredMark />
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="rahul@example.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            data-invalid={!!errors.email}
            className={`${inputCls(!!errors.email)} mt-1.5`}
          />
          {errors.email && <p role="alert" className={errCls}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="text-sm font-semibold text-text-primary">
            Mobile Number<RequiredMark />
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. 9876543210"
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            data-invalid={!!errors.phone}
            className={`${inputCls(!!errors.phone)} mt-1.5`}
          />
          {errors.phone && <p role="alert" className={errCls}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-class`} className="text-sm font-semibold text-text-primary">
            Class for which you want tuition<RequiredMark />
          </label>
          <span className="relative mt-1.5 block">
            <select
              id={`${uid}-class`}
              value={values.classLevel}
              onChange={(e) => set("classLevel", e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.classLevel}
              data-invalid={!!errors.classLevel}
              className={`${inputCls(!!errors.classLevel)} appearance-none pr-8 ${values.classLevel ? "" : "text-text-muted"}`}
            >
              <option value="">Select Class(es)...</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
            />
          </span>
          {errors.classLevel && <p role="alert" className={errCls}>{errors.classLevel}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-subject`} className="text-sm font-semibold text-text-primary">
            Subject(s) for which you want tuition<RequiredMark />
          </label>
          <span className="relative mt-1.5 block">
            <select
              id={`${uid}-subject`}
              value={values.subject}
              onChange={(e) => set("subject", e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.subject}
              data-invalid={!!errors.subject}
              className={`${inputCls(!!errors.subject)} appearance-none pr-8 ${values.subject ? "" : "text-text-muted"}`}
            >
              <option value="">Select Subject(s)...</option>
              {SUBJECT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
            />
          </span>
          {errors.subject && <p role="alert" className={errCls}>{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-school`} className="text-sm font-semibold text-text-primary">
            School Name<RequiredMark />
          </label>
          <input
            id={`${uid}-school`}
            type="text"
            autoComplete="organization"
            value={values.school}
            onChange={(e) => set("school", e.target.value)}
            placeholder="e.g. Delhi Public School"
            required
            aria-required="true"
            aria-invalid={!!errors.school}
            data-invalid={!!errors.school}
            className={`${inputCls(!!errors.school)} mt-1.5`}
          />
          {errors.school && <p role="alert" className={errCls}>{errors.school}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-board`} className="text-sm font-semibold text-text-primary">
            Board <span className="font-medium text-text-muted">(Optional)</span>
          </label>
          <span className="relative mt-1.5 block">
            <select
              id={`${uid}-board`}
              value={values.board}
              onChange={(e) => set("board", e.target.value)}
              aria-invalid={false}
              className={`${inputCls(false)} appearance-none pr-8 ${values.board ? "" : "text-text-muted"}`}
            >
              <option value="">Select Board</option>
              {BOARD_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
            />
          </span>
        </div>

        <div>
          <label htmlFor={`${uid}-address`} className="text-sm font-semibold text-text-primary">
            Address with Landmark<RequiredMark />
          </label>
          <input
            id={`${uid}-address`}
            type="text"
            autoComplete="street-address"
            value={values.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="e.g. Flat 402, Sunshine Heights, Near City Mall, MG Road"
            required
            aria-required="true"
            aria-invalid={!!errors.address}
            data-invalid={!!errors.address}
            className={`${inputCls(!!errors.address)} mt-1.5`}
          />
          {errors.address && <p role="alert" className={errCls}>{errors.address}</p>}
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className="text-sm font-semibold text-text-primary">
            Message / Specific Requirements{" "}
            <span className="font-medium text-text-muted">(Optional)</span>
          </label>
          <textarea
            id={`${uid}-message`}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Describe your student's learning goals, preferred days/timings..."
            rows={4}
            className={`min-h-24 w-full rounded border border-black/[0.06] bg-white px-3.5 py-3 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none mt-1.5`}
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(null);
            }}
            aria-invalid={!!consentError}
            data-invalid={!!consentError}
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
          />
          <label htmlFor={`${uid}-consent`} className="text-[13px] leading-snug text-text-secondary">
            I agree to be contacted by Hustle Learning and accept the{" "}
            <Link href="/terms" className="font-semibold text-text-primary underline underline-offset-2">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-semibold text-text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {consentError && (
          <p role="alert" className={errCls}>
            {consentError}
          </p>
        )}
        {status && (
          <p role="alert" className="rounded-md border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-secondary">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Submitting…" : "Book Free Demo"}
        </button>
      </div>
    </form>
  );
}
