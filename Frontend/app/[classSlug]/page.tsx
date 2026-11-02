import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import Faq from "@/app/components/resources/Faq";
import { LinkList } from "@/app/components/resources/LinkLists";
import { SubjectLinkGroups } from "@/app/components/resources/Selectors";
import {
  CLASS_SLUGS,
  getClass,
  getClasses,
  getResourceCategories,
  getResourceFile,
} from "@/lib/data/school";
import { publishedItems } from "@/lib/data/helpers";
import { urls } from "@/lib/urls";
import { buildMetadata, canonical } from "@/lib/seo";
import { classCrumbs } from "@/lib/breadcrumbs";

export function generateStaticParams() {
  return CLASS_SLUGS.map((classSlug) => ({ classSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}): Promise<Metadata> {
  const { classSlug } = await params;
  const cls = await getClass(classSlug);
  if (!cls) return {};
  const subjects = cls.subjects
    .filter((s) => s.status !== "archived")
    .map((s) => s.name)
    .join(", ");
  return buildMetadata({
    title: `${cls.label} Study Material — NCERT Solutions, Notes & More | Hustle Learning`,
    description: `${cls.description} Subjects: ${subjects}.`,
    canonical: canonical(urls.classPage(classSlug)),
    noindex: cls.status !== "published",
  });
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const cls = await getClass(classSlug);
  if (!cls || cls.status !== "published") notFound();

  const categories = await getResourceCategories();
  const allClasses = await getClasses();
  const subjects = cls.subjects.filter((s) => s.status !== "archived");

  const counts = new Map<string, number>();
  for (const subject of subjects) {
    let n = 0;
    for (const cat of categories) {
      const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
      n += publishedItems(file).length;
    }
    counts.set(subject.slug, n);
  }

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={classCrumbs(cls.label)} />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {cls.board} · {cls.tagline}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {cls.label} Study Material
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {cls.description}
      </p>
      {cls.focus && (
        <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
          {cls.focus}
        </p>
      )}

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
        {cls.label} Subjects & Resources
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Open a subject for its chapters, or jump straight to a resource type
        — every combination has its own dedicated page.
      </p>
      <div className="mt-4 max-w-[860px]">
        <SubjectLinkGroups
          classSlug={cls.slug}
          subjects={subjects.map((s) => ({
            slug: s.slug,
            name: s.name,
            tagline: `${s.tagline} · ${s.chapters.length} chapters · ${
              counts.get(s.slug) ?? 0
            } resources published`,
          }))}
          resources={categories.map((c) => ({
            slug: c.slug,
            shortTitle: c.title,
          }))}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        All Resource Types
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={categories.map((cat) => ({
            title: `${cat.title} · ${cls.label}`,
            href: urls.resourceHub(cat.slug),
            meta: cat.description,
          }))}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Other Classes
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={allClasses
            .filter((c) => c.slug !== cls.slug)
            .map((c) => ({
              title: `${c.label} Study Material`,
              href: urls.classPage(c.slug),
              meta: c.tagline,
            }))}
        />
      </div>

      <div className="max-w-[860px]">
        <Faq faqs={cls.faqs ?? []} heading={`${cls.label}: FAQs`} />
      </div>
    </div>
  );
}
