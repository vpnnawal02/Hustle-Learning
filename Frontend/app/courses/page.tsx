import type { Metadata } from "next";
import CoursesPage from "../pages/CoursesPage";

export const metadata: Metadata = {
  title: "All Courses — Live Batches for Class 6–10 | Hustle Learning",
  description:
    "Live online batches for Class 6, 7, 8, 9 and 10. Subject-wise courses at ₹499/month or ₹5000/year.",
};

export default function CoursesRoute() {
  return <CoursesPage />;
}
