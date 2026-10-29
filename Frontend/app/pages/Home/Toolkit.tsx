import Link from "next/link";
import Reveal from "../../components/Reveal";
import ToolkitCard from "../../components/ToolkitCard";
import { TOOLKIT_RESOURCES } from "../../components/toolkit";

const middle = TOOLKIT_RESOURCES.slice(0, -1);
const last = TOOLKIT_RESOURCES[TOOLKIT_RESOURCES.length - 1];

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
          className="mt-2 max-w-[24ch] text-3xl leading-[1.1] font-extrabold tracking-tight text-balance text-text-primary sm:text-4xl lg:text-[44px]"
        >
          Everything You Need to Prepare Smarter.
        </h2>
        <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg">
          From understanding NCERT concepts to practising exam-level
          questions, find the right resources for every stage of your
          preparation.
        </p>
      </Reveal>

      {/* Bento on desktop, slider on mobile */}
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {/* Brand anchor tile */}
        <Reveal className="w-[85%] shrink-0 snap-start sm:w-[52%] lg:col-span-2 lg:row-span-2 lg:w-auto">
          <div className="flex h-full min-h-[320px] flex-col justify-between rounded-lg bg-accent p-6 sm:p-8 lg:min-h-[420px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.2px] text-brand-navy/70">
                Hustle Learning Resources
              </p>
              <p className="mt-3 max-w-[16ch] text-3xl leading-[1.05] font-extrabold tracking-tight text-balance text-brand-navy sm:text-4xl lg:text-[44px]">
                Learn. Practise. Improve.
              </p>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] font-medium text-brand-navy/75">
                Notes, question banks, drills, and test papers — one toolkit
                for every stage of preparation.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/subscribe"
                className="inline-flex h-12 items-center justify-center rounded bg-brand-navy px-7 text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-80"
              >
                Explore Our Resources
              </Link>
            </div>
          </div>
        </Reveal>

        {middle.map((resource, i) => (
          <Reveal
            key={resource.id}
            delay={Math.min(i, 3) * 80}
            className="w-[68%] shrink-0 snap-start sm:w-[38%] lg:w-auto"
          >
            <ToolkitCard resource={resource} />
          </Reveal>
        ))}

        {last && (
          <Reveal
            delay={240}
            className="w-[68%] shrink-0 snap-start sm:w-[38%] lg:w-auto"
          >
            <ToolkitCard resource={last} featured />
          </Reveal>
        )}
      </div>
    </section>
  );
}
