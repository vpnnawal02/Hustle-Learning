import Link from "next/link";
import CourseCard from "../../components/CourseCard";
import { COURSES } from "../../components/courses";
import Reveal from "../../components/Reveal";

export default function PopularCourses() {
  return (
    <section
      aria-labelledby="popular-courses-heading"
      className=""
    >
      <div className="relative mx-auto w-full max-w-[var(--container-wide)] px-4 pt-16 pb-12 md:px-6 md:pt-24 md:pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Reveal variant="left">
            <div>
              <h2
                id="popular-courses-heading"
                className="text-3xl text-balance text-text-primary sm:text-5xl"
              >
                Popular Courses
              </h2>
              <p className="mt-3 text-lg font-bold text-text-secondary">
                Batches by class
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <Link
              href="/courses"
              className="ov-outline inline-flex h-11 items-center justify-center rounded border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent active:bg-surface-muted"
            >
              Show all courses
            </Link>
          </Reveal>
        </div>

        {/* Slider on mobile, grid on desktop — staggered rise, no pinning
            so every course stays reachable without excess scroll. */}
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {COURSES.map((course, i) => (
            <Reveal
              key={course.id}
              variant="up"
              delay={Math.min(i, 3) * 90}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
            >
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
