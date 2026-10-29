import Reveal from "../../components/Reveal";
import TutoringCard from "../../components/TutoringCard";
import { TUTORING_OPTIONS } from "../../components/tutoring";

export default function OneOnOneClasses() {
  return (
    <section
      aria-labelledby="one-on-one-heading"
      className="border-b-1 border-border bg-surface py-10 md:py-14"
    >
      <div className="relative mx-auto w-full max-w-[1380px] px-4 pt-10 pb-12 md:px-6 md:pt-14 md:pb-16">
        <Reveal variant="right">
          <h2
            id="one-on-one-heading"
            className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-[56px]"
          >
            Personalised Learning
          </h2>
          <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-text-secondary sm:text-2xl">
            One Student. One Teacher. Undivided Attention.
          </p>
        </Reveal>
        <Reveal variant="up" delay={100}>
          <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-md">
            Get personalised academic support with one-on-one classes tailored
            to your learning needs. Choose online or offline classes, clear
            your doubts, strengthen concepts, and learn at your own pace.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Online Classes", "Offline Home Tuition"].map((mode) => (
              <span
                key={mode}
                className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1 text-[12px] font-bold tracking-wide text-text-primary uppercase"
              >
                <span
                  aria-hidden="true"
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                {mode}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {TUTORING_OPTIONS.map((option, i) => (
            <Reveal
              key={option.id}
              variant="up"
              delay={Math.min(i, 2) * 90}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
            >
              <TutoringCard option={option} tone={(i % 3) as 0 | 1 | 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
