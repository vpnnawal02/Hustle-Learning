import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { ChapterList } from "@/app/components/resources/ChapterList";
import Faq from "@/app/components/resources/Faq";
import ResourceCards from "@/app/components/resources/ResourceCards";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import SubjectCards from "@/app/components/classes/SubjectCards";
import { ComingSoon } from "@/app/components/resources/Navigation";
import {
  CLASS_SLUGS,
  getClass,
  getResourceCategories,
  getResourceFile,
  getSubject,
} from "@/lib/data/school";
import { getOfferedResources } from "@/lib/data/availability";
import { displayCategory } from "@/lib/data/display-names";
import { isSchoolResourceSlug, publishedItems } from "@/lib/data/helpers";
import { getSubjectsForClassMaterial } from "@/lib/discovery";
import { urls } from "@/lib/urls";
import { buildMetadata, canonical } from "@/lib/seo";
import { classMaterialCrumbs, subjectCrumbs } from "@/lib/breadcrumbs";

export async function generateStaticParams() {
  const out: { classSlug: string; subject: string }[] = [];
  const categories = await getResourceCategories();
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls) continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      out.push({ classSlug, subject: subject.slug });
    }
    // Workflow B (class-first): /:class/:material selects a subject next.
    for (const cat of categories) {
      out.push({ classSlug, subject: cat.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string }>;
}): Promise<Metadata> {
  const { classSlug, subject: subjectSlug } = await params;
  // Workflow B branch: the "subject" segment names a material.
  if (!(await getSubject(classSlug, subjectSlug)) && isSchoolResourceSlug(subjectSlug)) {
    const resolved = await getSubjectsForClassMaterial(classSlug, subjectSlug);
    if (!resolved) return {};
    const { cls, cat, subjects } = resolved;
    return buildMetadata({
      title: `${cls.label} ${cat.title} — Choose a Subject | Hustle Learning`,
      description: `Browse ${cls.label} ${cat.title.toLowerCase()} by subject: ${subjects.map((s) => s.subject.name).join(", ") || "new subjects publishing soon"}.`,
      canonical: canonical(urls.classMaterial(classSlug, subjectSlug)),
      noindex: subjects.length === 0,
    });
  }
  const found = await getSubject(classSlug, subjectSlug);
  if (!found) return {};
  const { cls, subject } = found;
  const first = subject.chapters[0]?.title;
  const last = subject.chapters[subject.chapters.length - 1]?.title;
  return buildMetadata({
    title: `${cls.label} ${subject.name} — NCERT Solutions, Notes & Important Questions | Hustle Learning`,
    description: `${subject.description} Covers ${subject.chapters.length} chapters${first ? ` from ${first}` : ""}${last ? ` to ${last}` : ""}.`,
    canonical: canonical(urls.subjectPage(classSlug, subjectSlug)),
    noindex: subject.status !== "published",
  });
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string }>;
}) {
  const { classSlug, subject: subjectSlug } = await params;
  // Workflow B (class-first): /:class/:material → choose a subject.
  // A real subject always wins; material slugs never collide with one.
  const found = await getSubject(classSlug, subjectSlug);
  if (!found && isSchoolResourceSlug(subjectSlug)) {
    const resolved = await getSubjectsForClassMaterial(classSlug, subjectSlug);
    if (!resolved) notFound();
    const { cls, cat, subjects } = resolved;
    return (
      <DiscoveryShell
        crumbs={classMaterialCrumbs(cls.label, cls.slug, cat.title)}
        context={`${cls.label} · ${cat.title}`}
        title={`${cls.label} ${cat.shortTitle} — Choose a Subject`}
        description={`Only ${cls.label} subjects with published ${cat.shortTitle.toLowerCase()} are listed — every option below leads to real chapters.`}
      >
        {subjects.length > 0 ? (
          <SubjectCards
            subjects={subjects.map(({ subject, count }) => ({
              slug: subject.slug,
              name: subject.name,
              href: urls.classMaterialSubject(cls.slug, cat.slug, subject.slug),
              chapterCount: count,
              live: true,
            }))}
          />
        ) : (
          <div className="mt-8">
            <ComingSoon
              title={`No ${cat.shortTitle} for ${cls.label} yet`}
              description={`Our academic team has not published ${cat.title.toLowerCase()} for ${cls.label} yet. Published subjects will appear here automatically.`}
              backHref={urls.classPage(cls.slug)}
              backLabel={`Back to ${cls.label}`}
            />
          </div>
        )}
      </DiscoveryShell>
    );
  }
  if (!found || found.subject.status !== "published") notFound();
  const { cls, subject } = found;

  // Only matrix-offered resources are shown for this subject.
  const offered = new Set(await getOfferedResources(subject.slug));
  const categories = (await getResourceCategories())
    .filter((c) => offered.has(c.slug))
    .map((c) => displayCategory(subject.slug, c));
  const perResource = new Map<string, number>();
  // First published resource per chapter (registry order) for chapter links.
  const chapterHref = new Map<string, string>();
  let totalPublished = 0;
  for (const cat of categories) {
    const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
    const items = publishedItems(file);
    const n = items.length;
    perResource.set(cat.slug, n);
    totalPublished += n;
    for (const item of items) {
      if (!chapterHref.has(item.chapterSlug)) {
        chapterHref.set(
          item.chapterSlug,
          urls.chapterPage(cls.slug, subject.slug, cat.slug, item.chapterSlug),
        );
      }
    }
  }

  const first = subject.chapters[0];
  const last = subject.chapters[subject.chapters.length - 1];
  const relatedSubjects = cls.subjects.filter(
    (s) => s.slug !== subject.slug && s.status !== "archived",
  );

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={subjectCrumbs(cls.label, cls.slug, subject.name)} />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {cls.label} · {subject.tagline}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] text-balance sm:text-4xl">
        {cls.label} {subject.name}
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {subject.description}
      </p>
      <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        This subject spans {subject.chapters.length} chapters
        {first ? `, opening with ${first.title}` : ""}
        {last ? ` and closing with ${last.title}` : ""}.{" "}
        {totalPublished > 0
          ? `${totalPublished} chapter resources are published and ready to study; the rest are marked coming soon as our academic team verifies them.`
          : "Chapter resources are being verified by our academic team and will appear below as they publish."}
      </p>

      <h2 className="mt-10 text-2xl text-text-primary">
        {subject.name} Study Resources
      </h2>
      <div className="mt-6">
        <ResourceCards
          items={categories.map((cat) => {
            const n = perResource.get(cat.slug) ?? 0;
            const tint = resourceTint(cat.slug);
            return {
              title: cat.title,
              blurb:
                n > 0
                  ? `${n} chapter${n === 1 ? "" : "s"} published · ${cat.description}`
                  : `Coming soon · ${cat.description}`,
              href: urls.resourcePage(cls.slug, subject.slug, cat.slug),
              icon: <ResourceIcon name={cat.icon} size={22} />,
              tintText: tint.text,
              colorVar: tint.colorVar,
            };
          })}
        />
      </div>

      <h2 className="mt-12 text-2xl text-text-primary">
        {subject.name} Chapters
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Chapter links open the chapter reading view — every chapter page
        carries tabs for solutions, questions, worksheets and more where
        published.
      </p>
      <div className="mt-4 max-w-[860px]">
        <ChapterList
          chapters={subject.chapters}
          hrefFor={(chapterSlug) =>
            chapterHref.get(chapterSlug) ??
            urls.resourcePage(
              cls.slug,
              subject.slug,
              categories[0]?.slug ?? "notes",
            )
          }
        />
      </div>

      {relatedSubjects.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl text-text-primary">
            More {cls.label} Subjects
          </h2>
          <SubjectCards
            subjects={relatedSubjects.map((s) => ({
              slug: s.slug,
              name: s.name,
              href: urls.subjectPage(cls.slug, s.slug),
              chapterCount: s.chapters.length,
              live: s.status === "published",
            }))}
          />
        </>
      )}

      <div className="max-w-[860px]">
        <Faq
          faqs={[
            {
              question: `How should I study ${subject.name} in ${cls.label}?`,
              answer:
                subject.slug === "english"
                  ? `Start with the chapter summaries and poem explanations, practise the important questions, then try the worksheets — all linked from each ${subject.name} chapter page.`
                  : `Start with the chapter notes, practise the important questions, then test yourself with sample papers and previous year questions — all linked from each ${subject.name} chapter page.`,
            },
            {
              question: `Are all ${subject.name} chapters available yet?`,
              answer:
                "We publish chapters progressively after academic verification. Chapters marked “Coming soon” are not yet available and are never presented as complete.",
            },
          ]}
          heading={`${subject.name}: FAQs`}
        />
      </div>
    </div>
  );
}
