import Link from "next/link";
import type { TutoringOption } from "./tutoring";

const TONES = ["tutor-tone-0", "tutor-tone-1", "tutor-tone-2"] as const;

export default function TutoringCard({
  option,
  tone = 0,
  ctaHref = "/classes",
}: {
  option: TutoringOption;
  tone?: 0 | 1 | 2;
  ctaHref?: string;
}) {
  const Icon = option.icon;
  return (
    <article
      className={`tutor-ink flex h-full min-w-0 flex-col rounded-lg p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${TONES[tone % 3]}`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-white text-brand-navy">
          <Icon size={20} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold">{option.title}</h3>
      </div>
      <div aria-hidden="true" className="tutor-rule my-4 h-px" />
      <p className="text-[15px] leading-[1.6] opacity-80">
        {option.description}
      </p>
      <div className="mt-auto pt-6">
        <Link
          href={ctaHref}
          aria-label={`Find a tutor for ${option.title}`}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand-white px-6 text-sm font-bold text-brand-navy transition-opacity hover:opacity-90 active:opacity-80"
        >
          Find a tutor
        </Link>
      </div>
    </article>
  );
}
