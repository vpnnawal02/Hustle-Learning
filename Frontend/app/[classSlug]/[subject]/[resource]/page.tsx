import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import {
  ChapterList,
  itemsToPublishedSets,
} from "@/app/components/resources/ChapterList";
import Faq from "@/app/components/resources/Faq";
import { LinkList } from "@/app/components/resources/LinkLists";
import {
  CLASS_SLUGS,
  getClass,
  getResourceCategories,
  getResourceCategory,
  getResourceFile,
  getSubject,
} from "@/lib/data/school";
import { isSchoolResourceSlug, publishedItems } from "@/lib/data/helpers";
import { urls } from "@/lib/urls";
import { buildMetadata, canonical } from "@/lib/seo";
import { resourceCrumbs } from "@/lib/breadcrumbs";

export async function generateStaticParams() {
  const out: { classSlug: string; subject: string; resource: string }[] = [];
  const categories = await getResourceCategories();
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls) continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      for (const cat of categories) {
        out.push({ classSlug, subject: subject.slug, resource: cat.slug });
      }
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string; resource: string }>;
}): Promise<Metadata> {
  const { classSlug, subject: subjectSlug, resource } = await params;
  const found = await getSubject(classSlug, subjectSlug);
  const cat = await getResourceCategory(resource);
  if (!found || !cat) return {};
  const { cls, subject } = found;
  const file = await getResourceFile(classSlug, subjectSlug, resource);
  const items = publishedItems(file);
  const sample = items
    .slice(0, 3)
    .map(
      (i) =>
        subject.chapters.find((c) => c.slug === i.chapterSlug)?.title ??
        i.chapterSlug,
    )
    .join("; ");
  return buildMetadata({
    title: `${cls.label} ${subject.name} ${cat.title} — Chapter-wise | Hustle Learning`,
    description:
      items.length > 0
        ? `Chapter-wise ${cat.title.toLowerCase()} for ${cls.label} ${subject.name}, including ${sample}. ${items.length} chapter${items.length === 1 ? "" : "s"} published.`
        : `${cat.title} for ${cls.label} ${subject.name} — currently in preparation. Browse available ${subject.name} resources.`,
    canonical: canonical(urls.resourcePage(classSlug, subjectSlug, resource)),
    noindex: items.length === 0,
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ classSlug: string; subject: string; resource: string }>;
}) {
  const { classSlug, subject: subjectSlug, resource } = await params;
  if (!isSchoolResourceSlug(resource)) notFound();
  const found = await getSubject(classSlug, subjectSlug);
  const cat = await getResourceCategory(resource);
  if (!found || !cat || found.subject.status !== "published") notFound();
  const { cls, subject } = found;

  const file = await getResourceFile(classSlug, subjectSlug, resource);
  const items = publishedItems(file);
  const { slugs, updatedAt } = itemsToPublishedSets(items);
  const publishedTitles = items.map(
    (i) =>
      subject.chapters.find((c) => c.slug === i.chapterSlug)?.title ??
      i.chapterSlug,
  );
  const pending = subject.chapters.length - slugs.size;

  const categories = await getResourceCategories();
  const related = categories.filter((c) => c.slug !== resource).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={resourceCrumbs(
          cls.label,
          cls.slug,
          subject.name,
          subject.slug,
          cat.title,
        )}
      />
      <p className="mt-6 text-sm leading-[1.6] text-text-secondary">
        {cls.label} · {subject.name}
      </p>
      <h1 className="mt-2 max-w-[26ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
        {cls.label} {subject.name} {cat.title}
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
        {cat.description} Below, {subject.name} is broken into its{" "}
        {subject.chapters.length} chapters
        {items.length > 0 ? (
          <>
            {" "}
            — {items.length} with published {cat.shortTitle.toLowerCase()}{" "}
            {pending > 0
              ? `and ${pending} still in preparation`
              : "covering the full chapter list"}
            .
          </>
        ) : (
          <> — currently all in preparation, publishing chapter by chapter.</>
        )}
      </p>
      {items.length > 0 && (
        <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
          Available now: {publishedTitles.join(" · ")}. Open any chapter for
          the full material plus tabs linking every other published resource
          for the same chapter.
        </p>
      )}

      {items.length > 0 ? (
        <>
          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
            Chapter-wise {cat.shortTitle}
          </h2>
          <div className="mt-4 max-w-[860px]">
            <ChapterList
              chapters={subject.chapters}
              hrefFor={(chapterSlug) =>
                urls.chapterPage(classSlug, subjectSlug, resource, chapterSlug)
              }
              publishedSlugs={slugs}
              updatedAtFor={(s) => updatedAt.get(s)}
            />
          </div>
        </>
      ) : (
        <div className="mt-8 max-w-[860px] rounded-lg border border-border bg-surface-muted/60 p-8 text-center">
          <p className="inline-flex items-center rounded bg-accent px-4 py-1.5 text-[13px] font-bold text-on-accent">
            Coming soon
          </p>
          <p className="mx-auto mt-3 max-w-[60ch] text-[15px] leading-[1.6] text-text-secondary">
            {cat.title} for {cls.label} {subject.name} are being verified by
            our academic team. Published chapters will appear here
            automatically.
          </p>
        </div>
      )}

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        Why use these {cat.shortTitle.toLowerCase()}?
      </h2>
      <ul className="mt-3 flex max-w-[68ch] list-disc flex-col gap-2 pl-6 text-[15px] leading-[1.6] text-text-secondary">
        {(cat.howTo ?? []).slice(0, 3).map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
      <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
        <a
          href={urls.resourceHub(resource)}
          className="font-semibold text-text-primary underline underline-offset-4"
        >
          More about {cat.title.toLowerCase()} across all classes →
        </a>
      </p>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-text-primary">
        More {subject.name} resources
      </h2>
      <div className="mt-4 max-w-[860px]">
        <LinkList
          items={related.map((rel) => ({
            title: `${subject.name} ${rel.title}`,
            href: urls.resourcePage(cls.slug, subject.slug, rel.slug),
            meta: rel.description,
          }))}
        />
      </div>

      <div className="max-w-[860px]">
        <Faq
          faqs={[
            {
              question: `Which ${subject.name} chapters have ${cat.shortTitle.toLowerCase()} available?`,
              answer:
                items.length > 0
                  ? `Currently: ${publishedTitles.join("; ")}. Remaining chapters publish as our academic team verifies them — this page updates automatically.`
                  : `None yet — all ${subject.chapters.length} chapters are in preparation and will appear here as they publish.`,
            },
            {
              question: `How do I combine these with other ${subject.name} material?`,
              answer: `Study the chapter notes first, then use these ${cat.shortTitle.toLowerCase()} for practice, and finish with sample papers or previous year questions from the related resources above.`,
            },
          ]}
          heading={`${cat.shortTitle}: FAQs`}
        />
      </div>
    </div>
  );
}
