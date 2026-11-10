import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { LinkList } from "@/app/components/resources/LinkLists";
import WorksheetHero from "@/app/components/resources/WorksheetHero";
import WorksheetPaper from "@/app/components/resources/WorksheetPaper";
import { PrevNextNav } from "@/app/components/resources/Navigation";
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
import { splitWorksheets } from "@/lib/content/worksheets";
import { urls } from "@/lib/urls";
import { articleJsonLd, buildMetadata, canonical } from "@/lib/seo";
import {
  classMaterialSubjectCrumbs,
  worksheetCrumbs,
} from "@/lib/breadcrumbs";

export async function generateStaticParams() {
  const out: {
    classSlug: string;
    subject: string;
    resource: string;
    chapter: string;
    worksheet: string;
  }[] = [];
  const categories = await getResourceCategories();
  for (const classSlug of CLASS_SLUGS) {
    const cls = await getClass(classSlug);
    if (!cls) continue;
    for (const subject of cls.subjects) {
      if (subject.status === "archived") continue;
      for (const cat of categories) {
        const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
        for (const item of publishedItems(file)) {
          if (item.blocks.length === 0) continue;
          for (const ws of splitWorksheets(item.blocks)) {
            out.push({
              classSlug,
              subject: subject.slug,
              resource: cat.slug,
              chapter: item.chapterSlug,
              worksheet: ws.slug,
            });
            // Workflow B alias: /:class/:material/:subject/:chapter/:worksheet.
            out.push({
              classSlug,
              subject: cat.slug,
              resource: subject.slug,
              chapter: item.chapterSlug,
              worksheet: ws.slug,
            });
          }
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
  worksheet: string;
};

async function resolveWorksheet(params: Params) {
  const { classSlug, subject: subjectSlug, resource, chapter, worksheet } =
    params;
  // Workflow B alias — same disambiguation as the chapter page.
  const subjectFound = await getSubject(classSlug, subjectSlug);
  const materialMode =
    !subjectFound && isSchoolResourceSlug(subjectSlug);
  const effSubjectSlug = materialMode ? resource : subjectSlug;
  const effResourceSlug = materialMode ? subjectSlug : resource;
  if (!isSchoolResourceSlug(effResourceSlug)) return null;
  const [found, cat, entry] = await Promise.all([
    getSubject(classSlug, effSubjectSlug),
    getResourceCategory(effResourceSlug),
    getChapterItem(classSlug, effSubjectSlug, effResourceSlug, chapter),
  ]);
  if (!found || !cat || !entry) return null;
  const { item } = entry;
  if (item.status !== "published" || item.blocks.length === 0) return null;
  const worksheets = splitWorksheets(item.blocks);
  const wsIndex = worksheets.findIndex((w) => w.slug === worksheet);
  if (wsIndex === -1) return null;
  return { found, cat, item, worksheets, wsIndex, effSubjectSlug, effResourceSlug, materialMode };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolved = await resolveWorksheet(await params);
  if (!resolved) return {};
  const { item, worksheets, wsIndex, effSubjectSlug, effResourceSlug } =
    resolved;
  const { classSlug } = await params;
  const ws = worksheets[wsIndex];
  const path = urls.worksheetPage(
    classSlug,
    effSubjectSlug,
    effResourceSlug,
    item.chapterSlug,
    ws.slug,
  );
  return buildMetadata({
    title: `${ws.title} | ${item.title} | Hustle Learning`,
    description: `${ws.title} of ${item.title}: ${ws.questionCount} practice questions worth ${ws.totalMarks} marks with tap-to-reveal answers.`,
    canonical: canonical(path),
    noindex: false,
  });
}

export default async function WorksheetPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = await params;
  const resolved = await resolveWorksheet(p);
  if (!resolved) notFound();
  const {
    found,
    cat,
    item,
    worksheets,
    wsIndex,
    effSubjectSlug,
    effResourceSlug,
    materialMode,
  } = resolved;
  const { cls, subject } = found;
  const ws = worksheets[wsIndex];
  const chapterMeta = subject.chapters.find((c) => c.slug === item.chapterSlug);
  const chapterTitle = chapterMeta?.title ?? item.title;
  const hubPath = urls.chapterPage(
    p.classSlug,
    effSubjectSlug,
    effResourceSlug,
    item.chapterSlug,
  );
  const crumbs = materialMode
    ? [
        ...classMaterialSubjectCrumbs(
          cls.label,
          cls.slug,
          cat.title,
          cat.slug,
          subject.name,
        ),
        { label: chapterTitle, href: hubPath },
        { label: ws.title },
      ]
    : worksheetCrumbs(
        cls.label,
        cls.slug,
        subject.name,
        subject.slug,
        cat.title,
        cat.slug,
        chapterTitle,
        item.chapterSlug,
        ws.title,
      );

  const wsPath = (slug: string) =>
    urls.worksheetPage(
      p.classSlug,
      effSubjectSlug,
      effResourceSlug,
      item.chapterSlug,
      slug,
    );
  const prev =
    wsIndex > 0
      ? { title: worksheets[wsIndex - 1].title, href: wsPath(worksheets[wsIndex - 1].slug) }
      : undefined;
  const next =
    wsIndex < worksheets.length - 1
      ? { title: worksheets[wsIndex + 1].title, href: wsPath(worksheets[wsIndex + 1].slug) }
      : undefined;
  const siblings = worksheets
    .filter((_, i) => i !== wsIndex)
    .map((s) => ({ title: s.title, href: wsPath(s.slug) }));
  // Question blocks only — the section heading becomes the page header.
  const questionBlocks = ws.blocks.slice(1);
  // Exam-paced when marks exist (~2 min/mark), otherwise ~3 min/question.
  const suggestedTime =
    ws.totalMarks > 0
      ? Math.max(15, Math.ceil(ws.totalMarks * 2))
      : Math.max(15, ws.questionCount * 3);

  return (
    <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 py-10 md:px-6 md:py-14">
      <JsonLd
        data={articleJsonLd({
          headline: `${ws.title} | ${item.title}`,
          description: `${ws.questionCount} practice questions worth ${ws.totalMarks} marks with tap-to-reveal answers.`,
          url: wsPath(ws.slug),
          updatedAt: item.updatedAt,
        })}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="flex min-w-0 flex-col gap-6">
          <WorksheetHero
            worksheetLabel={ws.title}
            chapterTitle={chapterTitle}
            description={item.description}
            questionCount={ws.questionCount}
            totalMarks={ws.totalMarks}
            minutes={suggestedTime}
            kicker={`${cls.label} · ${subject.name} · ${cat.title} · Chapter ${chapterMeta?.number ?? ""}`}
          />
          <p className="text-sm text-text-secondary">
            Solve on paper in one sitting, then tap any question to reveal its
            answer.
          </p>
          <WorksheetPaper blocks={questionBlocks} />
          <div>
            <PrevNextNav prev={prev} next={next} />
            <p className="mt-4 text-sm text-text-secondary">
              <Link
                href={hubPath}
                className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-text-primary"
              >
                ← All {chapterTitle} worksheets
              </Link>
            </p>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            {siblings.length > 0 && (
              <div className="rounded-md border border-border bg-surface p-5">
                <p className="text-sm font-bold text-text-primary">
                  More in this chapter
                </p>
                <div className="mt-3">
                  <LinkList items={siblings} />
                </div>
              </div>
            )}
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
