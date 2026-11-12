import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import Faq from "@/app/components/resources/Faq";
import HubHero from "@/app/components/resources/HubHero";
import ResourceExplorer, {
  type ExplorerClass,
} from "@/app/components/resources/ResourceExplorer";
import HowToSteps from "@/app/components/resources/HowToSteps";
import ResourceCards from "@/app/components/resources/ResourceCards";
import { ResourceIcon } from "@/app/components/resources/icons";
import CtaBand from "@/app/components/CtaBand";
import Footer from "@/app/components/Footer";
import { resourceTint } from "@/app/components/resources/resource-tints";
import {
  getClasses,
  getResourceCategories,
  getResourceCategory,
  getResourceFile,
} from "@/lib/data/school";
import { publishedItems } from "@/lib/data/helpers";
import { buildMetadata, canonical } from "@/lib/seo";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const cats = await getResourceCategories();
  return cats.map((c) => ({ resource: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ resource: string }>;
}): Promise<Metadata> {
  const { resource } = await params;
  const cat = await getResourceCategory(resource);
  if (!cat) return {};
  const path = urls.resourceHub(resource);
  let hasPublished = false;
  for (const cls of await getClasses()) {
    for (const subject of cls.subjects) {
      const file = await getResourceFile(cls.slug, subject.slug, resource);
      if (publishedItems(file).length > 0) {
        hasPublished = true;
        break;
      }
    }
    if (hasPublished) break;
  }
  return buildMetadata({
    title: `${cat.title} for Classes 6–10 | Hustle Learning`,
    description: `${cat.description} Browse class-wise ${cat.title.toLowerCase()} for CBSE Classes 6–10, organised by subject and chapter.`,
    canonical: canonical(path),
    noindex: !hasPublished,
  });
}

export default async function ResourceHubPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const cat = await getResourceCategory(resource);
  if (!cat) notFound();

  const classes = await getClasses();
  const categories = await getResourceCategories();

  // Single pass: builds the explorer payload and the published total.
  const explorer: ExplorerClass[] = [];
  let totalPublished = 0;
  for (const cls of classes) {
    const subjects: ExplorerClass["subjects"] = [];
    let classTotal = 0;
    for (const subject of cls.subjects) {
      if (subject.status !== "published") continue;
      const file = await getResourceFile(cls.slug, subject.slug, resource);
      const items = publishedItems(file);
      if (items.length === 0) continue;
      totalPublished += items.length;
      classTotal += items.length;
      subjects.push({
        slug: subject.slug,
        name: subject.name,
        tagline: subject.tagline,
        count: items.length,
        href: urls.resourcePage(cls.slug, subject.slug, resource),
        chapters: items.map((item) => {
          const meta = subject.chapters.find(
            (c) => c.slug === item.chapterSlug,
          );
          return {
            number: meta?.number ?? 0,
            slug: item.chapterSlug,
            title: meta?.title ?? item.title,
            href: urls.chapterPage(
              cls.slug,
              subject.slug,
              resource,
              item.chapterSlug,
            ),
          };
        }),
      });
    }
    explorer.push({
      slug: cls.slug,
      label: cls.label,
      totalChapters: classTotal,
      subjects,
    });
  }

  const defaultClass =
    explorer.find((c) => c.totalChapters > 0) ?? explorer[0];
  const availability =
    totalPublished > 0
      ? `${totalPublished} chapter${totalPublished === 1 ? "" : "s"} published and ready to read`
      : "New chapters are being published soon";

  return (
    <>
      <div className="mx-auto w-full max-w-[960px] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Study Material", href: "/resources" },
            { label: cat.title },
          ]}
        />

        <div className="mt-6">
          <HubHero
            title={`${cat.title} for Classes 6–10`}
            description={cat.description}
            availability={availability}
            ctaHref="#resource-explorer"
            ctaLabel={`Browse ${cat.shortTitle}`}
          />
        </div>

        <section
          aria-labelledby="explorer-heading"
          id="resource-explorer"
          className="mt-12 scroll-mt-24"
        >
          <h2
            id="explorer-heading"
            className="text-2xl font-extrabold tracking-tight text-text-primary"
          >
            Browse {cat.shortTitle.toLowerCase()} by class
          </h2>
          <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
            Pick your class, then your subject — or search chapters
            directly. Every option leads to published chapters only.
          </p>
          <ResourceExplorer
            classes={explorer}
            defaultSlug={defaultClass.slug}
            shortTitle={cat.shortTitle}
          />
        </section>

        <section aria-labelledby="other-resources-heading" className="mt-12">
          <h2
            id="other-resources-heading"
            className="text-2xl font-extrabold tracking-tight text-text-primary"
          >
            Explore other resources
          </h2>
          <ResourceCards
            items={categories
              .filter((c) => c.slug !== resource)
              .map((c) => {
                const t = resourceTint(c.slug);
                return {
                  title: c.title,
                  blurb: c.blurb,
                  href: urls.resourceHub(c.slug),
                  icon: <ResourceIcon name={c.icon} size={22} />,
                  tintText: t.text,
                  colorVar: t.colorVar,
                };
              })}
          />
        </section>

        <HowToSteps
          title={`How to make the most of ${cat.shortTitle.toLowerCase()}`}
          intro="Three habits that turn these pages into marks."
          steps={cat.howTo ?? []}
        />

        <div className="mt-12">
          <Faq
            faqs={cat.faqs ?? []}
            structured={totalPublished > 0}
            heading={`${cat.title}: FAQs`}
          />
        </div>
      </div>

      <CtaBand />
      <Footer />
    </>
  );
}
