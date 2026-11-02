import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamSubjectPage } from "@/app/components/exams/ExamTemplates";
import { getExam } from "@/lib/data/exams";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

const EXAM = "jee";

export async function generateStaticParams() {
  const exam = await getExam(EXAM);
  return (
    exam?.subjects
      .filter((s) => s.status !== "archived")
      .map((s) => ({ subject: s.slug })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const exam = await getExam(EXAM);
  const subject = exam?.subjects.find((s) => s.slug === subjectSlug);
  if (!exam || !subject) return {};
  return buildMetadata({
    title: `JEE ${subject.name} — Notes, PYQs & Practice | Hustle Learning`,
    description: subject.description,
    canonical: canonical(urls.examSubjectPage(EXAM, subjectSlug)),
    noindex: subject.status !== "published",
  });
}

export default async function JeeSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const exam = await getExam(EXAM);
  if (!exam?.subjects.some((s) => s.slug === subjectSlug)) notFound();
  return <ExamSubjectPage examSlug={EXAM} subjectSlug={subjectSlug} />;
}
