import Link from "next/link";
import CourseCard from "../../components/CourseCard";
import { COURSES } from "../../components/courses";

export default function PopularCourses() {
  return (
    <section
      aria-labelledby="popular-courses-heading"
      className="mx-auto w-full max-w-[1380px] px-4 pb-12 md:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
            Batches by class
          </p>
          <h2
            id="popular-courses-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            Popular Courses
          </h2>
        </div>
        <Link
          href="/courses"
          className="inline-flex h-11 items-center justify-center rounded border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
        >
          Show all courses
        </Link>
      </div>

      {/* Slider on mobile, grid on desktop */}
      <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}
