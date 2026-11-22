import CtaBand from "../components/CtaBand";
import HomeFaq from "../components/HomeFaq";
import SubscriptionPlans from "./Home/SubscriptionPlans";
import { HeroCarousel } from "./Home/hero";
import OneOnOneClasses from "./Home/OneOnOneClasses";
import PopularCourses from "./Home/PopularCourses";
import StudyDiscovery from "./Home/StudyDiscovery";
import WhoWeAre from "./Home/WhoWeAre";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        <HeroCarousel />
        <WhoWeAre />
        <StudyDiscovery />
        <SubscriptionPlans />
        <PopularCourses />
        <OneOnOneClasses />
        <HomeFaq />
        <CtaBand />
      </main>
    </div>
  );
}
