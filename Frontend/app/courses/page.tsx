import type { Metadata } from "next";
import CoursesPage from "../pages/CoursesPage";

export const metadata: Metadata = {
  title: "All Courses — Hustle Learning",
  description:
    "Hustle Learning batches for Classes 6–8, Class 9, Class 10, and Classes 11–12.",
};

export default function CoursesRoute() {
  return <CoursesPage />;
}
