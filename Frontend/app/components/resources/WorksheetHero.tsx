import { worksheetDisplayNumber } from "@/lib/content/worksheets";

/**
 * Worksheet header: number pill, chapter title, description. Nothing else.
 */
export default function WorksheetHero({
  worksheetLabel,
  chapterTitle,
  description,
}: {
  worksheetLabel: string;
  chapterTitle: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-5 py-6 sm:px-8 sm:py-8">
      <span className="inline-flex h-8 items-center rounded-md bg-accent px-3 text-sm font-bold text-on-accent">
        Worksheet {worksheetDisplayNumber(worksheetLabel)}
      </span>
      <h1 className="mt-3 max-w-[22ch] text-3xl text-balance text-text-primary sm:text-5xl">
        {chapterTitle}
      </h1>
      <p className="mt-2 max-w-[60ch] text-base leading-[1.55] text-text-secondary sm:text-lg">
        {description}
      </p>
    </div>
  );
}
