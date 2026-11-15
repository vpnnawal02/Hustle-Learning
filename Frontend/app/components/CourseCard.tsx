import Link from "next/link";
import type { Course } from "./courses";

const NUMERALS: Record<string, string> = {
  "class-8": "8",
  "class-9": "9",
  "class-10": "10",
};

const TINTS: Record<string, { panel: string; numeral: string }> = {
  "class-8": { panel: "bg-[#FBF3E1]", numeral: "text-[#B45309]" },
  "class-9": { panel: "bg-[#EAE6FB]", numeral: "text-[#6C5CE7]" },
  "class-10": { panel: "bg-[#E2F2E9]", numeral: "text-[#178A50]" },
};

const FALLBACK_TINT = { panel: "bg-surface-muted", numeral: "text-text-primary" };

export default function CourseCard({ course }: { course: Course }) {
  const numeral =
    NUMERALS[course.id] ??
    course.title.replace("Classes ", "").replace("Class ", "");
  const tint = TINTS[course.id] ?? FALLBACK_TINT;
  return (
    <article className="lift flex aspect-square h-full min-w-0 flex-col overflow-hidden rounded-md border border-border bg-surface">
      <div
        aria-hidden="true"
        className={`relative flex h-24 items-end overflow-hidden p-4 sm:h-28 ${tint.panel}`}
      >
        <span className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/50 blur-2xl" />
        <p
          className={`text-5xl leading-none font-extrabold tracking-tight sm:text-6xl ${tint.numeral}`}
        >
          {numeral}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-text-primary">
          {course.title}
        </h3>
        <p className="mt-1 min-h-[60px] text-[13px] leading-[1.55] text-text-secondary">
          {course.description}
        </p>
        <div className="mt-auto pt-3">
          <Link
            href="/#hero-enquiry"
            aria-label={`${course.ctaLabel} — ${course.title}`}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            {course.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
