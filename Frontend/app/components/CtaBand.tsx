import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-band-heading" className="band cta-band">
      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col items-start gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 md:py-14">
        <Reveal variant="up">
          <p className="text-xs font-bold uppercase tracking-[1.2px] text-accent">
            Free counselling
          </p>
          <h2
            id="cta-band-heading"
            className="mt-2 max-w-[24ch] text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            Not sure where to begin? Talk to us first.
          </h2>
          <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.6] text-white/75">
            Share your class and subjects — our counsellor will call you back
            on WhatsApp with the right plan for notes, classes, tuition, or
            books.
          </p>
        </Reveal>
        <Reveal variant="scale" delay={120} className="shrink-0">
          <Link
            href="/#hero-enquiry"
            className="inline-flex h-12 items-center justify-center rounded bg-accent px-7 text-sm font-bold tracking-wide text-on-accent uppercase transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Get a free callback
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
