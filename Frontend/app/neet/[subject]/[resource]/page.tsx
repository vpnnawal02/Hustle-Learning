import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamResourcePage } from "@/app/components/exams/ExamTemplates";
import { getExam, getExamResourceFile } from "@/lib/data/exams";
import { publishedExamItems } from "@/lib/data/helpers";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

const EXAM = "neet";

export async function generateStaticParams() {
  const out: { subject: string; resource: string }[] = [];
  const exam = await getExam(EXAM);
  if (!exam) return out;
  for (const subject of exam.subjects) {
    if (subject.status === "archived") continue;
    for (const res of exam.resources) {
      out.push({ subject: subject.slug, resource: res.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; resource: string }>;
}): Promise<Metadata> {
  const { subject: subjectSlug, resource: resourceSlug } = await params;
  const exam = await getExam(EXAM);
  const subject = exam?.subjects.find((s) => s.slug === subjectSlug);
  const resource = exam?.resources.find((r) => r.slug === resourceSlug);
  if (!exam || !subject || !resource) return {};
  const file = await getExamResourceFile(EXAM, subjectSlug, resourceSlug);
  return buildMetadata({
    title: `NEET ${subject.name} ${resource.title} | Hustle Learning`,
    description: resource.description,
    canonical: canonical(urls.examResourcePage(EXAM, subjectSlug, resourceSlug)),
    noindex: publishedExamItems(file).length === 0,
  });
}

export default async function NeetResourcePage({
  params,
}: {
  params: Promise<{ subject: string; resource: string }>;
}) {
  const { subject: subjectSlug, resource: resourceSlug } = await params;
  const exam = await getExam(EXAM);
  const valid =
    exam?.subjects.some((s) => s.slug === subjectSlug) &&
    exam?.resources.some((r) => r.slug === resourceSlug);
  if (!valid) notFound();
  return (
    <ExamResourcePage
      examSlug={EXAM}
      subjectSlug={subjectSlug}
      resourceSlug={resourceSlug}
    />
  );
}
