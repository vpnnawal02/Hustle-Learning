import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpenText,
  Calculator,
  Dna,
  FlaskConical,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export interface SubjectCardData {
  slug: string;
  name: string;
  /** Link target for live subjects. */
  href: string;
  chapterCount: number;
  /** Published-resource total; omit to show chapters only. */
  totalPublished?: number;
  /** Only published subjects have live pages — drafts 404, so no links. */
  live: boolean;
}

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  science: Atom,
  mathematics: Calculator,
  english: BookOpenText,
  "social-science": Globe2,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
};

function subjectIcon(slug: string): LucideIcon {
  return SUBJECT_ICONS[slug] ?? BookOpenText;
}

/**
 * Subjects are the hero: one large card per subject with chapter and
 * resource counts merged in. Live subjects link (single arrow); subjects
 * still in preparation render muted with no dead links. Monochrome Lucide
 * icons, no tinted tiles or colored borders.
 */
export default function SubjectCards({
  subjects,
}: {
  subjects: SubjectCardData[];
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {subjects.map((subject) => {
        const Icon = subjectIcon(subject.slug);
        const chapters = `${subject.chapterCount} chapter${subject.chapterCount === 1 ? "" : "s"}`;
        const meta =
          !subject.live
            ? "Coming soon — chapters in preparation"
            : subject.totalPublished == null
              ? chapters
              : `${chapters} · ${subject.totalPublished} resource${subject.totalPublished === 1 ? "" : "s"} ready`;
        return (
          <li key={subject.slug} className="min-w-0">
            {subject.live ? (
              <Link
                href={subject.href}
                aria-label={`Open ${subject.name} study material — ${meta}`}
                className="group flex h-full items-center gap-3.5 rounded-sm border border-border bg-surface p-4 transition-colors duration-[var(--motion-quick)] ease-out hover:border-text-muted hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none sm:p-5"
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-text-secondary"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-semibold tracking-tight text-text-primary">
                    {subject.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-text-secondary">
                    {meta}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-text-muted transition-transform duration-[var(--motion-quick)] ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            ) : (
              <div
                aria-label={`${subject.name} — ${meta}`}
                className="flex h-full items-center gap-3.5 rounded-sm border border-border bg-surface p-4 sm:p-5"
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-text-muted"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-semibold tracking-tight text-text-primary">
                    {subject.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-text-secondary">
                    {meta}
                  </span>
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
