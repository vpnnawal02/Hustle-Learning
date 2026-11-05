import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import Faq from "@/app/components/resources/Faq";
import CtaBand from "@/app/components/CtaBand";
import Footer from "@/app/components/Footer";
import ClassSearchBar from "@/app/components/classes/ClassSearchBar";
import ClassPills from "@/app/components/classes/ClassPills";
import ResourceTiles from "@/app/components/classes/ResourceTiles";
import SubjectCards, {
  type SubjectCardData,
} from "@/app/components/classes/SubjectCards";
import StudyPlan from "@/app/components/classes/StudyPlan";
import ClassSidebar from "@/app/components/classes/ClassSidebar";
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

  // Per-subject, per-resource published counts — computed once so no
  // subject × resource combination is ever rendered twice.
  const cards: SubjectCardData[] = [];
  const classTotals = new Map<string, number>();
  for (const subject of subjects) {
    let total = 0;
    const resources = [];
    for (const cat of categories) {
      const file = await getResourceFile(cls.slug, subject.slug, cat.slug);
      const n = publishedItems(file).length;
      total += n;
      classTotals.set(cat.slug, (classTotals.get(cat.slug) ?? 0) + n);
      resources.push({
        slug: cat.slug,
        shortTitle: cat.shortTitle,
        icon: cat.icon,
        count: n,
      });
    }
    cards.push({
      slug: subject.slug,
      name: subject.name,
      tagline: subject.tagline,
      chapterCount: subject.chapters.length,
      totalPublished: total,
      live: subject.status === "published",
      resources,
    });
  }

  const readySubjects = [...cards]
    .filter((c) => c.totalPublished > 0)
    .sort((a, b) => b.totalPublished - a.totalPublished)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      totalPublished: c.totalPublished,
    }));

  const isBoardYear = cls.slug === "class-10";

  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] flex-1 px-4 pt-10 pb-24 md:px-6 md:pt-14 lg:pb-14">
        <Breadcrumbs items={classCrumbs(cls.label)} />

        <h1 className="mt-6 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl">
          {cls.label} Study Material
        </h1>

        <ClassSearchBar classLabel={cls.label} />

        <ClassPills
          classes={allClasses.map((c) => ({
            slug: c.slug,
            label: c.label,
            shortLabel: c.shortLabel,
          }))}
          currentSlug={cls.slug}
        />

        <div className="mt-12">
          <section aria-labelledby="resources-heading">
            <h2
              id="resources-heading"
              className="text-2xl font-extrabold tracking-tight text-text-primary"
            >
              Explore Learning Resources
            </h2>
            <p className="mt-2 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
              Everything you need to study smarter, practise better, and
              prepare for your exams.
            </p>
            <ResourceTiles
              classSlug={cls.slug}
              classLabel={cls.label}
              tiles={categories.map((cat) => ({
                slug: cat.slug,
                title: cat.title,
                icon: cat.icon,
                classCount: classTotals.get(cat.slug) ?? 0,
              }))}
            />
          </section>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section aria-labelledby="subjects-heading">
              <h2
                id="subjects-heading"
                className="text-2xl font-extrabold tracking-tight text-text-primary"
              >
                Choose your subject
              </h2>
              <p className="mt-2 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
                Each card lists what is actually published. Anything still
                in preparation is marked coming soon — never a dead link.
              </p>
              <div id="subjects" className="scroll-mt-24">
                <SubjectCards classSlug={cls.slug} subjects={cards} />
              </div>
            </section>

            <div className="mt-12">
              <StudyPlan classLabel={cls.label} />
            </div>

            <Faq
              faqs={cls.faqs ?? []}
              heading={`${cls.label}: FAQs`}
              openFirst
            />
          </div>

          <aside aria-label={`${cls.label} study sidebar`} className="min-w-0">
            <ClassSidebar
              classSlug={cls.slug}
              classLabel={cls.label}
              isBoardYear={isBoardYear}
              readySubjects={readySubjects}
            />
          </aside>
        </div>
      </div>

      <CtaBand />
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <MobileBar classSlug={cls.slug} />
    </>
  );
}
