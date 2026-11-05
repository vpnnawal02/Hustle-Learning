import Link from "next/link";

/** Previous / next chapter navigation for chapter pages. */
export function PrevNextNav({
  prev,
  next,
}: {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-10 grid gap-3 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent"
        >
          <span className="block text-[13px] font-semibold text-text-muted">
            Previous
          </span>
          <span className="mt-1 block font-bold text-text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="rounded-md border border-border bg-surface p-4 text-right transition-colors hover:border-accent"
        >
          <span className="block text-[13px] font-semibold text-text-muted">
            Next
          </span>
          <span className="mt-1 block font-bold text-text-primary">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/** Friendly state for unpublished resources — rendered with noindex. */
export function ComingSoon({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-muted/60 p-8 text-center sm:p-10">
      <p className="inline-flex items-center rounded-md bg-accent px-4 py-1.5 text-[13px] font-bold text-on-accent">
        Coming soon
      </p>
      <h2 className="mx-auto mt-4 max-w-[40ch] text-2xl font-extrabold tracking-tight text-text-primary">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-text-secondary">
        {description}
      </p>
      <Link
        href={backHref}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        {backLabel}
      </Link>
    </div>
  );
}
