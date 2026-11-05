import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import ClassOptionCards from "@/app/components/discovery/ClassOptionCards";
import { ComingSoon } from "@/app/components/resources/Navigation";
import {
  getClassesForMaterial,
  getMaterialsWithCounts,
} from "@/lib/discovery";
import { getResourceCategory } from "@/lib/data/school";
import { isSchoolResourceSlug } from "@/lib/data/helpers";
import { buildMetadata, canonical } from "@/lib/seo";
import { materialCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export async function generateStaticParams() {
  const materials = await getMaterialsWithCounts();
  return materials.map(({ cat }) => ({ material: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ material: string }>;
}): Promise<Metadata> {
  const { material } = await params;
  const cat = await getResourceCategory(material);
  if (!cat) return {};
  const classes = await getClassesForMaterial(material);
  const count = classes?.length ?? 0;
  return buildMetadata({
    title: `${cat.title} by Class — Chapter-wise ${cat.title} for Classes 6–10 | Hustle Learning`,
    description: `Browse ${cat.title.toLowerCase()} class-wise. ${cat.description}`,
    canonical: canonical(urls.materialHub(material)),
    noindex: count === 0,
  });
}

export default async function MaterialClassesPage({
  params,
}: {
  params: Promise<{ material: string }>;
}) {
  const { material } = await params;
  if (!isSchoolResourceSlug(material)) notFound();
  const [cat, classes] = await Promise.all([
    getResourceCategory(material),
    getClassesForMaterial(material),
  ]);
  if (!cat || !classes) notFound();

  return (
    <DiscoveryShell
      crumbs={materialCrumbs(cat.title)}
      context={`Study Material · ${cat.title}`}
      title={`Select Your Class for ${cat.shortTitle}`}
      description={`Choose your academic level to explore ${cat.title.toLowerCase()} with published chapters. Only classes with available ${cat.shortTitle.toLowerCase()} are listed.`}
    >
      {classes.length > 0 ? (
        <ClassOptionCards
          label={`Classes with ${cat.shortTitle}`}
          options={classes.map(({ cls, count }) => ({
            href: urls.materialClass(cat.slug, cls.slug),
            label: cls.label,
            shortLabel: cls.shortLabel,
            tagline: cls.tagline,
            badge: `${count} chapter${count === 1 ? "" : "s"}`,
            ariaLabel: `${cls.label}: ${count} ${cat.shortTitle} chapters available`,
          }))}
        />
      ) : (
        <div className="mt-8">
          <ComingSoon
            title={`${cat.title} are on their way`}
            description={`Our academic team has not published ${cat.title.toLowerCase()} for any class yet. Published chapters will appear here automatically.`}
            backHref={urls.materialsHub()}
            backLabel="Back to all materials"
          />
        </div>
      )}
    </DiscoveryShell>
  );
}
