import Link from "next/link";

/**
 * Premium text-link navigation primitives.
 * Typography + spacing establish hierarchy — no bordered boxes per link.
 * Every row is a comfortably tappable (44px+) target with visible focus.
 */

export interface LinkRow {
  title: string;
  href: string;
  meta?: string;
  badge?: string;
}

const rowCls =
  "group flex min-h-[52px] items-center gap-3 border-b border-border py-3 transition-colors last:border-b-0 hover:bg-surface-muted/50 focus-visible:bg-surface-muted/50";

/** Separator-style link list: title left, meta + arrow right. */
export function LinkList({ items }: { items: LinkRow[] }) {
  return (
    <ul className="border-t border-border">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={rowCls} aria-label={item.title}>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                {item.title}
              </span>
              {item.meta && (
                <span className="mt-0.5 block text-[13px] text-text-muted">
                  {item.meta}
                </span>
              )}
            </span>
            {item.badge && (
              <span className="shrink-0 rounded-sm bg-surface-muted px-3 py-1 text-[13px] font-semibold text-text-muted">
                {item.badge}
              </span>
            )}
            <span className="shrink-0 text-sm font-semibold text-navy-700 group-hover:underline group-hover:underline-offset-4">
              Open
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Grouped links: section label with its own link list (subjects, exams). */
export function LinkGroup({
  label,
  href,
  hint,
  items,
}: {
  label: string;
  href: string;
  hint?: string;
  items: LinkRow[];
}) {
  return (
    <section aria-label={label} className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-extrabold tracking-tight text-text-primary">
          <Link
            href={href}
            className="hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
          >
            {label}
          </Link>
        </h3>
      {hint && (
        <span className="text-[13px] font-medium text-text-muted">{hint}</span>
      )}
      </div>
      <div className="mt-1">
        <LinkList items={items} />
      </div>
    </section>
  );
}
