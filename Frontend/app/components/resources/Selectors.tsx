import Link from "next/link";
import type { ClassFile } from "@/types/content";
import { urls } from "@/lib/urls";
import { LinkGroup } from "./LinkLists";

/**
 * Class selection cards (single anchor each, no nested links):
 * "Class" label, 48px navy numeral, one-line description with reserved
 * height so baselines align, divider, plain-text subject list, and an
 * "Open Class N" text link. Board-year badge for Class 10.
 */
export function ClassSelector({ classes }: { classes: ClassFile[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {classes.map((cls) => {
        const num = cls.slug.replace("class-", "");
        return (
          <li
            key={cls.slug}
            className="min-w-0 last:col-span-2 sm:last:col-span-1"
          >
            <Link
              href={urls.classPage(cls.slug)}
              aria-label={`Open ${cls.label}: ${cls.tagline}`}
              className="group relative flex h-full flex-col rounded-md border border-rule bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(15,27,51,0.08)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent-500 opacity-0 transition-all duration-150 group-hover:scale-x-100 group-hover:opacity-100"
              />
              <span className="flex items-start justify-between gap-2">
                <span>
                  <span className="block text-xs font-medium tracking-[0.04em] text-navy-500 uppercase">
                    Class
                  </span>
                  <span
                    aria-hidden="true"
                    className="block text-5xl font-bold tracking-tight text-navy-900"
                  >
                    {cls.shortLabel}
                  </span>
                </span>
                {num === "10" && (
                  <span className="rounded-sm bg-badge-amber px-2 py-1 text-xs font-semibold text-accent-700">
                    Board year
                  </span>
                )}
              </span>
              <span className="mt-3 block min-h-[44px] text-sm leading-[1.55] text-navy-700">
                <span className="line-clamp-2">{cls.tagline}</span>
              </span>
              <span className="mt-3 border-t border-rule pt-3 text-[13px] leading-[1.55] text-navy-500">
                {cls.subjects.map((s) => s.name).join(", ")}
              </span>
              <span className="mt-auto pt-3 text-sm font-semibold text-accent-700 group-hover:underline group-hover:underline-offset-4">
                Open {cls.label}
              </span>
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
