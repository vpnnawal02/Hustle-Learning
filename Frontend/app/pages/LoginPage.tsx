"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { CONTACT } from "../components/navbar/navbar-data";
import logoLight from "../assets/logo/logo-without-bg.png";
import authImg from "../assets/images/forms/login-register-page.png";
import { validateWhatsapp } from "./Home/hero/validation";

type Tab = "login" | "register";
type ForgotMode = boolean;

const CLASS_OPTIONS = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const BOARD_OPTIONS = ["CBSE", "ICSE", "State Board", "Other"];

const inputCls = (invalid: boolean) =>
  `h-11 w-full rounded border bg-white px-3.5 text-sm text-text-primary shadow-[0_1px_4px_rgba(20,33,61,0.08)] placeholder:text-text-muted/60 transition-colors focus:outline-none focus:ring-2 ${
    invalid
      ? "border-red-500 focus:ring-red-500/25"
      : "border-black/[0.06] focus:border-accent focus:ring-accent/30"
  }`;
const errCls = "mt-1 text-[13px] font-medium text-red-600 dark:text-red-400";
const labelCls = "text-sm font-semibold text-text-primary";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-red-500">
      {" *"}
    </span>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  invalid,
  error,
  autoComplete,
  action,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  invalid: boolean;
  error?: string;
  autoComplete: string;
  action?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={labelCls}>
          {label}
          <RequiredMark />
        </label>
        {action}
      </div>
      <span className="relative mt-1.5 block">
        <input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          aria-invalid={invalid}
          data-invalid={invalid}
          className={`${inputCls(invalid)} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute top-1/2 right-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-primary"
        >
          {show ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
        </button>
      </span>
      {error && (
        <p role="alert" className={errCls}>
          {error}
        </p>
      )}
    </div>
  );
}

function checkPassword(v: string): string | null {
  if (!v) return "Please enter a password.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return "Password must include at least one letter and one number.";
  return null;
}

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [forgot, setForgot] = useState<ForgotMode>(false);
  const uid = useId();

  // Deep-link support: /login?tab=register opens the Register tab.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (new URLSearchParams(window.location.search).get("tab") === "register") {
        setTab("register");
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);

  // Register state
  const [name, setName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [board, setBoard] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regBusy, setRegBusy] = useState(false);
  const [regStatus, setRegStatus] = useState<string | null>(null);
  const [regDone, setRegDone] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Forgot state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotBusy, setForgotBusy] = useState(false);
  const [forgotNotice, setForgotNotice] = useState<string | null>(null);

  async function postAccount(body: Record<string, unknown>) {
    const res = await fetch("/api/student-accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, submittedAt: new Date().toISOString() }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
    };
    return { res, message: typeof data.message === "string" ? data.message : null };
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!loginEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(loginEmail.trim()))
      errs.email = "Enter a valid email address.";
    if (!loginPassword) errs.password = "Please enter your password.";
    setLoginErrors(errs);
    setLoginNotice(null);
    if (Object.keys(errs).length > 0) return;
    setLoginBusy(true);
    const { message } = await postAccount({
      mode: "login",
      email: loginEmail.trim(),
    });
    setLoginBusy(false);
    setLoginNotice(message ?? "Student login is opening soon.");
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(forgotEmail.trim())) {
      setForgotError("Enter a valid email address.");
      return;
    }
    setForgotError(null);
    setForgotBusy(true);
    const { message } = await postAccount({ mode: "forgot", email: forgotEmail.trim() });
    setForgotBusy(false);
    setForgotNotice(message ?? "Password reset will be available soon.");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter the student's full name.";
    if (!CLASS_OPTIONS.includes(classLevel)) errs.classLevel = "Please select a class.";
    if (!BOARD_OPTIONS.includes(board)) errs.board = "Please select a board.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      errs.email = "Enter a valid email address.";
    const m = validateWhatsapp(mobile);
    if (m) errs.mobile = m;
    const p = checkPassword(password);
    if (p) errs.password = p;
    if (!confirm) errs.confirm = "Please confirm your password.";
    else if (confirm !== password) errs.confirm = "Passwords do not match.";
    if (!consent) errs.consent = "Please accept the Terms and Privacy Policy.";
    setRegErrors(errs);
    setRegStatus(null);
    if (Object.keys(errs).length > 0) return;
    setRegBusy(true);
    try {
      const res = await fetch("/api/student-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "register",
          name: name.trim(),
          classLevel,
          board,
          email: email.trim(),
          whatsapp: mobile.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        referenceId?: string;
      };
      setRegBusy(false);
      if (!res.ok) {
        setRegStatus(data.message ?? "Could not send your request. Try again.");
        return;
      }
      setReferenceId(typeof data.referenceId === "string" ? data.referenceId : null);
      setRegDone(true);
    } catch {
      setRegBusy(false);
      setRegStatus("Network error. Please try again.");
    }
  }

  function switchTab(next: Tab) {
    setTab(next);
    setForgot(false);
    setLoginNotice(null);
    setForgotNotice(null);
    setRegStatus(null);
  }

  return (
    <div className="relative flex min-h-[calc(100svh_-_5rem)] flex-col overflow-hidden bg-background text-text-primary">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-accent/[0.08] blur-3xl" />
        <span className="absolute top-1/4 -right-28 h-96 w-96 rounded-full bg-[#2B3A8F]/[0.06] blur-3xl" />
        <span className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#E9EAFB] blur-3xl" />
      </div>
      <main className="relative flex w-full flex-1 justify-center px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
        <div className="m-auto grid w-full overflow-hidden lg:h-[calc(100svh_-_5rem_-_6rem)] lg:w-[62%] lg:flex-none lg:grid-cols-[46%_54%] lg:rounded-sm lg:border lg:border-black/10 lg:shadow-[0_24px_64px_-24px_rgba(20,33,61,0.25)]">
          {/* Brand panel — desktop only */}
          <div className="hidden flex-col justify-between overflow-hidden bg-brand-navy p-8 lg:flex xl:px-10">
            <Link href="/" aria-label="Hustle Learning — home" className="flex items-center gap-2.5">
              <Image
                src={logoLight}
                alt=""
                aria-hidden="true"
                height={44}
                priority
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight whitespace-nowrap">
                <span className="text-brand-white">Hustle</span>{" "}
                <span className="text-brand-amber">Learning</span>
              </span>
            </Link>
            <div className="mt-10">
              <p className="max-w-[16ch] text-3xl leading-[1.08] font-medium text-brand-white xl:text-4xl">
                Effortless Learning, Simplified.
              </p>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-brand-white/70">
                Say goodbye to scattered resources — one free account for
                NCERT material, live classes, personal tutors and books.
              </p>
            </div>
            <div className="mt-8 hidden overflow-hidden rounded-md bg-white [@media(min-height:880px)]:block">
              <span className="relative block h-44 w-full xl:h-56">
                <Image
                  src={authImg}
                  alt="Student learning online with study resources and live classes"
                  fill
                  sizes="400px"
                  loading="lazy"
                  className="object-cover object-center"
                />
              </span>
            </div>
            <p className="mt-8 text-xl leading-snug font-bold text-brand-white">
              Learn Smart. Hustle Hard.
            </p>
          </div>

          {/* Form column — the only thing on mobile */}
          <div className="flex flex-col bg-[#F5F4FA] px-4 py-8 sm:px-8 md:py-10 lg:min-h-0 lg:overflow-y-auto lg:py-6">
          <div className="flex justify-center lg:sticky lg:top-0 lg:z-10 lg:bg-[#F5F4FA] lg:py-3">
            <div
              role="tablist"
                aria-label="Login or register"
                className="relative grid w-64 grid-cols-2 rounded-full border border-black/10 bg-white p-1 shadow-[0_1px_4px_rgba(20,33,61,0.08)]"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%_-_0.25rem)] rounded-full bg-brand-navy transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    tab === "register" ? "translate-x-full" : "translate-x-0"
                  }`}
                />
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => switchTab(t)}
                    className={`relative z-10 h-10 rounded-full text-sm font-bold transition-colors duration-300 ${
                      tab === t ? "text-brand-white" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {t === "login" ? "Login" : "Register"}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_40px_-16px_rgba(20,33,61,0.22)] sm:p-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">

            {tab === "login" && !forgot && (
              <div className="mt-6 slide-copy-in">
                <h1 className="text-2xl leading-tight text-balance text-text-primary">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Log in to access your learning dashboard.
                </p>
                <form onSubmit={handleLogin} noValidate aria-label="Student login" className="mt-5 flex flex-col gap-3">
                  <div>
                    <label htmlFor={`${uid}-login-email`} className={labelCls}>
                      Email Address
                      <RequiredMark />
                    </label>
                    <input
                      id={`${uid}-login-email`}
                      type="email"
                      autoComplete="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      required
                      aria-invalid={!!loginErrors.email}
                      className={`${inputCls(!!loginErrors.email)} mt-1.5`}
                    />
                    {loginErrors.email && (
                      <p role="alert" className={errCls}>
                        {loginErrors.email}
                      </p>
                    )}
                  </div>
                  <PasswordField
                    id={`${uid}-login-password`}
                    label="Password"
                    value={loginPassword}
                    onChange={setLoginPassword}
                    placeholder="Enter your password"
                    invalid={!!loginErrors.password}
                    error={loginErrors.password}
                    autoComplete="current-password"
                    action={
                      <button
                        type="button"
                        onClick={() => {
                          setForgot(true);
                          setLoginNotice(null);
                        }}
                        className="text-[13px] font-semibold text-text-primary underline underline-offset-2 hover:text-accent-700"
                      >
                        Forgot password?
                      </button>
                    }
                  />
                  {loginNotice && (
                    <p role="status" className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 text-[13px] leading-snug text-text-secondary">
                      {loginNotice}{" "}
                      <a
                        href={CONTACT.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-text-primary underline underline-offset-2"
                      >
                        Chat on WhatsApp
                      </a>
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loginBusy}
                    className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loginBusy ? "Logging in…" : "Login"}
                  </button>
                </form>
                <p className="mt-4 text-center text-sm text-text-secondary">
                  New to Hustle Learning?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("register")}
                    className="font-semibold text-text-primary underline underline-offset-2"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            )}

            {tab === "login" && forgot && (
              <div className="mt-6 slide-copy-in">
                <h1 className="text-2xl leading-tight text-balance text-text-primary">
                  Reset password
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Enter your registered email address.
                </p>
                <form onSubmit={handleForgot} noValidate aria-label="Reset password" className="mt-5 flex flex-col gap-3">
                  <div>
                    <label htmlFor={`${uid}-forgot-email`} className={labelCls}>
                      Email Address
                      <RequiredMark />
                    </label>
                    <input
                      id={`${uid}-forgot-email`}
                      type="email"
                      autoComplete="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      required
                      aria-invalid={!!forgotError}
                      className={`${inputCls(!!forgotError)} mt-1.5`}
                    />
                    {forgotError && (
                      <p role="alert" className={errCls}>
                        {forgotError}
                      </p>
                    )}
                  </div>
                  {forgotNotice && (
                    <p role="status" className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 text-[13px] leading-snug text-text-secondary">
                      {forgotNotice}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={forgotBusy}
                    className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {forgotBusy ? "Sending…" : "Send reset link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForgot(false);
                      setForgotNotice(null);
                    }}
                    className="text-sm font-semibold text-text-secondary underline underline-offset-2 hover:text-text-primary"
                  >
                    Back to login
                  </button>
                </form>
              </div>
            )}

            {tab === "register" && (
              <div className="mt-6 slide-copy-in">
                <h1 className="text-2xl leading-tight text-balance text-text-primary">
                  Create your account
                </h1>
                {regDone ? (
                  <div role="status" className="mt-6 flex flex-col items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-base font-bold text-on-accent"
                    >
                      ✓
                    </span>
                    <p className="text-base font-bold text-text-primary">
                      Request received!
                    </p>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      Thanks{ name.trim() ? `, ${name.trim()}` : ""}! Our team
                      will verify your details and activate your account — watch
                      your WhatsApp for sign-in details.
                    </p>
                    {referenceId && (
                      <p className="text-[12px] text-text-muted">Ref: {referenceId}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => switchTab("login")}
                      className="mt-2 inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-bold text-text-primary transition-colors hover:border-text-muted"
                    >
                      Go to login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} noValidate aria-label="Student registration" className="mt-5 flex flex-col gap-3">
                    <div>
                      <label htmlFor={`${uid}-name`} className={labelCls}>
                        Student&apos;s Full Name
                        <RequiredMark />
                      </label>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Kumar"
                        required
                        aria-invalid={!!regErrors.name}
                        className={`${inputCls(!!regErrors.name)} mt-1.5`}
                      />
                      {regErrors.name && (
                        <p role="alert" className={errCls}>
                          {regErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${uid}-class`} className={labelCls}>
                        Class
                        <RequiredMark />
                      </label>
                      <span className="relative mt-1.5 block">
                        <select
                          id={`${uid}-class`}
                          value={classLevel}
                          onChange={(e) => setClassLevel(e.target.value)}
                          required
                          aria-invalid={!!regErrors.classLevel}
                          className={`${inputCls(!!regErrors.classLevel)} appearance-none pr-8 ${classLevel ? "" : "text-text-muted"}`}
                        >
                          <option value="">Select class...</option>
                          {CLASS_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-text-muted"
                        />
                      </span>
                      {regErrors.classLevel && (
                        <p role="alert" className={errCls}>
                          {regErrors.classLevel}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-board`} className={labelCls}>
                        Board
                        <RequiredMark />
                      </label>
                      <span className="relative mt-1.5 block">
                        <select
                          id={`${uid}-board`}
                          value={board}
                          onChange={(e) => setBoard(e.target.value)}
                          required
                          aria-invalid={!!regErrors.board}
                          className={`${inputCls(!!regErrors.board)} appearance-none pr-8 ${board ? "" : "text-text-muted"}`}
                        >
                          <option value="">Select board...</option>
                          {BOARD_OPTIONS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-text-muted"
                        />
                      </span>
                      {regErrors.board && (
                        <p role="alert" className={errCls}>
                          {regErrors.board}
                        </p>
                      )}
                    </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${uid}-email`} className={labelCls}>
                        Email Address
                        <RequiredMark />
                      </label>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        required
                        aria-invalid={!!regErrors.email}
                        className={`${inputCls(!!regErrors.email)} mt-1.5`}
                      />
                      {regErrors.email && (
                        <p role="alert" className={errCls}>
                          {regErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`${uid}-mobile`} className={labelCls}>
                        Mobile Number
                        <RequiredMark />
                      </label>
                      <input
                        id={`${uid}-mobile`}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 9876543210"
                        required
                        aria-invalid={!!regErrors.mobile}
                        className={`${inputCls(!!regErrors.mobile)} mt-1.5`}
                      />
                      {regErrors.mobile && (
                        <p role="alert" className={errCls}>
                          {regErrors.mobile}
                        </p>
                      )}
                    </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                    <PasswordField
                      id={`${uid}-password`}
                      label="Password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Min. 8 characters, letter + number"
                      invalid={!!regErrors.password}
                      error={regErrors.password}
                      autoComplete="new-password"
                    />
                    <PasswordField
                      id={`${uid}-confirm`}
                      label="Confirm Password"
                      value={confirm}
                      onChange={setConfirm}
                      placeholder="Repeat your password"
                      invalid={!!regErrors.confirm}
                      error={regErrors.confirm}
                      autoComplete="new-password"
                    />
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        id={`${uid}-consent`}
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        aria-invalid={!!regErrors.consent}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                      />
                      <label htmlFor={`${uid}-consent`} className="text-[13px] leading-snug text-text-secondary">
                        I agree to the{" "}
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
                    {regErrors.consent && (
                      <p role="alert" className={errCls}>
                        {regErrors.consent}
                      </p>
                    )}
                    {regStatus && (
                      <p role="alert" className="rounded-md border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-secondary">
                        {regStatus}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={regBusy}
                      className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {regBusy ? "Creating account…" : "Create account"}
                    </button>
                  </form>
                )}
                {!regDone && (
                  <p className="mt-4 text-center text-sm text-text-secondary">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchTab("login")}
                      className="font-semibold text-text-primary underline underline-offset-2"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
