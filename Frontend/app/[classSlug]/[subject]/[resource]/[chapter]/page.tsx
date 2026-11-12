import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import ContentRenderer from "@/app/components/resources/ContentRenderer";
import Faq from "@/app/components/resources/Faq";
import { ComingSoon } from "@/app/components/resources/Navigation";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  CLASS_SLUGS,
  getChapterItem,
  getClass,
  getResourceCategories,
  getResourceCategory,
  getResourceFile,
  getSubject,
} from "@/lib/data/school";
import { isSchoolResourceSlug, publishedItems } from "@/lib/data/helpers";
import { urls } from "@/lib/urls";
import {
  splitWorksheets,
  worksheetDisplayNumber,
} from "@/lib/content/worksheets";
import { articleJsonLd, buildMetadata, canonical } from "@/lib/seo";
import { chapterCrumbs, classMaterialSubjectCrumbs } from "@/lib/breadcrumbs";

export async function generateStaticParams() {
  const out: {
    classSlug: string;
    subject: string;
    resource: string;
    chapter: string;
  }[] = [];
  const categories = await getResourceCategories();
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls) continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      for (const cat of categories) {
        const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
        for (const item of file?.items ?? []) {
          if (item.status === "archived") continue;
          out.push({
            classSlug,
            subject: subject.slug,
            resource: cat.slug,
            chapter: item.chapterSlug,
          });
          // Workflow B (class-first) alias: /:class/:material/:subject/:chapter.
          out.push({
            classSlug,
            subject: cat.slug,
            resource: subject.slug,
            chapter: item.chapterSlug,
          });
        }
      }
    }
  }
  return out;
}

type Params = {
  classSlug: string;
  subject: string;
  resource: string;
  chapter: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { classSlug, subject: subjectSlug, resource, chapter } = await params;
  // Workflow B alias: /:class/:material/:subject/:chapter resolves the
  // same chapter as /:class/:subject/:material/:chapter (canonical).
  const subjectFound = await getSubject(classSlug, subjectSlug);
  const materialMode =
    !subjectFound && isSchoolResourceSlug(subjectSlug);
  const effSubjectSlug = materialMode ? resource : subjectSlug;
  const effResourceSlug = materialMode ? subjectSlug : resource;
  const [found, cat, entry] = await Promise.all([
    getSubject(classSlug, effSubjectSlug),
    getResourceCategory(effResourceSlug),
    getChapterItem(classSlug, effSubjectSlug, effResourceSlug, chapter),
  ]);
  if (!found || !cat || !entry) return {};
  const { item } = entry;
  const path = urls.chapterPage(classSlug, effSubjectSlug, effResourceSlug, chapter);
  return buildMetadata({
    title: `${item.title} | Hustle Learning`,
    description: item.description,
    canonical: canonical(path),
    // Only genuinely published content is indexable.
    noindex: item.status !== "published" || item.blocks.length === 0,
  });
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { classSlug, subject: subjectSlug, resource, chapter } = await params;
  // Workflow B alias — see generateMetadata above.
  const subjectFound = await getSubject(classSlug, subjectSlug);
  const materialMode =
    !subjectFound && isSchoolResourceSlug(subjectSlug);
  const effSubjectSlug = materialMode ? resource : subjectSlug;
  const effResourceSlug = materialMode ? subjectSlug : resource;
  if (!isSchoolResourceSlug(effResourceSlug)) notFound();
  const [found, cat, entry] = await Promise.all([
    getSubject(classSlug, effSubjectSlug),
    getResourceCategory(effResourceSlug),
    getChapterItem(classSlug, effSubjectSlug, effResourceSlug, chapter),
  ]);
  if (!found || !cat || !entry) notFound();
  const { cls, subject } = found;
  const { item } = entry;

  const chapterMeta = subject.chapters.find((c) => c.slug === chapter);
  const chapterTitle = chapterMeta?.title ?? item.title;
  const path = urls.chapterPage(classSlug, effSubjectSlug, effResourceSlug, chapter);
  // Chapters with `## Worksheet N` sections become a clean hub of square
  // worksheet cards — no questions or extra panels, just the picker.
  const worksheets = splitWorksheets(item.blocks);
  const isWorksheetHub = worksheets.length > 0;
  const crumbs = materialMode
    ? [
      ...classMaterialSubjectCrumbs(
        cls.label,
        cls.slug,
        cat.title,
        cat.slug,
        subject.name,
      ),
      { label: chapterTitle },
    ]
    : chapterCrumbs(
      cls.label,
      cls.slug,
      subject.name,
      subject.slug,
      cat.title,
      cat.slug,
      chapterTitle,
    );

  // Draft items render a friendly coming-soon state (noindex via metadata).
  if (item.status !== "published" || item.blocks.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8">
          <ComingSoon
            title={`${chapterTitle} — ${cat.title} coming soon`}
            description={`Our academic team is verifying this material. Published ${cat.shortTitle.toLowerCase()} for ${cls.label} ${subject.name} will appear here automatically.`}
            backHref={urls.resourcePage(classSlug, effSubjectSlug, effResourceSlug)}
            backLabel={`Back to ${cat.title}`}
          />
        </div>
      </div>
    );
  }

  // Other resource tabs for the same chapter.
  const categories = await getResourceCategories();
  const tabs: { label: string; href: string; active: boolean }[] = [];
  for (const c of categories) {
    if (c.slug === effResourceSlug) {
      tabs.push({ label: c.shortTitle, href: path, active: true });
      continue;
    }
    const other = await getResourceFile(classSlug, effSubjectSlug, c.slug);
    const has = publishedItems(other).some(
      (i) => i.chapterSlug === chapter,
    );
    if (has) {
      tabs.push({
        label: c.shortTitle,
        href: urls.chapterPage(classSlug, effSubjectSlug, c.slug, chapter),
        active: false,
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <JsonLd
        data={articleJsonLd({
          headline: item.title,
          description: item.description,
          url: path,
          updatedAt: item.updatedAt,
        })}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mt-6">
        <article className="min-w-0">
          <p className="text-sm leading-[1.6] text-text-secondary">
            {cls.label} · {subject.name} · {cat.title}
            {chapterMeta ? ` · Chapter ${chapterMeta.number}` : ""}
          </p>
          <h1 className="mt-2 max-w-[26ch] text-3xl leading-[1.1] text-balance sm:text-4xl">
            {item.title}
          </h1>
          {isWorksheetHub ? (
            <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
              {item.description}
            </p>
          ) : (
            <p className="mt-3 text-sm text-text-muted">
              Last updated {item.updatedAt}
            </p>
          )}

          {tabs.length > 1 && (
            <nav aria-label="Resource tabs" className="mt-5">
              <ul className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <li key={tab.label}>
                    {tab.active ? (
                      <span
                        aria-current="page"
                        className="inline-flex h-10 items-center rounded bg-brand-navy px-4 text-sm font-semibold text-white"
                      >
                        {tab.label}
                      </span>
                    ) : (
                      <Link
                        href={tab.href}
                        className="inline-flex h-10 items-center rounded border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                      >
                        {tab.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {isWorksheetHub ? (
            <div
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
              role="list"
              aria-label="Worksheets"
            >
              {worksheets.map((ws) => (
                <Link
                  key={ws.slug}
                  role="listitem"
                  href={urls.worksheetPage(
                    classSlug,
                    effSubjectSlug,
                    effResourceSlug,
                    chapter,
                    ws.slug,
                  )}
                  className="group flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span
                    aria-hidden="true"
                    className="text-4xl font-extrabold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent sm:text-5xl"
                  >
                    {worksheetDisplayNumber(ws.slug)}
                  </span>
                  <span className="mt-1 font-bold text-text-primary">
                    {ws.title}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <ContentRenderer blocks={item.blocks} />
            </div>
          )}

          {!isWorksheetHub && (
            <Faq faqs={item.faqs ?? []} structured={(item.faqs ?? []).length > 0} />
          )}
        </article>
      </div>
    </div>
  );
}
