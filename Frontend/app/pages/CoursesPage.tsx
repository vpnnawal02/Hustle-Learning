import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Footer from "../components/Footer";
import ClassHubCard from "../components/ClassHubCard";
import JsonLd from "../components/seo/JsonLd";
import { CLASS_HUB } from "../components/class-courses";
import { faqJsonLd } from "@/lib/seo";
import liveClassesImg from "../assets/images/hero-section-images/live-classes.png";

const ON_THIS_PAGE = [
  { href: "#by-class", label: "Explore by class" },
  { href: "#subjects", label: "Subjects covered" },
  { href: "#why-hustle", label: "Why Hustle Learning" },
  { href: "#how-to-choose", label: "How to choose" },
  { href: "#faqs", label: "FAQs" },
];

const CLASS_SECTIONS = [
  {
    id: "class-6-courses",
    heading: "Online Courses for Class 6",
    body: "Class 6 is an important stage in a student's academic journey — concepts go deeper and the school curriculum becomes more structured. Our Class 6 courses cover English, Hindi, Mathematics, Science and Social Science, focusing on strong fundamentals, subject understanding and classroom confidence.",
    courseHref: "/courses/class-6",
    courseCta: "live" as const,
    materialHref: "/class-6",
  },
  {
    id: "class-7-courses",
    heading: "Online Courses for Class 7",
    body: "Class 7 introduces more detailed concepts across subjects, and a clear understanding at this stage makes subsequent years easier to manage. Hustle Learning's Class 7 courses strengthen Mathematics, Science, English, Hindi and Social Science through structured online learning.",
    courseHref: "/courses/class-7",
    courseCta: "live" as const,
    materialHref: "/class-7",
  },
  {
    id: "class-8-courses",
    heading: "Online Courses for Class 8",
    body: "Class 8 bridges middle school and secondary education. Students meet increasingly complex concepts and need stronger analytical, language and problem-solving skills. Our Class 8 courses cover major school subjects with an emphasis on conceptual understanding and academic consistency.",
    courseHref: "/courses/class-8",
    courseCta: "live" as const,
    materialHref: "/class-8",
  },
  {
    id: "class-9-courses",
    heading: "Online Courses for Class 9",
    body: "Class 9 marks the beginning of secondary-level education. Hustle Learning's Class 9 courses cover Mathematics, Science, English, Hindi and Social Science, focusing on understanding concepts, developing problem-solving abilities and building a strong foundation for Class 10.",
    courseHref: "/courses/class-9",
    courseCta: "live" as const,
    materialHref: "/class-9",
  },
  {
    id: "class-10-courses",
    heading: "Online Courses for Class 10",
    body: "Class 10 is the board-examination year. Our courses support syllabus understanding, subject knowledge and systematic exam preparation across Mathematics, Science, English, Hindi and Social Science — with emphasis on conceptual clarity and regular learning.",
    courseHref: "/courses/class-10",
    courseCta: "live" as const,
    materialHref: "/class-10",
  },
];

const SUBJECTS = [
  {
    name: "Mathematics",
    href: "/subjects/mathematics",
    body: "More than memorising formulas — understanding concepts, logical thinking and varied problem practice for confidence in numerical and analytical questions.",
  },
  {
    name: "Science",
    href: "/subjects/science",
    body: "Physics, Chemistry and Biology topics that build conceptual clarity about the natural and physical world.",
  },
  {
    name: "English",
    href: "/subjects/english",
    body: "Reading comprehension, grammar, vocabulary, writing skills and literature for stronger communication.",
  },
  {
    name: "Hindi",
    href: "/subjects/hindi",
    body: "Hindi language and literature — grammar, comprehension, writing skills and prescribed literary content by class.",
  },
  {
    name: "Social Science",
    href: "/subjects/social-science",
    body: "History, Geography, Civics and Economics — subject knowledge plus interpreting and explaining information.",
  },
];

const WHY_POINTS = [
  {
    title: "Class-wise learning",
    body: "Explore courses matched to your school class instead of unrelated material.",
  },
  {
    title: "Subject-focused courses",
    body: "Each course is organised around specific subjects you want to improve.",
  },
  {
    title: "Live online classes",
    body: "Structured teaching sessions with a real learning environment.",
  },
  {
    title: "Concept-based teaching",
    body: "Understanding over memorisation — for tackling any question type.",
  },
  {
    title: "Multiple subjects, one platform",
    body: "Mathematics, Science, English, Hindi and Social Science together.",
  },
  {
    title: "Affordable options",
    body: "Structured academic learning accessible to more families.",
  },
];

const STEPS = [
  "Select your current school class.",
  "Explore the available courses for that class.",
  "Choose the subject or combination of subjects you want to study.",
  "Review the course details, learning structure and applicable fees.",
  "Enrol in the course that matches your learning requirements.",
];

const FAQS = [
  {
    q: "What online courses does Hustle Learning offer?",
    a: "Class-wise online courses for school students in Mathematics, Science, English, Hindi and Social Science, depending on the class and course.",
  },
  {
    q: "Which classes are covered by Hustle Learning?",
    a: "Classes 6, 7, 8, 9 and 10. Course availability and subject combinations may vary by class.",
  },
  {
    q: "Are Hustle Learning courses aligned with the CBSE curriculum?",
    a: "Yes — our school-level courses are designed around CBSE academic requirements. Check individual course details for syllabus coverage.",
  },
  {
    q: "Does Hustle Learning provide live online classes?",
    a: "Yes. We offer live online batch classes; available batches and subjects depend on the class and current offerings.",
  },
  {
    q: "Which subjects can students study online?",
    a: "Mathematics, Science, English, Hindi and Social Science, subject to availability for their class.",
  },
  {
    q: "Are online classes available for Class 9 and Class 10?",
    a: "Yes. Explore the available subject-wise programmes for Classes 9 and 10 on this page.",
  },
  {
    q: "Can I enrol in more than one subject?",
    a: "Students can explore individual subject courses and available combinations — see the individual course details for enrolment options.",
  },
  {
    q: "How much do online courses at Hustle Learning cost?",
    a: "Fees depend on the selected course and programme — currently ₹499/- per month or ₹5000/- per academic year for live batches. Check individual course details for pricing.",
  },
  {
    q: "How can I enrol in a Hustle Learning course?",
    a: "Browse the courses, select your class, choose your course and follow the enrolment instructions on the course page — or start at our enrolment form.",
  },
  {
    q: "Is Hustle Learning suitable for students who need help with school subjects?",
    a: "Yes — our subject-focused courses are designed to build conceptual understanding and strengthen academic foundations.",
  },
];

export default function CoursesPage() {
  const faqSchema = faqJsonLd(
    FAQS.map((f) => ({ question: f.q, answer: f.a })),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      {faqSchema && <JsonLd data={faqSchema} />}
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <section
          aria-labelledby="courses-heading"
          className="rounded-md bg-brand-navy px-5 py-8 sm:px-8 sm:py-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1
                id="courses-heading"
                className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl lg:text-[44px]"
              >
                Online Courses for CBSE Students – Classes 6 to 10
              </h1>
              <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-brand-white/85 sm:text-2xl">
                Small batches. Real teachers. Affordable fees.
              </p>
              <p className="mt-4 max-w-[60ch] text-base leading-[1.6] text-brand-white/75">
                Explore online courses for CBSE students at Hustle Learning,
                designed to make school learning more structured, engaging and
                effective. Our class-wise courses help students understand
                subjects, strengthen fundamentals and progress confidently
                through school.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/enroll"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Enrol now
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
                >
                  View pricing
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden h-52 w-full max-w-[420px] sm:h-64 md:block">
              <Image
                src={liveClassesImg}
                alt="Teacher taking a live online class for school students"
                fill
                sizes="420px"
                priority
                className="rounded-md object-cover object-center"
              />
            </div>
          </div>
        </section>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
              {CLASS_HUB.map((info) => (
                <div
                  key={info.slug}
                  className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
                >
                  <ClassHubCard info={info} />
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-md border border-accent/50 bg-accent/10 p-5 sm:flex-row sm:items-center sm:gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-on-accent"
              >
                <Clock size={18} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-primary">
                  More classes on the way — coming soon
                </p>
                <p className="mt-0.5 text-sm leading-snug text-text-secondary">
                  Class 11 &amp; 12 · JEE Mains / Advanced · NEET batches.
                </p>
              </div>
            </div>

            <p className="mt-8 text-base leading-[1.7] text-text-secondary">
              Whether your child is in Class 6, 7, 8, 9 or 10 — from
              Mathematics and Science to English, Hindi and Social Science —
              find the right course and take the next step towards better
              learning.
            </p>

            <div className="mt-8">
              <section aria-labelledby="by-class" className="scroll-mt-24">
                <h2
                  id="by-class"
                  className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
                >
                  Explore Online Courses by Class
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-text-secondary sm:text-base">
                  Every class comes with different academic requirements.
                  Middle school builds foundational knowledge; secondary
                  classes demand deeper understanding and structured
                  preparation. Hustle Learning provides class-wise courses
                  matched to each academic level.
                </p>

                {CLASS_SECTIONS.map((cls) => (
                  <section
                    key={cls.id}
                    aria-labelledby={cls.id}
                    className="mt-8 scroll-mt-24"
                  >
                    <h3
                      id={cls.id}
                      className="text-lg font-bold text-text-primary sm:text-xl"
                    >
                      {cls.heading}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">
                      {cls.body}
                    </p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                      <Link
                        href={cls.courseHref}
                        className="inline-flex items-center gap-1 text-text-primary underline underline-offset-4 hover:text-accent-700"
                      >
                        {cls.courseCta === "live"
                          ? `View ${cls.heading.replace("Online Courses for ", "")} courses`
                          : `Get notified about ${cls.heading.replace("Online Courses for ", "")} courses`}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      <Link
                        href={cls.materialHref}
                        className="inline-flex items-center gap-1 text-text-secondary underline underline-offset-4 hover:text-text-primary"
                      >
                        Free study material
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </p>
                  </section>
                ))}
              </section>

              <section aria-labelledby="subjects" className="mt-12 scroll-mt-24">
                <h2
                  id="subjects"
                  className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
                >
                  Subjects Covered in Our Online Courses
                </h2>
                <dl className="mt-4 flex flex-col gap-4">
                  {SUBJECTS.map((s) => (
                    <div key={s.name}>
                      <dt className="text-[15px] font-bold text-text-primary">
                        <Link
                          href={s.href}
                          className="underline-offset-4 hover:underline"
                        >
                          {s.name}
                        </Link>
                      </dt>
                      <dd className="mt-0.5 text-[15px] leading-[1.7] text-text-secondary">
                        {s.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section
                aria-labelledby="why-hustle"
                className="mt-12 scroll-mt-24"
              >
                <h2
                  id="why-hustle"
                  className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
                >
                  Why Choose Hustle Learning for Online Classes?
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {WHY_POINTS.map((w) => (
                    <div
                      key={w.title}
                      className="rounded-md border border-border bg-surface p-4"
                    >
                      <p className="text-[15px] font-bold text-text-primary">
                        {w.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {w.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="how-to-choose"
                className="mt-12 scroll-mt-24"
              >
                <h2
                  id="how-to-choose"
                  className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
                >
                  How to Choose the Right Course?
                </h2>
                <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-[1.7] text-text-secondary marker:font-bold marker:text-text-primary">
                  {STEPS.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="mt-4 text-[15px] leading-[1.7] text-text-secondary">
                  From fundamentals in Class 6 to board preparation in Class
                  10, every stage deserves the right support.{" "}
                  <strong className="text-text-primary">
                    Start learning with Hustle Learning. Learn Smart. Hustle
                    Hard.
                  </strong>
                </p>
              </section>

              <section aria-labelledby="faqs" className="mt-12 scroll-mt-24">
                <h2
                  id="faqs"
                  className="text-2xl leading-tight font-semibold text-balance text-text-primary sm:text-[28px]"
                >
                  Frequently Asked Questions
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {FAQS.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-md border border-border bg-surface px-4 py-3"
                    >
                      <summary className="cursor-pointer text-[15px] font-semibold text-text-primary">
                        {f.q}
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside aria-label="Page sections" className="min-w-0">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <nav
                aria-label="On this page"
                className="rounded-md border border-border bg-surface p-5"
              >
                <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                  On this page
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {ON_THIS_PAGE.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                aria-label="Explore classes"
                className="rounded-md border border-border bg-surface p-5"
              >
                <p className="text-xs font-bold tracking-[0.08em] text-text-muted uppercase">
                  Explore classes
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>
                    <Link
                      href="/courses/class-6"
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      Class 6 courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/class-7"
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      Class 7 courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/class-8"
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      Class 8 courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/class-10"
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      Class 10 study material
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/enroll"
                      className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                    >
                      Enrol now
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
