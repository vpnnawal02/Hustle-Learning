import Image from "next/image";
import Link from "next/link";
import type { Course } from "./courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="lift flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-border bg-surface">
      <div className="zoom-img relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 1024px) 78vw, 300px"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="ov-eyebrow text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
          {course.audience}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-text-primary">
          {course.title}
        </h3>
        <p className="ov-desc mt-1.5 text-sm leading-[1.55] text-text-secondary">
          {course.description}
        </p>
        <div className="mt-auto pt-4">
          <Link
            href="/#hero-enquiry"
            aria-label={`Get more info about ${course.title} courses`}
            className="ov-cta inline-flex h-11 w-full items-center justify-center rounded bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Get more Info
          </Link>
        </div>
      </div>
    </article>
  );
}
