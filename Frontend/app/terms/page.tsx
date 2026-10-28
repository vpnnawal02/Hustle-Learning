import type { Metadata } from "next";
import TermsPage from "../pages/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Use — Hustle Learning",
  description:
    "Terms of Use for Hustle Learning's study material, online classes, home tuition, and books.",
};

export default function TermsRoute() {
  return <TermsPage />;
}
