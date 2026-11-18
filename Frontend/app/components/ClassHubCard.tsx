import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ClassHubInfo } from "./class-courses";

/**
 * Main class card for /courses — artwork image on top (title,
 * subtitle and subjects are baked into the artwork, so no text
 * here repeats them) plus a single CTA below.
 */
export default function ClassHubCard({ info }: { info: ClassHubInfo }) {
  const live = info.status === "live";

  return (
    <article className="lift flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <Image
        src={info.image}
        alt={info.imageAlt}
        quality={100}
        sizes="(max-width: 768px) 78vw, (max-width: 1024px) 45vw, 430px"
        className="h-auto w-full"
      />
      <div className="mt-auto p-4 sm:p-5">
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
