import Link from "next/link";
import { urls } from "@/lib/urls";

export interface ClassPill {
  slug: string;
  label: string;
  shortLabel: string;
}

/** One-tap class switcher — replaces the old "Other Classes" text list. */
export default function ClassPills({
  classes,
  currentSlug,
}: {
  classes: ClassPill[];
  currentSlug: string;
}) {
  return (
    <nav aria-label="Switch class" className="mt-6">
      <ul className="flex flex-wrap gap-2">
        {classes.map((cls) => {
          const current = cls.slug === currentSlug;
          return (
            <li key={cls.slug}>
              {current ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 text-sm font-bold text-on-accent"
                >
                  {cls.label}
                </span>
              ) : (
                <Link
                  href={urls.classPage(cls.slug)}
                  aria-label={`Open ${cls.label} study material`}
                  className="inline-flex min-h-[44px] items-center rounded-md border border-border bg-surface px-5 text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary active:bg-surface-muted"
                >
                  Class {cls.shortLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
