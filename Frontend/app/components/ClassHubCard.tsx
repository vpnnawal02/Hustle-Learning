import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ClassHubInfo } from "./class-courses";

/**
 * Main class card for /courses — minimal editorial style:
 * pastel tint per class, LIVE badge, big bold heading,
 * full-width equal subject pills, one-line highlights, amber CTA.
 * Course artwork images are used only on subject cards, never here.
 */
export default function ClassHubCard({ info }: { info: ClassHubInfo }) {
  const live = info.status === "live";

  return (
    <article
      className={`flex h-full min-w-0 flex-col rounded-lg border p-6 ${info.tint}`}
    >
      <h2 className="mt-2 text-2xl leading-tight font-bold text-balance text-text-primary">
        {info.heading}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
        {info.subtitle}
      </p>

      <ul
        aria-label={`${info.label} subjects`}
        className="mt-3 flex flex-wrap gap-1.5"
      >
        {info.subjects.map((subject) => (
          <li
            key={subject}
            className="rounded-full border border-border bg-surface/80 px-2.5 py-0.5 text-xs font-medium text-text-secondary"
          >
            {subject}
          </li>
        ))}
      </ul>

      <p
        aria-label={`${info.label} highlights`}
        className="mt-3 text-[13px] leading-relaxed text-text-muted"
      >
        {info.highlights.join("  •  ")}
      </p>

      <div className="mt-auto pt-4">
        {live ? (
          <Link
            href={`/courses/${info.slug}`}
            aria-label={`Explore ${info.label} courses`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Explore
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-md border border-border bg-surface-muted px-5 text-sm font-semibold text-text-muted"
          >
            Coming soon
          </span>
        )}
      </div>
    </article>
  );
}
