import Link from "next/link";
import { urls } from "@/lib/urls";

export interface ClassPill {
  slug: string;
  label: string;
  shortLabel: string;
  /** Optional supporting line, e.g. a published-chapter count. */
  meta?: string;
  /** Link target — defaults to the class page. */
  href?: string;
}

/**
 * Class selector as a segmented control. The active class is marked with
 * aria-current; every tab is a real route (44px targets, keyboard
 * navigable, scrollable on small screens).
 */
export default function ClassPills({
  classes,
  currentSlug,
}: {
  classes: ClassPill[];
  currentSlug: string;
}) {
  return (
    <nav aria-label="Switch class">
      <ul className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-1 gap-2 lg:border border-border rounded-sm bg-surface p-1">
        {classes.map((cls) => {
          const current = cls.slug === currentSlug;
          return (
            <li key={cls.slug}>
            {current ? (
              <span
                aria-current="page"
                className="inline-flex min-h-[44px] w-full items-center gap-2 rounded-sm bg-accent px-4 text-sm font-semibold whitespace-nowrap text-on-accent"
              >
                <span>Class {cls.shortLabel}</span>
                {cls.meta && (
                  <span className="text-[13px] font-medium text-on-accent/75">
                    {cls.meta}
                  </span>
                )}
              </span>
            ) : (
              <Link
                href={cls.href ?? urls.classPage(cls.slug)}
                aria-label={`Open ${cls.label} study material${cls.meta ? ` — ${cls.meta}` : ""}`}
                className="inline-flex min-h-[44px] w-full items-center gap-2 rounded-sm border border-border bg-surface px-4 text-sm font-medium whitespace-nowrap text-text-secondary transition-colors duration-[var(--motion-quick)] ease-out hover:border-text-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
              >
                <span className="font-semibold text-text-primary">
                  Class {cls.shortLabel}
                </span>
                {cls.meta && (
                  <span className="text-[13px] text-text-muted">
                    {cls.meta}
                  </span>
                )}
              </Link>
            )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
