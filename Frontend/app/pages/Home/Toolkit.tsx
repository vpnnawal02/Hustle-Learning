import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../../components/Reveal";
import { TOOLKIT_RESOURCES } from "../../components/toolkit";

export default function Toolkit() {
  return (
    <section
      aria-labelledby="toolkit-heading"
      className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-10 pb-12 md:px-6 md:pb-16"
    >
      <Reveal>
        <h2
          id="toolkit-heading"
          className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-text-primary sm:text-4xl lg:text-[44px]"
        >
          Everything for Better Preparation
        </h2>
        <p className="mt-3 text-lg font-semibold text-text-primary sm:text-xl">
          Study, practise and assess your understanding.
        </p>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-text-muted sm:text-base">
          Find the right learning resources for every stage of your
          preparation, from understanding concepts to exam-level practice.
        </p>
      </Reveal>

      <nav
        aria-label="Learning resources"
        className="mx-auto mt-8 w-full max-w-[880px]"
      >
        <ul className="border-y border-border">
          {TOOLKIT_RESOURCES.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <li key={resource.id}>
                <Reveal delay={Math.min(i, 5) * 60}>
                  <Link
                    href="/subscribe"
                    aria-label={`${resource.title} — ${resource.description}`}
                    className="group flex items-center gap-4 px-4 py-4 transition-colors duration-150 hover:bg-surface-muted/60 focus-visible:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-accent motion-reduce:transition-none"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface-muted text-text-primary transition-colors duration-150 group-hover:bg-surface-subtle motion-reduce:transition-none"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-text-primary md:truncate">
                        {resource.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-text-muted md:truncate">
                        {resource.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-text-primary"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
