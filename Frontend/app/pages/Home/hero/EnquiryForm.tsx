"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CLASS_OPTIONS, type HeroSlide } from "./hero-slides";
import { submitLead } from "./lead-service";
import {
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "./validation";

interface Props {
  slide: HeroSlide;
  values: EnquiryValues;
  onChange: (v: EnquiryValues) => void;
  onBusyChange: (busy: boolean) => void;
  formIdPrefix: string;
}

export default function EnquiryForm({
  slide,
  values,
  onChange,
  onBusyChange,
  formIdPrefix,
}: Props) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const uid = useId();

  useEffect(() => {
    onBusyChange(sending);
  }, [sending, onBusyChange]);

  useEffect(() => {
    if (status || consentError) statusRef.current?.focus();
  }, [status, consentError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (!consent) {
      setConsentError(
        "Please tick the checkbox to agree before submitting.",
      );
    } else {
      setConsentError(null);
    }
    setStatus(null);
    if (Object.keys(errs).length > 0 || !consent) {
      const first = document.querySelector<HTMLElement>(
        `#${formIdPrefix} [data-invalid="true"]`,
      );
      first?.focus();
      return;
    }
    setSending(true);
    const res = await submitLead({
      name: values.name.trim(),
      whatsapp: values.whatsapp.trim(),
      email: values.email.trim() || undefined,
      classLevel: values.classLevel,
      service: slide.service,
      slideId: slide.id,
      source: `hero:${slide.id}`,
    });
    setSending(false);
    if (!res.ok) {
      setStatus(res.message);
      return;
    }
    setReferenceId(res.referenceId ?? null);
    setDone(true);
  }

  function startOver() {
    setDone(false);
    setStatus(null);
    setConsent(false);
    setConsentError(null);
    setReferenceId(null);
  }

  const inputCls = (invalid: boolean) =>
    `h-11 w-full rounded border border-border bg-surface-muted/60 px-3 text-sm text-text-primary placeholder:text-text-muted/60 transition-colors focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/40 ${
      invalid ? "border-red-500" : ""
    }`;

  const errCls =
    "mt-1 text-[13px] font-medium text-red-600 dark:text-red-400";

  if (done) {
    return (
      <div className="flex h-full flex-col justify-center p-4" role="status">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-base font-bold text-on-accent"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="mt-2 text-sm font-bold text-text-primary">
          Enquiry received
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-text-secondary">
          We will contact you on WhatsApp shortly.
        </p>
        {referenceId && (
          <p className="mt-1 font-mono text-[12px] text-text-muted">
            Ref: {referenceId}
          </p>
        )}
        <button
          type="button"
          onClick={startOver}
          className="mt-3 inline-flex h-10 items-center justify-center rounded bg-accent px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          New enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center p-5 lg:p-6">
      <p className="text-[11px] font-bold tracking-[1.2px] text-text-muted uppercase">
        Free counselling
      </p>
      <h2 className="mt-1 text-xl font-extrabold tracking-tight text-text-primary">
        Request a callback
      </h2>
      <form
        id={formIdPrefix}
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 flex flex-col gap-3"
      >
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="text-sm font-semibold text-text-primary"
          >
            Student name
          </label>
          <input
            id={`${uid}-name`}
            name="hero-enquiry-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange({ ...values, name: e.target.value })}
            placeholder="Aarav Sharma"
            required
            aria-invalid={!!errors.name}
            data-invalid={!!errors.name}
            className={`${inputCls(!!errors.name)} mt-1`}
          />
          {errors.name && (
            <p role="alert" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-whatsapp`}
            className="text-sm font-semibold text-text-primary"
          >
            WhatsApp number
          </label>
          <input
            id={`${uid}-whatsapp`}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={(e) =>
              onChange({ ...values, whatsapp: e.target.value })
            }
            placeholder="98765 43210"
            required
            aria-invalid={!!errors.whatsapp}
            data-invalid={!!errors.whatsapp}
            className={`${inputCls(!!errors.whatsapp)} mt-1`}
          />
          {errors.whatsapp && (
            <p role="alert" className={errCls}>
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="text-sm font-semibold text-text-primary"
          >
            Email address{" "}
            <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange({ ...values, email: e.target.value })}
            placeholder="parent@example.com"
            aria-invalid={!!errors.email}
            data-invalid={!!errors.email}
            className={`${inputCls(!!errors.email)} mt-1`}
          />
          {errors.email && (
            <p role="alert" className={errCls}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-class`}
            className="text-sm font-semibold text-text-primary"
          >
            Class
          </label>
          <select
            id={`${uid}-class`}
            name="classLevel"
            value={values.classLevel}
            onChange={(e) =>
              onChange({ ...values, classLevel: e.target.value })
            }
            required
            aria-invalid={!!errors.classLevel}
            data-invalid={!!errors.classLevel}
            className={`${inputCls(!!errors.classLevel)} mt-1`}
          >
            <option value="">Select</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.classLevel && (
            <p role="alert" className={errCls}>
              {errors.classLevel}
            </p>
          )}
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
            aria-labelledby={`${uid}-consent-text`}
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
          />
          <span
            id={`${uid}-consent-text`}
            className="text-[13px] leading-snug text-text-secondary"
          >
            I agree to be contacted by Hustle Learning and accept the{" "}
            <Link
              href="/terms"
              className="font-semibold text-text-primary underline underline-offset-2 hover:text-accent"
            >
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-text-primary underline underline-offset-2 hover:text-accent"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </div>
        {consentError && (
          <p ref={statusRef} tabIndex={-1} role="alert" className={errCls}>
            {consentError}
          </p>
        )}

        {status && (
          <p
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="rounded border border-border bg-surface px-2.5 py-1.5 text-[13px] text-text-secondary"
          >
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={!consent || sending}
          className="mt-1 inline-flex h-12 w-full items-center justify-center rounded bg-accent px-5 text-sm font-bold tracking-wide text-on-accent uppercase transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Submitting…" : "Submit"}
        </button>
        {!consent && !sending && (
          <p className="text-center text-[13px] text-text-muted">
            Tick the checkbox above to enable Submit.
          </p>
        )}
      </form>
    </div>
  );
}
