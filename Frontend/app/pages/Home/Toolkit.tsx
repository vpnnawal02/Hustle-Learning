import Link from "next/link";
import Reveal from "../../components/Reveal";
import ToolkitCard from "../../components/ToolkitCard";
import { TOOLKIT_RESOURCES } from "../../components/toolkit";

export default function Toolkit() {
  return (
    <section
      aria-labelledby="toolkit-heading"
      className="mx-auto w-full max-w-[1380px] px-4 pt-10 pb-12 md:px-6 md:pb-16"
    >
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
          Your Complete Learning Toolkit
        </p>
        <h2
          id="toolkit-heading"
          className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-[44px]"
        >
          Everything You Need to Prepare Smarter.
        </h2>
        <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          From understanding NCERT concepts to practising exam-level
          questions, find the right resources for every stage of your
          preparation.
        </p>
        <Link
          href="/subscribe"
          className="mt-5 inline-flex h-11 items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
        >
          Explore Our Resources
        </Link>
      </Reveal>

      {/* Slider on mobile/tablet, 4-column grid on desktop */}
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {TOOLKIT_RESOURCES.map((resource, i) => (
          <Reveal
            key={resource.id}
            delay={Math.min(i, 3) * 80}
            className="w-[68%] shrink-0 snap-start sm:w-[38%] lg:w-auto"
          >
            <ToolkitCard resource={resource} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
