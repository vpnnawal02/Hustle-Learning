import type { LucideIcon } from "lucide-react";
import { BookOpen, Target, TrendingUp } from "lucide-react";

export interface PlanFeature {
  title: string;
  description: string;
  /** When present, the row links out instead of expanding a dropdown. */
  href?: string;
  /** Marks the lead feature — rendered with a pastel amber highlight. */
  highlight?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  /** Shown in brackets beside the name, e.g. "Classes 6–10". */
  audience: string;
  price: number;
  billingLabel: string;
  ctaLabel: string;
  features: PlanFeature[];
}

/**
 * Subscription catalogue. Complete Learning includes everything in
 * Practice Plus — the component renders that relationship instead of
 * duplicating the eight shared features.
 *
 * NOTE: there is currently no checkout/payment integration in the
 * project (no gateway SDK, no orders API). Card CTAs therefore follow
 * the existing SubscribePage convention and open the callback enquiry
 * flow ("/#hero-enquiry"). When a real checkout lands, pass
 * plan.id + plan.price to it from here.
 */
/**
 * Every tier includes the same six features — only the monthly price
 * varies by class group. The wording of each feature is tailored to the
 * tier so each plan reads as its own preparation track.
 */
function tierFeatures(copy: {
  bank: string;
  assignments: string;
  pyqs: string;
  papers: string;
  history: string;
}): PlanFeature[] {
  return [
    {
      title: "Drill Mode",
      description:
        "Timer-based MCQ practice with instant feedback and accuracy tracking.",
      href: "/drill-mode",
      highlight: true,
    },
    { title: "Extended Question Bank", description: copy.bank },
    { title: "Weekly Assignments", description: copy.assignments },
    { title: "PYQs", description: copy.pyqs },
    { title: "Sample Papers (with solutions)", description: copy.papers },
    { title: "Performance History", description: copy.history },
  ];
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: "foundation",
    name: "Foundation",
    audience: "Classes 6–10",
    price: 99,
    billingLabel: "Billed monthly",
    ctaLabel: "Subscribe",
    features: tierFeatures({
      bank: "Chapter-wise questions mapped to NCERT, with solved examples.",
      assignments:
        "Short weekly assignments that build consistent study habits.",
      pyqs: "Previous year board questions to understand exam patterns.",
      papers: "Exam-style sample papers with step-by-step solutions.",
      history: "Keep track of completed practice and watch progress grow.",
    }),
  },
  {
    id: "advanced",
    name: "Advanced",
    audience: "Classes 11–12",
    price: 129,
    billingLabel: "Billed monthly",
    ctaLabel: "Subscribe",
    features: tierFeatures({
      bank: "Chapter-wise questions mapped to the senior secondary syllabus, with solved examples.",
      assignments:
        "Weekly assignments paced for Classes 11–12 and board preparation.",
      pyqs: "Previous year board questions for senior secondary topics.",
      papers:
        "Full-length sample papers for board-style preparation, with solutions.",
      history:
        "Keep track of completed practice and monitor progress through Classes 11–12.",
    }),
  },
  {
    id: "aspirant",
    name: "Aspirant",
    audience: "JEE & NEET",
    price: 149,
    billingLabel: "Billed monthly",
    ctaLabel: "Subscribe",
    features: tierFeatures({
      bank: "Chapter-wise questions mapped to the JEE & NEET syllabi, with solved examples.",
      assignments:
        "Weekly assignments modelled on entrance-exam question styles.",
      pyqs: "Previous year JEE and NEET questions for exam-style practice.",
      papers: "Timed practice papers in JEE & NEET format, with solutions.",
      history:
        "Keep track of completed practice and monitor exam readiness over time.",
    }),
  },
];

export interface ValueProp {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Learn Beyond the Textbook",
    description:
      "Go beyond regular textbook exercises with additional questions, worksheets and structured practice.",
    icon: BookOpen,
  },
  {
    title: "Measure Your Progress",
    description:
      "Regular assessments and performance reports help students understand their preparation and identify areas that need attention.",
    icon: TrendingUp,
  },
  {
    title: "Practise with a Purpose",
    description:
      "Access organised learning resources that support daily practice, revision and examination preparation.",
    icon: Target,
  },
];

export const SUBSCRIPTION_TERMS: string[] = [
  "Three monthly tiers — Foundation (Classes 6–10) at ₹99/month, Advanced (Classes 11–12) at ₹129/month, and Aspirant (JEE & NEET) at ₹149/month.",
  "Every tier includes the same six features — only the price varies.",
  "Subscriptions can be cancelled anytime.",
  "Subscription payments are non-refundable.",
  "Access covers the digital learning resources included in the subscription.",
  "Live online classes are not included in subscriptions.",
  "Physical books are available for separate purchase and are not included.",
];

export const SUBSCRIPTION_FAQS: { question: string; answer: string }[] = [
  {
    question: "What subscription plans are available?",
    answer:
      "Three monthly tiers: Foundation (Classes 6–10) at ₹99 per month, Advanced (Classes 11–12) at ₹129 per month, and Aspirant (JEE & NEET) at ₹149 per month.",
  },
  {
    question: "Do all plans include the same features?",
    answer:
      "Yes. Every tier includes Drill Mode, Extended Question Bank, Weekly Assignments, PYQs, Sample Papers with solutions, and Performance History.",
  },
  {
    question: "Are these subscriptions billed monthly?",
    answer: "Yes. All three tiers are billed monthly and can be cancelled anytime.",
  },
  {
    question: "Can I get a refund after purchasing a subscription?",
    answer: "No. Subscription payments are non-refundable.",
  },
  {
    question: "Are live online classes included in these plans?",
    answer: "No. Live online classes are separate from the subscription plans.",
  },
  {
    question: "Are physical books included?",
    answer: "No. Physical books are available for separate purchase.",
  },
  {
    question: "Which plan should I choose?",
    answer:
      "Choose the tier that matches the student's level: Foundation for Classes 6–10, Advanced for Classes 11–12, or Aspirant for JEE & NEET. The included features are identical across tiers.",
  },
];

export const PRICING_FAQS: { question: string; answer: string }[] = [
  {
    question: "What services does Hustle Learning offer?",
    answer:
      "Hustle Learning currently offers monthly subscriptions, online batch classes, personal home tutoring and personal online tutoring.",
  },
  {
    question: "What are the available subscription plans?",
    answer:
      "Foundation (Classes 6–10) costs ₹99 per month, Advanced (Classes 11–12) costs ₹129 per month, and Aspirant (JEE & NEET) costs ₹149 per month. All three include the same features.",
  },
  {
    question: "What is the difference between the subscription plans?",
    answer:
      "Only the price and the class group differ. Every tier includes Drill Mode, Extended Question Bank, Weekly Assignments, PYQs, Sample Papers with solutions, and Performance History.",
  },
  {
    question: "Are online batch classes included in subscriptions?",
    answer:
      "No. Online batch classes are offered separately and require separate payment.",
  },
  {
    question: "How much do online batch classes cost?",
    answer:
      "Online batch classes cost ₹499 per month or ₹5,000 per academic year.",
  },
  {
    question: "How much does personal home tutoring cost?",
    answer:
      "Personal home tutoring starts at ₹4,999. The final price depends on the student's class, subjects, location and tuition requirements.",
  },
  {
    question: "How much does personal online tutoring cost?",
    answer: "Personal online tutoring starts at ₹499 per hour.",
  },
  {
    question:
      "What is the difference between online batch classes and personal online tutoring?",
    answer:
      "Online batch classes involve learning alongside other students in a shared classroom. Personal online tutoring provides dedicated one-to-one teaching based on an individual student's learning requirements.",
  },
  {
    question: "Can I purchase a subscription and join online classes separately?",
    answer:
      "Yes. Subscriptions and online classes are separate services and can be purchased independently.",
  },
  {
    question: "Are physical books included in subscriptions?",
    answer: "No. Physical books are available for separate purchase.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. Subscriptions can be cancelled anytime. Subscription payments are non-refundable.",
  },
  {
    question: "How can I enquire about a personal tutor?",
    answer:
      "Contact the Hustle Learning team with your class, subjects, location and preferred learning mode. Our team will guide you through the available tutoring options.",
  },
];
