import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleCheck,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/typography";
import DrillFaq from "./drill-mode/DrillFaq";
import DrillQuestionPreview from "./drill-mode/DrillQuestionPreview";
import HeroVideo from "./drill-mode/HeroVideo";
import stepClassImg from "../assets/images/drill-mode/Drill Mode Class Selection Dashboard.png";
import stepSubjectImg from "../assets/images/drill-mode/Dark Navy Drill Mode Subject Selection.png";
import stepChapterImg from "../assets/images/drill-mode/Drill Mode Chapter Selection.png";
import stepTimerImg from "../assets/images/drill-mode/Drill Mode Timer Setup.png";

const STEPS: { image: StaticImageData; imageAlt: string; title: string; text: string }[] = [
  {
    image: stepClassImg,
    imageAlt: "Drill Mode class selection screen with Class 10 selected",
    title: "Select your class",
    text: "Choose your academic level or examination category — Classes 6 to 12, JEE or NEET.",
  },
  {
    image: stepSubjectImg,
    imageAlt: "Drill Mode subject selection screen with Science selected",
    title: "Choose your subject",
    text: "Pick the subject you want to practise. Subject availability depends on the selected class or examination.",
  },
  {
    image: stepChapterImg,
    imageAlt: "Drill Mode chapter selection screen with a chapter selected",
    title: "Select your chapters",
    text: "Practise a single chapter or combine multiple chapters in one focused drill.",
  },
  {
    image: stepTimerImg,
    imageAlt: "Drill Mode timer setup screen with 20 minutes selected",
    title: "Set your timer and start",
    text: "Review your selection, choose a duration and start. Questions keep coming until the timer expires.",
  },
];

const PRACTICE_FEATURES = [
  "A clearly displayed question.",
  "Four answer options with an interactive selection interface.",
  "Immediate indication of whether your answer is correct or incorrect.",
  "A countdown timer that tracks your remaining practice time.",
  "A new question after every answer, until the timer ends.",
];

const REPORT_POINTS = [
  "Accuracy — the percentage of questions you answered correctly.",
  "Questions attempted, with correct and incorrect counts.",
  "Time taken during the practice session.",
  "A visual breakdown of correct and incorrect answers.",
];

const REPORT_STATS = [
  { label: "Questions attempted", value: "34" },
  { label: "Correct answers", value: "28" },
  { label: "Incorrect answers", value: "6" },
  { label: "Time taken", value: "15:00" },
];

const AUDIENCES: { icon: LucideIcon; title: string; text: string; cardClass: string }[] = [
  {
    icon: GraduationCap,
    title: "Classes 6–8",
    text: "Strengthen fundamental concepts and develop consistent practice habits across subjects.",
    cardClass: "bg-[#EAE6FB]",
  },
  {
    icon: BookOpen,
    title: "Classes 9–10",
    text: "Practise subject-wise and chapter-wise questions while preparing for school assessments and board examinations.",
    cardClass: "bg-[#E6F0FD]",
  },
  {
    icon: Sparkles,
    title: "Classes 11–12",
    text: "Reinforce subject knowledge and practise questions relevant to senior secondary academic preparation.",
    cardClass: "bg-[#FBF3E1]",
  },
  {
    icon: Target,
    title: "JEE Aspirants",
    text: "Practise questions relevant to your JEE preparation and strengthen your understanding of selected topics.",
    cardClass: "bg-[#E7F4EC]",
  },
  {
    icon: Trophy,
    title: "NEET Aspirants",
    text: "Build subject knowledge and practise questions relevant to your NEET preparation.",
    cardClass: "bg-[#FBE9F1]",
  },
];



function AccuracyRing({ value }: { value: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <figure
      role="img"
      aria-label={`Accuracy: ${value} percent`}
      className="relative h-[96px] w-[96px] shrink-0"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-surface-muted"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-accent"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="text-base font-extrabold tracking-tight text-text-primary">
          {value}%
        </span>
        <span className="text-[10px] font-semibold tracking-wide text-text-muted uppercase">
          Accuracy
        </span>
      </div>
    </figure>
  );
}

function BreakdownBar({
  label,
  value,
  total,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  tone: "correct" | "incorrect";
}) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[12.5px] font-semibold">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary">
          {value} ({percentage}%)
        </span>
      </div>
      <div
        role="img"
        aria-label={`${label}: ${value} of ${total} questions (${percentage} percent)`}
        className="mt-1 h-2 overflow-hidden rounded-full bg-surface-muted"
      >
        <span
          className={`block h-full rounded-full ${
            tone === "correct" ? "bg-emerald-500" : "bg-rose-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function DrillModePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        {/* ---------- Hero ---------- */}
        <section
          aria-labelledby="drill-hero-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-8 pb-2.5 md:px-6 md:pt-12"
        >
          <div className="rounded-md bg-brand-navy px-5 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-x-10 lg:gap-y-6">
              <Reveal variant="left" className="lg:col-start-1 lg:row-start-1">
                <h1
                  id="drill-hero-heading"
                  className="max-w-[22ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl lg:text-[48px]"
                >
                  Every Question Counts. Every Practice Session Matters.
                </h1>
                <p className="mt-3 max-w-[32ch] text-xl leading-snug font-bold text-brand-white/85 sm:text-2xl">
                  <span className="underline decoration-accent decoration-2 underline-offset-4">
                    Drill Mode
                  </span>{" "}
                  — Hustle Learning&apos;s star feature
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-brand-white/75">
                  Take control of your exam preparation with Drill Mode by
                  Hustle Learning. Practise chapter-wise MCQs, challenge
                  yourself with timed sessions, test your understanding and
                  track your accuracy as you improve.
                </p>
              </Reveal>

              <Reveal
                variant="right"
                className="lg:col-start-2 lg:row-start-1 lg:row-span-2"
              >
                <div className="mx-auto w-full">
                  <HeroVideo />
                </div>
              </Reveal>

              <Reveal
                variant="left"
                delay={120}
                className="lg:col-start-1 lg:row-start-2"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/subscribe"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Start Practising
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
                  >
                    Explore How It Works
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- How it works ---------- */}
        <section
          aria-labelledby="how-heading"
          id="how-it-works"
          className="scroll-mt-24 bg-surface-muted pt-14 pb-10 md:pt-20 md:pb-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <SectionHeading
                titleId="how-heading"
                title="Start Practising in Four Simple Steps"
                description="Choose what to practise, set your timer and let the questions come. Drill Mode keeps the session focused from the first question to the last."
              />
            </Reveal>
            <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-6 pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:p-0">
              {STEPS.map((step, index) => {
                return (
                  <Reveal
                    key={step.title}
                    delay={index * 70}
                    className="w-[78%] shrink-0 snap-start self-stretch sm:w-[46%] lg:w-auto"
                  >
                    <article className="relative flex h-full flex-col rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-text-muted hover:shadow-[0_20px_40px_-20px_rgba(20,33,61,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <span
                        aria-hidden="true"
                        className="absolute -top-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-base font-extrabold text-on-accent shadow-md"
                      >
                        {index + 1}
                      </span>
                      <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-t-lg border-b border-border">
                        <Image
                          src={step.image}
                          alt={step.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 78vw, 320px"
                          loading="lazy"
                          className="object-cover object-top"
                        />
                      </span>
                      <span className="flex flex-1 flex-col p-5 text-center">
                        <h3 className="text-xl font-bold tracking-tight text-text-primary">
                          {step.title}
                        </h3>
                      </span>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- What is Drill Mode ---------- */}
        <section
          aria-labelledby="what-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="what-heading"
              title="A Smarter Way to Practise"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-3 text-lg leading-[1.6] font-medium text-text-primary">
              Drill Mode is an interactive, timer-based question practice
              feature designed to help students strengthen their subject
              knowledge through continuous practice.
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-4 pl-6 marker:text-accent">
              <li className="text-[15px] leading-[1.7] text-text-secondary">
                Instead of attempting random questions, you can select your
                class or examination, choose a subject, pick specific chapters
                and start a focused practice session.
              </li>
              <li className="text-[15px] leading-[1.7] text-text-secondary">
                Each session presents multiple-choice questions (MCQs) with at
                least four answer options. Questions continue to appear until
                your selected timer expires.
              </li>
              <li className="text-[15px] leading-[1.7] text-text-secondary">
                After completing a session, you can see your performance,
                including questions attempted, correct answers, incorrect
                answers and overall accuracy.
              </li>
              <li className="text-[15px] leading-[1.7] text-text-secondary">
                Whether you are revising a recently completed chapter or
                preparing for an upcoming examination, Drill Mode helps you
                make your practice sessions more focused.
              </li>
            </ul>
          </Reveal>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- Interactive practice ---------- */}
        <section
          aria-labelledby="practice-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal variant="left">
              <SectionHeading
                titleId="practice-heading"
                title="One Question at a Time"
                description="Focus on understanding and accuracy with an interactive MCQ interface. Work through questions at your own pace while keeping an eye on the countdown."
              />
              <ul className="mt-6 flex flex-col gap-3">
                {PRACTICE_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-brand-navy"
                    />
                    <span className="text-sm leading-[1.6] text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="right" className="mx-auto w-full max-w-[480px]">
              <DrillQuestionPreview />
            </Reveal>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- Performance reports ---------- */}
        <section
          aria-labelledby="reports-heading"
          className="bg-surface-muted py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal variant="right" className="lg:order-2">
                <SectionHeading
                  titleId="reports-heading"
                  title="Know How You Performed"
                  description="Completing a drill is only part of the process. Understanding your performance is equally important."
                />
                <p className="mt-4 max-w-[58ch] text-base leading-[1.6] text-text-secondary">
                  After each completed session, receive a performance summary
                  that helps you understand your current performance and
                  identify areas that may need additional practice.
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {REPORT_POINTS.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check
                        aria-hidden="true"
                        size={18}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-brand-navy"
                      />
                      <span className="text-sm leading-[1.6] text-text-secondary">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal variant="left" className="h-full lg:order-1">
                <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(20,33,61,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-bold text-text-primary">
                      Session summary
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-text-primary uppercase">
                      <CircleCheck
                        size={13}
                        aria-hidden="true"
                        className="text-emerald-600"
                      />
                      Completed
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                    <AccuracyRing value={82} />
                    <dl className="grid flex-1 grid-cols-2 gap-2.5">
                      {REPORT_STATS.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-md border border-border bg-surface-muted/60 p-2.5"
                        >
                          <dt className="text-[11px] font-semibold tracking-wide text-text-muted uppercase">
                            {stat.label}
                          </dt>
                          <dd className="mt-0.5 text-base font-extrabold tracking-tight text-text-primary tabular-nums">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-4 flex-1 border-t border-border pt-3">
                    <p className="text-[11px] font-bold tracking-[0.1em] text-text-muted uppercase">
                      Answer breakdown
                    </p>
                    <div className="mt-2.5 flex flex-col gap-2">
                      <BreakdownBar
                        label="Correct"
                        value={28}
                        total={34}
                        tone="correct"
                      />
                      <BreakdownBar
                        label="Incorrect"
                        value={6}
                        total={34}
                        tone="incorrect"
                      />
                    </div>
                  </div>
                  <p className="mt-auto pt-3 text-xs leading-relaxed text-text-muted">
                    Use your report to spot weak chapters and drill them next.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- Who can use ---------- */}
        <section
          aria-labelledby="audience-heading"
          className="bg-surface-muted py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <SectionHeading
                titleId="audience-heading"
                title="Practice for Your Academic Goals"
                description="Drill Mode supports students across school education and competitive examination preparation."
              />
            </Reveal>
            <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:p-0 xl:grid-cols-5">
              {AUDIENCES.map((audience, index) => {
                const Icon = audience.icon;
                return (
                  <Reveal
                    key={audience.title}
                    delay={index * 60}
                    className="w-[78%] shrink-0 snap-start self-stretch sm:w-[46%] lg:w-auto"
                  >
                    <article
                      className={`flex h-full flex-col rounded-md border border-black/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(20,33,61,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${audience.cardClass}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand-navy bg-transparent text-brand-navy">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <h3 className="text-lg leading-tight font-extrabold tracking-tight text-[#141B2D]">
                          {audience.title}
                        </h3>
                      </span>
                      <p className="mt-3 text-sm leading-[1.6] text-[#4A5568]">
                        {audience.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        <DrillFaq />

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- Final CTA ---------- */}
        <section
          aria-labelledby="drill-cta-heading"
          className="bg-brand-navy"
        >
          <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col items-start gap-5 px-4 py-10 md:px-6 md:py-14 lg:flex-row lg:items-center lg:justify-between">
            <Reveal variant="up">
              <h2
                id="drill-cta-heading"
                className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl"
              >
                Ready to Put Your Knowledge to the Test?
              </h2>
              <p className="mt-3 max-w-[58ch] text-base leading-[1.6] text-brand-white/75">
                Choose your subject, select your chapters, set your timer and
                start practising. Make your practice sessions count with Drill
                Mode by Hustle Learning.
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-white/85">
                Learn. Practise. Improve. Repeat.
              </p>
            </Reveal>
            <Reveal variant="right" className="shrink-0">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Start Your First Drill
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
                >
                  Explore Subscription Plans
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
