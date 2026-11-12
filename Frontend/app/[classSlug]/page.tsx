import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import Footer from "@/app/components/Footer";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
import ClassSearchBar from "@/app/components/classes/ClassSearchBar";
import ClassPills from "@/app/components/classes/ClassPills";
import SubjectCards, {
  type SubjectCardData,
} from "@/app/components/classes/SubjectCards";
import ResourceCards from "@/app/components/resources/ResourceCards";
import ExamTimeline from "@/app/components/classes/ExamTimeline";
import CounsellingCard from "@/app/components/classes/CounsellingCard";
import MobileBar from "@/app/components/classes/MobileBar";
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

  // Per-subject published counts — computed once for the subject cards.
  const cards: SubjectCardData[] = [];
  const classTotals = new Map<string, number>();
  for (const subject of subjects) {
    let total = 0;
    for (const cat of categories) {
      const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
      const n = publishedItems(file).length;
      total += n;
      classTotals.set(cat.slug, (classTotals.get(cat.slug) ?? 0) + n);
    }
    cards.push({
      slug: subject.slug,
      name: subject.name,
      href: urls.subjectPage(cls.slug, subject.slug),
      chapterCount: subject.chapters.length,
      totalPublished: total,
      live: subject.status === "published",
    });
  }

  const isBoardYear = cls.slug === "class-10";

  return (
    <div className="bg-[#FAFAF8] dark:bg-background">
      <div className="mx-auto w-full max-w-[var(--container-page)] flex-1 px-4 pt-10 pb-24 md:px-6 md:pt-14 lg:pb-14">
        <Breadcrumbs items={classCrumbs(cls.label)} />

        <h1 className="mt-6 max-w-[24ch] text-[32px] leading-[1.15] text-balance text-text-primary sm:text-4xl">
          {cls.label} Study Material
        </h1>
        <p className="mt-2 text-base text-text-secondary">
          CBSE · 2026–27 · Updated Nov 2026
        </p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside aria-label="Search and switch class" className="min-w-0">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <ClassSearchBar classLabel={cls.label} />

              <ClassPills
                classes={allClasses.map((c) => ({
                  slug: c.slug,
                  label: c.label,
                  shortLabel: c.shortLabel,
                }))}
                currentSlug={cls.slug}
              />
            </div>
          </aside>

          <div className="min-w-0">
            <section
              aria-labelledby="subjects-heading"
            >
              <h2
                id="subjects-heading"
                className="text-[22px] leading-[1.25] font-semibold tracking-tight text-text-primary sm:text-2xl"
              >
                Choose your subject
              </h2>
                <SubjectCards subjects={cards} />
            </section>

            <section
              aria-labelledby="resources-heading"
              className="mt-12 md:mt-16"
            >
              <h2
                id="resources-heading"
                className="text-[22px] leading-[1.25] font-semibold tracking-tight text-text-primary sm:text-2xl"
              >
                Browse by resource type
              </h2>
              <div className="mt-6">
                <ResourceCards
                  items={categories.map((cat) => {
                    const tint = resourceTint(cat.slug);
                    const n = classTotals.get(cat.slug) ?? 0;
                    return {
                      title: cat.title,
                      blurb:
                        n > 0
                          ? `${n} chapter${n === 1 ? "" : "s"} published · ${cat.description}`
                          : `Coming soon · ${cat.description}`,
                      href: urls.classMaterial(classSlug, cat.slug),
                      icon: <ResourceIcon name={cat.icon} size={22} />,
                      tintText: tint.text,
                      colorVar: tint.colorVar,
                    };
                  })}
                />
              </div>
            </section>

            {isBoardYear && (
              <div className="mt-12 md:mt-16">
                <ExamTimeline />
              </div>
            )}

            <div className="mt-12 md:mt-16">
              <CounsellingCard classLabel={cls.label} />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <MobileBar classSlug={cls.slug} />
    </div>
  );
}
