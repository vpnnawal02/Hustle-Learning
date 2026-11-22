import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CalendarClock,
  ChartColumn,
  Check,
  ChevronDown,
  CircleCheck,
  GraduationCap,
  Layers,
  ListChecks,
  Sparkles,
  Target,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import JsonLd from "../components/seo/JsonLd";
import { PlanCard } from "../components/PlanCard";
import { SectionHeading } from "../components/typography";
import { PLANS } from "../components/subscription";
import { faqJsonLd } from "@/lib/seo";
import DrillQuestionPreview from "./drill-mode/DrillQuestionPreview";
import HeroVideo from "./drill-mode/HeroVideo";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: GraduationCap,
    title: "Select your class or examination",
    text: "Choose your academic level or examination category — Classes 6 to 12, JEE or NEET.",
  },
  {
    icon: BookOpen,
    title: "Choose your subject",
    text: "Pick the subject you want to practise. Subject availability depends on the selected class or examination.",
  },
  {
    icon: ListChecks,
    title: "Select your chapters",
    text: "Practise a single chapter or combine multiple chapters in one focused drill.",
  },
  {
    icon: Timer,
    title: "Set your timer and start",
    text: "Review your selection, choose a duration and start. Questions keep coming until the timer expires.",
  },
];

const DURATIONS = [
  { minutes: "5", label: "Quick Practice" },
  { minutes: "10", label: "Focused Practice" },
  { minutes: "15", label: "Regular Practice" },
  { minutes: "20", label: "Extended Practice" },
  { minutes: "30", label: "Intensive Practice" },
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

const MORE_FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Timer,
    title: "Drill Mode",
    text: "Practise chapter-wise MCQs through customised, timer-based question sessions.",
  },
  {
    icon: Layers,
    title: "Extended Question Banks",
    text: "Access an extended collection of practice questions to strengthen your understanding and revise important concepts.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Assignments",
    text: "Stay consistent with regular assignments designed to keep your preparation on track.",
  },
  {
    icon: ChartColumn,
    title: "Detailed Test Reports",
    text: "Understand your performance through detailed assessment reports and result summaries.",
  },
  {
    icon: ListChecks,
    title: "Important Questions",
    text: "Practise important questions selected to support your examination preparation.",
  },
  {
    icon: CalendarClock,
    title: "Performance History",
    text: "Keep track of your previous performance and monitor your progress over time.",
  },
];

const AUDIENCES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: GraduationCap,
    title: "Classes 6–8",
    text: "Strengthen fundamental concepts and develop consistent practice habits across subjects.",
  },
  {
    icon: BookOpen,
    title: "Classes 9–10",
    text: "Practise subject-wise and chapter-wise questions while preparing for school assessments and board examinations.",
  },
  {
    icon: Sparkles,
    title: "Classes 11–12",
    text: "Reinforce subject knowledge and practise questions relevant to senior secondary academic preparation.",
  },
  {
    icon: Target,
    title: "JEE Aspirants",
    text: "Practise questions relevant to your JEE preparation and strengthen your understanding of selected topics.",
  },
  {
    icon: Trophy,
    title: "NEET Aspirants",
    text: "Build subject knowledge and practise questions relevant to your NEET preparation.",
  },
];

const FAQS = [
  {
    question: "What is Drill Mode in Hustle Learning?",
    answer:
      "Drill Mode is a timer-based question practice feature that allows students to practise multiple-choice questions by selecting their class, subject and chapters. It helps students test their understanding and monitor their accuracy.",
  },
  {
    question: "Which classes are supported in Drill Mode?",
    answer:
      "Drill Mode is available for Classes 6, 7, 8, 9, 10, 11 and 12. Separate preparation categories are also available for JEE and NEET aspirants.",
  },
  {
    question: "Can I select multiple chapters for one drill?",
    answer:
      "Yes. You can select one or more chapters from your chosen subject and practise questions from the selected chapters in a single session.",
  },
  {
    question: "What subjects are available for Class 10?",
    answer:
      "Class 10 students can select Mathematics, Science, Social Science, English and Hindi.",
  },
  {
    question: "How long can I practise in one drill?",
    answer:
      "You can select from five available durations: 5, 10, 15, 20 and 30 minutes.",
  },
  {
    question: "How many questions can I attempt in one session?",
    answer:
      "The number of questions you can attempt depends on your selected timer duration and answering speed. Questions are presented continuously until the timer expires.",
  },
  {
    question: "How many options does each question have?",
    answer: "Each multiple-choice question includes at least four answer options.",
  },
  {
    question: "Will I know whether my answer is correct?",
    answer:
      "Yes. Drill Mode provides feedback indicating whether your selected answer is correct or incorrect.",
  },
  {
    question: "What happens when the timer expires?",
    answer:
      "Your practice session ends and you can view your performance summary, including questions attempted, correct answers, incorrect answers, time taken and accuracy.",
  },
  {
    question: "Can I track my previous performance?",
    answer:
      "Yes. Hustle Learning's subscription includes Performance History, allowing you to monitor your previous performance and progress.",
  },
  {
    question: "Is Drill Mode included in the subscription?",
    answer:
      "Yes. Drill Mode is included in all three subscription tiers: Classes 6–10, Classes 11–12, and JEE & NEET.",
  },
  {
    question: "What is the monthly subscription price?",
    answer:
      "The monthly subscription prices are ₹99 for Classes 6–10, ₹129 for Classes 11–12, and ₹149 for JEE and NEET.",
  },
  {
    question: "Are all subscription features the same across plans?",
    answer:
      "Yes. All three subscription plans include the same listed features. Only the monthly subscription price varies.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel your subscription at any time. However, subscription payments are non-refundable.",
  },
];

function SessionSetupCard() {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <p className="text-sm font-bold text-text-primary">Session setup</p>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold tracking-[0.1em] text-text-primary uppercase">
          Custom drill
        </span>
      </div>
      <dl className="mt-4 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm font-medium text-text-muted">Class</dt>
          <dd className="text-right text-sm font-bold text-text-primary">
            Class 10
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm font-medium text-text-muted">Subject</dt>
          <dd className="text-right text-sm font-bold text-text-primary">
            Science
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-text-muted">Chapters</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {[
              "Chemical Reactions",
              "Acids, Bases and Salts",
              "Life Processes",
            ].map((chapter) => (
              <span
                key={chapter}
                className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[12px] font-semibold text-text-secondary"
              >
                {chapter}
              </span>
            ))}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm font-medium text-text-muted">Timer</dt>
          <dd className="text-right text-sm font-bold text-text-primary">
            15 minutes
          </dd>
        </div>
      </dl>
      <p className="mt-5 border-t border-border pt-3 text-[12.5px] leading-relaxed text-text-muted">
        Questions keep coming until the timer reaches zero.
      </p>
    </div>
  );
}

function AccuracyRing({ value }: { value: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <figure
      role="img"
      aria-label={`Accuracy: ${value} percent`}
      className="relative h-[120px] w-[120px] shrink-0"
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
        <span className="text-2xl font-extrabold tracking-tight text-text-primary">
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
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-8 md:px-6 md:pt-12"
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
                  Drill Mode — Hustle Learning&apos;s star feature
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

        <hr aria-hidden="true" className="mx-auto mt-10 w-full max-w-[var(--container-wide)] border-border md:mt-14" />

        {/* ---------- What is Drill Mode ---------- */}
        <section
          aria-labelledby="what-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal variant="left">
              <SectionHeading
                titleId="what-heading"
                title="A Smarter Way to Practise"
              />
              <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                Drill Mode is an interactive, timer-based question practice
                feature designed to help students strengthen their subject
                knowledge through continuous practice.
              </p>
              <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                Instead of attempting random questions, you can select your
                class or examination, choose a subject, pick specific chapters
                and start a focused practice session.
              </p>
              <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                Each session presents multiple-choice questions (MCQs) with at
                least four answer options. Questions continue to appear until
                your selected timer expires.
              </p>
              <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                After completing a session, you can see your performance,
                including questions attempted, correct answers, incorrect
                answers and overall accuracy.
              </p>
              <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                Whether you are revising a recently completed chapter or
                preparing for an upcoming examination, Drill Mode helps you
                make your practice sessions more focused.
              </p>
            </Reveal>
            <Reveal variant="right">
              <SessionSetupCard />
            </Reveal>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section
          aria-labelledby="how-heading"
          id="how-it-works"
          className="scroll-mt-24 bg-surface-muted py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <SectionHeading
                titleId="how-heading"
                title="Start Practising in Four Simple Steps"
                description="Choose what to practise, set your timer and let the questions come. Drill Mode keeps the session focused from the first question to the last."
              />
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal
                    key={step.title}
                    delay={index * 70}
                    className="h-full"
                  >
                    <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-on-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          size={22}
                          aria-hidden="true"
                          className="text-text-muted"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
                        {step.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Timer ---------- */}
        <section
          aria-labelledby="timer-heading"
          className="bg-brand-navy py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <h2
                id="timer-heading"
                className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-brand-white sm:text-5xl"
              >
                Your Time. Your Practice. Your Challenge.
              </h2>
              <p className="mt-3 max-w-[58ch] text-base leading-[1.6] text-brand-white/75">
                Make every minute count. Choose how long you want to practise
                and attempt as many questions as you can within the selected
                duration.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {DURATIONS.map((duration, index) => (
                <Reveal key={duration.minutes} delay={index * 60}>
                  <article className="h-full rounded-md border border-white/15 bg-white/5 p-5 text-center">
                    <p className="flex items-baseline justify-center gap-1.5 text-3xl font-extrabold tracking-tight text-brand-white tabular-nums">
                      {duration.minutes}
                      <span className="text-sm font-semibold text-brand-white/70">
                        min
                      </span>
                    </p>
                    <p className="mt-2 text-[12.5px] font-semibold text-brand-white/70">
                      {duration.label}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-sm font-medium text-brand-white/60">
              Questions are generated continuously until the countdown reaches
              zero.
            </p>
          </div>
        </section>

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

        {/* ---------- Performance reports ---------- */}
        <section
          aria-labelledby="reports-heading"
          className="bg-surface-muted py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal variant="left">
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

              <Reveal variant="right">
                <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
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
                  <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
                    <AccuracyRing value={82} />
                    <dl className="grid flex-1 grid-cols-2 gap-3">
                      {REPORT_STATS.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-md border border-border bg-surface-muted/60 p-3"
                        >
                          <dt className="text-[11px] font-semibold tracking-wide text-text-muted uppercase">
                            {stat.label}
                          </dt>
                          <dd className="mt-1 text-lg font-extrabold tracking-tight text-text-primary tabular-nums">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-[11px] font-bold tracking-[0.1em] text-text-muted uppercase">
                      Answer breakdown
                    </p>
                    <div className="mt-3 flex flex-col gap-2.5">
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
                  <p className="mt-4 text-[12.5px] leading-relaxed text-text-muted">
                    Use your report to spot weak chapters and drill them next.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- More features ---------- */}
        <section
          aria-labelledby="more-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="more-heading"
              title="Everything You Need for Consistent Preparation"
              description="Drill Mode is part of the Hustle Learning subscription, which brings together additional learning and practice resources."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={feature.title}
                  delay={index * 60}
                  className="h-full"
                >
                  <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-colors duration-200 hover:border-text-muted">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15 text-brand-navy">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
                      {feature.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

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
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {AUDIENCES.map((audience, index) => {
                const Icon = audience.icon;
                return (
                  <Reveal
                    key={audience.title}
                    delay={index * 60}
                    className="h-full"
                  >
                    <article className="flex h-full flex-col rounded-md border border-border bg-surface p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-navy text-brand-white">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-base font-bold text-text-primary">
                        {audience.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
                        {audience.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Plans ---------- */}
        <section
          aria-labelledby="plans-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="plans-heading"
              title="Unlock More Practice with Hustle Learning"
              description="Get access to Drill Mode and the complete collection of subscription features through an affordable monthly subscription."
            />
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-[1120px] gap-5 md:grid-cols-3">
            {PLANS.map((plan, index) => (
              <Reveal
                key={plan.id}
                delay={index * 80}
                className="h-full"
              >
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              View Subscription Plans
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="max-w-[62ch] text-[13px] leading-relaxed text-text-muted">
              All plans include the same listed features. Subscriptions are
              billed monthly, can be cancelled anytime and are non-refundable.
            </p>
          </div>
        </section>

        <hr aria-hidden="true" className="mx-auto w-full max-w-[var(--container-wide)] border-border" />

        {/* ---------- FAQs ---------- */}
        <section
          aria-labelledby="drill-faqs-heading"
          id="faqs"
          className="mx-auto w-full max-w-[980px] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <JsonLd data={faqJsonLd(FAQS)} />
          <Reveal>
            <h2
              id="drill-faqs-heading"
              className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-text-secondary">
              Answers about sessions, chapters, timers and subscriptions. Still
              unsure?{" "}
              <Link
                href="/pricing"
                className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4"
              >
                Compare plans
              </Link>
              .
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group h-fit rounded-md border border-border bg-surface px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm leading-[1.65] text-text-secondary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

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
      <Footer />
    </div>
  );
}
