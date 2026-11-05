import type { Metadata } from "next";
import type { CSSProperties } from "react";
import DiscoveryShell from "@/app/components/discovery/DiscoveryShell";
import DiscoveryOptions from "@/app/components/discovery/DiscoveryOptions";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
import { getMaterialsWithCounts } from "@/lib/discovery";
import { buildMetadata, canonical } from "@/lib/seo";
import { materialsCrumbs } from "@/lib/breadcrumbs";
import { urls } from "@/lib/urls";

export const metadata: Metadata = buildMetadata({
  title: "Browse Study Material by Type — Notes, PYQs & More | Hustle Learning",
  description:
    "Start with a material — NCERT solutions, notes, important questions, sample papers, PYQs, worksheets or formula sheets — then pick your class and subject.",
  canonical: canonical(urls.materialsHub()),
});

export default async function MaterialsHubPage() {
  const materials = await getMaterialsWithCounts();
  return (
    <DiscoveryShell
      crumbs={materialsCrumbs()}
      context="Study Material · 7 material types"
      title="Choose Your Learning Material"
      description="Find the resources you need to study smarter. Pick a material to see which classes hold published chapters for it."
    >
      <DiscoveryOptions
        label="Learning materials"
        options={materials.map(({ cat, count }) => {
          const tint = resourceTint(cat.slug);
          return {
            href: urls.materialHub(cat.slug),
            title: cat.title,
            meta: cat.blurb,
            badge:
              count > 0
                ? `${count} chapter${count === 1 ? "" : "s"}`
                : "Coming soon",
            icon: (
              <span
                aria-hidden="true"
                className={`res-tint flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${tint.text}`}
                style={{ "--res-color": tint.colorVar } as CSSProperties}
              >
                <ResourceIcon name={cat.icon} size={20} />
              </span>
            ),
          };
        })}
      />
    </DiscoveryShell>
  );
}
