import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../components/courses";
import { Clock } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <h1 className="text-3xl text-balance sm:text-4xl">
          Batches by class
        </h1>
        <p className="mt-3 text-xl leading-snug font-bold text-text-secondary">
          All Courses
        </p>
        <p className="mt-3 max-w-[60ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Learning batches for every stage of school — strong foundations in
          middle school, focused board preparation in Classes 9 and 10, and
          subject-specific study in Classes 11 and 12.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-md border border-accent/50 bg-accent/10 p-5 sm:flex-row sm:items-center sm:gap-4">
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
      </main>
      <Footer />
    </div>
  );
}
