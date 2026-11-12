import type { Metadata } from "next";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import SubjectCards from "@/app/components/classes/SubjectCards";
import { countSubject, getSubjectUniverse } from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { subjectsCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export const metadata: Metadata = buildMetadata({
  title: "Browse Study Material by Subject — Science, Maths & More | Hustle Learning",
  description:
    "Start with a subject — Science, Mathematics, English or Social Science — then pick your class and material to reach chapter-wise resources.",
  canonical: canonical(urls.subjectsHub()),
});

export default async function SubjectsHubPage() {
  const universe = await getSubjectUniverse();
  const withCounts = await Promise.all(
    universe.map(async (s) => ({ ...s, count: await countSubject(s.slug) })),
  );
  return (
    <DiscoveryShell
      crumbs={subjectsCrumbs()}
      context="Study Material · every subject"
      title="Choose Your Subject"
      description="Explore resources organized around your subject. Pick one to see which classes hold published chapters for it."
    >
      <SubjectCards
        subjects={withCounts.map((s) => ({
          slug: s.slug,
          name: s.name,
          href: urls.subjectHub(s.slug),
          chapterCount: s.count,
          live: s.count > 0,
        }))}
      />
    </DiscoveryShell>
  );
}
