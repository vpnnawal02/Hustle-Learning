import { BookOpenText, FileText, NotebookText } from "lucide-react";

const PHASES = [
  {
    icon: BookOpenText,
    title: "Learn",
    text: "Finish each chapter once with notes and NCERT exercises — understand before you memorise.",
  },
  {
    icon: NotebookText,
    title: "Revise",
    text: "Run chapter-wise important questions and formula sheets to lock in what you learned.",
  },
  {
    icon: FileText,
    title: "Practice",
    text: "Sit timed sample papers and previous year papers under exam conditions, then fix every lost mark.",
  },
] as const;

/** Visible 3-phase study timeline — promoted out of the FAQ accordion. */
export default function StudyPlan({ classLabel }: { classLabel: string }) {
  return (
    <section aria-labelledby="study-plan-heading">
      <h2
        id="study-plan-heading"
        className="text-2xl font-extrabold tracking-tight text-text-primary"
      >
        Your {classLabel} study plan
      </h2>
      <p className="mt-2 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
        Three phases, in order. Most students fail by jumping to papers
        before finishing the syllabus once.
      </p>
      <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PHASES.map((phase, i) => (
          <li
            key={phase.title}
            className="relative rounded-md border border-border bg-surface p-5"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-navy text-brand-white"
              >
                <phase.icon size={20} />
              </span>
              <span className="text-base font-bold text-text-primary">
                <span aria-hidden="true" className="mr-1.5 text-text-muted">
                  {i + 1}.
                </span>
                {phase.title}
              </span>
            </span>
            <p className="mt-3 text-sm leading-[1.6] text-text-secondary">
              {phase.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
