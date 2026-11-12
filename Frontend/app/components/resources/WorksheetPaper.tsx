import type { ContentBlock } from "@/types/content";
import {
  groupWorksheetQuestions,
  type BandQuestion,
} from "@/lib/content/worksheets";
import RichText from "./RichText";

/**
 * The exam paper itself: questions in source order with hairline rows.
 * Questions that carry an answer expand on tap; answer-less questions
 * render as static text. Explicit `### Section …` headings render
 * banners; nothing invented is added.
 */
function QuestionRow({
  q,
  num,
}: {
  q: BandQuestion;
  num: number;
}) {
  const stem = (
    <>
      <span
        aria-hidden="true"
        className="w-7 shrink-0 pt-px text-base font-bold text-text-primary"
      >
        {num}.
      </span>
      <span className="flex-1 text-[15px] leading-[1.65] font-medium text-text-primary">
        <RichText text={q.question} />
        {q.options && q.options.length > 0 && (
          <ul className="mt-2 grid gap-x-8 gap-y-1 font-normal text-text-secondary sm:grid-cols-2">
            {q.options.map((opt, oi) => (
              <li key={oi}>
                <RichText text={opt} />
              </li>
            ))}
          </ul>
        )}
      </span>
    </>
  );
  if (q.answer.trim().length === 0) {
    return (
      <div className="flex items-start gap-3 border-b border-border py-4 last:border-0">
        {stem}
      </div>
    );
  }
  return (
    <details key={num} className="group border-b border-border last:border-0">
      <summary className="flex cursor-pointer list-none items-start gap-3 py-4 [&::-webkit-details-marker]:hidden">
        {stem}
        <span
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-lg leading-none font-light text-text-muted transition-transform duration-300 ease-in-out group-open:rotate-45 group-open:text-accent motion-reduce:transition-none"
        >
          +
        </span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="overflow-hidden opacity-0 transition-opacity delay-75 duration-300 group-open:opacity-100 motion-reduce:transition-none">
          <div className="mt-1 mb-4 ml-10 border-l-2 border-accent pl-4">
            <p className="text-[15px] leading-[1.65] text-text-secondary">
              <strong className="font-semibold text-text-primary">
                Answer:{" "}
              </strong>
              <RichText text={q.answer} />
            </p>
          </div>
        </div>
      </div>
    </details>
  );
}

export default function WorksheetPaper({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  const groups = groupWorksheetQuestions(blocks);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      {groups.map((g, gi) => {
        // Continuous numbering across sections: questions before this group.
        const start = groups
          .slice(0, gi)
          .reduce((s, x) => s + x.items.length, 0);
        return (
          <section
            key={`${g.letter}-${gi}`}
            aria-label={g.explicit ? `Section ${g.letter}` : "Questions"}
            className="px-5 py-6 sm:px-8"
          >
            {g.explicit && (
              <h2 className="rounded-md border border-accent/40 bg-accent/15 px-5 py-3 font-sans text-base font-bold text-text-primary sm:text-lg">
                Section {g.letter} – {g.title}{" "}
                <span className="font-semibold whitespace-nowrap text-text-secondary">
                  {g.suffix}
                </span>
              </h2>
            )}
            <div className="mt-2">
              {g.items.map((q, qi) => (
                <QuestionRow key={start + qi + 1} q={q} num={start + qi + 1} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
