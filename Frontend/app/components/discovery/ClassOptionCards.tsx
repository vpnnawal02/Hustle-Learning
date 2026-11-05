import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ClassOption {
  href: string;
  label: string;
  shortLabel: string;
  tagline: string;
  badge: string;
  ariaLabel: string;
}

/**
 * Compact class cards — the one place cards genuinely help (five stable
 * choices). Numeral + label + tagline + availability badge + arrow.
 * Rounded-sm only; borders do the separating, not shadows.
 */
export default function ClassOptionCards({
  options,
  label,
}: {
  options: ClassOption[];
  label: string;
}) {
  return (
    <ul
      aria-label={label}
      className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {options.map((option) => (
        <li key={option.href} className="min-w-0">
          <Link
            href={option.href}
            aria-label={option.ariaLabel}
            className="group flex h-full min-h-[44px] flex-col rounded-sm border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-[3px] hover:border-border-strong hover:shadow-[0_10px_24px_-16px_rgba(17,24,39,0.28)]"
          >
            <span className="flex items-start justify-between gap-2">
              <span
                aria-hidden="true"
                className="block text-4xl font-extrabold tracking-tight text-text-primary"
              >
                {option.shortLabel}
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="mt-1 shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-primary"
              />
            </span>
            <span className="mt-1 block text-sm font-bold text-text-primary">
              {option.label}
            </span>
            <span className="mt-1 line-clamp-2 block min-h-[40px] text-[13px] leading-[1.5] text-text-secondary">
              {option.tagline}
            </span>
            <span className="mt-3 self-start rounded-sm bg-surface-muted px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] text-text-secondary uppercase">
              {option.badge}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
