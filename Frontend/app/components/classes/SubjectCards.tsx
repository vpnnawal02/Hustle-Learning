import Link from "next/link";
import {
  Atom,
  Bell,
  BookOpenText,
  Calculator,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { ResourceIcon } from "@/app/components/resources/icons";
import { urls } from "@/lib/urls";

export interface SubjectCardResource {
  slug: string;
  shortTitle: string;
  icon: string;
  /** Published chapter items for this subject. */
  count: number;
}

export interface SubjectCardData {
  slug: string;
  name: string;
  tagline: string;
  chapterCount: number;
  totalPublished: number;
  /** Only published subjects have live pages — drafts 404, so no links. */
  live: boolean;
  resources: SubjectCardResource[];
}

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  science: Atom,
  mathematics: Calculator,
  english: BookOpenText,
  "social-science": Globe2,
};

/** Distinct icon colour per subject (tint tokens already themed for both modes). */
const SUBJECT_TINT: Record<string, string> = {
  science: "text-tint-science",
  mathematics: "text-tint-maths",
  english: "text-tint-english",
  "social-science": "text-tint-sst",
};

/** Distinct top-edge accent per subject. */
const SUBJECT_BAR: Record<string, string> = {
  science: "bg-tint-science",
  mathematics: "bg-tint-maths",
  english: "bg-tint-english",
  "social-science": "bg-tint-sst",
};

/** Specific action verb per resource type — never a bare "Open". */
const RESOURCE_ACTION: Record<string, string> = {
  "ncert-solutions": "View Solutions",
  notes: "Read Notes",
  "important-questions": "Practice Questions",
  "sample-papers": "Practice Papers",
  pyqs: "Solve PYQs",
  worksheets: "Try Worksheets",
  formulas: "Revise Formulas",
};

function subjectIcon(slug: string): LucideIcon {
  return SUBJECT_ICONS[slug] ?? BookOpenText;
}

/**
 * One card per subject: icon, name, and the resource types as compact
 * chips — nothing else. Every chip links to its real page (which states
 * honestly when content is still in preparation). Subjects with no live
 * pages render a "Coming soon" state with no dead links.
 */
export default function SubjectCards({
  classSlug,
  subjects,
}: {
  classSlug: string;
  subjects: SubjectCardData[];
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {subjects.map((subject) => {
        const Icon = subjectIcon(subject.slug);
        const tint = SUBJECT_TINT[subject.slug] ?? "text-text-primary";
        const bar = SUBJECT_BAR[subject.slug] ?? "bg-accent";
        return (
          <li key={subject.slug} className="min-w-0">
            <article
              aria-labelledby={`subject-${subject.slug}`}
              className="relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface p-6 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(20,33,61,0.35)]"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 ${bar}`}
              />
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-muted ${tint}`}
                >
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h3
                  id={`subject-${subject.slug}`}
                  className="min-w-0 flex-1 text-lg font-bold tracking-tight text-text-primary"
                >
                  {subject.live ? (
                    <Link
                      href={urls.subjectPage(classSlug, subject.slug)}
                      className="transition-colors hover:text-accent-700 hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
                    >
                      {subject.name}
                    </Link>
                  ) : (
                    subject.name
                  )}
                </h3>
              </div>

              {subject.live ? (
                <ul
                  aria-label={`${subject.name} resource types`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {subject.resources.map((res) => (
                    <li key={res.slug}>
                      <Link
                        href={urls.resourcePage(
                          classSlug,
                          subject.slug,
                          res.slug,
                        )}
                        aria-label={`${RESOURCE_ACTION[res.slug] ?? res.shortTitle} — ${subject.name}${res.count > 0 ? `, ${res.count} published` : ", coming soon"}`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary active:bg-surface-muted"
                      >
                        <ResourceIcon name={res.icon} size={16} />
                        {RESOURCE_ACTION[res.slug] ?? res.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-md bg-surface-muted p-4">
                  <p className="text-sm leading-[1.55] text-text-secondary">
                    Our teachers are preparing {subject.name} chapters now.
                    Get notified the moment the first chapter goes live.
                  </p>
                  <Link
                    href="/subscribe"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    <Bell size={16} aria-hidden="true" />
                    Notify me
                  </Link>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
