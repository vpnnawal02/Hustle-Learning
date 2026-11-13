"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import ownerPhoto from "../../assets/images/owner.png";

function GradCapIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="m7 13 3-3 4 4 5-6" />
      <path d="M17 7h4v4" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 2 10 5.5-10 5.5L2 7.5 12 2z" />
      <path d="m2 12.5 10 5.5 10-5.5" />
      <path d="m2 17.5 10 5.5 10-5.5" />
    </svg>
  );
}

const STATS = [
  { icon: UsersIcon, value: "6–10", label: "CBSE classes" },
  { icon: LayersIcon, value: "7", label: "Study resources" },
  { icon: BookIcon, value: "41+", label: "Published chapters" },
];

/**
 * Only benefits that exist today: free library items map to real resource
 * types; subscription bullets match /subscribe; batch bullets match /courses.
 * No ad-free, tracking, Drill Mode, or competitive-level promises.
 */
const PILLARS = [
  {
    eyebrow: "Learn without limits.",
    icon: BookIcon,
    title: "Free Resources",
    text: "Notes, NCERT Solutions, Worksheets, Important Questions, Sample Papers and PYQs — free for every chapter.",
    cta: { label: "Explore Resources", href: "/resources" },
    featured: true,
  },
  {
    eyebrow: "Subscription Plans",
    icon: TargetIcon,
    title: "Take your preparation further.",
    text: "Extended question banks with solved examples, exam-focused explanations, daily practice problems and weekly tests.",
    cta: { label: "View Plans", href: "/subscribe" },
    featured: false,
  },
  {
    eyebrow: "Online Batch Classes",
    icon: ChartIcon,
    title: "Easy on pockets, Heavy on learning.",
    text: "Batches for Classes 6–8, 9, 10 and 11–12 with structured syllabus coverage, revision and board exam preparation.",
    cta: { label: "Explore Batches", href: "/courses" },
    featured: false,
  },
];

export default function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      id="who-we-are"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-12 md:px-6 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-8 lg:gap-y-0">
          <div className="min-w-0">
            <Reveal>
              <h2
                id="who-we-are-heading"
                className="mt-4 text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl lg:text-[56px]"
              >
                Who We{" "}
                <span className="relative inline-block text-accent">
                  Are
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 12"
                    fill="none"
                    className="absolute -bottom-1.5 left-0 w-full"
                  >
                    <path
                      d="M3 9 C 40 3, 80 3, 117 7"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      pathLength={1}
                      className="draw-underline"
                    />
                  </svg>
                </span>
              </h2>
              <p className="mt-5 max-w-[36ch] text-xl leading-snug font-bold text-text-primary sm:text-2xl">
                A student-focused learning platform for smarter and more
                effective exam preparation.
              </p>
              <p className="mt-3 max-w-[54ch] text-base leading-[1.65] text-text-secondary">
                Hustle Learning brings together high-quality study resources,
                clear explanations, and structured practice to help you build
                strong concepts, solve better, and score higher in your school
                exams.
              </p>
            </Reveal>
          </div>

          {/* Founder visual: cutout photo over an amber blob, rays + name pill. */}
          <Reveal
            variant="scale"
            delay={150}
            className="relative mx-auto w-full max-w-[380px] lg:row-span-2 lg:max-w-[420px]"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute top-[10%] right-0 bottom-[2%] left-[10%]"
                style={{ transform: "rotate(-10deg)" }}
              >
                <div
                  className="animate-float-y h-full w-full"
                  style={{
                    borderRadius: "100px",
                    background: "rgb(255 182 39 / 0.16)",
                  }}
                />
              </div>
              <div className="relative z-10 mx-auto aspect-[4/5] w-full">
                <Image
                  src={ownerPhoto}
                  alt="Vipin Nawal, Founder and Educator of Hustle Learning"
                  fill
                  sizes="(max-width: 1024px) 70vw, 420px"
                  loading="lazy"
                  className="object-contain object-bottom"
                />
              </div>
              <div className="animate-float-card relative z-20 mx-auto mt-2 w-fit rounded-sm border border-border bg-surface py-2 pr-6 pl-4 shadow-md lg:absolute lg:top-[90%] lg:left-0 lg:mx-0 lg:mt-0">
                <p className="border-l-[3px] border-accent pl-2.5 text-base font-bold text-text-primary">
                  Vipin Nawal
                </p>
                <p className="mt-0.5 pl-2.5 text-sm whitespace-nowrap text-text-secondary">
                  Founder and Educator
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="flex flex-row items-start gap-2 sm:items-center sm:gap-0 sm:divide-x sm:divide-border lg:mt-8">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-3 sm:text-left ${i > 0 ? "sm:pl-8" : ""} ${i < STATS.length - 1 ? "sm:pr-8" : ""}`}>
                  <s.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-accent sm:h-8 sm:w-8" />
                  <div className="min-w-0">
                    <dd className="text-xl leading-none font-extrabold tracking-tight whitespace-nowrap text-text-primary sm:text-[28px]">
                      {s.value}
                    </dd>
                    <dt className="mt-1 text-[11px] leading-snug text-text-secondary sm:text-sm">
                      {s.label}
                    </dt>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Three pillars — Free Resources leads on the warm wash. */}
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.eyebrow} delay={i * 100} className="h-full">
              <article
                className={`lift group flex h-full flex-col rounded border p-6 sm:p-7 ${p.featured
                  ? "border-transparent bg-accent/[0.08]"
                  : "border-border bg-surface"
                  }`}
              >
                <p.icon
                  aria-hidden="true"
                  className="h-9 w-9 text-accent transition-transform duration-200 group-hover:scale-110"
                />
                <p className="mt-4 text-xs font-semibold tracking-[1.2px] text-text-muted uppercase">
                  {p.eyebrow}
                </p>
                <h3 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-text-secondary">
                  {p.text}
                </p>
                <Link
                  href={p.cta.href}
                  aria-label={`${p.cta.label} — ${p.eyebrow}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-text-primary transition-all hover:gap-2.5"
                >
                  {p.cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
