import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/content";
import { urls } from "@/lib/urls";

export interface ListingChapter {
  number: number;
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  href: string;
}

export interface ListingSibling {
  title: string;
  href: string;
  meta: string;
}

/**
 * The one final-listing renderer behind all three workflows. Given the
 * same (class, subject, material) it always shows the same chapters —
 * only breadcrumbs and the back link reflect the entry path.
 */
export default function ResourceListing({
  crumbs,
  context,
  title,
  description,
  chapters,
  actionLabel,
  siblings,
  siblingsHeading,
  backHref,
  backLabel,
}: {
  crumbs: BreadcrumbItem[];
  context: string;
  title: string;
  description: string;
  chapters: ListingChapter[];
  actionLabel: string;
  siblings: ListingSibling[];
  siblingsHeading: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <p className="mt-6 text-base leading-[1.6] text-text-secondary">
        {context}
      </p>
      <h1 className="mt-2 max-w-[26ch] text-3xl leading-[1.1] text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {description}
      </p>

      <h2 className="mt-10 text-2xl text-text-primary">
        Chapters
      </h2>
      <ol className="mt-4 border-t border-border">
        {chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={chapter.href}
              aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
              className="group flex min-h-[64px] items-center gap-4 border-b border-border py-3 transition-colors hover:bg-surface-muted/50"
            >
              <span
                aria-hidden="true"
                className="w-14 shrink-0 text-sm font-bold text-text-muted"
              >
                Ch. {chapter.number}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                  {chapter.title}
                </span>
                {chapter.description && (
                  <span className="mt-0.5 line-clamp-2 block text-sm text-text-secondary">
                    {chapter.description}
                  </span>
                )}
                {chapter.updatedAt && (
                  <span className="mt-0.5 block text-[13px] text-text-muted">
                    Updated {chapter.updatedAt}
                  </span>
                )}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-text-primary">
                {actionLabel}
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-primary"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {siblings.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl text-text-primary">
            {siblingsHeading}
          </h2>
          <ul className="mt-4 border-t border-border">
            {siblings.map((sibling) => (
              <li key={sibling.href}>
                <Link
                  href={sibling.href}
                  className="group flex min-h-[56px] items-center gap-3 border-b border-border py-3 transition-colors hover:bg-surface-muted/50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                      {sibling.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-text-muted">
                      {sibling.meta}
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
        </>
      )}

      <p className="mt-10 text-[15px] leading-[1.6] text-text-secondary">
        <Link
          href={backHref}
          className="font-semibold text-text-primary underline underline-offset-4"
        >
          ← {backLabel}
        </Link>{" "}
        ·{" "}
        <Link
          href={urls.search()}
          className="font-semibold text-text-primary underline underline-offset-4"
        >
          Search everything
        </Link>
      </p>
    </>
  );
}
