import Link from "next/link";

/** Single soft counselling card — the page's one primary action. */
export default function CounsellingCard({ classLabel }: { classLabel: string }) {
  return (
    <section
      aria-labelledby="counselling-heading"
      className="rounded-sm bg-surface-muted p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2
            id="counselling-heading"
            className="text-[22px] leading-[1.25] text-text-primary sm:text-2xl"
          >
            Not sure where to begin?
          </h2>
          <p className="mt-1.5 max-w-[52ch] text-base leading-[1.6] text-text-secondary">
            Tell us your class and subjects — our counsellor will call you
            back with the right {classLabel} plan.
          </p>
        </div>
        <Link
          href="/#hero-enquiry"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold whitespace-nowrap text-on-accent transition-colors duration-[var(--motion-quick)] ease-out hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent-pressed motion-reduce:transition-none"
        >
          Book free counselling
        </Link>
      </div>
    </section>
  );
}
