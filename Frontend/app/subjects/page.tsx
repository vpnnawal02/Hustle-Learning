import type { Metadata } from "next";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import DiscoveryOptions from "@/app/components/discovery/DiscoveryOptions";
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
      <DiscoveryOptions
        label="Subjects"
        options={withCounts.map((s) => ({
          href: urls.subjectHub(s.slug),
          title: s.name,
          meta: s.tagline,
          badge:
            s.count > 0
              ? `${s.count} chapter${s.count === 1 ? "" : "s"}`
              : "Coming soon",
          ariaLabel: `${s.name}: ${s.count > 0 ? `${s.count} chapters available` : "coming soon"}`,
        }))}
      />
    </DiscoveryShell>
  );
}
