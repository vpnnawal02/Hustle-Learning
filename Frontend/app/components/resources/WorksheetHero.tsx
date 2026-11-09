import { Clock3, FileText, Trophy } from "lucide-react";
import { worksheetDisplayNumber } from "@/lib/content/worksheets";

/**
 * Exam-paper hero for a worksheet page: number pill, chapter title,
 * description, and a stats strip (questions / marks / suggested time).
 * Gradient + chips use theme tokens so it works in light and dark modes.
 */
export default function WorksheetHero({
  worksheetLabel,
  chapterTitle,
  description,
  questionCount,
  totalMarks,
  minutes,
  kicker,
}: {
  worksheetLabel: string;
  chapterTitle: string;
  description: string;
  questionCount: number;
  totalMarks: number;
  minutes: number;
  kicker: string;
}) {
  const stats = [
    {
      icon: FileText,
      value: String(questionCount),
      label: `Question${questionCount === 1 ? "" : "s"}`,
    },
    {
      icon: Trophy,
      value: String(totalMarks),
      label: `Mark${totalMarks === 1 ? "" : "s"}`,
    },
    {
      icon: Clock3,
      value: String(minutes),
      label: "Minutes",
    },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      {/* Soft accent wash + decorative blob (theme-aware via tokens). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <span className="inline-flex h-8 items-center rounded-md bg-accent px-3 text-sm font-bold text-on-accent">
          Worksheet {worksheetDisplayNumber(worksheetLabel)}
        </span>
        <h1 className="mt-3 max-w-[22ch] text-3xl font-extrabold tracking-tight text-balance text-text-primary sm:text-5xl">
          {chapterTitle}
        </h1>
        <p className="mt-2 max-w-[60ch] text-base leading-[1.55] text-text-secondary sm:text-lg">
          {description}
        </p>
        <p className="mt-3 text-xs font-semibold tracking-wider text-text-muted uppercase">
          {kicker}
        </p>
        <dl className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent">
                <s.icon size={18} strokeWidth={2.25} aria-hidden="true" />
              </span>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[15px] text-text-secondary">
                <strong className="mr-1 text-base font-bold text-text-primary">
                  {s.value}
                </strong>
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
