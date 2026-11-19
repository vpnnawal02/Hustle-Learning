import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ClassHubInfo } from "./class-courses";

const PASTELS: Record<string, string> = {
  "class-6": "bg-[#D5E4F6]",
  "class-7": "bg-[#FBE0C3]",
  "class-8": "bg-[#D3E9DA]",
  "class-9": "bg-[#F1D4E6]",
  "class-10": "bg-[#F8E9C2]",
};

/**
 * Class card for /courses and home: pastel art header (heading pill over
 * soft shapes + a giant class numeral) with the description, subject
 * pills and CTA on white below. All information is real text — no images.
 */
export default function ClassHubCard({ info }: { info: ClassHubInfo }) {
  const live = info.status === "live";
  const numeral = info.slug.replace("class-", "");

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)]">
      <div className={`relative overflow-hidden ${PASTELS[info.slug] ?? "bg-surface-muted"} p-5 sm:p-6`}>
        <span
          aria-hidden="true"
          className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-white/50 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/40 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="absolute -right-1 -bottom-5 text-[88px] leading-none font-extrabold tracking-tight text-white/60 select-none"
        >
          {numeral}
        </span>
        <p className="relative w-fit rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-extrabold tracking-wide text-brand-navy uppercase">
          {info.heading}
        </p>
        <ul aria-label={`${info.label} subjects`} className="relative mt-3 flex flex-wrap gap-1.5">
          {info.subjects.map((subject) => (
            <li
              key={subject}
              className="rounded-full bg-white/70 px-2.5 py-1 text-[12px] font-semibold text-brand-navy"
            >
              {subject}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-[1.65] text-text-secondary">
          {info.subtitle}
        </p>
        <div className="mt-auto pt-4">
          {live ? (
            <Link
              href={`/courses/${info.slug}`}
              aria-label={`Explore ${info.label} courses`}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Explore
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-md border border-border bg-surface-muted px-5 text-sm font-semibold text-text-muted"
            >
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
