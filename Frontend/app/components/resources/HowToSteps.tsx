const STEP_TITLES = ["Attempt first", "Review and improve", "Revise regularly"] as const;

/** Lightweight three-step guidance — rows, not cards, so the focus stays on resources. */
export default function HowToSteps({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: string[];
}) {
  const shown = steps.slice(0, 3);
  return (
    <section aria-labelledby="howto-heading" className="mt-12">
      <h2
        id="howto-heading"
        className="text-2xl text-text-primary"
      >
        {title}
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        {intro}
      </p>
      <ol className="mt-5 flex flex-col gap-4">
        {shown.map((step, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-navy text-[13px] font-extrabold text-brand-white"
            >
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[15px] font-bold text-text-primary">
                {STEP_TITLES[i] ?? `Step ${i + 1}`}
              </p>
              <p className="mt-0.5 text-sm leading-[1.6] text-text-secondary">
                {step}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
