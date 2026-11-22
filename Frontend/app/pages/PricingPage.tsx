import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import { SectionHeading } from "../components/typography";
import { PlanCard } from "../components/PlanCard";
import onlineLearningImg from "../assets/images/hero-section-images/online-learning.png";
import batchClassesImg from "../assets/images/online-batch-classes.png";
import { PLANS } from "../components/subscription";

const BATCH_FEATURES = [
  "Interactive online learning sessions.",
  "Structured concept-based teaching.",
  "Group discussions and doubt-solving.",
  "Regular academic guidance.",
  "Examination-oriented preparation.",
];

const HOME_TUTOR_FEATURES = [
  "One-to-one teaching and academic support.",
  "Lessons based on your learning requirements.",
  "Individual attention and doubt clarification.",
  "Focused concept building.",
  "Support with school curriculum and examination preparation.",
];

const ONLINE_TUTOR_FEATURES = [
  "Personalised one-to-one teaching.",
  "Flexible online learning.",
  "Individual attention and doubt-solving.",
  "Concept clarification and subject-focused guidance.",
  "Learning at your own pace.",
];

function CheckList({ items, iconClassName = "text-brand-navy" }: { items: string[]; iconClassName?: string }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check
            aria-hidden="true"
            size={18}
            strokeWidth={2.5}
            className={`mt-0.5 shrink-0 ${iconClassName}`}
          />
          <span className="text-sm leading-[1.6] text-text-secondary">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
      {/* Hero */}
      <section
        aria-labelledby="pricing-heading"
        className="rounded-md bg-amber-100 px-5 py-8 sm:px-8 sm:py-10"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1
              id="pricing-heading"
              className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-[#141B2D] sm:text-4xl lg:text-[44px]"
            >
              Choose the Learning Support That Works for You
            </h1>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.6] text-[#4A5568]">
              Every student has different learning needs. Whether you prefer
              independent study, interactive batch classes or personalised
              one-to-one guidance, Hustle Learning offers flexible learning
              options to support your academic journey.
            </p>
            <p className="mt-3 max-w-[60ch] text-base leading-[1.6] text-[#4A5568]">
              Explore our services and find the right fit for your learning
              goals.
            </p>
            <Link
              href="#plans"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              View plans
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="relative mx-auto hidden h-52 w-full max-w-[420px] sm:h-64 md:block">
            <Image
              src={onlineLearningImg}
              alt="Tablet with recorded lessons stacked on study books"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              priority
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>
      <hr aria-hidden="true" className="mt-14 border-border" />

      {/* Monthly subscriptions */}
      <section aria-labelledby="plans-heading" id="plans" className="mt-14 scroll-mt-28">
        <Reveal>
          <SectionHeading
            titleId="plans-heading"
            title="Monthly Subscriptions"
            description="Access additional learning resources, structured practice materials and assessments to strengthen your preparation."
          />
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-[1120px] gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </section>
      <hr aria-hidden="true" className="mt-14 border-border" />

      {/* Online batch classes */}
      <section aria-labelledby="batch-heading" id="batch-classes" className="mt-14 scroll-mt-28">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <SectionHeading
                  titleId="batch-heading"
                  title="Online Batch Classes"
                  description="Learn alongside other students through structured online classes designed to support your academic curriculum."
                />
                <div className="mt-5">
                  <CheckList items={BATCH_FEATURES} iconClassName="text-amber-600" />
                </div>
                <div className="mt-6 rounded-md bg-blue-50 p-5 sm:p-6">
                  <p className="text-[11px] font-bold tracking-[0.1em] text-text-muted uppercase">
                    Pricing
                  </p>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-3 text-2xl font-extrabold tracking-tight text-text-primary">
                    <span>
                      ₹499{" "}
                      <span className="text-sm font-medium text-text-muted">
                        per month
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-border">
                      |
                    </span>
                    <span>
                      ₹5,000{" "}
                      <span className="text-sm font-medium text-text-muted">
                        per academic year
                      </span>
                    </span>
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-text-secondary">
                    Online batch classes are available separately and are not
                    included in subscription plans.
                  </p>
                  <Link
                    href="/courses"
                    className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Explore batch classes
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <figure className="overflow-hidden rounded-md border border-border">
                <span className="relative block aspect-[16/10] w-full">
                  <Image
                    src={batchClassesImg}
                    alt="Students attending an online batch class with their teacher"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </span>
              </figure>
          </div>
        </Reveal>
      </section>
      <hr aria-hidden="true" className="mt-14 border-border" />

      {/* Personal tutoring */}
      <section aria-labelledby="tutoring-heading" id="tutoring" className="mt-14 scroll-mt-28">
        <Reveal>
          <SectionHeading
            titleId="tutoring-heading"
            title="Personal Tutoring"
          />
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-200 hover:border-text-muted">
              <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text-primary">
                Personal Home Tutor
              </h3>
              <p className="mt-1 text-sm leading-snug text-text-secondary">
                Get individual attention and personalised academic guidance
                from the comfort of your home.
              </p>
              <div className="mt-4">
                <CheckList items={HOME_TUTOR_FEATURES} />
              </div>
              <p className="mt-auto pt-5 text-2xl font-extrabold tracking-tight text-text-primary">
                Starting at ₹4,999
              </p>
              <p className="mt-1 text-[13px] leading-snug text-text-secondary">
                Final pricing depends on the student&apos;s class, subjects,
                location and tuition requirements.
              </p>
              <Link
                href="/#hero-enquiry"
                aria-label="Request a callback about personal home tutoring"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Request a callback
              </Link>
              </div>
            </article>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-200 hover:border-text-muted">
              <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text-primary">
                Personal Online Tutor
              </h3>
              <p className="mt-1 text-sm leading-snug text-text-secondary">
                Learn from anywhere with dedicated one-to-one online tutoring
                sessions.
              </p>
              <div className="mt-4">
                <CheckList items={ONLINE_TUTOR_FEATURES} />
              </div>
              <p className="mt-auto pt-5 text-2xl font-extrabold tracking-tight text-text-primary">
                Starting at ₹499{" "}
                <span className="text-sm font-medium text-text-muted">
                  per hour
                </span>
              </p>
              <Link
                href="/#hero-enquiry"
                aria-label="Request a callback about personal online tutoring"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Request a callback
              </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
      <hr aria-hidden="true" className="mt-14 border-border" />

      {/* Closing */}
      <div className="mt-14">
        <CtaBand />
      </div>
    </div>
  );
}
