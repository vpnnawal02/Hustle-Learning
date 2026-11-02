import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { COURSES } from "../components/courses";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
