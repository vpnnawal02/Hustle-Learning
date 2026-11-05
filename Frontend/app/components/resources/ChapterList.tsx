import Link from "next/link";
import type { ChapterMeta, ChapterResourceItem } from "@/types/content";

/**
 * Chapter navigation as structured text-link rows (no cards):
 * chapter number + title, availability indicator, arrow affordance.
 * Whole row is clickable when content exists; drafts show a status
 * badge and never a dead link.
 */
export function ChapterList({
  chapters,
  hrefFor,
  publishedSlugs,
  updatedAtFor,
}: {
  chapters: ChapterMeta[];
  hrefFor: (chapterSlug: string) => string;
  publishedSlugs?: Set<string>;
  updatedAtFor?: (chapterSlug: string) => string | undefined;
}) {
  return (
    <ol className="border-t border-border">
      {chapters.map((chapter) => {
        const published =
          publishedSlugs?.has(chapter.slug) ?? chapter.status === "published";
        const updatedAt = updatedAtFor?.(chapter.slug);
        const rowInner = (
          <>
            <span
              aria-hidden="true"
              className="w-16 shrink-0 text-sm font-bold text-text-muted"
            >
              Ch. {chapter.number}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block font-semibold ${
                  published
                    ? "text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4"
                    : "text-text-primary"
                }`}
              >
                {chapter.title}
              </span>
              {updatedAt && (
                <span className="mt-0.5 block text-[13px] text-text-muted">
                  Updated {updatedAt}
                </span>
              )}
            </span>
            {published ? (
              <span className="shrink-0 text-sm font-semibold text-navy-700 group-hover:underline group-hover:underline-offset-4">
                Open
              </span>
            ) : (
              <span className="shrink-0 rounded-sm bg-surface-muted px-3 py-1 text-[13px] font-semibold text-text-muted">
                Coming soon
              </span>
            )}
          </>
        );
        const rowCls =
          "group flex min-h-[56px] items-center gap-3 border-b border-border py-3 transition-colors hover:bg-surface-muted/50";
        return (
          <li key={chapter.slug} id={chapter.slug} className="scroll-mt-24">
            {published ? (
              <Link
                href={hrefFor(chapter.slug)}
                className={rowCls}
                aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
              >
                {rowInner}
              </Link>
            ) : (
              <div className={rowCls} aria-label={`${chapter.title} (coming soon)`}>
                {rowInner}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Props helper: map resource items onto the chapter list. */
export function itemsToPublishedSets(items: ChapterResourceItem[]): {
  slugs: Set<string>;
  updatedAt: Map<string, string>;
} {
  const slugs = new Set<string>();
  const updatedAt = new Map<string, string>();
  for (const item of items) {
    if (item.status !== "published") continue;
    slugs.add(item.chapterSlug);
    updatedAt.set(item.chapterSlug, item.updatedAt);
  }
  return { slugs, updatedAt };
}
