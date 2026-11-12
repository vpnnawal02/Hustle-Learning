import Link from "next/link";
import type { ClassFile } from "@/types/content";
import { urls } from "@/lib/urls";
import { LinkGroup } from "./LinkLists";

/**
 * Class selection cards: "CLASS" label, 56px navy numeral, school stage,
 * book icon, and an arrow over a soft amber quarter-circle. Board-year
 * pill for Class 10. Hover: lift, accent border, arrow glide, icon tilt.
 */
function stageFor(slug: string): string {
  const n = Number(slug.replace("class-", ""));
  return n <= 8 ? "Middle School" : "High School";
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ClassSelector({ classes }: { classes: ClassFile[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {classes.map((cls) => {
        const num = cls.slug.replace("class-", "");
        const stage = stageFor(cls.slug);
        return (
          <li key={cls.slug} className="min-w-0">
            {/* Compact row on mobile: all five classes visible with minimal scroll. */}
            <Link
              href={urls.classPage(cls.slug)}
              aria-label={`Open ${cls.label} study material — ${stage}`}
              className="flex items-center gap-4 rounded-md border border-border bg-surface px-4 py-3 transition-colors active:bg-surface-muted sm:hidden"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 text-3xl leading-none font-bold tracking-tight text-text-primary"
              >
                {cls.shortLabel}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-text-primary">
                  {cls.label}
                </span>
                <span className="block truncate text-sm text-text-secondary">
                  {stage}
                </span>
              </span>
              {num === "10" && (
                <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-text-primary">
                  Board Year
                </span>
              )}
              <ArrowIcon className="h-5 w-5 shrink-0 text-text-muted" />
            </Link>
            {/* Full card on sm and up. */}
            <Link
              href={urls.classPage(cls.slug)}
              aria-label={`Open ${cls.label} study material — ${stage}`}
              className="group relative hidden h-full min-h-[200px] flex-col overflow-hidden rounded-md border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:flex motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold tracking-[1.2px] text-text-muted uppercase">
                  Class
                </span>
                <span className="flex flex-col items-end gap-2">
                  {num === "10" && (
                    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-text-primary">
                      Board Year
                    </span>
                  )}
                  <BookIcon className="h-6 w-6 text-accent transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none" />
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mt-1 block text-[44px] leading-none font-bold tracking-tight text-text-primary"
              >
                {cls.shortLabel}
              </span>
              <span className="mt-2 block text-sm text-text-secondary">
                {stage}
              </span>
              <span className="mt-auto pt-6">
                <ArrowIcon className="h-5 w-5 text-text-primary transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-accent motion-reduce:transition-none" />
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-8 -bottom-8 h-32 w-32 origin-bottom-right rounded-tl-full bg-accent/10 transition-transform duration-300 group-hover:scale-125 motion-reduce:transition-none"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Subject navigation as grouped text links (no cards): each subject
 * links to its page, followed by direct links to every resource type.
 */
export function SubjectLinkGroups({
  classSlug,
  subjects,
  resources,
}: {
  classSlug: string;
  subjects: { slug: string; name: string; tagline: string }[];
  resources: { slug: string; shortTitle: string }[];
}) {
  return (
    <div>
      {subjects.map((subject) => (
        <LinkGroup
          key={subject.slug}
          label={subject.name}
          href={urls.subjectPage(classSlug, subject.slug)}
          hint={subject.tagline}
          items={resources.map((res) => ({
            title: res.shortTitle,
            href: urls.resourcePage(classSlug, subject.slug, res.slug),
            meta: `${subject.name} · ${res.shortTitle}`,
          }))}
        />
      ))}
    </div>
  );
}
