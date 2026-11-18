import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Footer from "@/app/components/Footer";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { PageTitle } from "@/app/components/typography";
import SubjectCourseCard from "@/app/components/SubjectCourseCard";
import { CLASS_COURSE_GROUPS, getClassCourseGroup } from "@/app/components/class-courses";

export function generateStaticParams() {
  return CLASS_COURSE_GROUPS.map((g) => ({ courseClass: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseClass: string }>;
}): Promise<Metadata> {
  const { courseClass } = await params;
  const group = getClassCourseGroup(courseClass);
  if (!group) return {};
  return {
    title: `${group.label} Courses — Live Online Batches | Hustle Learning`,
    description: `${group.description} Subjects: ${group.courses.map((c) => c.subject).join(", ")}. ₹499/month, ₹5000/year.`,
  };
}

export default async function ClassCoursesRoute({
  params,
}: {
  params: Promise<{ courseClass: string }>;
}) {
  const { courseClass } = await params;
  const group = getClassCourseGroup(courseClass);
  if (!group) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Courses", href: "/courses" },
            { label: `${group.label} Courses` },
          ]}
        />
        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All classes
        </Link>
        <PageTitle className="mt-3 max-w-[24ch]">
          {group.label} Courses
        </PageTitle>
        <p className="mt-3 text-xl leading-snug font-bold text-text-secondary">
          {group.tagline}
        </p>
        <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          {group.description} Every batch is live, with small groups,
          doubt-solving and regular tests. ₹499/- per month or ₹5000/- per year.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {group.courses.map((course) => (
            <SubjectCourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
