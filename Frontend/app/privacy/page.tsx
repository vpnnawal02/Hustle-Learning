import type { Metadata } from "next";
import PrivacyPage from "../pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Hustle Learning",
  description:
    "How Hustle Learning collects, uses, and protects enquiry and student information.",
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
