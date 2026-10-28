import type { Metadata } from "next";
import ClassesPage from "../pages/ClassesPage";

export const metadata: Metadata = {
  title: "One-on-One Classes — Hustle Learning",
  description:
    "Personalised one-on-one classes online and offline: CBSE/ICSE, JEE/NEET, and hobby classes with individual guidance.",
};

export default function ClassesRoute() {
  return <ClassesPage />;
}
