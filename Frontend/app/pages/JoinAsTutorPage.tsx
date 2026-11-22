import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgePercent,
  BookOpen,
  Briefcase,
  CalendarClock,
  Check,
  ChevronDown,
  FileBadge,
  Gift,
  GraduationCap,
  House,
  IndianRupee,
  Laptop,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/typography";
import JoinSteps from "./join-as-tutor/JoinSteps";
import heroImg from "../assets/images/personal-home-tutor.png";
import onlineTutorImg from "../assets/images/personal-online-tutor.png";
import { CONTACT } from "../components/navbar/navbar-data";

interface InfoCard {
  icon: LucideIcon;
  chip: string;
  title: string;
  text: string;
}

const WHO_CARDS: InfoCard[] = [
  {
    icon: GraduationCap,
    chip: "bg-[#FDEBC8]",
    title: "College Students",
    text: "Pursuing graduation or post-graduation with strong subject knowledge? Earn alongside your studies and develop practical teaching experience.",
  },
  {
    icon: Briefcase,
    chip: "bg-[#E3EDFA]",
    title: "Experienced Teachers",
    text: "Already teaching at a school, coaching centre or independently? Connect with more students and expand your teaching practice.",
  },
  {
    icon: BookOpen,
    chip: "bg-[#E3F1E8]",
    title: "Subject Specialists",
    text: "Expertise in Mathematics, Science, English, Social Science, Commerce or other subjects? Help students understand concepts and improve.",
  },
  {
    icon: Sparkles,
    chip: "bg-[#E9EAFB]",
    title: "Aspiring Educators",
    text: "Want a career in education? Home and online tuition help you gain experience in explaining concepts and understanding students.",
  },
];

const WHY_CARDS: InfoCard[] = [
  {
    icon: Gift,
    chip: "bg-[#FDEBC8]",
    title: "Free Registration",
    text: "Create your tutor profile without paying any registration fee. There are no upfront registration charges.",
  },
  {
    icon: BadgePercent,
    chip: "bg-[#E3F1E8]",
    title: "First Placement Commission-Free",
    text: "Your first successful student placement comes with 0% commission. You keep the entire agreed first month's tuition fee.",
  },
  {
    icon: Users,
    chip: "bg-[#E3EDFA]",
    title: "Access to Tuition Opportunities",
    text: "Get considered for relevant home and online tuition requirements from parents and students looking for academic support.",
  },
  {
    icon: MapPin,
    chip: "bg-[#E9EAFB]",
    title: "Opportunities Across Delhi",
    text: "Explore home tuition opportunities across Delhi, based on your preferred localities, travel distance and availability.",
  },
  {
    icon: Laptop,
    chip: "bg-[#FBEEDF]",
    title: "Online Teaching Opportunities",
    text: "Prefer teaching from home? Register for online tuition opportunities and teach students remotely.",
  },
  {
    icon: BookOpen,
    chip: "bg-[#ECE9FA]",
    title: "Choose Your Subjects and Classes",
    text: "Specify the classes, subjects and academic boards you are comfortable teaching.",
  },
  {
    icon: IndianRupee,
    chip: "bg-[#FDEBC8]",
    title: "Share Your Expected Fees",
    text: "Propose your expected tuition fee. Hustle Learning reviews and approves it before the assignment is offered to you.",
  },
  {
    icon: CalendarClock,
    chip: "bg-[#E3EDFA]",
    title: "Teach According to Your Availability",
    text: "Share your preferred days, timings and teaching locations so we can consider suitable opportunities.",
  },
  {
    icon: Award,
    chip: "bg-[#E3F1E8]",
    title: "Build Your Teaching Experience",
    text: "Work with students from different academic backgrounds and build your experience as an educator.",
  },
];

const EXPECTATIONS = [
  "Provide accurate educational and professional information.",
  "Have adequate knowledge of the subjects they intend to teach.",
  "Be punctual and consistent.",
  "Prepare for tuition sessions.",
  "Communicate professionally with parents and students.",
  "Maintain appropriate professional boundaries.",
  "Treat every student with patience and respect.",
  "Follow the mutually agreed teaching schedule.",
  "Inform parents in advance about unavoidable absences.",
  "Respect student and family privacy.",
  "Maintain a safe and appropriate learning environment.",
];

export const JOIN_TUTOR_FAQS = [
  {
    question: "Is tutor registration free?",
    answer:
      "Yes. Registration with Hustle Learning is completely free. We do not charge any registration fee.",
  },
  {
    question: "Do I have to pay commission for my first tuition?",
    answer:
      "No. Your first successful student placement through Hustle Learning is completely commission-free. You retain 100% of the agreed first month's tuition fee.",
  },
  {
    question: "How much commission is charged on subsequent placements?",
    answer:
      "For the second and every subsequent successful student placement, Hustle Learning charges a one-time commission equal to 50% of the agreed first month's tuition fee for that student.",
  },
  {
    question: "Is the 50% commission charged every month?",
    answer:
      "No. The commission is charged only once for each qualifying student placement. There is no recurring monthly placement commission for the same student.",
  },
  {
    question: "When do I have to pay the commission?",
    answer:
      "You must pay the applicable commission after receiving the complete first month's tuition fee from the parent.",
  },
  {
    question: "Who collects the tuition fee?",
    answer:
      "Parents pay the tuition fee directly to the tutor. The tutor is responsible for paying the applicable commission to Hustle Learning.",
  },
  {
    question: "Can I choose my tuition fee?",
    answer:
      "You can propose your expected fee. Hustle Learning will review and approve the proposed fee before the assignment is offered to you.",
  },
  {
    question: "Can I decline a tuition assignment?",
    answer:
      "Yes. You can decline an opportunity if it does not suit your requirements. We request a reason so that we can understand your preferences and improve future matching.",
  },
  {
    question: "Can I teach online?",
    answer:
      "Yes. Hustle Learning provides opportunities for both home and online tuition, depending on student requirements and availability.",
  },
  {
    question: "Which locations are covered?",
    answer:
      "Our initial home tuition service area covers Delhi. Actual assignments depend on your preferred locality, travel distance and available student requirements.",
  },
  {
    question: "Who can register as a tutor?",
    answer:
      "Individuals aged 18 or above who have suitable subject knowledge and meet our registration and verification requirements can apply.",
  },
  {
    question: "Do I need teaching experience?",
    answer:
      "Teaching experience is useful but not mandatory for every assignment. College students and aspiring educators can also register, subject to their subject knowledge and suitability.",
  },
  {
    question: "Does registration guarantee tuition?",
    answer:
      "No. Registration allows you to be considered for tuition opportunities. Actual assignments depend on student requirements, your qualifications, location, availability and suitability.",
  },
  {
    question: "Can I bring my existing private students?",
    answer:
      "Hustle Learning's placement commission model applies to students introduced through the platform. Existing private students are not eligible for platform placement benefits or the first-placement commission-free offer.",
  },
  {
    question: "What happens if a student discontinues tuition?",
    answer:
      "The applicable placement commission remains payable according to the agreed commission terms, even if the student discontinues during the first month. Payment is due after you receive the complete first month's tuition fee.",
  },
  {
    question: "How will I know about tuition opportunities?",
    answer:
      "Our team will contact you through your registered contact details when a potentially suitable tuition requirement becomes available.",
  },
];

function CardBody({ item }: { item: InfoCard }) {
  const Icon = item.icon;
  return (
    <>
      <span className="flex items-center gap-3">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${item.chip} text-brand-navy`}
        >
          <Icon size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
      </span>
      <p className="mt-3 text-sm leading-[1.65] text-text-secondary">
        {item.text}
      </p>
    </>
  );
}

const CARD_CLS =
  "flex h-full flex-col rounded-md border border-[#E5E7EF] bg-white p-6 shadow-[0_2px_12px_rgba(20,33,61,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.28)]";

function Rail({ items, linked }: { items: InfoCard[]; linked: boolean }) {
  return (
    <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:hidden">
      {items.map((item, i) =>
        linked ? (
          <Reveal
            key={item.title}
            delay={Math.min(i, 3) * 70}
            className="w-[80%] shrink-0 snap-start"
          >
            <Link
              href="/join-as-tutor/register"
              aria-label={`Register as a tutor — ${item.title}`}
              className={CARD_CLS}
            >
              <CardBody item={item} />
            </Link>
          </Reveal>
        ) : (
          <Reveal
            key={item.title}
            delay={Math.min(i, 3) * 70}
            className="w-[80%] shrink-0 snap-start"
          >
            <div className={CARD_CLS}>
              <CardBody item={item} />
            </div>
          </Reveal>
        ),
      )}
    </div>
  );
}

export default function JoinAsTutorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        {/* ---------- Hero ---------- */}
        <section
          aria-labelledby="join-tutor-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-8 md:px-6 md:pt-12"
        >
          <div className="rounded-md bg-brand-navy px-5 py-8 sm:px-8 sm:py-10">
            <div className="grid items-start gap-8 md:grid-cols-2">
              <div>
                <h1
                  id="join-tutor-heading"
                  className="max-w-[22ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl lg:text-[44px]"
                >
                  Join Hustle Learning as a Tutor
                </h1>
                <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-brand-white/85 sm:text-2xl">
                  Turn Your Teaching Skills into Opportunities
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-brand-white/75">
                  Are you passionate about teaching? Hustle Learning connects
                  tutors with students and parents looking for personalised
                  academic support. Register for free, get your first student
                  placement without any commission and start your teaching
                  journey.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/join-as-tutor/register"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Register as a Tutor
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
                  >
                    Explore How It Works
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[420px]">
                <div className="relative hidden h-52 w-full sm:h-64 md:block">
                  <Image
                    src={heroImg}
                    alt="Tutor teaching a student one-to-one during a home tuition session"
                    fill
                    sizes="420px"
                    priority
                    className="rounded-md object-cover object-center"
                  />
                </div>
                <dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
                  {[
                    ["Free", "Registration"],
                    ["0%", "First placement commission"],
                    ["Delhi + Online", "Tuition opportunities"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <dt className="order-2 mt-1 text-[12.5px] leading-snug text-brand-white/70">
                        {label}
                      </dt>
                      <dd className="order-1 text-xl font-extrabold tracking-tight text-brand-white sm:text-2xl">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Knowledge ---------- */}
        <section
          aria-labelledby="knowledge-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-10 md:px-6 md:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal variant="left">
              <h2
                id="knowledge-heading"
                className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl"
              >
                Your Knowledge Can Create Opportunities
              </h2>
              <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                Finding students for home tuition is not always easy. Tutors
                often spend time searching for enquiries, connecting with
                parents, negotiating fees and finding students in their
                preferred locations. Hustle Learning aims to make this process
                easier.
              </p>
              <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-text-secondary">
                You share your qualifications, teaching preferences, subjects
                and availability. We use this information to identify relevant
                tuition requirements and introduce suitable opportunities — so
                you can focus on teaching while we help you discover students
                who need your expertise.
              </p>
            </Reveal>
            <Reveal variant="right">
              <figure className="overflow-hidden rounded-md border border-border bg-surface">
                <span className="relative block aspect-[4/3] w-full">
                  <Image
                    src={onlineTutorImg}
                    alt="Tutor providing one-to-one academic support to a student"
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </span>
              </figure>
            </Reveal>
          </div>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Who can join ---------- */}
        <section
          aria-labelledby="who-heading"
          id="who"
          className="scroll-mt-24 bg-[#F3F4F9] py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <SectionHeading
                titleId="who-heading"
                title="Who Can Join as a Tutor?"
                description="We welcome individuals who have a genuine interest in teaching and the subject knowledge required to guide students. Tap a card to start your free registration."
              />
            </Reveal>
            <div className="mx-auto mt-8 hidden max-w-[1120px] gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {WHO_CARDS.map((item, i) => (
                <Reveal key={item.title} delay={Math.min(i, 3) * 80} className="h-full">
                  <Link
                    href="/join-as-tutor/register"
                    aria-label={`Register as a tutor — ${item.title}`}
                    className={CARD_CLS}
                  >
                    <CardBody item={item} />
                  </Link>
                </Reveal>
              ))}
            </div>
            <Rail items={WHO_CARDS} linked />
            <Reveal>
              <p className="mt-6 rounded-md border border-[#E5E7EF] bg-white p-4 text-sm leading-[1.65] text-text-secondary">
                <strong className="font-semibold text-text-primary">
                  Eligibility:
                </strong>{" "}
                Tutors must be at least 18 years old and meet the applicable
                educational and verification requirements.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- Why join ---------- */}
        <section
          aria-labelledby="why-join-heading"
          id="why-join"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="why-join-heading"
              title="Why Join Hustle Learning?"
              description="Register for free. Get your first student without paying any commission. Start earning through teaching."
            />
          </Reveal>
          <div className="mx-auto mt-8 hidden max-w-[1120px] gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {WHY_CARDS.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 5) * 60} className="h-full">
                <div className={CARD_CLS}>
                  <CardBody item={item} />
                </div>
              </Reveal>
            ))}
          </div>
          <Rail items={WHY_CARDS} linked={false} />
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- How it works ---------- */}
        <section
          aria-labelledby="how-it-works-heading"
          id="how-it-works"
          className="scroll-mt-24 bg-brand-navy py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <h2
                id="how-it-works-heading"
                className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-brand-white sm:text-5xl"
              >
                How Does It Work?
              </h2>
              <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-brand-white/70">
                From free registration to your first class — six simple steps.
                Tap a step to see details.
              </p>
            </Reveal>
            <JoinSteps />
            <Reveal>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/join-as-tutor/register"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Register as a Tutor
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Commission ---------- */}
        <section
          aria-labelledby="commission-heading"
          id="commission"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="commission-heading"
              title="Your First Student Placement Is on Us"
              description="No registration charges, no initial placement commission. Your first successful student placement through Hustle Learning is completely commission-free — you keep 100% of the agreed first month's tuition fee."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-md bg-[#E3F1E8] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)] sm:p-8">
                <p className="text-5xl font-extrabold tracking-tight text-brand-navy">
                  0%
                </p>
                <h3 className="mt-3 text-lg font-bold text-brand-navy">
                  First Student Placement
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-brand-navy/80">
                  0% commission. You retain the entire agreed first month&apos;s
                  tuition fee. Applies once per eligible tutor.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <article className="flex h-full flex-col rounded-md bg-[#FDEBC8] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)] sm:p-8">
                <p className="text-5xl font-extrabold tracking-tight text-brand-navy">
                  50%
                </p>
                <h3 className="mt-3 text-lg font-bold text-brand-navy">
                  Second & Subsequent Placements
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-brand-navy/80">
                  A one-time commission of 50% of the agreed first month&apos;s
                  tuition fee for each new student. Never charged every month —
                  only once per qualifying placement.
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <div className="mt-6 rounded-md border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-bold text-text-primary">
                Example: ₹6,000 monthly tuition fee
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-surface-muted p-4">
                  <p className="text-sm font-bold text-text-primary">
                    First placement
                  </p>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-text-secondary">
                    <li>Monthly tuition fee: ₹6,000</li>
                    <li>Hustle Learning commission: ₹0</li>
                    <li>
                      <strong className="text-text-primary">
                        Your earnings: ₹6,000
                      </strong>
                    </li>
                  </ul>
                </div>
                <div className="rounded-md bg-surface-muted p-4">
                  <p className="text-sm font-bold text-text-primary">
                    Second placement
                  </p>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-text-secondary">
                    <li>Monthly tuition fee: ₹6,000</li>
                    <li>Hustle Learning commission: ₹3,000</li>
                    <li>
                      <strong className="text-text-primary">
                        Your remaining amount: ₹3,000
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 rounded-md bg-amber-100/70 p-4 text-[13px] leading-relaxed text-text-secondary">
                <strong className="font-semibold text-text-primary">
                  Important:
                </strong>{" "}
                The commission applies to each subsequent platform-generated
                student placement, not to every monthly payment from the same
                student. It becomes payable after you receive the complete
                first month&apos;s tuition fee from the parent.
              </p>
            </div>
          </Reveal>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Teaching modes ---------- */}
        <section
          aria-labelledby="modes-heading"
          id="modes"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="modes-heading"
              title="Home and Online Teaching Opportunities"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <Link
                href="/join-as-tutor/register"
                aria-label="Register for home tuition opportunities"
                className="flex h-full flex-col rounded-md bg-[#FDEBC8] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)] sm:p-8"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/80 text-brand-navy">
                    <House size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    Home Tuition
                  </h3>
                </span>
                <p className="mt-3 text-sm leading-[1.65] text-brand-navy/80">
                  Prefer teaching students in person? Explore home tuition
                  opportunities across Delhi. Share the localities you can
                  travel to, your preferred travel distance and your available
                  timings.
                </p>
              </Link>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <Link
                href="/join-as-tutor/register"
                aria-label="Register for online tuition opportunities"
                className="flex h-full flex-col rounded-md bg-[#E3EDFA] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)] sm:p-8"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/80 text-brand-navy">
                    <MonitorSmartphone size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    Online Tuition
                  </h3>
                </span>
                <p className="mt-3 text-sm leading-[1.65] text-brand-navy/80">
                  Prefer teaching remotely? Register for online tuition
                  opportunities and provide academic support through online
                  sessions — specify your subjects, classes and online teaching
                  hours.
                </p>
              </Link>
            </Reveal>
          </div>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Expectations ---------- */}
        <section
          aria-labelledby="expectations-heading"
          id="expectations"
          className="bg-surface-muted/60"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14">
            <Reveal>
              <SectionHeading
                titleId="expectations-heading"
                title="What We Expect from Our Tutors"
                description="Effective teaching requires subject knowledge, responsibility and professionalism. We expect every tutor to:"
              />
            </Reveal>
            <Reveal>
              <ul className="mt-8 grid gap-x-8 gap-y-3 rounded-md border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      aria-hidden="true"
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-green-700"
                    />
                    <span className="text-sm leading-[1.6] text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- Verification ---------- */}
        <section
          aria-labelledby="verification-heading"
          id="verification"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="verification-heading"
              title="Tutor Verification"
              description="The safety and trust of students and families are important to us. Every tutor must complete our basic verification process before receiving eligible tuition assignments."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-md border border-[#E5E7EF] bg-white p-6 shadow-[0_2px_12px_rgba(20,33,61,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.28)] sm:p-7">
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E9EAFB] text-brand-navy">
                    <ShieldCheck size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-text-primary">
                    Identity Verification
                  </h3>
                </span>
                <p className="mt-3 text-sm leading-[1.65] text-text-secondary">
                  Submission and review of an acceptable identity document to
                  establish the tutor&apos;s identity.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <article className="flex h-full flex-col rounded-md border border-[#E5E7EF] bg-white p-6 shadow-[0_2px_12px_rgba(20,33,61,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.28)] sm:p-7">
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E3F1E8] text-brand-navy">
                    <FileBadge size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-text-primary">
                    Educational Verification
                  </h3>
                </span>
                <p className="mt-3 text-sm leading-[1.65] text-text-secondary">
                  Submission and review of relevant educational certificates or
                  documents supporting the tutor&apos;s stated qualifications.
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-6 text-sm leading-relaxed text-text-secondary">
              Registration information and documents must be genuine and
              accurate. Submitting documents does not automatically guarantee
              approval or a tuition assignment. Read the full{" "}
              <Link
                href="/tutor-terms-and-conditions"
                className="font-semibold text-text-primary underline underline-offset-2"
              >
                Tutor Terms and Conditions
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- FAQs ---------- */}
        <section
          aria-labelledby="tutor-faqs-heading"
          id="faqs"
          className="mx-auto w-full max-w-[768px] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <h2
              id="tutor-faqs-heading"
              className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl"
            >
              Tutor FAQs
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
              Answers about registration, commission, fees and assignments.
              Still unsure?{" "}
              <a
                href={CONTACT.telHref}
                className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4"
              >
                Talk to our team
              </a>
              .
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {JOIN_TUTOR_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-md border border-border bg-surface px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm leading-[1.65] text-text-secondary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section
          aria-labelledby="join-cta-heading"
          className="border-t border-border bg-brand-navy"
        >
          <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col items-start gap-5 px-4 py-10 md:px-6 md:py-14 lg:flex-row lg:items-center lg:justify-between">
            <Reveal variant="up">
              <h2
                id="join-cta-heading"
                className="max-w-[24ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl"
              >
                Ready to Start Your Teaching Journey?
              </h2>
              <p className="mt-3 max-w-[58ch] text-base leading-[1.6] text-brand-white/75">
                Your knowledge deserves an opportunity to reach students who
                need it. Join Hustle Learning, register for free and explore
                home and online tuition opportunities.
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-white/85">
                Free registration. First placement commission-free.
                Opportunities across Delhi.
              </p>
            </Reveal>
            <Reveal variant="right" className="shrink-0">
              <Link
                href="/join-as-tutor/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
              >
                Register as a Tutor
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
}
