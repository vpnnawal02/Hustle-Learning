import { Clock } from "lucide-react";
import CourseCard from "../../components/CourseCard";
import { COURSES } from "../../components/courses";
import Reveal from "../../components/Reveal";
import { SectionHeading } from "../../components/typography";

export default function PopularCourses() {
  return (
    <section
      aria-labelledby="popular-courses-heading"
      className="border-b border-border"
    >
      <div className="relative mx-auto w-full max-w-[var(--container-wide)] px-4 pt-16 pb-12 md:px-6 md:pt-10 md:pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Reveal variant="left">
            <SectionHeading
              titleId="popular-courses-heading"
              title="Popular Courses"
              sub="Batches by class"
              subTone="secondary"
              description="Explore our learning programmes designed to help students build strong concepts, improve academic performance, and prepare confidently for examinations. Choose your class to discover structured lessons, expert guidance, and learning support aligned with your academic needs."
            />
          </Reveal>
        </div>

        {/* Slider on mobile, grid on desktop — staggered rise, no pinning
            so every course stays reachable without excess scroll. */}
        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:-mx-6 md:scroll-px-6 md:px-6 lg:mx-auto lg:grid lg:w-full lg:max-w-[980px] lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
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

        <div className="mx-auto mt-6 flex w-full flex-col gap-3 rounded-md border border-accent/50 bg-accent/10 p-5 sm:flex-row sm:items-center sm:gap-4 lg:max-w-[980px]">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-on-accent"
          >
            <Clock size={18} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-text-primary">
              More classes on the way — coming soon
            </p>
            <p className="mt-0.5 text-sm leading-snug text-text-secondary">
              Class 6, 7, 11 &amp; 12 · JEE Mains / Advanced · NEET batches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
