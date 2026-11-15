import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, GraduationCap } from "lucide-react";
import Faq from "../components/resources/Faq";
import Reveal from "../components/Reveal";
import { PlanCard } from "../components/PlanCard";
import onlineLearningImg from "../assets/images/hero-section-images/online-learning.png";
import { getClasses } from "@/lib/data/school";
import { urls } from "@/lib/urls";
import { PLANS, PRICING_FAQS } from "../components/subscription";

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

const GUIDE = [
  {
    title: "Monthly Subscriptions",
    description:
      "For students who want additional study materials, regular practice and performance tracking.",
  },
  {
    title: "Online Batch Classes",
    description:
      "For students who prefer interactive learning and studying alongside fellow students.",
  },
  {
    title: "Personal Home Tutor",
    description:
      "For students who benefit from individual, face-to-face academic guidance at home.",
  },
  {
    title: "Personal Online Tutor",
    description:
      "For students who want personalised teaching and academic support from anywhere.",
  },
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check
            aria-hidden="true"
            size={18}
            strokeWidth={2.5}
            className="mt-0.5 shrink-0 text-brand-navy"
          />
          <span className="text-sm leading-[1.6] text-text-secondary">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function PricingPage() {
  const classes = await getClasses();
  const ticker: { label: string; href: string }[] = [];
  for (const cls of classes) {
    for (const subject of cls.subjects) {
      if (subject.status !== "published") continue;
      ticker.push({
        label: `${cls.label} ${subject.name}`,
        href: urls.subjectPage(cls.slug, subject.slug),
      });
    }
  }
  const [plus, complete] = PLANS;

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

      {/* Subject ticker — every pill is a real registry destination */}
      {ticker.length > 0 && (
        <div className="group/ticker mt-6 overflow-hidden" aria-label="Explore by class and subject">
          <div className="animate-hero-marquee flex w-max gap-2.5 pr-2.5 group-hover/ticker:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex gap-2.5">
                {ticker.map((t) => (
                  <Link
                    key={`${copy}-${t.label}`}
                    href={t.href}
                    tabIndex={copy === 1 ? -1 : 0}
                    className="inline-flex h-10 shrink-0 items-center rounded-md border border-border bg-surface px-4 text-sm font-semibold whitespace-nowrap text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly subscriptions */}
      <section aria-labelledby="plans-heading" id="plans" className="mt-14 scroll-mt-28">
        <Reveal>
          <h2
            id="plans-heading"
            className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-text-primary sm:text-4xl"
          >
            Monthly Subscriptions
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
            Access additional learning resources, structured practice
            materials and assessments to strengthen your preparation.
          </p>
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-[880px] gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <PlanCard plan={plus} variant="plus" />
          </Reveal>
          <Reveal delay={100} className="h-full">
            <PlanCard plan={complete} variant="complete" plusName={plus.name} />
          </Reveal>
        </div>
      </section>

      {/* Online batch classes */}
      <section aria-labelledby="batch-heading" className="mt-14">
        <Reveal>
          <div className="rounded-md border border-border bg-surface p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2
                  id="batch-heading"
                  className="max-w-[24ch] text-2xl leading-[1.15] text-balance text-text-primary sm:text-3xl"
                >
                  Online Batch Classes
                </h2>
                <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.6] text-text-secondary">
                  Learn alongside other students through structured online
                  classes designed to support your academic curriculum.
                </p>
                <div className="mt-5">
                  <CheckList items={BATCH_FEATURES} />
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-md bg-surface-muted/60 p-6">
                <p className="text-sm font-bold tracking-wide text-text-muted uppercase">
                  Pricing
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary">
                  ₹499{" "}
                  <span className="text-sm font-medium text-text-muted">
                    per month
                  </span>
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-text-primary">
                  ₹5,000{" "}
                  <span className="text-sm font-medium text-text-muted">
                    per session
                  </span>
                </p>
                <p className="mt-3 text-[13px] leading-snug text-text-secondary">
                  Online batch classes are available separately and are not
                  included in subscription plans.
                </p>
                <Link
                  href="/courses"
                  className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Explore batch classes
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Personal tutoring */}
      <section aria-labelledby="tutoring-heading" className="mt-14">
        <Reveal>
          <h2
            id="tutoring-heading"
            className="max-w-[24ch] text-2xl leading-[1.15] text-balance text-text-primary sm:text-3xl"
          >
            Personal Tutoring
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-muted text-text-primary"
              >
                <BookOpen size={18} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">
                Personal Home Tutor
              </h3>
              <p className="mt-1 text-sm leading-snug text-text-secondary">
                Get individual attention and personalised academic guidance
                from the comfort of your home.
              </p>
              <div className="mt-4">
                <CheckList items={HOME_TUTOR_FEATURES} />
              </div>
              <p className="mt-5 text-2xl font-extrabold tracking-tight text-text-primary">
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
            </article>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-muted text-text-primary"
              >
                <GraduationCap size={18} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">
                Personal Online Tutor
              </h3>
              <p className="mt-1 text-sm leading-snug text-text-secondary">
                Learn from anywhere with dedicated one-to-one online tutoring
                sessions.
              </p>
              <div className="mt-4">
                <CheckList items={ONLINE_TUTOR_FEATURES} />
              </div>
              <p className="mt-5 text-2xl font-extrabold tracking-tight text-text-primary">
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
            </article>
          </Reveal>
        </div>
      </section>

      {/* Guide */}
      <section aria-labelledby="guide-heading" className="mt-14">
        <Reveal>
          <h2
            id="guide-heading"
            className="max-w-[24ch] text-2xl leading-[1.15] text-balance text-text-primary sm:text-3xl"
          >
            Find the Right Learning Option
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-x-8 gap-y-6 border-y border-border py-6 sm:grid-cols-2">
          {GUIDE.map((g, i) => (
            <Reveal key={g.title} delay={Math.min(i, 3) * 80}>
              <p className="text-[15px] font-bold text-text-primary">
                {g.title}
              </p>
              <p className="mt-1 text-sm leading-[1.6] text-text-secondary">
                {g.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <div className="mx-auto w-full max-w-[880px]">
        <Faq faqs={PRICING_FAQS} heading="Pricing FAQs" structured />
      </div>

      {/* Closing */}
      <section aria-labelledby="closing-heading" className="mt-14 text-center">
        <Reveal>
          <h2
            id="closing-heading"
            className="mx-auto max-w-[24ch] text-2xl leading-[1.15] text-balance text-text-primary sm:text-3xl"
          >
            Start Your Learning Journey Today
          </h2>
          <p className="mx-auto mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-text-secondary">
            Choose the learning resources, classes or personal guidance that
            suit your academic needs. Learn at your pace. Practise with
            purpose. Make every learning opportunity count.
          </p>
          <Link
            href="/#hero-enquiry"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
          >
            Get started
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
