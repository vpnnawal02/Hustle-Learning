import type { Metadata } from "next";
import CoursesPage from "../pages/CoursesPage";

export const metadata: Metadata = {
  title: "Online Courses for CBSE Students – Classes 6 to 10 | Hustle Learning",
  description:
    "Explore class-wise live online courses for CBSE Classes 6–10 in Maths, Science, English, Hindi & Social Science. Concept-based batches at ₹499/month.",
};

export default function CoursesRoute() {
  return <CoursesPage />;
}
