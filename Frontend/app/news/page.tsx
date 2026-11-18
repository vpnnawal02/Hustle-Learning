import type { Metadata } from "next";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Footer from "../components/Footer";
import JsonLd from "../components/seo/JsonLd";
import { PageTitle } from "../components/typography";
import { breadcrumbJsonLd, buildMetadata, canonical } from "@/lib/seo";
import NewsExplorer from "./NewsExplorer";

export const metadata: Metadata = buildMetadata({
  title: "Hustle Learning News – CBSE Updates, Board Exam 2027 & Prep Guides",
  description:
    "Latest CBSE updates, board exam 2027 schedules, sample papers, preparation strategies and practical exam guidance for Classes 10 and 12.",
  canonical: canonical("/news"),
});

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "News" },
        ])}
      />
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "News" }]}
        />
        <PageTitle className="mt-6 max-w-[28ch]">
          Hustle Learning News
        </PageTitle>
        <p className="mt-4 max-w-[68ch] text-base leading-[1.7] text-text-secondary sm:text-lg">
          Latest CBSE updates, examination news and educational resources for
          students — date sheets, sample papers, preparation strategies and
          practical exam guidance for the 2026–27 board season.
        </p>
        <NewsExplorer />
      </main>
      <Footer />
    </div>
  );
}
