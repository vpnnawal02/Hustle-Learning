import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ResourceIcon } from "@/app/components/resources/icons";
import { resourceTint } from "@/app/components/resources/resource-tints";
import { urls } from "@/lib/urls";

export interface ResourceTile {
  slug: string;
  title: string;
  icon: string;
  /** Published chapter items for the current class (all subjects). */
  classCount: number;
}

/**
 * Quick-pick resource tiles — one tile per resource type, each rendered
 * once. Every tile links to that material scoped to the current class
 * (/:class/:material), which is the subject-selection step — so the
 * counts shown always match the destination. Materials with nothing
 * published yet still link through to an honest empty state.
 */
export default function ResourceTiles({
  tiles,
  classSlug,
  classLabel,
}: {
  tiles: ResourceTile[];
  classSlug: string;
  classLabel: string;
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tiles.map((tile) => {
        const tint = resourceTint(tile.slug);
        const iconChip = `res-tint flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${tint.text}`;
        const iconStyle = {
          "--res-color": tint.colorVar,
        } as CSSProperties;
        const available = tile.classCount > 0;

        return (
          <li key={tile.slug} className="min-w-0">
            <Link
              href={urls.classMaterial(classSlug, tile.slug)}
              aria-label={
                available
                  ? `${tile.title} — ${tile.classCount} ${classLabel} chapter${tile.classCount === 1 ? "" : "s"} available. Choose a subject.`
                  : `${tile.title} — coming soon for ${classLabel}`
              }
              className="group flex h-full items-center gap-4 rounded-md border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-[3px] hover:border-border-strong hover:shadow-[0_10px_24px_-16px_rgba(17,24,39,0.28)]"
            >
              <span aria-hidden="true" className={iconChip} style={iconStyle}>
                <ResourceIcon name={tile.icon} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-base font-semibold text-text-primary">
                  {tile.title}
                </span>
              </span>
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-primary"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
