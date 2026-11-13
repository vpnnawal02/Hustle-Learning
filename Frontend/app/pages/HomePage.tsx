import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import Faq from "../components/resources/Faq";
import { HeroCarousel } from "./Home/hero";
import OneOnOneClasses from "./Home/OneOnOneClasses";
import PopularCourses from "./Home/PopularCourses";
import StudyDiscovery from "./Home/StudyDiscovery";
import Toolkit from "./Home/Toolkit";
import WhoWeAre from "./Home/WhoWeAre";

const HOME_FAQS = [
  {
    question: "What study material does Hustle Learning offer?",
    answer:
      "NCERT solutions, chapter-wise notes, important questions, sample papers, previous year questions, worksheets and formula sheets for Classes 6–10, plus dedicated JEE and NEET preparation tracks.",
  },
  {
    question: "How do I find material for my class and chapter?",
    answer:
      "Start with your class above, pick a subject, then choose a resource type. Every chapter page links related resources, and search covers the whole platform.",
  },
  {
    question: "Is the material aligned to CBSE and NCERT?",
    answer:
      "Yes. School resources follow the CBSE syllabus and NCERT textbooks. Chapters are published progressively after academic verification — anything unfinished is marked coming soon, never presented as complete.",
  },
  {
    question: "Do you offer personal guidance too?",
    answer:
      "Yes — live online classes, one-on-one home tuition and books sit alongside the free resources. Request a callback and our counsellor will help you choose.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        <HeroCarousel />
        <StudyDiscovery />
        <WhoWeAre />
        <PopularCourses />
        <OneOnOneClasses />
        <Toolkit />
        <div className="mx-auto w-full max-w-[var(--container-wide)] px-4 pb-12 md:px-6 md:pb-16">
          <Faq faqs={HOME_FAQS} />
        </div>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
