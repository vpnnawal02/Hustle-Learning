import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import WorksheetHero from "@/app/components/resources/WorksheetHero";
import WorksheetPaper from "@/app/components/resources/WorksheetPaper";
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
import { isSchoolResourceSlug } from "@/lib/data/helpers";
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
        // Include drafts too (they render a ComingSoon state); only
        // archived items are excluded from prerendering.
        for (const item of (file?.items ?? []).filter(
          (i) => i.status !== "archived",
        )) {
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
  // Question blocks only — the section heading becomes the page header.
  const questionBlocks = ws.blocks.slice(1);

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
      <JsonLd
        data={articleJsonLd({
          headline: `${ws.title} | ${item.title}`,
          description: `${ws.questionCount} practice questions worth ${ws.totalMarks} marks with tap-to-reveal answers.`,
          url: wsPath(ws.slug),
          updatedAt: item.updatedAt,
        })}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mx-auto mt-6 max-w-[860px]">
        <article className="flex min-w-0 flex-col gap-6">
          <WorksheetHero
            worksheetLabel={ws.title}
            chapterTitle={chapterTitle}
            description={item.description}
          />
          <WorksheetPaper blocks={questionBlocks} />
          <div>
            <p className="text-sm text-text-secondary">
              <Link
                href={hubPath}
                className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-text-primary"
              >
                ← All {chapterTitle} worksheets
              </Link>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
