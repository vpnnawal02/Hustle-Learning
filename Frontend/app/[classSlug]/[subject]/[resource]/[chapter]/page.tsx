import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import ContentRenderer from "@/app/components/resources/ContentRenderer";
import TableOfContents from "@/app/components/resources/TableOfContents";
import Faq from "@/app/components/resources/Faq";
import { LinkList } from "@/app/components/resources/LinkLists";
import { ComingSoon, PrevNextNav } from "@/app/components/resources/Navigation";
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
import { articleJsonLd, buildMetadata, canonical } from "@/lib/seo";
import { chapterCrumbs } from "@/lib/breadcrumbs";

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
  const [found, cat, entry] = await Promise.all([
    getSubject(classSlug, subjectSlug),
    getResourceCategory(resource),
    getChapterItem(classSlug, subjectSlug, resource, chapter),
  ]);
  if (!found || !cat || !entry) return {};
  const { item } = entry;
  const path = urls.chapterPage(classSlug, subjectSlug, resource, chapter);
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
  if (!isSchoolResourceSlug(resource)) notFound();
  const [found, cat, entry] = await Promise.all([
    getSubject(classSlug, subjectSlug),
    getResourceCategory(resource),
    getChapterItem(classSlug, subjectSlug, resource, chapter),
  ]);
  if (!found || !cat || !entry) notFound();
  const { cls, subject } = found;
  const { item } = entry;

  const chapterMeta = subject.chapters.find((c) => c.slug === chapter);
  const chapterTitle = chapterMeta?.title ?? item.title;
  const path = urls.chapterPage(classSlug, subjectSlug, resource, chapter);

  // Draft items render a friendly coming-soon state (noindex via metadata).
  if (item.status !== "published" || item.blocks.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={chapterCrumbs(
            cls.label,
            cls.slug,
            subject.name,
            subject.slug,
            cat.title,
            cat.slug,
            chapterTitle,
          )}
        />
        <div className="mt-8">
          <ComingSoon
            title={`${chapterTitle} — ${cat.title} coming soon`}
            description={`Our academic team is verifying this material. Published ${cat.shortTitle.toLowerCase()} for ${cls.label} ${subject.name} will appear here automatically.`}
            backHref={urls.resourcePage(classSlug, subjectSlug, resource)}
            backLabel={`Back to ${cat.title}`}
          />
        </div>
      </div>
    );
  }

  // Prev / next across all published items of this resource file.
  const file = await getResourceFile(classSlug, subjectSlug, resource);
  const published = publishedItems(file);
  const idx = published.findIndex((i) => i.chapterSlug === chapter);
  const navFor = (i: (typeof published)[number]) => {
    const meta = subject.chapters.find((c) => c.slug === i.chapterSlug);
    return {
      title: meta?.title ?? i.title,
      href: urls.chapterPage(classSlug, subjectSlug, resource, i.chapterSlug),
    };
  };
  const prev = idx > 0 ? navFor(published[idx - 1]) : undefined;
  const next =
    idx >= 0 && idx < published.length - 1
      ? navFor(published[idx + 1])
      : undefined;
  const relatedChapters = published
    .filter((i) => i.chapterSlug !== chapter)
    .slice(0, 4)
    .map(navFor);

  // Other resource tabs for the same chapter.
  const categories = await getResourceCategories();
  const tabs: { label: string; href: string; active: boolean }[] = [];
  for (const c of categories) {
    if (c.slug === resource) {
      tabs.push({ label: c.shortTitle, href: path, active: true });
      continue;
    }
    const other = await getResourceFile(classSlug, subjectSlug, c.slug);
    const has = publishedItems(other).some(
      (i) => i.chapterSlug === chapter,
    );
    if (has) {
      tabs.push({
        label: c.shortTitle,
        href: urls.chapterPage(classSlug, subjectSlug, c.slug, chapter),
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
      <Breadcrumbs
        items={chapterCrumbs(
          cls.label,
          cls.slug,
          subject.name,
          subject.slug,
          cat.title,
          cat.slug,
          chapterTitle,
        )}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          <p className="text-sm leading-[1.6] text-text-secondary">
            {cls.label} · {subject.name} · {cat.title}
            {chapterMeta ? ` · Chapter ${chapterMeta.number}` : ""}
          </p>
          <h1 className="mt-2 max-w-[26ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 text-sm text-text-muted">
            Last updated {item.updatedAt}
          </p>

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

          <div className="mt-6 lg:hidden">
            <TableOfContents blocks={item.blocks} />
          </div>

          <div className="mt-6">
            <ContentRenderer blocks={item.blocks} />
          </div>

          <PrevNextNav prev={prev} next={next} />

          {relatedChapters.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-text-primary">
                More {subject.name} {cat.shortTitle.toLowerCase()}
              </h2>
              <div className="mt-4">
                <LinkList
                  items={relatedChapters.map((r) => ({
                    title: r.title,
                    href: r.href,
                  }))}
                />
              </div>
            </>
          )}

          <Faq faqs={item.faqs ?? []} structured={(item.faqs ?? []).length > 0} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            <TableOfContents blocks={item.blocks} />
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="text-sm font-bold text-text-primary">
                Need personal help?
              </p>
              <p className="mt-1 text-sm leading-[1.55] text-text-secondary">
                Our counsellor will call you back on WhatsApp with the right
                plan.
              </p>
              <Link
                href="/#hero-enquiry"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Get a free callback
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
