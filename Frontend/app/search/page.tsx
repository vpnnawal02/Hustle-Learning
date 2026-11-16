import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/app/components/layout/Breadcrumbs";
import { PageTitle } from "@/app/components/typography";
import { buildMetadata, canonical } from "@/lib/seo";
import { buildSearchIndex } from "@/lib/search";
import SearchClient from "./SearchClient";

// Search result pages are utilities, not content — never indexed.
export const metadata: Metadata = buildMetadata({
  title: "Search Study Material | Hustle Learning",
  description:
    "Search NCERT solutions, notes, important questions and test prep across Classes 6–10, JEE and NEET.",
  canonical: canonical("/search"),
  noindex: true,
});

export default async function SearchPage() {
  const entries = await buildSearchIndex();
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <PageTitle className="mt-6 max-w-[24ch]">
        Search study material
      </PageTitle>
      <Suspense
        fallback={
          <p className="mt-6 text-[15px] text-text-secondary">
            Loading search…
          </p>
        }
      >
        <SearchClient entries={entries} />
      </Suspense>
    </div>
  );
}
