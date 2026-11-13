"use client";

import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CLASS_OPTIONS } from "./hero-slides";
import { submitLead } from "./lead-service";
import { validateEnquiry } from "./validation";

interface Props {
  onBusyChange?: (busy: boolean) => void;
}

type FieldErrors = { name?: string; phone?: string; classLevel?: string };

/**
 * Compact callback card for the hero: Name + Class + Phone in one row.
 * Reuses the same validation and lead pipeline as the full enquiry dialog.
 */
export default function QuickEnquiryForm({ onBusyChange }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<
    { kind: "ok" | "error"; text: string } | null
  >(null);
  const formRef = useRef<HTMLFormElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  useEffect(() => {
    onBusyChange?.(sending);
  }, [sending, onBusyChange]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry({
      name,
      whatsapp: phone,
      email: "",
      classLevel,
    });
    setErrors({
      name: errs.name,
      phone: errs.whatsapp,
      classLevel: errs.classLevel,
    });
    setNotice(null);
    if (Object.keys(errs).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>('[data-invalid="true"]')
        ?.focus();
      return;
    }
    if (!consent) {
      setConsentError("Please tick the checkbox to agree before submitting.");
      consentRef.current?.focus();
      return;
    }
    setConsentError(null);
    setSending(true);
    const res = await submitLead({
      name: name.trim(),
      whatsapp: phone.trim(),
      classLevel,
      service: "general",
      slideId: "main",
      source: "hero:quick",
    });
    setSending(false);
    if (!res.ok) {
      setNotice({ kind: "error", text: res.message });
      return;
    }
    setNotice({
      kind: "ok",
      text: "Thanks! Our counsellor will call you back shortly.",
    });
    setName("");
    setPhone("");
    setClassLevel("");
    setErrors({});
    setConsent(false);
    setConsentError(null);
  }

  const firstError = errors.name ?? errors.classLevel ?? errors.phone;

  const fieldCls = (invalid: boolean) =>
    `h-12 w-full rounded-md border bg-surface-muted/70 pr-3.5 pl-10 text-sm text-text-primary transition-all duration-200 placeholder:text-text-muted/70 focus:outline-none ${invalid
      ? "border-red-500 focus:ring-2 focus:ring-red-500/25"
      : "border-transparent focus:border-accent/60 focus:bg-surface focus:ring-2 focus:ring-accent/30"
    }`;

  const iconCls =
    "pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted";

  return (
    <div className="mt-6 rounded-md border border-border bg-surface p-3 shadow-[0_12px_40px_-12px_rgba(20,33,61,0.18)] sm:p-4 md:mt-6">

      {notice?.kind === "ok" ? (
        <div role="status" className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 py-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent"
          >
            ✓
          </span>
          <p className="text-sm font-medium text-text-primary">{notice.text}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-sm font-semibold text-text-secondary underline underline-offset-2 transition-colors hover:text-text-primary"
          >
            Add another
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Request a free callback"
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-row"
        >
          <div className="relative lg:flex-1">
            <User size={16} aria-hidden="true" className={iconCls} />
            <label htmlFor={`${uid}-name`} className="sr-only">
              Student name
            </label>
            <input
              id={`${uid}-name`}
              name="quick-enquiry-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
              required
              aria-invalid={!!errors.name}
              data-invalid={!!errors.name}
              className={fieldCls(!!errors.name)}
            />
          </div>
          <div className="relative lg:w-44 lg:shrink-0">
            <GraduationCap size={16} aria-hidden="true" className={iconCls} />
            <label htmlFor={`${uid}-class`} className="sr-only">
              Class
            </label>
            <select
              id={`${uid}-class`}
              name="quick-enquiry-class"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              required
              aria-invalid={!!errors.classLevel}
              data-invalid={!!errors.classLevel}
              className={`${fieldCls(!!errors.classLevel)} appearance-none pr-9 ${classLevel ? "" : "text-text-muted"
                }`}
            >
              <option value="">Class</option>
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
          </div>
          <div className="relative lg:flex-1">
            <Phone size={16} aria-hidden="true" className={iconCls} />
            <label htmlFor={`${uid}-phone`} className="sr-only">
              Phone number
            </label>
            <input
              id={`${uid}-phone`}
              name="quick-enquiry-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
              aria-invalid={!!errors.phone}
              data-invalid={!!errors.phone}
              className={fieldCls(!!errors.phone)}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_8px_24px_rgba(255,182,39,0.35)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Submitting…" : "Submit"}
            {!sending && (
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              />
            )}
          </button>
        </form>
      )}
      <div className="flex items-start gap-2 px-1 pt-2.5">
        <input
          ref={consentRef}
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
        <label
          htmlFor={`${uid}-consent`}
          className="text-[13px] leading-snug text-text-secondary"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-semibold text-text-primary underline underline-offset-2 transition-colors hover:text-accent"
          >
            Terms and Conditions
          </Link>
          .
        </label>
      </div>
      {(firstError || consentError || notice?.kind === "error") && (
        <p
          role="alert"
          className="px-1 pt-2 text-[13px] font-medium text-red-600 dark:text-red-400"
        >
          {firstError ?? consentError ?? notice?.text}
        </p>
      )}
    </div>
  );
}
