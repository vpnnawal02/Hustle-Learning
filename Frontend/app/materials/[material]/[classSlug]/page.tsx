import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import DiscoveryOptions from "@/app/components/discovery/DiscoveryOptions";
import { ComingSoon } from "@/app/components/resources/Navigation";
import { getSubjectsForClassMaterial } from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { materialClassCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";
import { CLASS_SLUGS, getResourceCategories } from "@/lib/data/school";

export async function generateStaticParams() {
  const out: { material: string; classSlug: string }[] = [];
  const cats = await getResourceCategories();
  for (const cat of cats) {
    for (const classSlug of CLASS_SLUGS) {
      out.push({ material: cat.slug, classSlug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ material: string; classSlug: string }>;
}): Promise<Metadata> {
  const { material, classSlug } = await params;
  const resolved = await getSubjectsForClassMaterial(classSlug, material);
  if (!resolved) return {};
  const { cls, cat, subjects } = resolved;
  return buildMetadata({
    title: `${cls.label} ${cat.title} — Choose a Subject | Hustle Learning`,
    description: `Browse ${cls.label} ${cat.title.toLowerCase()} by subject: ${subjects.map((s) => s.subject.name).join(", ") || "new subjects publishing soon"}.`,
    canonical: canonical(urls.materialClass(material, classSlug)),
    noindex: subjects.length === 0,
  });
}

export default async function MaterialClassSubjectsPage({
  params,
}: {
  params: Promise<{ material: string; classSlug: string }>;
}) {
  const { material, classSlug } = await params;
  const resolved = await getSubjectsForClassMaterial(classSlug, material);
  if (!resolved) notFound();
  const { cls, cat, subjects } = resolved;

  return (
    <DiscoveryShell
      crumbs={materialClassCrumbs(cat.title, cat.slug, cls.label)}
      context={`${cat.title} · ${cls.label}`}
      title={`Choose a Subject for ${cls.label} ${cat.shortTitle}`}
      description={`Only ${cls.label} subjects with published ${cat.shortTitle.toLowerCase()} are listed — every option below leads to real chapters.`}
    >
      {subjects.length > 0 ? (
        <DiscoveryOptions
          label={`${cls.label} subjects with ${cat.shortTitle}`}
          options={subjects.map(({ subject, count }) => ({
            href: urls.materialClassSubject(cat.slug, cls.slug, subject.slug),
            title: subject.name,
            meta: subject.tagline,
            badge: `${count} chapter${count === 1 ? "" : "s"}`,
            ariaLabel: `${subject.name}: ${count} ${cat.shortTitle} chapters available`,
          }))}
        />
      ) : (
        <div className="mt-8">
          <ComingSoon
            title={`No ${cat.shortTitle} for ${cls.label} yet`}
            description={`Our academic team has not published ${cat.title.toLowerCase()} for ${cls.label} yet. Published subjects will appear here automatically.`}
            backHref={urls.materialHub(cat.slug)}
            backLabel={`Back to ${cat.shortTitle} classes`}
          />
        </div>
      )}
    </DiscoveryShell>
  );
}
