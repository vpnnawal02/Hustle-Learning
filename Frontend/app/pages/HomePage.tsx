import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import { HeroCarousel } from "./Home/hero";
import OneOnOneClasses from "./Home/OneOnOneClasses";
import PopularCourses from "./Home/PopularCourses";
import Toolkit from "./Home/Toolkit";
import WhoWeAre from "./Home/WhoWeAre";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        <HeroCarousel />
        <WhoWeAre />
        <PopularCourses />
        <OneOnOneClasses />
        <Toolkit />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
