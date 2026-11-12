import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export interface DiscoveryOption {
  href: string;
  title: string;
  meta?: string;
  badge?: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

/**
 * Clean link-based selection rows — the default discovery look.
 * Title + supporting line + count badge left, single arrow right.
 * Rows, not cards; 44px+ targets with visible hover and focus.
 */
export default function DiscoveryOptions({
  options,
  label,
}: {
  options: DiscoveryOption[];
  label: string;
}) {
  return (
    <ul aria-label={label} className="mt-6 border-t border-border">
      {options.map((option) => (
        <li key={option.href}>
            <Link
              href={option.href}
              aria-label={option.ariaLabel ?? option.title}
              className="group flex min-h-[56px] items-center gap-4 border-b border-border py-3 transition-colors hover:bg-surface-muted/50"
            >
              {option.icon}
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="text-[15px] font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                    {option.title}
                  </span>
                {option.badge && (
                  <span className="rounded-sm bg-surface-muted px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] text-text-secondary uppercase">
                    {option.badge}
                  </span>
                )}
              </span>
              {option.meta && (
                <span className="mt-0.5 block truncate text-sm text-text-secondary">
                  {option.meta}
                </span>
              )}
            </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-primary"
              />
          </Link>
        </li>
      ))}
    </ul>
  );
}
