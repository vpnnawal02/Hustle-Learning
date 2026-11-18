import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { NewsArticle } from "./news-articles";

export function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-navy px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase dark:bg-accent dark:text-on-accent">
      {category}
    </span>
  );
}

export function NewsMeta({ article }: { article: NewsArticle }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-text-muted">
      <time dateTime={article.dateISO}>{article.dateLabel}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock size={13} aria-hidden="true" />
        {article.readMinutes} min read
      </span>
    </p>
  );
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="lift flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <Link
        href={`/news/${article.slug}`}
        aria-label={article.title}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-surface-muted"
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          loading="lazy"
          className="object-cover object-center"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <CategoryPill category={article.category} />
        </div>
        <div className="mt-2">
          <NewsMeta article={article} />
        </div>
        <h3 className="mt-2 text-[17px] leading-snug font-bold text-balance text-text-primary">
          <Link
            href={`/news/${article.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {article.summary}
        </p>
        <div className="mt-auto pt-4">
          <Link
            href={`/news/${article.slug}`}
            aria-label={`Read: ${article.title}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary underline-offset-4 hover:underline"
          >
            Read story
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
