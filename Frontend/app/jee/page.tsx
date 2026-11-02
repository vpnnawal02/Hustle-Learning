import type { Metadata } from "next";
import { ExamLanding } from "@/app/components/exams/ExamTemplates";
import { getExam } from "@/lib/data/exams";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

export async function generateMetadata(): Promise<Metadata> {
  const exam = await getExam("jee");
  if (!exam) return {};
  return buildMetadata({
    title: "JEE Preparation — Notes, PYQs & Mock Tests | Hustle Learning",
    description: exam.description,
    canonical: canonical(urls.examPage("jee")),
    noindex: exam.status !== "published",
  });
}

export default async function JeePage() {
  return <ExamLanding examSlug="jee" />;
}
