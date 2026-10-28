import Link from "next/link";
import type { TutoringOption } from "./tutoring";

export default function TutoringCard({
  option,
  ctaHref = "/classes",
}: {
  option: TutoringOption;
  ctaHref?: string;
}) {
  return (
    <article className="lift flex h-full min-w-0 flex-col rounded-sm border border-border bg-surface p-6">
      <h3 className="text-xl font-extrabold tracking-tight text-text-primary">
        {option.title}
      </h3>
      <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
        {option.description}
      </p>
      <div className="mt-auto pt-5">
        <Link
          href={ctaHref}
          aria-label={`Find a tutor for ${option.title}`}
          className="inline-flex h-11 w-full items-center justify-center rounded border-2 border-accent bg-transparent px-6 text-sm font-bold text-text-primary transition-colors duration-300 hover:bg-accent hover:text-on-accent active:bg-accent-pressed"
        >
          Find a tutor
        </Link>
      </div>
    </article>
  );
}
