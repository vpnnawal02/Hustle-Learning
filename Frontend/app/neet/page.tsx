import type { Metadata } from "next";
import { ExamLanding } from "@/app/components/exams/ExamTemplates";
import { getExam } from "@/lib/data/exams";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

export async function generateMetadata(): Promise<Metadata> {
  const exam = await getExam("neet");
  if (!exam) return {};
  return buildMetadata({
    title: "NEET Preparation — Notes, PYQs & Mock Tests | Hustle Learning",
    description: exam.description,
    canonical: canonical(urls.examPage("neet")),
    noindex: exam.status !== "published",
  });
}

export default async function NeetPage() {
  return <ExamLanding examSlug="neet" />;
}
