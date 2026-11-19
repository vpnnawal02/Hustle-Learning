import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  GraduationCap,
  MapPin,
  NotebookPen,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  ChevronDown,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import CtaBand from "../components/CtaBand";
import { SectionHeading } from "../components/typography";
import AreasSearch, { type TuitionRegion } from "./home-tuitions/AreasSearch";
import HowItWorks from "./home-tuitions/HowItWorks";
import heroImg from "../assets/images/home-tuitions.png";
import homeTutorImg from "../assets/images/personal-home-tutor.png";
import onlineTutorImg from "../assets/images/personal-online-tutor.png";
import { CONTACT } from "../components/navbar/navbar-data";

export const TUITION_REGIONS: TuitionRegion[] = [
  {
    region: "West Delhi",
    localities: [
      "Punjabi Bagh",
      "Rajouri Garden",
      "Janakpuri",
      "Vikaspuri",
      "Paschim Vihar",
      "Uttam Nagar",
      "Tilak Nagar",
      "Kirti Nagar",
      "Moti Nagar",
      "Subhash Nagar",
      "Hari Nagar",
    ],
  },
  {
    region: "North West Delhi",
    localities: [
      "Rohini",
      "Pitampura",
      "Shalimar Bagh",
      "Ashok Vihar",
      "Model Town",
      "Mukherjee Nagar",
      "Civil Lines",
      "Jahangirpuri",
    ],
  },
  {
    region: "North Delhi",
    localities: [
      "Kamla Nagar",
      "GTB Nagar",
      "Kingsway Camp",
      "Burari",
      "Timarpur",
      "Adarsh Nagar",
    ],
  },
  {
    region: "North East Delhi",
    localities: [
      "Yamuna Vihar",
      "Bhajanpura",
      "Seelampur",
      "Shahdara",
      "Dilshad Garden",
      "Vivek Vihar",
      "Laxmi Nagar",
      "Preet Vihar",
    ],
  },
  {
    region: "East Delhi",
    localities: [
      "Mayur Vihar",
      "Patparganj",
      "IP Extension",
      "Anand Vihar",
      "Krishna Nagar",
      "Geeta Colony",
      "Pandav Nagar",
      "Vasundhara Enclave",
    ],
  },
  {
    region: "South Delhi",
    localities: [
      "Saket",
      "Malviya Nagar",
      "Hauz Khas",
      "Green Park",
      "Greater Kailash",
      "Kalkaji",
      "CR Park",
      "Defence Colony",
      "Lajpat Nagar",
      "Vasant Kunj",
    ],
  },
  {
    region: "South West Delhi",
    localities: [
      "Dwarka",
      "Palam",
      "Mahipalpur",
      "Vasant Vihar",
      "Najafgarh",
      "Dabri",
      "Kapashera",
      "Chhawla",
    ],
  },
  {
    region: "Central Delhi",
    localities: [
      "Karol Bagh",
      "Patel Nagar",
      "Rajendra Place",
      "Paharganj",
      "Daryaganj",
      "Chandni Chowk",
      "Connaught Place",
    ],
  },
  {
    region: "New Delhi",
    localities: [
      "Chanakyapuri",
      "Jor Bagh",
      "Lodhi Colony",
      "Golf Links",
      "Barakhamba Road",
    ],
  },
];

const WHY_CARDS = [
  {
    icon: UserRound,
    chip: "bg-[#E9EAFB]",
    title: "Individual attention",
    text: "One-to-one home tuitions in Delhi mean the tutor teaches only your child — every doubt is heard and solved in the same session.",
  },
  {
    icon: CalendarClock,
    chip: "bg-[#FDEBC8]",
    title: "Flexible scheduling",
    text: "Morning or evening slots at your home in Delhi. Reschedule easily around school tests, travel and family plans.",
  },
  {
    icon: GraduationCap,
    chip: "bg-[#E3F1E8]",
    title: "Subject expertise",
    text: "Verified home tutors in Delhi for Maths, Science, English, Social Science, Physics, Chemistry, Biology and more.",
  },
  {
    icon: NotebookPen,
    chip: "bg-[#ECE9FA]",
    title: "Regular practice",
    text: "Chapter-wise worksheets, revision notes and test practice after every topic — so concepts stay exam-ready.",
  },
];

function WhyCard({ item }: { item: (typeof WHY_CARDS)[number] }) {
  const Icon = item.icon;
  return (
    <article className="flex h-full flex-col rounded-md border border-[#E5E7EF] bg-white p-6 shadow-[0_2px_12px_rgba(20,33,61,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.28)]">
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
    </article>
  );
}

function WhyCta() {
  return (
    <article className="flex h-full flex-col justify-center gap-4 rounded-md bg-[#E5E7FB] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(43,58,143,0.45)] sm:p-7 lg:flex-row lg:items-center lg:gap-8 lg:text-left">
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-snug font-extrabold text-brand-navy">
          Let&apos;s find the right home tutor for your child?
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-brand-navy/70">
          Free demo at home · Regular progress updates for parents
        </span>
      </span>
      <Link
        href="/hire-a-tutor"
        className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-8 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
      >
        Book a free demo
      </Link>
    </article>
  );
}

const CLASS_GROUPS = [
  {
    icon: Pencil,
    bg: "bg-[#FDEBC8]",
    band: "Classes 1–5",
    label: "Primary learning",
    text: "Reading, writing, Maths foundations and good study habits at home. Patient home tutors who make young learners confident.",
    subjects: "English · Hindi · Maths · EVS",
  },
  {
    icon: BookOpen,
    bg: "bg-[#E3EDFA]",
    band: "Classes 6–8",
    label: "Middle school",
    text: "Concept clarity in Science, Maths and Social Science before board pressure begins. Daily doubt-solving and revision discipline.",
    subjects: "Maths · Science · English · Social Science",
  },
  {
    icon: NotebookPen,
    bg: "bg-[#E3F1E8]",
    band: "Classes 9–10",
    label: "Board preparation",
    text: "NCERT-first board strategy with sample papers, PYQs and timed practice. Home tutors in Delhi for high-scoring Class 10 boards.",
    subjects: "Maths · Science · English · Social Science",
  },
  {
    icon: GraduationCap,
    bg: "bg-[#E9EAFB]",
    band: "Classes 11–12",
    label: "Senior secondary",
    text: "Science, Commerce and Humanities with school + JEE / NEET alignment. Structured plans for board and competitive goals together.",
    subjects:
      "Physics · Chemistry · Maths · Biology · Accounts · Business Studies · Economics · Pol. Science · History",
  },
];

const TUTOR_TYPES = [
  {
    title: "Primary & middle-school tutors",
    text: "Patient, school-syllabus experts for Classes 1–8. Focus on foundations, handwriting, mental maths and regular revision at home.",
  },
  {
    title: "Board-exam tutors (9–10)",
    text: "NCERT specialists who teach answer-writing, diagrams, numericals and paper presentation for Delhi board toppers.",
  },
  {
    title: "Senior & competitive tutors (11–12)",
    text: "Subject specialists for Science, Commerce and Humanities streams — Accounts, Economics, Pol. Science and more, plus JEE / NEET foundations.",
  },
];

export const HOME_TUITION_FAQS = [
  {
    question: "How do I find reliable home tuitions in Delhi?",
    answer:
      "Share your class, subjects and locality with Hustle Learning. We match you with verified home tutors in Delhi near your area — for example Rohini, Dwarka, Laxmi Nagar, Saket or Karol Bagh — arrange a free demo at your home, and start only when you are satisfied with the tutor.",
  },
  {
    question: "What is the fee for home tutors in Delhi?",
    answer:
      "Personal home tuitions in Delhi with Hustle Learning start at ₹4,999 per month. Final pricing depends on the student's class, subjects, number of sessions per week, and your location in Delhi. Share your requirement and our counsellor will confirm the exact fee on WhatsApp before the demo.",
  },
  {
    question: "Which classes and subjects do your home tutors cover?",
    answer:
      "Our home tutors in Delhi teach Classes 1–12 across all major subjects — Maths, Science, English, Hindi, Social Science for junior classes, and Physics, Chemistry, Biology and Mathematics for senior classes. Support is available for CBSE and ICSE school syllabi, plus JEE / NEET foundations for Classes 11–12.",
  },
  {
    question: "Which areas in Delhi do you serve?",
    answer:
      "We provide home tuitions across West Delhi, North West Delhi, North Delhi, North East Delhi, East Delhi, South Delhi, South West Delhi, Central Delhi and New Delhi — including Rohini, Pitampura, Janakpuri, Dwarka, Saket, Malviya Nagar, Laxmi Nagar, Mayur Vihar, Karol Bagh and Connaught Place. Use the area search above to check your locality.",
  },
  {
    question: "Are your home tutors verified?",
    answer:
      "Yes. Every home tutor in Delhi goes through ID verification, subject assessment and a trial teaching check. We match tutors by class experience and subject expertise, and parents can take a free demo at home before confirming.",
  },
  {
    question: "Can I get a female home tutor or a tutor for a specific language?",
    answer:
      "Yes. While sharing your requirement, mention your preference for a male or female tutor and your preferred teaching language (English, Hindi or bilingual). We try our best to match a home tutor in Delhi who fits your family's comfort.",
  },
  {
    question: "How are parents kept involved in home tuitions?",
    answer:
      "Parents receive regular updates on classes completed, chapters covered, test performance and upcoming goals. Tutors also share practice work after sessions so parents can see exactly how their child is progressing between school exams.",
  },
  {
    question: "Can I switch tutors if the match does not work?",
    answer:
      "Yes. If the teaching style or schedule does not suit your child after the first few sessions, tell us on WhatsApp and we will arrange a replacement home tutor in Delhi at no extra matching charge.",
  },
  {
    question: "Do you offer online tuitions if home tuition slots are full?",
    answer:
      "Yes. If a home tutor is not immediately available in your locality, you can start with personal online tuitions (starting at ₹499 per hour) and move to home tuition later. Both follow the same personalised study plan. See all options on our pricing page.",
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
            className="mt-0.5 shrink-0 text-text-primary"
          />
          <span className="text-sm leading-[1.6] text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HomeTuitionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        {/* ---------- Hero ---------- */}
        <section
          aria-labelledby="home-tuition-heading"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-8 md:px-6 md:pt-12"
        >
          <div className="rounded-md bg-brand-navy px-5 py-8 sm:px-8 sm:py-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h1
                  id="home-tuition-heading"
                  className="max-w-[22ch] text-3xl leading-[1.1] text-balance text-brand-white sm:text-4xl lg:text-[44px]"
                >
                  Home Tuitions in Delhi with Verified Home Tutors
                </h1>
                <p className="mt-3 max-w-[30ch] text-xl leading-snug font-bold text-brand-white/85 sm:text-2xl">
                  One Student. One Teacher. Full Attention at Home.
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-brand-white/75">
                  Looking for trusted{" "}
                  <strong className="font-semibold text-brand-white">
                    home tutors in Delhi
                  </strong>
                  ? Hustle Learning provides personalised{" "}
                  <strong className="font-semibold text-brand-white">
                    home tuitions in Delhi
                  </strong>{" "}
                  for Classes 1–12 in Maths, Science, English and all major
                  subjects — taught one-to-one at your home, matched to your
                  school syllabus and exam goals.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/hire-a-tutor"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Book a free demo
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/join-as-tutor"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-sm font-bold text-brand-white transition-colors hover:border-brand-white hover:bg-white/10"
                  >
                    Join as a tutor
                  </Link>
                </div>

              </div>

              <div className="mx-auto w-full max-w-[420px]">
                <div className="relative hidden h-52 w-full sm:h-64 md:block">
                  <Image
                    src={heroImg}
                    alt="Home tutor teaching a student one-to-one at home in Delhi"
                    fill
                    sizes="420px"
                    priority
                    className="rounded-md object-cover object-center"
                  />
                </div>
                <p className="flex items-center justify-center gap-2 px-4 py-2 text-center text-sm font-bold text-brand-white md:mt-2">
                  <ShieldCheck
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  />
                  ID-verified tutors for maximum security
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Finder cards ---------- */}
        <section
          aria-label="Ways to find your home tutor"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 pt-8 pb-8 md:px-6 md:pb-10"
        >
          <div className="mx-auto grid max-w-[980px] gap-4 sm:grid-cols-3">
            <Link
              href="#areas"
              className="flex aspect-[16/10] flex-col sm:aspect-[4/3] items-center justify-center gap-2 rounded-md bg-[#FDEBC8] p-6 text-center transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-white">
                <MapPin size={22} aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-brand-navy">
                Search tutors by area
              </span>
              <span className="max-w-[26ch] text-sm leading-snug text-brand-navy/70">
                Browse 70+ localities across 9 Delhi regions
              </span>
            </Link>
            <Link
              href="#tutors"
              className="flex aspect-[16/10] flex-col sm:aspect-[4/3] items-center justify-center gap-2 rounded-md bg-[#E4EDFA] p-6 text-center transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-white">
                <Users size={22} aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-brand-navy">
                See our tutors
              </span>
              <span className="max-w-[26ch] text-sm leading-snug text-brand-navy/70">
                Verified primary, board and competitive tutors
              </span>
            </Link>
            <Link
              href="#classes"
              className="flex aspect-[16/10] flex-col sm:aspect-[4/3] items-center justify-center gap-2 rounded-md bg-[#E3F1E8] p-6 text-center transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-white">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-brand-navy">
                Find tutors by class
              </span>
              <span className="max-w-[26ch] text-sm leading-snug text-brand-navy/70">
                Classes 1–5, 6–8, 9–10 and 11–12 covered
              </span>
            </Link>
          </div>
        </section>

        {/* ---------- Why choose us ---------- */}
        <section
          aria-labelledby="why-heading"
          id="why"
          className="scroll-mt-24 bg-[#F3F4F9] py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
          <Reveal>
            <SectionHeading
              titleId="why-heading"
              title="Why parents choose our home tuitions in Delhi"
              description="Home tuition works when teaching is personal, consistent and transparent. Every Hustle Learning home tutor in Delhi follows the same one-to-one discipline — individual attention, a plan built for your child, and regular updates for parents."
            />
          </Reveal>
          <div className="mx-auto mt-8 hidden max-w-[1120px] gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {WHY_CARDS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <WhyCard item={item} />
              </Reveal>
            ))}
            <Reveal delay={320} className="h-full sm:col-span-2">
              <WhyCta />
            </Reveal>
          </div>
          <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:hidden">
            {WHY_CARDS.map((item, i) => (
              <Reveal
                key={item.title}
                delay={Math.min(i, 3) * 70}
                className="w-[80%] shrink-0 snap-start"
              >
                <WhyCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-4 sm:hidden">
            <WhyCta />
          </div>
          </div>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Teaching approach ---------- */}
        <section
          aria-labelledby="approach-heading"
          id="approach"
          className="bg-surface-muted/60"
        >
          <div className="mx-auto grid w-full max-w-[var(--container-wide)] scroll-mt-24 items-center gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-2">
            <Reveal variant="left">
              <figure className="overflow-hidden rounded-md border border-border bg-surface">
                <span className="relative block aspect-[4/3] w-full">
                  <Image
                    src={homeTutorImg}
                    alt="Personal home tutor explaining a concept to a student during a one-to-one session"
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </span>
              </figure>
            </Reveal>
            <Reveal variant="right">
              <SectionHeading
                titleId="approach-heading"
                title="A teaching approach built for home learning"
                description="No noisy batches, no rushed syllabus. Your child's home tutor in Delhi starts with a short level check, then builds a chapter-wise plan around school exams — with practice and revision baked into every week."
              />
              <div className="mt-5">
                <CheckList
                  items={[
                    "Level check + study plan based on school syllabus and exam dates.",
                    "Concept-first teaching with NCERT examples, diagrams and numericals.",
                    "Chapter-wise worksheets and revision notes after every topic.",
                    "Regular tests, mistake review and parent updates on WhatsApp.",
                    "Parent involvement: short monthly review of progress and next goals.",
                  ]}
                />
              </div>
              <p className="mt-5 rounded-md border border-border bg-surface p-4 text-sm leading-[1.65] text-text-secondary">
                <strong className="font-semibold text-text-primary">
                  For parents:
                </strong>{" "}
                you always know what was taught, what is pending and how your
                child scored. Home tuitions in Delhi work best when tutor,
                student and parent stay aligned — we make that easy.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- Classes covered ---------- */}
        <section
          aria-labelledby="classes-heading"
          id="classes"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="classes-heading"
              title="Find home tutors by class"
              description="From primary foundations to board and competitive years — choose your band and find a home tutor in Delhi who specialises in exactly that stage."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CLASS_GROUPS.map((group, i) => (
              <Reveal key={group.band} delay={Math.min(i, 3) * 80} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-md ${group.bg} p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.3)]`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/80 text-brand-navy">
                      <group.icon size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-bold text-brand-navy">
                      {group.band}
                    </h3>
                  </span>
                  <p className="mt-3 w-fit rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold text-brand-navy">
                    {group.label}
                  </p>
                  <p className="mt-3 text-sm leading-[1.65] text-brand-navy/80">
                    {group.text}
                  </p>
                  <p className="mt-3 text-[13px] font-semibold text-brand-navy">
                    {group.subjects}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href="/hire-a-tutor"
                      aria-label={`Find a home tutor for ${group.band} in Delhi`}
                      className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                    >
                      Find a tutor
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Studying in Class 6–10? Pair home tuition with free{" "}
            <Link href="/resources" className="font-semibold text-text-primary underline underline-offset-2">
              study material
            </Link>{" "}
            and chapter-wise{" "}
            <Link href="/courses" className="font-semibold text-text-primary underline underline-offset-2">
              courses
            </Link>{" "}
            for faster revision.
          </p>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Tutors ---------- */}
        <section
          aria-labelledby="tutors-heading"
          id="tutors"
          className="bg-surface-muted/60"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14">
            <Reveal>
              <SectionHeading
                titleId="tutors-heading"
                title="See our home tutors in Delhi"
                description="You do not pick from a random list. Tell us your class, subjects and locality — we shortlist verified home tutors near you and confirm a free demo at your home."
              />
            </Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
              {TUTOR_TYPES.map((t, i) => (
                <Reveal key={t.title} delay={Math.min(i, 2) * 90} className="h-full">
                  <Link
                    href="/hire-a-tutor"
                    aria-label={`Request ${t.title} in Delhi`}
                    className="flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-16px_rgba(20,33,61,0.28)] sm:p-7"
                  >
                    <h3 className="text-lg font-bold text-text-primary">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.65] text-text-secondary">
                      {t.text}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                <ShieldCheck size={16} aria-hidden="true" className="text-green-700" />
                ID-verified tutors · Subject assessment · Trial teaching check ·
                Free demo at home before you pay.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section
          aria-labelledby="how-heading"
          id="how-it-works"
          className="scroll-mt-24 bg-brand-navy py-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 md:px-6">
            <Reveal>
              <h2
                id="how-heading"
                className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-brand-white sm:text-5xl"
              >
                How home tuition booking works
              </h2>
              <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-brand-white/70">
                Four simple steps from enquiry to regular classes — usually
                completed within 2–3 days in most Delhi localities. Tap a step
                to see details.
              </p>
            </Reveal>
            <HowItWorks />
            <Reveal>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/hire-a-tutor"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Book a free demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Areas ---------- */}
        <section
          aria-labelledby="areas-heading"
          id="areas"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="areas-heading"
              title="Search home tutors by area in Delhi"
              description="We provide home tuitions in Delhi across 9 regions and 70+ localities. Search your area below — if your locality is listed, a verified home tutor can usually reach your home for a free demo."
            />
          </Reveal>
          <AreasSearch regions={TUITION_REGIONS} />
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Serving{" "}
            {TUITION_REGIONS.map((r) => r.region).join(" · ")}. Popular searches:
            home tutors in Rohini, home tuitions in Dwarka, home tutors in
            Laxmi Nagar, home tuitions in Saket, home tutors in Karol Bagh and
            home tuitions in Mayur Vihar. Do not see your block?{" "}
            <Link href="/hire-a-tutor" className="font-semibold text-text-primary underline underline-offset-2">
              Enquire anyway
            </Link>{" "}
            — we regularly add tutors in new Delhi localities.
          </p>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- Pricing ---------- */}
        <section
          aria-labelledby="pricing-heading"
          id="pricing"
          className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <SectionHeading
              titleId="pricing-heading"
              title="Simple, transparent home tuition pricing"
              description="No hidden charges. Know the starting price upfront — confirm the exact fee for your class and locality before the demo."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal className="h-full">
              <article className="flex h-full flex-col rounded-md border-2 border-accent bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-bold text-text-primary">
                  Personal Home Tutor
                </h3>
                <p className="mt-1 text-sm leading-snug text-text-secondary">
                  One-to-one teaching at your home in Delhi with individual
                  attention and parent updates.
                </p>
                <p className="mt-4 text-2xl font-extrabold tracking-tight text-text-primary">
                  Starting at ₹4,999{" "}
                  <span className="text-sm font-medium text-text-muted">
                    per month
                  </span>
                </p>
                <div className="mt-4">
                  <CheckList
                    items={[
                      "One-to-one attention at your home.",
                      "Plan based on school syllabus and exam dates.",
                      "Regular practice, tests and progress updates.",
                    ]}
                  />
                </div>
                <Link
                  href="/hire-a-tutor"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                >
                  Request a callback
                </Link>
              </article>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <article className="flex h-full flex-col rounded-md border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-bold text-text-primary">
                  What decides the final fee?
                </h3>
                <p className="mt-1 text-sm leading-snug text-text-secondary">
                  Every family&apos;s requirement is different. Your counsellor
                  confirms the exact monthly fee on WhatsApp.
                </p>
                <div className="mt-4">
                  <CheckList
                    items={[
                      "Class and number of subjects (e.g. Maths + Science).",
                      "Sessions per week and session duration.",
                      "Locality in Delhi and tutor travel distance.",
                      "Board vs competitive focus (JEE / NEET).",
                    ]}
                  />
                </div>
                <p className="mt-4 rounded-md bg-surface-muted p-4 text-[13px] leading-snug text-text-secondary">
                  Need a lower-cost start? Personal online tuitions begin at
                  ₹499 per hour. Compare every plan on our{" "}
                  <Link href="/pricing" className="font-semibold text-text-primary underline underline-offset-2">
                    pricing page
                  </Link>
                  .
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <hr aria-hidden="true" className="border-border" />

        {/* ---------- FAQs ---------- */}
        <section
          aria-labelledby="faqs-heading"
          id="faqs"
          className="mx-auto w-full max-w-[768px] scroll-mt-24 px-4 py-10 md:px-6 md:py-14"
        >
          <Reveal>
            <h2
              id="faqs-heading"
              className="max-w-[24ch] text-4xl leading-[1.05] text-balance text-text-primary sm:text-5xl"
            >
              Home tuitions in Delhi — FAQs
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
              Answers about fees, areas, tutor verification and how home tutors
              in Delhi work. Still unsure?{" "}
              <a
                href={CONTACT.telHref}
                className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4"
              >
                Talk to our experts
              </a>
              .
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {HOME_TUITION_FAQS.map((faq) => (
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

        {/* ---------- Enquiry ---------- */}
        <section
          aria-labelledby="enquiry-heading"
          id="enquiry"
          className="border-t border-border bg-amber-100/60"
        >
          <div className="mx-auto w-full max-w-[var(--container-wide)] scroll-mt-24 px-4 py-10 md:px-6 md:py-14">
            <Reveal variant="left">
              <h2
                id="enquiry-heading"
                className="max-w-[22ch] text-3xl leading-[1.1] text-balance sm:text-4xl"
              >
                Book your free home tuition demo in Delhi
              </h2>
              <p className="mt-3 max-w-[68ch] text-base leading-[1.6] text-text-secondary">
                Share your class, subjects and locality. Our counsellor will
                call you back on WhatsApp, match a verified home tutor near you
                and schedule a free demo at your home.
              </p>
            </Reveal>
            <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-2">
              <Reveal variant="left">
                <figure className="overflow-hidden rounded-md border border-border bg-surface">
                  <span className="relative block aspect-[16/9] w-full">
                    <Image
                      src={onlineTutorImg}
                      alt="Parent enquiring for a home tutor in Delhi on a laptop"
                      fill
                      sizes="(max-width: 1024px) 100vw, 620px"
                      loading="lazy"
                      className="object-cover object-center"
                    />
                  </span>
                </figure>
              </Reveal>
              <Reveal variant="right" className="h-full">
                <div className="flex h-full flex-col items-start justify-center rounded-md border border-border bg-surface p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-text-primary">
                    Ready to find the right home tutor for your child?
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-sm leading-[1.65] text-text-secondary">
                    Tell us your child&apos;s class, subjects and location
                    through a quick enquiry form. Our team will connect with
                    you on WhatsApp to understand your requirements and help
                    arrange a suitable home tutor.
                  </p>
                  <Link
                    href="/hire-a-tutor"
                    className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Find a Home Tutor
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <p className="mt-3 text-[12.5px] leading-snug text-text-muted">
                    Get started without any advance payment. Discuss your
                    requirements and tutor options before making a decision.
                  </p>
                </div>
              </Reveal>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
              <a
                href={CONTACT.telHref}
                className="inline-flex items-center gap-1.5 font-semibold text-text-primary underline underline-offset-2"
              >
                <Phone size={15} aria-hidden="true" />
                Call: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text-primary underline underline-offset-2"
              >
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </section>

        {/* ---------- Related links (SEO interlinking) ---------- */}
        <nav
          aria-label="Related learning pages"
          className="mx-auto w-full max-w-[var(--container-wide)] px-4 py-8 md:px-6"
        >
          <p className="text-sm font-bold text-text-primary">Keep exploring:</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link href="/classes" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                One-on-one classes
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                Pricing & services
              </Link>
            </li>
            <li>
              <Link href="/courses" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                All courses
              </Link>
            </li>
            <li>
              <Link href="/class-10" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                Class 10
              </Link>
            </li>
            <li>
              <Link href="/jee" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                JEE preparation
              </Link>
            </li>
            <li>
              <Link href="/neet" className="text-text-secondary underline underline-offset-2 hover:text-text-primary">
                NEET preparation
              </Link>
            </li>
          </ul>
        </nav>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
