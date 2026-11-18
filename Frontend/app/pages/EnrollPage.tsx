"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { PageTitle } from "../components/typography";
import {
  CLASS_COURSE_GROUPS,
  formatINR,
  getAllClassCourses,
} from "../components/class-courses";
import { submitLead } from "./Home/hero/lead-service";
import { validateEnquiry } from "./Home/hero/validation";

const CLASS_LABELS: Record<string, string> = {
  "class-6": "Class 6",
  "class-7": "Class 7",
  "class-8": "Class 8",
  "class-9": "Class 9",
  "class-10": "Class 10",
};

export default function EnrollPage() {
  const searchParams = useSearchParams();
  const initialClass = searchParams.get("class") ?? "";
  const initialCourse = searchParams.get("course") ?? "";
  const initialPlan =
    searchParams.get("plan") === "yearly" ? "yearly" : "monthly";

  const allCourses = useMemo(() => getAllClassCourses(), []);
  const [classSlug, setClassSlug] = useState(initialClass);
  const [courseId, setCourseId] = useState(initialCourse);
  const [plan, setPlan] = useState<"monthly" | "yearly">(initialPlan);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const coursesForClass = useMemo(
    () => allCourses.filter((c) => (classSlug ? c.classSlug === classSlug : true)),
    [allCourses, classSlug],
  );
  const selectedCourse = useMemo(
    () => allCourses.find((c) => c.id === courseId),
    [allCourses, courseId],
  );
  const price = selectedCourse
    ? plan === "monthly"
      ? selectedCourse.monthlyPrice
      : selectedCourse.yearlyPrice
    : null;

  const inputCls = (invalid: boolean) =>
    `h-12 w-full rounded-md border bg-surface px-3.5 text-sm text-text-primary transition-colors placeholder:text-text-muted/70 focus:outline-none focus:ring-2 ${
      invalid
        ? "border-red-500 focus:ring-red-500/25"
        : "border-border focus:border-accent focus:ring-accent/30"
    }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry({
      name,
      whatsapp: phone,
      email,
      classLevel: classSlug ? (CLASS_LABELS[classSlug] ?? classSlug) : "",
    });
    const next: Record<string, string> = { ...errs };
    if (!courseId) next.course = "Please select a course.";
    if (!consent) next.consent = "Please tick the checkbox to agree before submitting.";
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    const res = await submitLead({
      name: name.trim(),
      whatsapp: phone.trim(),
      email: email.trim() || undefined,
      classLevel: CLASS_LABELS[classSlug] ?? classSlug,
      service: "online-classes",
      slideId: courseId,
      source: `enroll:${courseId}:${plan}`,
    });
    setSending(false);
    if (!res.ok) {
      setStatus(res.message);
      return;
    }
    setDone(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Courses", href: "/courses" },
            { label: "Enroll Now" },
          ]}
        />
        <Link
          href={selectedCourse ? `/courses/${selectedCourse.classSlug}` : "/courses"}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to courses
        </Link>

        <PageTitle className="mt-3">Enroll Now</PageTitle>
        <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Fill in the student details and we will confirm your live batch on
          WhatsApp. Payment integration is coming soon — no payment is taken on
          this page.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section
            aria-labelledby="enroll-form-heading"
            className="rounded-lg border border-border bg-surface p-6 sm:p-8"
          >
            {done ? (
              <div role="status" className="flex flex-col items-start gap-3 py-4">
                <CheckCircle2 size={36} className="text-green-600" aria-hidden="true" />
                <h2 id="enroll-form-heading" className="text-xl font-bold text-text-primary">
                  Enrolment request received
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Thanks{ name.trim() ? `, ${name.trim()}` : ""}! Our counsellor
                  will contact you on WhatsApp shortly to confirm
                  {selectedCourse ? ` ${selectedCourse.title}` : " your batch"}
                  {" "}({plan === "monthly" ? "monthly" : "yearly"} plan).
                </p>
                <Link
                  href="/courses"
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Browse more courses
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Enroll in a live batch">
                <h2 id="enroll-form-heading" className="text-xl font-bold text-text-primary">
                  Student details
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="enroll-class" className="text-sm font-semibold text-text-primary">
                      Class
                    </label>
                    <select
                      id="enroll-class"
                      value={classSlug}
                      onChange={(e) => {
                        setClassSlug(e.target.value);
                        setCourseId("");
                      }}
                      required
                      className={`${inputCls(!!errors.classLevel)} mt-1`}
                    >
                      <option value="">Select class</option>
                      {CLASS_COURSE_GROUPS.map((g) => (
                        <option key={g.slug} value={g.slug}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                    {errors.classLevel && (
                      <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                        {errors.classLevel}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="enroll-course" className="text-sm font-semibold text-text-primary">
                      Course
                    </label>
                    <select
                      id="enroll-course"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      required
                      className={`${inputCls(!!errors.course)} mt-1`}
                    >
                      <option value="">Select course</option>
                      {coursesForClass.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                        {errors.course}
                      </p>
                    )}
                  </div>
                </div>

                <fieldset className="mt-5">
                  <legend className="text-sm font-semibold text-text-primary">Plan</legend>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {(["monthly", "yearly"] as const).map((p) => (
                      <label
                        key={p}
                        className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition-colors ${
                          plan === p
                            ? "border-accent bg-accent/10"
                            : "border-border bg-surface hover:border-text-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={p}
                          checked={plan === p}
                          onChange={() => setPlan(p)}
                          className="h-4 w-4 accent-[#F0A200]"
                        />
                        <span>
                          <span className="block text-sm font-bold text-text-primary">
                            {p === "monthly" ? "Monthly" : "Yearly"}
                          </span>
                          <span className="block text-[13px] text-text-secondary">
                            {p === "monthly" ? "₹499/- per month" : "₹5000/- per academic year"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="enroll-name" className="text-sm font-semibold text-text-primary">
                      Student name
                    </label>
                    <input
                      id="enroll-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarav Sharma"
                      required
                      className={`${inputCls(!!errors.name)} mt-1`}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="enroll-phone" className="text-sm font-semibold text-text-primary">
                      WhatsApp number
                    </label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      required
                      className={`${inputCls(!!errors.whatsapp)} mt-1`}
                    />
                    {errors.whatsapp && (
                      <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="enroll-email" className="text-sm font-semibold text-text-primary">
                    Email <span className="font-normal text-text-muted">(optional)</span>
                  </label>
                  <input
                    id="enroll-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className={`${inputCls(!!errors.email)} mt-1`}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-start gap-2">
                  <input
                    id="enroll-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#F0A200]"
                  />
                  <label htmlFor="enroll-consent" className="text-[13px] leading-snug text-text-secondary">
                    I agree to be contacted by Hustle Learning on WhatsApp/call about this enrolment and accept the{" "}
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
                {errors.consent && (
                  <p role="alert" className="mt-1 text-[13px] font-medium text-red-600 dark:text-red-400">
                    {errors.consent}
                  </p>
                )}
                {status && (
                  <p role="alert" className="mt-3 rounded-md border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-secondary">
                    {status}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Submitting…" : "Enroll Now"}
                </button>
              </form>
            )}
          </section>

          <aside aria-label="Selected course summary" className="min-w-0">
            <div className="rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-24">
              <p className="text-xs font-bold tracking-[0.1em] text-text-muted uppercase">
                Your selection
              </p>
              {selectedCourse ? (
                <>
                  <p className="mt-2 text-base font-bold text-text-primary">
                    {selectedCourse.title}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Live online batch · {CLASS_LABELS[selectedCourse.classSlug]}
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-2xl font-extrabold tracking-tight text-text-primary">
                      {price != null ? formatINR(price) : "—"}{" "}
                      <span className="text-sm font-medium text-text-muted">
                        {plan === "monthly" ? "per month" : "per academic year"}
                      </span>
                    </p>
                    <p className="mt-1 text-[13px] text-text-secondary">
                      {plan === "monthly"
                        ? `Or ${formatINR(selectedCourse.yearlyPrice)} per academic year`
                        : `Or ${formatINR(selectedCourse.monthlyPrice)} per month`}
                    </p>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Select a class and course to see the price here. Every course
                  is ₹499/- per month or ₹5000/- per academic year.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
