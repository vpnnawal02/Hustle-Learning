import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import ResourceCards from "@/app/components/resources/ResourceCards";
import { ComingSoon } from "@/app/components/resources/Navigation";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
import { getAllTriples, getMaterialsForClassSubject } from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { subjectClassCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const triples = await getAllTriples();
  const seen = new Set<string>();
  const out: { subject: string; classSlug: string }[] = [];
  for (const t of triples) {
    const key = `${t.subjectSlug}/${t.classSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ subject: t.subjectSlug, classSlug: t.classSlug });
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; classSlug: string }>;
}): Promise<Metadata> {
  const { subject, classSlug } = await params;
  const resolved = await getMaterialsForClassSubject(classSlug, subject);
  if (!resolved) return {};
  const { cls, subject: subjectMeta, materials } = resolved;
  return buildMetadata({
    title: `${cls.label} ${subjectMeta.name} Materials — Notes, Questions & More | Hustle Learning`,
    description: `Choose a material for ${cls.label} ${subjectMeta.name}: ${materials.map((m) => m.cat.title).join(", ") || "new materials publishing soon"}.`,
    canonical: canonical(urls.subjectClass(subject, classSlug)),
    noindex: materials.length === 0,
  });
}

export default async function SubjectClassMaterialsPage({
  params,
}: {
  params: Promise<{ subject: string; classSlug: string }>;
}) {
  const { subject, classSlug } = await params;
  const resolved = await getMaterialsForClassSubject(classSlug, subject);
  if (!resolved) notFound();
  const { cls, subject: subjectMeta, materials } = resolved;

  return (
    <DiscoveryShell
      crumbs={subjectClassCrumbs(subjectMeta.name, subjectMeta.slug, cls.label)}
      context={`${subjectMeta.name} · ${cls.label}`}
      title={`Choose Your Learning Material for ${cls.label} ${subjectMeta.name}`}
      description={`Only materials with published ${cls.label} ${subjectMeta.name} chapters are listed — every option below leads to real chapters.`}
    >
      {materials.length > 0 ? (
        <ResourceCards
          items={materials.map(({ cat, count }) => {
            const tint = resourceTint(cat.slug);
            return {
              title: cat.title,
              blurb: `${count} chapter${count === 1 ? "" : "s"} · ${cat.blurb}`,
              href: urls.subjectClassMaterial(
                subjectMeta.slug,
                cls.slug,
                cat.slug,
              ),
              icon: (
                <ResourceIcon name={cat.icon} size={22} />
              ),
              tintText: tint.text,
              colorVar: tint.colorVar,
            };
          })}
        />
      ) : (
        <div className="mt-8">
          <ComingSoon
            title={`${subjectMeta.name} resources for ${cls.label} are on their way`}
            description={`Our academic team has not published ${cls.label} ${subjectMeta.name} chapters yet. Published materials will appear here automatically.`}
            backHref={urls.subjectHub(subjectMeta.slug)}
            backLabel={`Back to ${subjectMeta.name} classes`}
          />
        </div>
      )}
    </DiscoveryShell>
  );
}
