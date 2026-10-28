import Footer from "../components/Footer";
import { HeroCarousel } from "./Home/hero";
import PopularCourses from "./Home/PopularCourses";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        <HeroCarousel />
        <PopularCourses />
      </main>
      <Footer />
    </div>
  );
}
