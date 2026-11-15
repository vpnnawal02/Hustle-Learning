import Link from "next/link";
import type { TutoringOption } from "./tutoring";

export default function TutoringCard({
  option,
  ctaHref = "/classes",
}: {
  option: TutoringOption;
  ctaHref?: string;
}) {
  const Icon = option.icon;
  return (
    <article className="flex h-full min-w-0 flex-col rounded-lg border border-border bg-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgb(0_0_0/0.25)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface-muted text-text-primary">
          <Icon size={20} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-text-primary">{option.title}</h3>
      </div>
      <div aria-hidden="true" className="my-4 h-px bg-border" />
      <p className="text-[15px] leading-[1.6] text-text-secondary">
        {option.description}
      </p>
      <div className="mt-auto pt-6">
        <Link
          href={ctaHref}
          aria-label={`Find a tutor for ${option.title}`}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Find a tutor
        </Link>
      </div>
    </article>
  );
}
