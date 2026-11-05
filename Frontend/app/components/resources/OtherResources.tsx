import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ResourceIcon } from "./icons";
import { urls } from "@/lib/urls";

export interface OtherResource {
  slug: string;
  title: string;
  blurb: string;
  icon: string;
  tintText: string;
  tintVar: string;
}

/**
 * Compact two-column resource links — same design language as the
 * class-page tiles. The entire row is one link.
 */
export default function OtherResources({ items }: { items: OtherResource[] }) {
  return (
    <section aria-labelledby="other-resources-heading" className="mt-12">
      <h2
        id="other-resources-heading"
        className="text-2xl font-extrabold tracking-tight text-text-primary"
      >
        Explore other resources
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.slug} className="min-w-0">
            <Link
              href={urls.resourceHub(item.slug)}
              aria-label={item.title}
              className="group flex h-full items-center gap-4 rounded-md border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-[3px] hover:border-border-strong hover:shadow-[0_10px_24px_-16px_rgba(17,24,39,0.28)]"
            >
              <span
                aria-hidden="true"
                className={`res-tint flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${item.tintText}`}
                style={{ "--res-color": item.tintVar } as CSSProperties}
              >
                <ResourceIcon name={item.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-text-primary">
                  {item.title}
                </span>
                <span className="mt-0.5 line-clamp-1 block text-[13px] text-text-secondary">
                  {item.blurb}
                </span>
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
    </section>
  );
}
