"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Upload, X } from "lucide-react";
import { normaliseIndianMobile, validateWhatsapp } from "../Home/hero/validation";

const STEPS = [
  "Personal Details",
  "Educational Qualification",
  "Verification & Agreement",
] as const;

const QUALIFICATIONS = [
  "Class 12 Pass",
  "Undergraduate (Pursuing)",
  "Graduate",
  "Postgraduate (Pursuing)",
  "Postgraduate",
  "B.Ed",
  "PhD",
  "Other",
] as const;

const ID_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID",
  "Driving Licence",
  "Passport",
] as const;

const ACCEPTED_FILES = ".pdf,.jpg,.jpeg,.png";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const labelCls = "text-sm font-semibold text-text-primary";
const errCls = "mt-1 text-[13px] font-medium text-red-600 dark:text-red-400";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-red-500">
      {" *"}
    </span>
  );
}

function FileField({
  id,
  label,
  required,
  value,
  onPick,
  onClear,
  error,
  hint,
}: {
  id: string;
  label: React.ReactNode;
  required: boolean;
  value: DocState;
  onPick: (f: File | undefined) => void;
  onClear: () => void;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <span className={labelCls} id={`${id}-label`}>
        {label}
        {required && <RequiredMark />}
      </span>
      {hint && (
        <span className="mt-0.5 block text-[13px] text-text-muted">{hint}</span>
      )}
      {!value.file ? (
        <label
          htmlFor={id}
          className={`mt-1.5 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3.5 py-3 text-sm font-medium transition-colors ${error
            ? "border-red-500 text-red-600 dark:text-red-400"
            : "border-black/10 text-text-secondary hover:border-accent hover:text-text-primary"
            }`}
        >
          <Upload size={16} aria-hidden="true" />
          Choose file (PDF, JPG, PNG · max 5 MB)
          <input
            id={id}
            type="file"
            accept={ACCEPTED_FILES}
            aria-labelledby={`${id}-label`}
            aria-invalid={!!error}
            data-invalid={!!error}
            className="sr-only"
            onChange={(ev) => {
              onPick(ev.target.files?.[0]);
              ev.target.value = "";
            }}
          />
        </label>
      ) : (
        <span className="mt-1.5 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-muted px-3.5 py-2.5">
          <span className="min-w-0 truncate text-sm font-medium text-text-primary">
            {value.file.name}{" "}
            <span className="font-normal text-text-muted">
              ({formatBytes(value.file.size)})
            </span>
          </span>
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${value.file.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </span>
      )}
      {(error || value.error) && (
        <p role="alert" className={errCls}>
          {error ?? value.error}
        </p>
      )}
    </div>
  );
}

interface PersonalValues {
  fullName: string;
  dob: string;
  mobile: string;
  sameAsMobile: boolean;
  whatsapp: string;
  email: string;
  address: string;
  pincode: string;
}

interface EducationValues {
  qualification: string;
  degree: string;
  institution: string;
  pursuing: string;
  currentCourse: string;
  passingYear: string;
}

interface DocState {
  file: File | null;
  error: string | null;
}

function isAdult(dob: string): boolean {
  const d = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age -= 1;
  return age >= 18;
}

function validateFile(file: File): string | null {
  const okType =
    file.type === "application/pdf" ||
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    /\.(pdf|jpe?g|png)$/i.test(file.name);
  if (!okType) return "Only PDF, JPG or PNG files are accepted.";
  if (file.size > MAX_FILE_BYTES) return "File must be under 5 MB.";
  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function StepTimeline({ current }: { current: number }) {
  return (
    <ol aria-label="Registration progress" className="flex items-start">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className={`flex min-w-0 ${i < STEPS.length - 1 ? "flex-1" : ""}`}
          >
            <span className="flex min-w-0 flex-col items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition-colors sm:h-10 sm:w-10 ${done
                  ? "border-brand-navy bg-brand-navy text-brand-white"
                  : active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-surface-muted text-text-muted"
                  }`}
              >
                {done ? <Check size={17} strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`max-w-[110px] text-center text-[11px] leading-tight sm:max-w-none sm:text-[13px] ${active
                  ? "font-bold text-text-primary"
                  : done
                    ? "font-semibold text-text-primary"
                    : "font-medium text-text-muted"
                  }`}
              >
                {label}
              </span>
            </span>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`mx-1 mt-4 h-0.5 min-w-3 flex-1 rounded sm:mx-2 sm:mt-5 ${i < current ? "bg-brand-navy" : "bg-border"
                  }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function TutorRegistrationWizard() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState<PersonalValues>({
    fullName: "",
    dob: "",
    mobile: "",
    sameAsMobile: true,
    whatsapp: "",
    email: "",
    address: "",
    pincode: "",
  });
  const [education, setEducation] = useState<EducationValues>({
    qualification: "",
    degree: "",
    institution: "",
    pursuing: "",
    currentCourse: "",
    passingYear: "",
  });
  const [idType, setIdType] = useState("");
  const [idDoc, setIdDoc] = useState<DocState>({ file: null, error: null });
  const [eduDoc, setEduDoc] = useState<DocState>({ file: null, error: null });
  const [resume, setResume] = useState<DocState>({ file: null, error: null });
  const [photo, setPhoto] = useState<DocState>({ file: null, error: null });
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentAccuracy, setConsentAccuracy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const whatsappValue = personal.sameAsMobile ? personal.mobile : personal.whatsapp;

  function validateStep(target: number): Record<string, string> {
    const errs: Record<string, string> = {};
    if (target === 0) {
      if (personal.fullName.trim().length < 2)
        errs.fullName = "Please enter your full name.";
      if (!personal.dob) errs.dob = "Please enter your date of birth.";
      else if (!isAdult(personal.dob))
        errs.dob = "Tutors must be at least 18 years old.";
      const m = validateWhatsapp(personal.mobile);
      if (m) errs.mobile = m;
      if (!personal.sameAsMobile) {
        const w = validateWhatsapp(personal.whatsapp);
        if (w) errs.whatsapp = w;
      }
      if (!personal.email.trim()) errs.email = "Please enter your email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(personal.email.trim()))
        errs.email = "Enter a valid email address.";
      if (personal.address.trim().length < 8)
        errs.address = "Please enter your residential address.";
      if (!/^\d{6}$/.test(personal.pincode.trim()))
        errs.pincode = "Enter a valid 6-digit PIN code.";
    }
    if (target === 1) {
      if (!education.qualification)
        errs.qualification = "Please select your highest qualification.";
      if (education.degree.trim().length < 2)
        errs.degree = "Please enter your degree / course name.";
      if (education.institution.trim().length < 2)
        errs.institution = "Please enter your college / university.";
      if (!education.pursuing)
        errs.pursuing = "Please tell us if you are currently studying.";
      if (education.pursuing === "Yes" && education.currentCourse.trim().length < 2)
        errs.currentCourse = "Please enter your current course.";
      if (!/^(19|20)\d{2}$/.test(education.passingYear.trim()))
        errs.passingYear = "Enter a valid passing year (e.g. 2024).";
      else {
        const y = Number(education.passingYear.trim());
        const maxYear = new Date().getFullYear() + 6;
        if (y < 1980 || y > maxYear)
          errs.passingYear = "Enter a valid passing year.";
      }
      if (eduDoc.error) errs.eduDoc = eduDoc.error;
      else if (!eduDoc.file)
        errs.eduDoc = "Please upload your educational document.";
    }
    if (target === 2) {
      if (!idType) errs.idType = "Please select an identity document type.";
      if (idDoc.error) errs.idDoc = idDoc.error;
      else if (!idDoc.file) errs.idDoc = "Please upload your identity proof.";
      if (resume.error) errs.resume = resume.error;
      if (photo.error) errs.photo = photo.error;
      if (!consentTerms)
        errs.consentTerms = "Please accept the Tutor Terms and Conditions.";
      if (!consentPrivacy) errs.consentPrivacy = "Please accept the Privacy Policy.";
      if (!consentAccuracy)
        errs.consentAccuracy = "Please confirm your information is accurate.";
    }
    return errs;
  }

  function goNext() {
    const errs = validateStep(step);
    setErrors(errs);
    setStatus(null);
    if (Object.keys(errs).length > 0) {
      document
        .querySelector<HTMLElement>("#tutor-register [data-invalid=\"true\"]")
        ?.focus();
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStatus(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pickFile(
    setter: (d: DocState) => void,
    file: File | undefined,
  ) {
    if (!file) return;
    const error = validateFile(file);
    setter(error ? { file: null, error } : { file, error: null });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep(2);
    setErrors(errs);
    setStatus(null);
    if (Object.keys(errs).length > 0) {
      document
        .querySelector<HTMLElement>("#tutor-register [data-invalid=\"true\"]")
        ?.focus();
      return;
    }
    setSending(true);
    const docs = [
      { kind: "Identity proof", doc: idDoc.file },
      { kind: "Educational certificate", doc: eduDoc.file },
      { kind: "Resume", doc: resume.file },
      { kind: "Photo", doc: photo.file },
    ]
      .filter((d) => d.doc)
      .map((d) => `${d.kind}: ${d.doc!.name} (${formatBytes(d.doc!.size)})`)
      .join(" | ");
    const details = [
      `DOB: ${personal.dob}`,
      `WhatsApp: ${whatsappValue.trim()}`,
      `Address: ${personal.address.trim()}`,
      `PIN: ${personal.pincode.trim()}`,
      `Qualification: ${education.qualification}`,
      `Degree: ${education.degree.trim()}`,
      `Institution: ${education.institution.trim()}`,
      `Currently studying: ${education.pursuing}${education.pursuing === "Yes" ? ` (${education.currentCourse.trim()})` : ""}`,
      `Passing year: ${education.passingYear.trim()}`,
      `ID type: ${idType}`,
      `Documents: ${docs}`,
    ]
      .join(" | ")
      .slice(0, 900);
    try {
      const res = await fetch("/api/tutor-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: personal.fullName.trim(),
          whatsapp: normaliseIndianMobile(whatsappValue.trim()),
          email: personal.email.trim(),
          details,
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
      };
      setSending(false);
      if (!res.ok) {
        setStatus(
          typeof data.message === "string" && data.message
            ? data.message
            : "Could not submit your registration. Please try again.",
        );
        return;
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSending(false);
      setStatus("Network error while submitting. Please try again.");
    }
  }

  const inputCls = (invalid: boolean) =>
    `h-12 w-full rounded border bg-white px-3.5 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:outline-none focus:ring-2 ${invalid
      ? "border-red-500 focus:ring-red-500/25"
      : "border-black/[0.06] focus:border-accent focus:ring-accent/30"
    }`;
  if (done) {
    return (
      <div role="status" className="flex flex-col items-start gap-2 py-6">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-on-accent"
        >
          ✓
        </span>
        <h2 className="font-sans text-xl font-bold text-text-primary">
          Your tutor registration has been submitted successfully!
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-text-secondary">
          Thank you for choosing Hustle Learning. Our team will review your
          registration and verification documents. We will contact you
          regarding your profile approval and potential tuition opportunities.
        </p>
        <Link
          href="/join-as-tutor"
          className="mt-3 inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-bold text-text-primary transition-colors hover:border-text-muted"
        >
          Back to Join as a Tutor
        </Link>
      </div>
    );
  }

  return (
    <div id="tutor-register">
      <div className="sticky top-0 z-20 bg-[#F5F4FA] px-1 pt-4 pb-3 lg:-top-6 lg:-mt-6">
        <h1 className="text-lg font-bold text-text-primary">
          Tutor Registration
        </h1>
        <div className="mt-2">
          <StepTimeline current={step} />
        </div>
      </div>
      <form
        onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
        noValidate
        aria-label="Tutor registration"
        className="mt-8"
      >
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor={`${uid}-name`} className={labelCls}>
                Full Name<RequiredMark />
              </label>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                value={personal.fullName}
                onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                placeholder="e.g. Rahul Kumar"
                required
                aria-invalid={!!errors.fullName}
                data-invalid={!!errors.fullName}
                className={`${inputCls(!!errors.fullName)} mt-1.5`}
              />
              {errors.fullName && <p role="alert" className={errCls}>{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-dob`} className={labelCls}>
                Date of Birth<RequiredMark />
              </label>
              <input
                id={`${uid}-dob`}
                type="date"
                value={personal.dob}
                onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                required
                aria-invalid={!!errors.dob}
                data-invalid={!!errors.dob}
                className={`${inputCls(!!errors.dob)} mt-1.5`}
              />
              {errors.dob ? (
                <p role="alert" className={errCls}>{errors.dob}</p>
              ) : (
                <p className="mt-1 text-[13px] text-text-muted">
                  Tutors must be at least 18 years old.
                </p>
              )}
            </div>
            <div>
              <label htmlFor={`${uid}-mobile`} className={labelCls}>
                Mobile Number<RequiredMark />
              </label>
              <input
                id={`${uid}-mobile`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={personal.mobile}
                onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })}
                placeholder="e.g. 9876543210"
                required
                aria-invalid={!!errors.mobile}
                data-invalid={!!errors.mobile}
                className={`${inputCls(!!errors.mobile)} mt-1.5`}
              />
              {errors.mobile && <p role="alert" className={errCls}>{errors.mobile}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input
                id={`${uid}-same`}
                type="checkbox"
                checked={personal.sameAsMobile}
                onChange={(e) => setPersonal({ ...personal, sameAsMobile: e.target.checked })}
                className="h-4 w-4 shrink-0 accent-accent"
              />
              <label htmlFor={`${uid}-same`} className="text-sm text-text-secondary">
                WhatsApp number is same as mobile number
              </label>
            </div>
            {!personal.sameAsMobile && (
              <div>
                <label htmlFor={`${uid}-whatsapp`} className={labelCls}>
                  WhatsApp Number<RequiredMark />
                </label>
                <input
                  id={`${uid}-whatsapp`}
                  type="tel"
                  inputMode="tel"
                  value={personal.whatsapp}
                  onChange={(e) => setPersonal({ ...personal, whatsapp: e.target.value })}
                  placeholder="e.g. 9876543210"
                  required
                  aria-invalid={!!errors.whatsapp}
                  data-invalid={!!errors.whatsapp}
                  className={`${inputCls(!!errors.whatsapp)} mt-1.5`}
                />
                {errors.whatsapp && <p role="alert" className={errCls}>{errors.whatsapp}</p>}
              </div>
            )}
            <div>
              <label htmlFor={`${uid}-email`} className={labelCls}>
                Email<RequiredMark />
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                value={personal.email}
                onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                placeholder="rahul@example.com"
                required
                aria-invalid={!!errors.email}
                data-invalid={!!errors.email}
                className={`${inputCls(!!errors.email)} mt-1.5`}
              />
              {errors.email && <p role="alert" className={errCls}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-address`} className={labelCls}>
                Residential Address<RequiredMark />
              </label>
              <textarea
                id={`${uid}-address`}
                value={personal.address}
                onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
                placeholder="House / Flat, Street, Area, Delhi"
                rows={3}
                required
                aria-invalid={!!errors.address}
                data-invalid={!!errors.address}
                className="mt-1.5 min-h-20 w-full rounded border border-black/[0.06] bg-white px-3.5 py-3 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
              />
              {errors.address && <p role="alert" className={errCls}>{errors.address}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-pincode`} className={labelCls}>
                Residential PIN Code<RequiredMark />
              </label>
              <input
                id={`${uid}-pincode`}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={personal.pincode}
                onChange={(e) => setPersonal({ ...personal, pincode: e.target.value })}
                placeholder="e.g. 110001"
                required
                aria-invalid={!!errors.pincode}
                data-invalid={!!errors.pincode}
                className={`${inputCls(!!errors.pincode)} mt-1.5`}
              />
              {errors.pincode && <p role="alert" className={errCls}>{errors.pincode}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor={`${uid}-qualification`} className={labelCls}>
                Highest Qualification<RequiredMark />
              </label>
              <span className="relative mt-1.5 block">
                <select
                  id={`${uid}-qualification`}
                  value={education.qualification}
                  onChange={(e) => setEducation({ ...education, qualification: e.target.value })}
                  required
                  aria-invalid={!!errors.qualification}
                  data-invalid={!!errors.qualification}
                  className={`${inputCls(!!errors.qualification)} appearance-none pr-8 ${education.qualification ? "" : "text-text-muted"}`}
                >
                  <option value="">Select qualification...</option>
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
                />
              </span>
              {errors.qualification && <p role="alert" className={errCls}>{errors.qualification}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-degree`} className={labelCls}>
                Degree / Course Name<RequiredMark />
              </label>
              <input
                id={`${uid}-degree`}
                type="text"
                value={education.degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                placeholder="e.g. B.Sc Mathematics"
                required
                aria-invalid={!!errors.degree}
                data-invalid={!!errors.degree}
                className={`${inputCls(!!errors.degree)} mt-1.5`}
              />
              {errors.degree && <p role="alert" className={errCls}>{errors.degree}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-institution`} className={labelCls}>
                College / University<RequiredMark />
              </label>
              <input
                id={`${uid}-institution`}
                type="text"
                value={education.institution}
                onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                placeholder="e.g. University of Delhi"
                required
                aria-invalid={!!errors.institution}
                data-invalid={!!errors.institution}
                className={`${inputCls(!!errors.institution)} mt-1.5`}
              />
              {errors.institution && <p role="alert" className={errCls}>{errors.institution}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-pursuing`} className={labelCls}>
                Currently Studying?<RequiredMark />
              </label>
              <span className="relative mt-1.5 block">
                <select
                  id={`${uid}-pursuing`}
                  value={education.pursuing}
                  onChange={(e) => setEducation({ ...education, pursuing: e.target.value })}
                  required
                  aria-invalid={!!errors.pursuing}
                  data-invalid={!!errors.pursuing}
                  className={`${inputCls(!!errors.pursuing)} appearance-none pr-8 ${education.pursuing ? "" : "text-text-muted"}`}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
                />
              </span>
              {errors.pursuing && <p role="alert" className={errCls}>{errors.pursuing}</p>}
            </div>
            {education.pursuing === "Yes" && (
              <div>
                <label htmlFor={`${uid}-current`} className={labelCls}>
                  Current Course<RequiredMark />
                </label>
                <input
                  id={`${uid}-current`}
                  type="text"
                  value={education.currentCourse}
                  onChange={(e) => setEducation({ ...education, currentCourse: e.target.value })}
                  placeholder="e.g. M.Sc Physics, 2nd year"
                  required
                  aria-invalid={!!errors.currentCourse}
                  data-invalid={!!errors.currentCourse}
                  className={`${inputCls(!!errors.currentCourse)} mt-1.5`}
                />
                {errors.currentCourse && <p role="alert" className={errCls}>{errors.currentCourse}</p>}
              </div>
            )}
            <div>
              <label htmlFor={`${uid}-year`} className={labelCls}>
                Passing Year<RequiredMark />
              </label>
              <input
                id={`${uid}-year`}
                type="text"
                inputMode="numeric"
                value={education.passingYear}
                onChange={(e) => setEducation({ ...education, passingYear: e.target.value })}
                placeholder="e.g. 2024"
                required
                aria-invalid={!!errors.passingYear}
                data-invalid={!!errors.passingYear}
                className={`${inputCls(!!errors.passingYear)} mt-1.5`}
              />
              {errors.passingYear && <p role="alert" className={errCls}>{errors.passingYear}</p>}
            </div>
            <FileField
              id={`${uid}-edudoc`}
              label="Educational Document"
              required
              value={eduDoc}
              onPick={(f) => pickFile(setEduDoc, f)}
              onClear={() => {
                setEduDoc({ file: null, error: null });
                setErrors((e) => {
                  const next = { ...e };
                  delete next.eduDoc;
                  return next;
                });
              }}
              error={errors.eduDoc}
              hint="Degree certificate, marksheet or current college ID."
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor={`${uid}-idtype`} className={labelCls}>
                Identity Document Type<RequiredMark />
              </label>
              <span className="relative mt-1.5 block">
                <select
                  id={`${uid}-idtype`}
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  required
                  aria-invalid={!!errors.idType}
                  data-invalid={!!errors.idType}
                  className={`${inputCls(!!errors.idType)} appearance-none pr-8 ${idType ? "" : "text-text-muted"}`}
                >
                  <option value="">Select document...</option>
                  {ID_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
                />
              </span>
              {errors.idType && <p role="alert" className={errCls}>{errors.idType}</p>}
            </div>
            <FileField
              id={`${uid}-iddoc`}
              label="Identity Proof"
              required
              value={idDoc}
              onPick={(f) => pickFile(setIdDoc, f)}
              onClear={() => {
                setIdDoc({ file: null, error: null });
                setErrors((e) => {
                  const next = { ...e };
                  delete next.idDoc;
                  return next;
                });
              }}
              error={errors.idDoc}
            />
            <FileField
              id={`${uid}-photo`}
              label={<>Profile Photograph <span className="font-medium text-text-muted">(Optional)</span></>}
              required={false}
              value={photo}
              onPick={(f) => pickFile(setPhoto, f)}
              onClear={() => {
                setPhoto({ file: null, error: null });
                setErrors((e) => {
                  const next = { ...e };
                  delete next.photo;
                  return next;
                });
              }}
              error={errors.photo}
            />
            <FileField
              id={`${uid}-resume`}
              label={<>Resume <span className="font-medium text-text-muted">(Optional)</span></>}
              required={false}
              value={resume}
              onPick={(f) => pickFile(setResume, f)}
              onClear={() => {
                setResume({ file: null, error: null });
                setErrors((e) => {
                  const next = { ...e };
                  delete next.resume;
                  return next;
                });
              }}
              error={errors.resume}
            />
            <div className="flex flex-col gap-3 rounded-md bg-surface-muted p-4">
              <label className="flex items-start gap-2 text-[13px] leading-snug text-text-secondary">
                <input
                  type="checkbox"
                  checked={consentTerms}
                  onChange={(e) => {
                    setConsentTerms(e.target.checked);
                    if (e.target.checked)
                      setErrors((er) => {
                        const next = { ...er };
                        delete next.consentTerms;
                        return next;
                      });
                  }}
                  aria-invalid={!!errors.consentTerms}
                  data-invalid={!!errors.consentTerms}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span>
                  I have read and agree to the Hustle Learning{" "}
                  <Link
                    href="/tutor-terms-and-conditions"
                    target="_blank"
                    className="font-semibold text-text-primary underline underline-offset-2"
                  >
                    Tutor Terms and Conditions
                  </Link>
                  , including the commission structure, payment obligations,
                  tutor responsibilities and student safety requirements.
                </span>
              </label>
              <label className="flex items-start gap-2 text-[13px] leading-snug text-text-secondary">
                <input
                  type="checkbox"
                  checked={consentPrivacy}
                  onChange={(e) => {
                    setConsentPrivacy(e.target.checked);
                    if (e.target.checked)
                      setErrors((er) => {
                        const next = { ...er };
                        delete next.consentPrivacy;
                        return next;
                      });
                  }}
                  aria-invalid={!!errors.consentPrivacy}
                  data-invalid={!!errors.consentPrivacy}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span>
                  I have read the Hustle Learning{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-semibold text-text-primary underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and understand how my personal information and verification
                  documents will be collected, used and protected.
                </span>
              </label>
              <label className="flex items-start gap-2 text-[13px] leading-snug text-text-secondary">
                <input
                  type="checkbox"
                  checked={consentAccuracy}
                  onChange={(e) => {
                    setConsentAccuracy(e.target.checked);
                    if (e.target.checked)
                      setErrors((er) => {
                        const next = { ...er };
                        delete next.consentAccuracy;
                        return next;
                      });
                  }}
                  aria-invalid={!!errors.consentAccuracy}
                  data-invalid={!!errors.consentAccuracy}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span>
                  I confirm that the personal, educational and professional
                  information provided by me is accurate and genuine.
                </span>
              </label>
              {(errors.consentTerms || errors.consentPrivacy || errors.consentAccuracy) && (
                <p role="alert" className={errCls}>
                  {errors.consentTerms ?? errors.consentPrivacy ?? errors.consentAccuracy}
                </p>
              )}
            </div>
            {status && (
              <p role="alert" className="rounded-md border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-secondary">
                {status}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-surface px-6 text-sm font-bold text-text-primary transition-colors hover:border-text-muted"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Continue
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Submitting…" : "Submit Tutor Registration"}
            </button>
          )}
        </div>
      </form>
    </div>
  );

}
