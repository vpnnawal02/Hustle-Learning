import type { Metadata } from "next";
import LoginPage from "../pages/LoginPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student Login & Registration — Hustle Learning",
  description:
    "Log in to your Hustle Learning student account or register free with your class and board to access NCERT resources, practice and more.",
  alternates: { canonical: absoluteUrl("/login") },
  robots: { index: false, follow: true },
};

export default function LoginRoute() {
  return <LoginPage />;
}
