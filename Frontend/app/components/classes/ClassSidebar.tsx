import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BoardCountdown from "./BoardCountdown";
import { urls } from "@/lib/urls";

export interface ReadySubject {
  slug: string;
  name: string;
  totalPublished: number;
}

/**
 * Sticky right sidebar: exam countdown (board year only), subjects with
 * the most content ready, and the counselling call-to-action.
 */
export default function ClassSidebar({
  classSlug,
  classLabel,
  isBoardYear,
  readySubjects,
}: {
  classSlug: string;
  classLabel: string;
  isBoardYear: boolean;
  readySubjects: ReadySubject[];
}) {
  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      {isBoardYear && <BoardCountdown />}

      {readySubjects.length > 0 && (
        <section
          aria-labelledby="ready-heading"
          className="rounded-md border border-border bg-surface p-5"
        >
          <h2
            id="ready-heading"
            className="text-base font-bold tracking-tight text-text-primary"
          >
            Ready to study now
          </h2>
          <ul className="mt-3 flex flex-col">
            {readySubjects.slice(0, 3).map((s) => (
              <li key={s.slug} className="border-b border-border py-2.5 last:border-b-0 last:pb-0 first:pt-0">
                <Link
                  href={urls.subjectPage(classSlug, s.slug)}
                  className="group flex min-h-[44px] items-center justify-between gap-3"
                >
                  <span className="font-semibold text-text-primary group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                    {s.name}
                  </span>
                  <span className="shrink-0 rounded-sm bg-surface-muted px-2.5 py-1 text-xs font-semibold text-text-secondary">
                    {s.totalPublished} ready
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="expert-heading"
        className="rounded-md border border-border bg-surface-muted p-5"
      >
        <h2
          id="expert-heading"
          className="text-base font-bold tracking-tight text-text-primary"
        >
          Confused about {classLabel}?
        </h2>
        <p className="mt-1.5 text-sm leading-[1.6] text-text-secondary">
          Talk to a counsellor about notes, tuition, or books — free,
          on WhatsApp.
        </p>
        <Link
          href="/#hero-enquiry"
          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Book free counselling
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
