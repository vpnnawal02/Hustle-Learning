import Link from "next/link";
import { ArrowRight, House, MonitorSmartphone } from "lucide-react";
import Reveal from "../../components/Reveal";
import { SectionHeading } from "../../components/typography";

const TUTOR_CARDS = [
  {
    icon: House,
    bg: "bg-[#FDEBC8]",
    title: "Personal Home Tutor",
    text: "Get individual attention and personalised academic guidance from the comfort of your home.",
    meta: "All subjects · Classes 1–12 · Delhi",
    cta: "Find a home tutor",
    href: "/home-tuitions",
  },
  {
    icon: MonitorSmartphone,
    bg: "bg-[#E3EDFA]",
    title: "Personal Online Tutor",
    text: "Learn from anywhere with dedicated one-to-one online tutoring sessions.",
    meta: "All subjects · Flexible timings",
    cta: "Explore online tutoring",
    href: "/pricing",
  },
];

export default function OneOnOneClasses() {
  return (
    <section
      aria-labelledby="one-on-one-heading"
      className="border-b-1 border-border bg-surface py-10 md:py-14"
    >
      <div className="relative mx-auto w-full max-w-[var(--container-wide)] px-4 pt-10 pb-12 md:px-6 md:pt-14 md:pb-16">
        <Reveal variant="right">
          <SectionHeading
            titleId="one-on-one-heading"
            title="Personalised Learning"
            sub="One Student. One Teacher. Undivided Attention."
            subTone="secondary"
            description="Get personalised academic support with one-on-one classes tailored to your learning needs. Choose online or offline classes, clear your doubts, strengthen concepts, and learn at your own pace."
          />
        </Reveal>
        <Reveal variant="up" delay={100}>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Online Classes", "Offline Home Tuition"].map((mode) => (
              <span
                key={mode}
                className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1 text-[12px] font-bold tracking-wide text-text-primary uppercase"
              >
                <span
                  aria-hidden="true"
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded bg-accent"
                />
                {mode}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-[1020px] gap-4 md:grid-cols-2 lg:gap-6">
          {TUTOR_CARDS.map((card, i) => (
            <Reveal key={card.title} variant="up" delay={i * 90} className="h-full">
              <article
                className={`flex h-full flex-col rounded-md ${card.bg} p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)] sm:p-7`}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/80 text-brand-navy">
                    <card.icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {card.title}
                  </h3>
                </span>
                <p className="mt-3 text-sm leading-[1.65] text-brand-navy/80">
                  {card.text}
                </p>
                <p className="mt-3 text-[13px] font-semibold text-brand-navy">
                  {card.meta}
                </p>
                <div className="mt-auto pt-4">
                  <Link
                    href={card.href}
                    aria-label={card.cta}
                    className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    {card.cta}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={120}>
          <Link
            href="/join-as-tutor"
            aria-label="Join Hustle Learning as a tutor"
            className="mx-auto mt-4 flex w-full max-w-[1020px] flex-col gap-4 rounded-md bg-[#E9EAFB] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(43,58,143,0.45)] sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:mt-6"
          >
            <span>
              <span className="block text-lg font-bold text-brand-navy">
                Are you a tutor? Turn your teaching skills into opportunities.
              </span>
              <span className="mt-1 block text-sm leading-snug text-brand-navy/70">
                Free registration · First placement commission-free · Home and
                online tuition opportunities.
              </span>
            </span>
            <span className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-brand-navy px-6 text-sm font-bold text-brand-white">
              Join as a Tutor
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
