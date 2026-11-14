"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Ban,
  Compass,
  Gift,
  GraduationCap,
  ListChecks,
  MessageCircle,
  MonitorPlay,
  MonitorSmartphone,
  Package,
  Receipt,
  Sparkles,
  Target,
  Users,
  Video,
  Wallet,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import JsonLd from "./seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { CONTACT } from "./navbar/navbar-data";

type FaqCategory = "General" | "Classes" | "Subscription" | "Books";

interface HomeFaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
  icon: LucideIcon;
}

const CATEGORIES: FaqCategory[] = [
  "General",
  "Classes",
  "Subscription",
  "Books",
];

const FAQS: HomeFaqItem[] = [
  {
    question: "What is Hustle Learning?",
    answer:
      "Hustle Learning is an online educational platform designed to help school students learn smarter through quality study materials, practice resources, educational books, and online classes. Our aim is to make learning structured, accessible, and affordable for students.",
    category: "General",
    icon: Sparkles,
  },
  {
    question: "Which classes does Hustle Learning currently support?",
    answer:
      "Hustle Learning currently offers online classes for students of Classes 9 and 10. Students can also explore educational resources, practice materials, and books to support their school studies.",
    category: "Classes",
    icon: GraduationCap,
  },
  {
    question: "Are Hustle Learning study materials aligned with the CBSE syllabus?",
    answer:
      "Our study materials and educational books are designed around the NCERT curriculum and CBSE learning requirements to help students understand concepts, revise important topics, and prepare for examinations.",
    category: "General",
    icon: BadgeCheck,
  },
  {
    question: "Can I access free study materials on Hustle Learning?",
    answer:
      "Yes! Students can explore free educational resources, including notes, worksheets, practice papers, and other learning materials. These resources help students revise concepts and practise independently.",
    category: "General",
    icon: Gift,
  },
  {
    question: "What is the Hustle Learning subscription fee?",
    answer:
      "The Hustle Learning subscription costs just ₹99 per month. It provides an affordable way for students to access additional educational resources and learning materials.",
    category: "Subscription",
    icon: Wallet,
  },
  {
    question: "What is included in the ₹99 monthly subscription?",
    answer:
      "The subscription provides access to additional learning resources, including educational content, chapter-wise practice materials, and mock tests. Live online classes are not included in this subscription and require separate enrolment.",
    category: "Subscription",
    icon: ListChecks,
  },
  {
    question: "Are live online classes included in the ₹99 subscription?",
    answer:
      "No. Live online classes are separate from the ₹99 monthly subscription. Students interested in attending regular online classes for Classes 9 and 10 need to enrol separately. The subscription does not provide access to live classes.",
    category: "Subscription",
    icon: Video,
  },
  {
    question: "Does Hustle Learning provide regular online classes?",
    answer:
      "Yes! Hustle Learning offers regular online classes for students of Classes 9 and 10. These classes are designed to help students understand concepts, improve subject knowledge, and prepare for school examinations.",
    category: "Classes",
    icon: MonitorPlay,
  },
  {
    question: "Are Hustle Learning books available in PDF format?",
    answer:
      "Hustle Learning books are available for purchase in physical format only. They are not offered as downloadable PDF books. Students can purchase physical copies through the available book purchasing options.",
    category: "Books",
    icon: Package,
  },
  {
    question: "Are Hustle Learning books useful for CBSE board examination preparation?",
    answer:
      "Hustle Learning books are designed to support CBSE students through NCERT-aligned content, chapter-wise exercises, practice questions, and previous years' questions (PYQs). They help students strengthen their understanding and practise important topics.",
    category: "Books",
    icon: Target,
  },
  {
    question: "Can I cancel my monthly subscription anytime?",
    answer:
      "Yes. You can cancel your Hustle Learning subscription at any time. Once cancelled, future subscription renewals will stop according to the applicable billing cycle.",
    category: "Subscription",
    icon: Ban,
  },
  {
    question: "Does Hustle Learning offer refunds on subscriptions?",
    answer:
      "No. Subscription payments are non-refundable. Once a subscription payment has been made, it cannot be refunded. We recommend reviewing the subscription details before completing your purchase.",
    category: "Subscription",
    icon: Receipt,
  },
  {
    question: "Can parents use Hustle Learning to support their children's studies?",
    answer:
      "Absolutely! Parents can explore educational resources, books, and online learning opportunities to support their children's academic development. Our platform aims to make quality learning support more accessible to families.",
    category: "General",
    icon: Users,
  },
  {
    question: "Do students need to attend physical coaching classes to use Hustle Learning?",
    answer:
      "No. Students can access available digital learning resources online. For Classes 9 and 10, regular online classes are also available as a separate learning offering.",
    category: "General",
    icon: MonitorSmartphone,
  },
  {
    question: "How can I get started with Hustle Learning?",
    answer:
      "Getting started is simple. Explore our free study resources, browse available physical books, enrol in online classes for Classes 9 and 10, or subscribe to our monthly learning plan for ₹99.",
    category: "General",
    icon: Compass,
  },
  {
    question: "How can I contact Hustle Learning for assistance?",
    answer:
      "Parents and students can reach out through the contact options available on our website for assistance with subscriptions, books, online classes, and other educational services.",
    category: "General",
    icon: MessageCircle,
  },
];

/**
 * Home FAQ section: centered heading, category pills and an icon-led
 * accordion built on native <details>. Emits FAQPage structured data.
 */
export default function HomeFaq() {
  const [active, setActive] = useState<FaqCategory>("General");
  const visible = FAQS.filter((f) => f.category === active);

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="mx-auto w-full max-w-[768px] px-4 py-10 md:px-6 md:py-14"
    >
      <JsonLd
        data={faqJsonLd(
          FAQS.map(({ question, answer }) => ({ question, answer })),
        )}
      />
      <h2
        id="home-faq-heading"
        className="text-center text-3xl text-text-primary sm:text-4xl"
      >
        Frequently asked questions
      </h2>
      <p className="mx-auto mt-3 max-w-[52ch] text-center text-[15px] leading-[1.6] text-text-secondary">
        Find answers to the most common questions about classes,
        subscriptions, books and more. Still stuck?{" "}
        <a
          href={CONTACT.telHref}
          className="font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          Talk to our experts
        </a>
      </p>

      <div
        role="tablist"
        aria-label="FAQ categories"
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              active === c
                ? "border-transparent bg-text-primary text-background"
                : "border-border bg-surface text-text-secondary hover:border-accent hover:text-text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div key={active} className="mt-8 divide-y divide-border">
        {visible.map((faq) => (
          <div key={faq.question} className="flex gap-3 py-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary"
            >
              <faq.icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <details className="group min-w-0 flex-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-2 text-sm leading-[1.65] text-text-secondary">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
