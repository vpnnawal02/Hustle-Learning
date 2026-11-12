import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export interface ResourceCardItem {
  title: string;
  blurb: string;
  href: string;
  /** Leading icon tile content. */
  icon: ReactNode;
  /** Icon-tile tint (themed tokens, e.g. from resourceTint). */
  tintText: string;
  colorVar: string;
}

/**
 * Card grid for resource/exam listings: tinted icon tile, bold title,
 * two-line blurb, and a circular arrow. One column on mobile, two on sm+.
 */
export default function ResourceCards({ items }: { items: ResourceCardItem[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="min-w-0">
          <Link
            href={item.href}
            aria-label={`${item.title} — ${item.blurb}`}
            className="group flex h-full items-center gap-3.5 rounded-md border border-border bg-surface p-4 transition-colors duration-[var(--motion-quick)] ease-out hover:border-text-muted hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              style={{ "--res-color": item.colorVar } as CSSProperties}
              className={`res-tint flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${item.tintText}`}
            >
              {item.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-semibold tracking-tight text-text-primary">
                {item.title}
              </span>
              <span className="mt-0.5 line-clamp-2 block text-[13px] leading-[1.55] text-text-secondary">
                {item.blurb}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-secondary transition-colors duration-[var(--motion-quick)] ease-out group-hover:text-text-primary motion-reduce:transition-none"
            >
              <ArrowRight size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
