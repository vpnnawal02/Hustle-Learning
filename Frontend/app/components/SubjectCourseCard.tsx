import Image from "next/image";
import Link from "next/link";
import { formatINR, type ClassCourse } from "./class-courses";

/**
 * Subject course card — follows design.md:
 * white/deep-navy surface, navy headings, amber CTA,
 * 8px radius, 24px padding, Inter body + GT Walsheim h1/h2 only.
 */
export default function SubjectCourseCard({ course }: { course: ClassCourse }) {
  const enrollHref =
    `/enroll?class=${encodeURIComponent(course.classSlug)}` +
    `&course=${encodeURIComponent(course.id)}&plan=monthly`;

  return (
    <article className="lift flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative">
        <span className="zoom-img relative block aspect-[16/10] w-full overflow-hidden bg-surface-muted">
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-center"
          />
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-caption font-bold tracking-wide text-text-primary uppercase shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
          </span>
          Live
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-headline font-bold text-balance text-text-primary">
          {course.title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-text-secondary">
          {course.classLabel} · {course.subject} · Live online batch
        </p>

        <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4">
          <p className="text-xl font-extrabold tracking-tight text-text-primary">
            {formatINR(course.monthlyPrice)}{" "}
            <span className="text-sm font-medium text-text-muted">per month</span>
          </p>
          <p className="text-sm font-semibold text-text-secondary">
            {formatINR(course.yearlyPrice)}{" "}
            <span className="font-medium text-text-muted">per academic year</span>
          </p>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={enrollHref}
            aria-label={`Enroll Now — ${course.title}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-button font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </article>
  );
}
