import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";

const PILLARS = [
  {
    index: "01",
    title: "Learn for Free",
    text: "Access study notes, test papers, worksheets, and other educational resources to strengthen your understanding and support your everyday preparation.",
  },
  {
    index: "02",
    title: "Practise with Purpose",
    text: "Unlock extended question banks, exam-focused chapter explanations, and Drill Mode to practise questions based on your class, subject, and chapter while tracking your progress.",
  },
  {
    index: "03",
    title: "Prepare at the Next Level",
    text: "Get access to daily practice problems, weekly tests, extensive question banks across different marks and question formats, and competitive-level questions with solutions to challenge your understanding.",
  },
];

export default function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      id="who-we-are"
      className="band band-who scroll-mt-24"
    >
      <div className="relative mx-auto w-full max-w-[1380px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-8">
          <Reveal variant="up" className="min-w-0">
            <h2
              id="who-we-are-heading"
              className="text-4xl leading-[1.05] font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-[56px]"
            >
              Who we are
            </h2>
            <p className="mt-3 max-w-[28ch] text-xl leading-snug font-bold text-text-secondary sm:text-2xl">
              Smarter Preparation. Stronger Concepts. Better Practice.
            </p>
            <div className="mt-4 flex max-w-[68ch] flex-col gap-4 text-base leading-[1.6] text-text-secondary sm:text-lg">
              <Reveal variant="none" delay={90}>
                <p>
                  Hustle Learning is a student-focused learning platform
                  designed to make exam preparation more structured, effective,
                  and accessible. We combine comprehensive study resources,
                  exam-oriented explanations, extensive question banks, and
                  intelligent practice tools to help students build confidence
                  and master their subjects.
                </p>
              </Reveal>
              <Reveal variant="none" delay={160}>
                <p>
                  Whether you&apos;re revising a chapter, practising questions
                  under time constraints, or preparing for your next
                  examination, Hustle Learning gives you the resources and
                  tools to prepare with purpose.
                </p>
              </Reveal>
            </div>
            <div className="mt-6">
              <p className="text-base font-bold text-text-primary">
                Vipin Nawal
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                Founder and Educator
              </p>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            delay={140}
            className="relative mx-auto min-h-[420px] w-full max-w-[440px] overflow-hidden rounded-xl sm:min-h-[500px] lg:mx-0 lg:max-w-none"
          >
            <Image
              src="/owner.png"
              alt="Vipin Nawal, Founder and Educator of Hustle Learning"
              fill
              sizes="(max-width: 1024px) 80vw, 440px"
              loading="lazy"
              className="object-cover object-top"
            />
          </Reveal>
        </div>

        <Reveal
          variant="up"
          className="mt-12 max-w-[24ch] text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl"
        >
          <h3>Everything You Need to Learn, Practise, and Improve</h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.index}
              variant="up"
              delay={Math.min(i, 2) * 100}
            >
              <article className="lift flex h-full flex-col rounded-sm border border-border bg-surface p-6">
                <span
                  aria-hidden="true"
                  className="text-sm font-extrabold tracking-widest text-accent"
                >
                  {pillar.index}
                </span>
                <h4 className="mt-2 text-lg font-bold text-text-primary">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
                  {pillar.text}
                </p>
                <div className="mt-auto flex justify-center pt-5">
                  <Link
                    href="/subscribe"
                    aria-label={`Know more about ${pillar.title}`}
                    className="inline-flex h-11 items-center justify-center rounded bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Know more
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={80} className="mt-12">
          <div className="grid gap-6 rounded-sm border border-border bg-surface-muted/60 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                Our Approach
              </h3>
              <div className="mt-3 flex max-w-[72ch] flex-col gap-3 text-base leading-[1.6] text-text-secondary">
                <p>
                  We believe effective preparation requires more than reading
                  notes or memorising answers. Students need to understand
                  concepts, practise consistently, identify weaknesses, and
                  learn from their mistakes.
                </p>
                <p>
                  That&apos;s why Hustle Learning brings learning resources,
                  structured practice, and progress tracking together in one
                  platform.
                </p>
              </div>
            </div>
            <p className="border-l-4 border-accent pl-4 text-xl font-extrabold tracking-tight whitespace-nowrap text-text-primary uppercase sm:text-2xl">
              Learn Smart.
              <br />
              Hustle Hard.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
