import type { Metadata } from "next";
import SubscribePage from "../pages/SubscribePage";

export const metadata: Metadata = {
  title: "Subscribe — Hustle Learning",
  description:
    "Subscribe to Hustle Learning for extended question banks, Drill Mode, daily practice, and weekly tests.",
};

export default function SubscribeRoute() {
  return <SubscribePage />;
}
