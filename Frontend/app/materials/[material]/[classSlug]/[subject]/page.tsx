import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceListing from "@/app/components/discovery/ResourceListing";
import { ComingSoon } from "@/app/components/resources/Navigation";
import {
  canonicalResourceDescription,
  canonicalResourceTitle,
  chapterTitlesOf,
  getMaterialsForClassSubject,
  getPublishedTriples,
  resolveTriple,
} from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { materialClassSubjectCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const triples = await getPublishedTriples();
  return triples.map((t) => ({
    material: t.materialSlug,
    classSlug: t.classSlug,
    subject: t.subjectSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ material: string; classSlug: string; subject: string }>;
}): Promise<Metadata> {
  const { material, classSlug, subject } = await params;
  const triple = await resolveTriple(classSlug, subject, material);
  if (!triple) return {};
  return buildMetadata({
    title: canonicalResourceTitle(
      triple.cls.label,
      triple.subject.name,
      triple.cat.title,
    ),
    description: canonicalResourceDescription({
      classLabel: triple.cls.label,
      subjectName: triple.subject.name,
      material: triple.cat,
      itemCount: triple.items.length,
      sampleTitles: chapterTitlesOf(triple),
    }),
    // One canonical content URL across all three workflows.
    canonical: canonical(
      urls.resourcePage(classSlug, subject, material),
    ),
    noindex: triple.items.length === 0,
  });
}

export default async function MaterialClassSubjectListingPage({
  params,
}: {
  params: Promise<{ material: string; classSlug: string; subject: string }>;
}) {
  const { material, classSlug, subject } = await params;
  const triple = await resolveTriple(classSlug, subject, material);
  if (!triple) notFound();
  const { cls, subject: subjectMeta, cat, items } = triple;

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1100px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <div className="mt-8">
          <ComingSoon
            title={`${cat.title} for ${cls.label} ${subjectMeta.name} are on their way`}
            description={`Our academic team has not published these chapters yet. Published ${cat.shortTitle.toLowerCase()} will appear here automatically.`}
            backHref={urls.materialClass(material, classSlug)}
            backLabel={`Back to ${cls.label} subjects`}
          />
        </div>
      </div>
    );
  }

  const chapters = items.map((item) => {
    const meta = subjectMeta.chapters.find((c) => c.slug === item.chapterSlug);
    return {
      number: meta?.number ?? 0,
      slug: item.chapterSlug,
      title: meta?.title ?? item.title,
      description: item.description,
      updatedAt: item.updatedAt,
      href: urls.chapterPage(cls.slug, subjectMeta.slug, cat.slug, item.chapterSlug),
    };
  });

  const siblings = (await getMaterialsForClassSubject(cls.slug, subjectMeta.slug))
    ?.materials.filter((m) => m.cat.slug !== cat.slug)
    .map((m) => ({
      title: `${subjectMeta.name} ${m.cat.title}`,
      href: urls.resourcePage(cls.slug, subjectMeta.slug, m.cat.slug),
      meta: `${m.count} chapter${m.count === 1 ? "" : "s"} published`,
    })) ?? [];

  return (
    <div className="mx-auto w-full max-w-[1100px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <ResourceListing
        crumbs={materialClassSubjectCrumbs(
          cat.title,
          cat.slug,
          cls.label,
          cls.slug,
          subjectMeta.name,
        )}
        context={`${cat.title} · ${cls.label} · ${subjectMeta.name}`}
        title={`${cls.label} ${subjectMeta.name} ${cat.title}`}
        description={canonicalResourceDescription({
          classLabel: cls.label,
          subjectName: subjectMeta.name,
          material: cat,
          itemCount: items.length,
          sampleTitles: chapterTitlesOf(triple),
        })}
        chapters={chapters}
        actionLabel={`Open ${cat.shortTitle}`}
        siblings={siblings}
        siblingsHeading={`More ${subjectMeta.name} resources`}
        backHref={urls.materialClass(material, classSlug)}
        backLabel={`${cls.label} ${cat.shortTitle} subjects`}
      />
    </div>
  );
}
