import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { ChapterList } from "@/app/components/resources/ChapterList";
import Faq from "@/app/components/resources/Faq";
import { LinkList } from "@/app/components/resources/LinkLists";
import {
  CLASS_SLUGS,
  getClass,
  getResourceCategories,
  getResourceFile,
  getSubject,
} from "@/lib/data/school";
import { publishedItems } from "@/lib/data/helpers";
import { urls } from "@/lib/urls";
import { buildMetadata, canonical } from "@/lib/seo";
import { subjectCrumbs } from "@/lib/breadcrumbs";

export async function generateStaticParams() {
  const out: { classSlug: string; subject: string }[] = [];
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls) continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      out.push({ classSlug, subject: subject.slug });
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
  const found = await getSubject(classSlug, subjectSlug);
  if (!found || found.subject.status !== "published") notFound();
  const { cls, subject } = found;

  const categories = await getResourceCategories();
  const perResource = new Map<string, number>();
  let totalPublished = 0;
  for (const cat of categories) {
    const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
    const n = publishedItems(file).length;
    perResource.set(cat.slug, n);
    totalPublished += n;
  }

  const first = subject.chapters[0];
  const last = subject.chapters[subject.chapters.length - 1];
  const relatedSubjects = cls.subjects.filter(
    (s) => s.slug !== subject.slug && s.status !== "archived",
  );

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs items={subjectCrumbs(cls.label, cls.slug, subject.name)} />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {cls.label} · {subject.tagline}
      </p>
      <h1 className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
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

      <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
        {subject.name} Study Resources
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={categories.map((cat) => {
            const n = perResource.get(cat.slug) ?? 0;
            return {
              title: cat.title,
              href: urls.resourcePage(cls.slug, subject.slug, cat.slug),
              meta:
                n > 0
                  ? `${n} chapter${n === 1 ? "" : "s"} published · ${cat.description}`
                  : `Coming soon · ${cat.description}`,
            };
          })}
        />
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        {subject.name} Chapters
      </h2>
      <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        Chapter links open the notes view — every chapter page carries tabs
        for solutions, questions, worksheets and more where published.
      </p>
      <div className="mt-4 max-w-[860px]">
        <ChapterList
          chapters={subject.chapters}
          hrefFor={() => urls.resourcePage(cls.slug, subject.slug, "notes")}
        />
      </div>

      {relatedSubjects.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
            More {cls.label} Subjects
          </h2>
          <div className="mt-4 max-w-[860px]">
            <LinkList
              items={relatedSubjects.map((s) => ({
                title: s.name,
                href: urls.subjectPage(cls.slug, s.slug),
                meta: s.tagline,
              }))}
            />
          </div>
        </>
      )}

      <div className="max-w-[860px]">
        <Faq
          faqs={[
            {
              question: `How should I study ${subject.name} in ${cls.label}?`,
              answer: `Start with the chapter notes, practise the important questions, then test yourself with sample papers and previous year questions — all linked from each ${subject.name} chapter page.`,
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
