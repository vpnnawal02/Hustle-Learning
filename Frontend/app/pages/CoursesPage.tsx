import { Clock } from "lucide-react";
import Footer from "../components/Footer";
import ClassHubCard from "../components/ClassHubCard";
import { PageTitle } from "../components/typography";
import { CLASS_HUB } from "../components/class-courses";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <PageTitle>Batches by class</PageTitle>
        <p className="mt-3 text-xl leading-snug font-bold text-text-secondary">
          All Courses
        </p>
        <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          Live online batches for every stage of school. Choose your class to
          see subject-wise courses — each batch is ₹499/- per month or ₹5000/-
          per year.
        </p>

        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 xl:grid-cols-5">
          {CLASS_HUB.map((info) => (
            <div
              key={info.slug}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
            >
              <ClassHubCard info={info} />
            </div>
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
              Class 11 &amp; 12 · JEE Mains / Advanced · NEET batches.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
