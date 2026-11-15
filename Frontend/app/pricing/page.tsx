import type { Metadata } from "next";
import PricingPage from "../pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing & Services | Hustle Learning",
  description:
    "Compare Hustle Learning subscriptions, batch classes and personal tutoring. Practice Plus ₹99/month, Complete Learning ₹249/month.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
