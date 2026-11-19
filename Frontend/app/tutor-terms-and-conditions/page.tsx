import type { Metadata } from "next";
import TutorTermsPage from "../pages/TutorTermsPage";

export const metadata: Metadata = {
  title: "Tutor Terms and Conditions — Hustle Learning",
  description:
    "Tutor Terms and Conditions for Hustle Learning: eligibility, free registration, commission-free first placement, 50% subsequent commission, verification and conduct.",
};

export default function TutorTermsRoute() {
  return <TutorTermsPage />;
}
