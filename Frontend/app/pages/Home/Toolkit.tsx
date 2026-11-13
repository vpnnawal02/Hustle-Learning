import Image from "next/image";
import Link from "next/link";
import freeBackgroundImg from "../../assets/images/free-background-img.png";
import Reveal from "../../components/Reveal";
import ToolkitCard from "../../components/ToolkitCard";
import { TOOLKIT_RESOURCES } from "../../components/toolkit";

const middle = TOOLKIT_RESOURCES.slice(0, -1);
const last = TOOLKIT_RESOURCES[TOOLKIT_RESOURCES.length - 1];

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
          Your Complete Learning Toolkit
        </h2>
        <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-text-secondary sm:text-2xl">
          Everything You Need to Prepare Smarter.
        </p>
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
          <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-lg p-6 sm:p-8 lg:min-h-[420px]">
            <Image
              src={freeBackgroundImg}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1024px) 85vw, 640px"
              loading="lazy"
              className="object-cover object-center"
            />
            {/* Light legibility wash so navy copy keeps contrast over the artwork */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-transparent"
            />
            <div className="relative">
              <p className="text-sm font-semibold text-brand-navy/70">
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
            <div className="relative mt-6">
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
