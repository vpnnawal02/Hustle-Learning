import type { LucideIcon } from "lucide-react";
import { BookOpen, Target, TrendingUp } from "lucide-react";

export interface PlanFeature {
  title: string;
  description: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
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
export const PLANS: SubscriptionPlan[] = [
  {
    id: "practice-plus",
    name: "Practice Plus",
    description: "Build consistency. Practise more. Track your progress.",
    price: 99,
    billingLabel: "Billed monthly",
    ctaLabel: "Get Practice Plus",
    features: [
      {
        title: "Extended Question Banks",
        description:
          "Chapter-wise MCQs, assertion-reason, short and long-answer questions.",
      },
      {
        title: "Weekly Assessments",
        description:
          "Regular chapter-wise tests based on CBSE examination patterns.",
      },
      {
        title: "Detailed Test Reports",
        description:
          "Review marks, accuracy and performance after every test.",
      },
      {
        title: "Important Questions",
        description:
          "Curated questions covering key concepts and exam-relevant topics.",
      },
      {
        title: "Step-by-Step Solutions",
        description:
          "Understand answers with explanations and worked solutions.",
      },
      {
        title: "Performance History",
        description:
          "Keep track of completed tests and monitor your progress over time.",
      },
    ],
  },
  {
    id: "complete-learning",
    name: "Complete Learning",
    description:
      "A more structured learning experience, built around your academic needs.",
    price: 249,
    billingLabel: "Billed monthly",
    ctaLabel: "Get Complete Learning",
    features: [
      {
        title: "Daily Practice Problems (DPPs)",
        description:
          "Daily question sets to develop regular problem-solving habits.",
      },
      {
        title: "School-Specific Worksheets",
        description:
          "Practice worksheets tailored to your school's syllabus and academic requirements.",
      },
      {
        title: "Personalised Practice Plans",
        description:
          "Focused practice recommendations based on your learning needs and performance.",
      },
      {
        title: "Exam Preparation Worksheets",
        description:
          "Structured revision exercises for periodic tests, term examinations and final exams.",
      },
      {
        title: "Advanced Practice Sets",
        description:
          "Additional challenging questions to strengthen conceptual understanding and application.",
      },
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  plus: boolean;
  complete: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Extended Question Banks", plus: true, complete: true },
  { feature: "Weekly Tests", plus: true, complete: true },
  { feature: "Test Report Cards", plus: true, complete: true },
  { feature: "Important Questions", plus: true, complete: true },
  { feature: "Detailed Answer Explanations", plus: true, complete: true },
  { feature: "Progress Tracking", plus: true, complete: true },
  { feature: "Revision Practice", plus: true, complete: true },
  { feature: "Daily Practice Problems", plus: false, complete: true },
  { feature: "School-oriented Worksheets", plus: false, complete: true },
  { feature: "Advanced Revision Worksheets", plus: false, complete: true },
  {
    feature: "Personalised Learning Recommendations",
    plus: false,
    complete: true,
  },
  { feature: "Enhanced Performance Insights", plus: false, complete: true },
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
  "Both plans are monthly subscriptions — ₹99/month and ₹249/month.",
  "Subscriptions can be cancelled anytime.",
  "Subscription payments are non-refundable.",
  "Access covers the digital learning resources included in the selected plan.",
  "Live online classes are not included in either subscription.",
  "Physical books are available for separate purchase and are not included.",
];

export const SUBSCRIPTION_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the difference between Practice Plus and Complete Learning?",
    answer:
      "Practice Plus provides extended question banks, weekly tests, test report cards and additional practice resources. Complete Learning includes everything in Practice Plus, along with daily practice problems, school-oriented worksheets, advanced revision resources and enhanced learning features.",
  },
  {
    question: "Are these subscriptions billed monthly?",
    answer:
      "Yes. Practice Plus costs ₹99 per month, while Complete Learning costs ₹249 per month.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. You can cancel your subscription at any time.",
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
      "Choose Practice Plus if you primarily need additional questions, regular assessments and performance tracking. Choose Complete Learning if you also want structured daily practice and school-oriented worksheets.",
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
      "Practice Plus costs ₹99 per month, while Complete Learning costs ₹249 per month.",
  },
  {
    question: "What is the difference between the two subscription plans?",
    answer:
      "Practice Plus provides extended question banks, weekly assessments, detailed test reports, important questions, step-by-step solutions and performance history. Complete Learning includes everything in Practice Plus, along with DPPs, school-specific worksheets, personalised practice plans, exam preparation worksheets and advanced practice sets.",
  },
  {
    question: "Are online batch classes included in subscriptions?",
    answer:
      "No. Online batch classes are offered separately and require separate payment.",
  },
  {
    question: "How much do online batch classes cost?",
    answer:
      "Online batch classes cost ₹499 per month or ₹5,000 per session.",
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
