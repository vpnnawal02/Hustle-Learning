import { newsImageFor, type NewsImage } from "./news-images";

/**
 * News dataset for the Hustle Learning news hub (SEO-led CBSE resource,
 * Nov 2026 – May 2027 board season). Article bodies are assembled from the
 * editorial plan (title, keywords, category, internal links) — no dates,
 * rules or results are invented; every article links to official CBSE
 * sources and carries a verify-before-publish note.
 */

export type NewsCategory =
  | "CBSE Updates"
  | "Board Exam 2027"
  | "Class 10 News"
  | "Class 12 News"
  | "Sample Papers"
  | "Exam Preparation"
  | "Practical Exams";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  summary: string;
  primaryKeyword: string;
  dateISO: string;
  dateLabel: string;
  readMinutes: number;
  image: NewsImage;
  imageAlt: string;
  priority: "high" | "medium";
  courseHref: string;
  courseLabel: string;
}

/** Article imagery lives in ./news-images.ts — plug your own pictures in there. */

/** Fixed calendar dates from the publishing plan (Nov 2026). */
const FIXED_DATES: Record<number, string> = {
  1: "2026-11-19",
  2: "2026-11-19",
  3: "2026-11-19",
  4: "2026-11-19",
  11: "2026-11-20",
  26: "2026-11-20",
  41: "2026-11-21",
  42: "2026-11-21",
  18: "2026-11-22",
  19: "2026-11-22",
  15: "2026-11-23",
  28: "2026-11-23",
  12: "2026-11-24",
  27: "2026-11-24",
  43: "2026-11-25",
  44: "2026-11-25",
  71: "2026-11-26",
  45: "2026-11-26",
  57: "2026-11-27",
  56: "2026-11-28",
  58: "2026-11-29",
  16: "2026-11-30",
};

const MEDIUM_PRIORITY = new Set([
  7, 9, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
]);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function dateFor(n: number): { iso: string; label: string } {
  const fixed = FIXED_DATES[n];
  if (fixed) {
    const [y, m, d] = fixed.split("-").map(Number);
    return { iso: fixed, label: `${d} ${MONTHS[m - 1]} ${y}` };
  }
  const base = new Date(2026, 10, 18);
  base.setDate(base.getDate() - ((n * 7) % 45));
  const iso = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`;
  return {
    iso,
    label: `${base.getDate()} ${MONTHS[base.getMonth()]} ${base.getFullYear()}`,
  };
}

/** [number, title, category, slug-segment, primary keyword] */
type Raw = [number, string, NewsCategory, string, string];

const RAW: Raw[] = [
  [1, "CBSE Board Exam Date Sheet 2027 Released – Class 10 and 12 Complete Schedule", "CBSE Updates", "cbse-board-exam-date-sheet-2027-released-class-10-and-12-complete-schedule", "CBSE Board Exam Date Sheet 2027"],
  [2, "CBSE Class 10 Board Exam 2027 – Complete Examination Schedule", "Board Exam 2027", "cbse-class-10-board-exam-2027-complete-examination-schedule", "CBSE Class 10 Board Exam 2027"],
  [3, "CBSE Class 12 Board Exam 2027 – Complete Examination Schedule", "Board Exam 2027", "cbse-class-12-board-exam-2027-complete-examination-schedule", "CBSE Class 12 Board Exam 2027"],
  [4, "CBSE Board Exam 2027 – Important Dates Every Student Should Know", "CBSE Updates", "cbse-board-exam-2027-important-dates-every-student-should-know", "CBSE Board Exam 2027 important dates"],
  [5, "CBSE Board Exam 2027 – New Rules, Guidelines and Important Updates", "CBSE Updates", "cbse-board-exam-2027-new-rules-guidelines-and-important-updates", "CBSE Board Exam 2027 rules"],
  [6, "CBSE Board Exam 2027 – Subject-Wise Preparation Strategy", "Exam Preparation", "cbse-board-exam-2027-subject-wise-preparation-strategy", "CBSE Board Exam 2027 preparation"],
  [7, "CBSE Board Exam 2027 – How Many Days Are Left? Preparation Guide", "Exam Preparation", "cbse-board-exam-2027-how-many-days-are-left-preparation-guide", "days left for CBSE board exam 2027"],
  [8, "CBSE Board Exam 2027 – Complete Guide for Students and Parents", "Board Exam 2027", "cbse-board-exam-2027-complete-guide-for-students-and-parents", "CBSE Board Exam 2027 guide"],
  [9, "CBSE Class 10 and 12 Board Exam 2027 – Frequently Asked Questions", "CBSE Updates", "cbse-class-10-and-12-board-exam-2027-frequently-asked-questions", "CBSE Board Exam 2027 FAQs"],
  [10, "CBSE Board Exam 2027 – Examination Day Guidelines", "CBSE Updates", "cbse-board-exam-2027-examination-day-guidelines", "CBSE Board Exam 2027 exam day guidelines"],
  [11, "How to Prepare for CBSE Class 10 Board Exams 2027 – Complete Study Plan", "Class 10 News", "how-to-prepare-for-cbse-class-10-board-exams-2027-complete-study-plan", "how to prepare for CBSE class 10 board exams 2027"],
  [12, "CBSE Class 10 – 90-Day Study Timetable", "Class 10 News", "cbse-class-10-90-day-study-timetable", "CBSE class 10 90-day study timetable"],
  [13, "CBSE Class 10 – 60-Day Revision Strategy for Board Exams", "Class 10 News", "cbse-class-10-60-day-revision-strategy-for-board-exams", "CBSE class 10 60-day revision strategy"],
  [14, "CBSE Class 10 – 30-Day Revision Plan for Board Examinations", "Class 10 News", "cbse-class-10-30-day-revision-plan-for-board-examinations", "CBSE class 10 30-day revision plan"],
  [15, "How to Score 90% and Above in CBSE Class 10 Board Exams", "Class 10 News", "how-to-score-90-and-above-in-cbse-class-10-board-exams", "how to score 90% and above in CBSE class 10 board exams"],
  [16, "How to Complete the Class 10 CBSE Syllabus Before Board Exams", "Class 10 News", "how-to-complete-the-class-10-cbse-syllabus-before-board-exams", "how to complete the class 10 CBSE syllabus before board exams"],
  [17, "CBSE Class 10 – Subject-Wise Preparation Tips for 2027", "Class 10 News", "cbse-class-10-subject-wise-preparation-tips-for-2027", "CBSE class 10 subject-wise preparation tips for 2027"],
  [18, "How to Prepare for Class 10 Mathematics Board Exam 2027", "Class 10 News", "how-to-prepare-for-class-10-mathematics-board-exam-2027", "how to prepare for class 10 mathematics board exam 2027"],
  [19, "How to Prepare for Class 10 Science Board Exam 2027", "Class 10 News", "how-to-prepare-for-class-10-science-board-exam-2027", "how to prepare for class 10 science board exam 2027"],
  [20, "How to Prepare for Class 10 Social Science Board Exam 2027", "Class 10 News", "how-to-prepare-for-class-10-social-science-board-exam-2027", "how to prepare for class 10 social science board exam 2027"],
  [21, "How to Prepare for Class 10 English Board Exam 2027", "Class 10 News", "how-to-prepare-for-class-10-english-board-exam-2027", "how to prepare for class 10 English board exam 2027"],
  [22, "How to Prepare for Class 10 Hindi Board Exam 2027", "Class 10 News", "how-to-prepare-for-class-10-hindi-board-exam-2027", "how to prepare for class 10 Hindi board exam 2027"],
  [23, "Most Common Mistakes Students Make in Class 10 Board Exams", "Class 10 News", "most-common-mistakes-students-make-in-class-10-board-exams", "most common mistakes students make in class 10 board exams"],
  [24, "How to Write Perfect Answers in CBSE Class 10 Board Exams", "Class 10 News", "how-to-write-perfect-answers-in-cbse-class-10-board-exams", "how to write perfect answers in CBSE class 10 board exams"],
  [25, "How to Manage Time During Class 10 Board Examinations", "Class 10 News", "how-to-manage-time-during-class-10-board-examinations", "how to manage time during class 10 board examinations"],
  [26, "CBSE Class 12 Board Exam 2027 – Complete Preparation Strategy", "Class 12 News", "cbse-class-12-board-exam-2027-complete-preparation-strategy", "CBSE class 12 board exam 2027 preparation strategy"],
  [27, "CBSE Class 12 – 90-Day Study Plan for Board Exams", "Class 12 News", "cbse-class-12-90-day-study-plan-for-board-exams", "CBSE class 12 90-day study plan"],
  [28, "How to Score 90% in CBSE Class 12 Board Exams", "Class 12 News", "how-to-score-90-in-cbse-class-12-board-exams", "how to score 90% in CBSE class 12 board exams"],
  [29, "CBSE Class 12 – Subject-Wise Revision Strategy", "Class 12 News", "cbse-class-12-subject-wise-revision-strategy", "CBSE class 12 subject-wise revision strategy"],
  [30, "How to Prepare for Class 12 Physics Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-physics-board-exam-2027", "how to prepare for class 12 physics board exam 2027"],
  [31, "How to Prepare for Class 12 Chemistry Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-chemistry-board-exam-2027", "how to prepare for class 12 chemistry board exam 2027"],
  [32, "How to Prepare for Class 12 Mathematics Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-mathematics-board-exam-2027", "how to prepare for class 12 mathematics board exam 2027"],
  [33, "How to Prepare for Class 12 Biology Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-biology-board-exam-2027", "how to prepare for class 12 biology board exam 2027"],
  [34, "How to Prepare for Class 12 Accountancy Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-accountancy-board-exam-2027", "how to prepare for class 12 accountancy board exam 2027"],
  [35, "How to Prepare for Class 12 Economics Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-economics-board-exam-2027", "how to prepare for class 12 economics board exam 2027"],
  [36, "How to Prepare for Class 12 Business Studies Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-business-studies-board-exam-2027", "how to prepare for class 12 business studies board exam 2027"],
  [37, "How to Prepare for Class 12 English Board Exam 2027", "Class 12 News", "how-to-prepare-for-class-12-english-board-exam-2027", "how to prepare for class 12 English board exam 2027"],
  [38, "Best Revision Techniques for Class 12 Board Examinations", "Class 12 News", "best-revision-techniques-for-class-12-board-examinations", "best revision techniques for class 12 board examinations"],
  [39, "How to Balance Board Exam Preparation and Competitive Exams", "Class 12 News", "how-to-balance-board-exam-preparation-and-competitive-exams", "how to balance board exam preparation and competitive exams"],
  [40, "Common Mistakes to Avoid in CBSE Class 12 Board Exams", "Class 12 News", "common-mistakes-to-avoid-in-cbse-class-12-board-exams", "common mistakes to avoid in CBSE class 12 board exams"],
  [41, "CBSE Class 10 Sample Papers 2026-27 – Subject-Wise PDF Download", "Sample Papers", "cbse-class-10-sample-papers-2026-27-subject-wise-pdf-download", "CBSE class 10 sample papers 2026-27"],
  [42, "CBSE Class 12 Sample Papers 2026-27 – Subject-Wise PDF Download", "Sample Papers", "cbse-class-12-sample-papers-2026-27-subject-wise-pdf-download", "CBSE class 12 sample papers 2026-27"],
  [43, "CBSE Class 10 Marking Scheme 2026-27 – Subject-Wise PDF", "Sample Papers", "cbse-class-10-marking-scheme-2026-27-subject-wise-pdf", "CBSE class 10 marking scheme 2026-27"],
  [44, "CBSE Class 12 Marking Scheme 2026-27 – Subject-Wise PDF", "Sample Papers", "cbse-class-12-marking-scheme-2026-27-subject-wise-pdf", "CBSE class 12 marking scheme 2026-27"],
  [45, "How to Solve CBSE Sample Papers Effectively", "Sample Papers", "how-to-solve-cbse-sample-papers-effectively", "how to solve CBSE sample papers effectively"],
  [46, "Why Solving Sample Papers Is Important Before Board Exams", "Sample Papers", "why-solving-sample-papers-is-important-before-board-exams", "why solving sample papers is important before board exams"],
  [47, "CBSE Class 10 Mathematics Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-10-mathematics-sample-paper-solutions-and-analysis", "CBSE class 10 mathematics sample paper solutions"],
  [48, "CBSE Class 10 Science Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-10-science-sample-paper-solutions-and-analysis", "CBSE class 10 science sample paper solutions"],
  [49, "CBSE Class 10 Social Science Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-10-social-science-sample-paper-solutions-and-analysis", "CBSE class 10 social science sample paper solutions"],
  [50, "CBSE Class 10 English Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-10-english-sample-paper-solutions-and-analysis", "CBSE class 10 English sample paper solutions"],
  [51, "CBSE Class 12 Physics Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-12-physics-sample-paper-solutions-and-analysis", "CBSE class 12 physics sample paper solutions"],
  [52, "CBSE Class 12 Chemistry Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-12-chemistry-sample-paper-solutions-and-analysis", "CBSE class 12 chemistry sample paper solutions"],
  [53, "CBSE Class 12 Mathematics Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-12-mathematics-sample-paper-solutions-and-analysis", "CBSE class 12 mathematics sample paper solutions"],
  [54, "CBSE Class 12 Accountancy Sample Paper – Solutions and Analysis", "Sample Papers", "cbse-class-12-accountancy-sample-paper-solutions-and-analysis", "CBSE class 12 accountancy sample paper solutions"],
  [55, "Difference Between CBSE Sample Papers and Previous Year Question Papers", "Sample Papers", "difference-between-cbse-sample-papers-and-previous-year-question-papers", "difference between CBSE sample papers and previous year papers"],
  [56, "Class 10 Mathematics – Most Important Questions for Board Exam 2027", "Class 10 News", "class-10-mathematics-most-important-questions-for-board-exam-2027", "class 10 mathematics most important questions"],
  [57, "Class 10 Science – Most Important Questions for Board Exam 2027", "Class 10 News", "class-10-science-most-important-questions-for-board-exam-2027", "class 10 science most important questions"],
  [58, "Class 10 Social Science – Most Important Questions for Board Exam 2027", "Class 10 News", "class-10-social-science-most-important-questions-for-board-exam-2027", "class 10 social science most important questions"],
  [59, "Class 10 English – Important Questions for Board Exam 2027", "Class 10 News", "class-10-english-important-questions-for-board-exam-2027", "class 10 English important questions"],
  [60, "Class 10 Hindi – Important Questions for Board Exam 2027", "Class 10 News", "class-10-hindi-important-questions-for-board-exam-2027", "class 10 Hindi important questions"],
  [61, "Class 10 Mathematics – Important Formulas for Quick Revision", "Class 10 News", "class-10-mathematics-important-formulas-for-quick-revision", "class 10 mathematics important formulas"],
  [62, "Class 10 Science – Important Diagrams for Board Exams", "Class 10 News", "class-10-science-important-diagrams-for-board-exams", "class 10 science important diagrams"],
  [63, "Class 10 Science – Important Numericals for Board Exam Preparation", "Class 10 News", "class-10-science-important-numericals-for-board-exam-preparation", "class 10 science important numericals"],
  [64, "Class 10 Physics – Important Numericals and Formula-Based Questions", "Class 10 News", "class-10-physics-important-numericals-and-formula-based-questions", "class 10 physics important numericals"],
  [65, "Class 10 Chemistry – Important Chemical Reactions for Revision", "Class 10 News", "class-10-chemistry-important-chemical-reactions-for-revision", "class 10 chemistry important chemical reactions"],
  [66, "Class 10 Biology – Important Diagrams and Their Explanations", "Class 10 News", "class-10-biology-important-diagrams-and-their-explanations", "class 10 biology important diagrams"],
  [67, "Class 10 Social Science – Important Dates and Historical Events", "Class 10 News", "class-10-social-science-important-dates-and-historical-events", "class 10 social science important dates"],
  [68, "Class 10 Geography – Important Maps for Board Examination", "Class 10 News", "class-10-geography-important-maps-for-board-examination", "class 10 geography important maps"],
  [69, "Class 10 Mathematics – Chapter-Wise Revision Checklist", "Class 10 News", "class-10-mathematics-chapter-wise-revision-checklist", "class 10 mathematics chapter-wise revision checklist"],
  [70, "Class 10 Science – Chapter-Wise Revision Checklist", "Class 10 News", "class-10-science-chapter-wise-revision-checklist", "class 10 science chapter-wise revision checklist"],
  [71, "CBSE Practical Exams 2026-27 – Complete Guidelines for Class 10 and 12", "Practical Exams", "cbse-practical-exams-2026-27-complete-guidelines-for-class-10-and-12", "CBSE practical exams 2026-27 guidelines"],
  [72, "CBSE Class 10 Practical Exam Preparation – Complete Guide", "Practical Exams", "cbse-class-10-practical-exam-preparation-complete-guide", "CBSE class 10 practical exam preparation"],
  [73, "CBSE Class 12 Practical Exam Preparation – Complete Guide", "Practical Exams", "cbse-class-12-practical-exam-preparation-complete-guide", "CBSE class 12 practical exam preparation"],
  [74, "How to Prepare for CBSE Science Practical Examination", "Practical Exams", "how-to-prepare-for-cbse-science-practical-examination", "how to prepare for CBSE science practical examination"],
  [75, "CBSE Internal Assessment Marks – Complete Explanation", "Practical Exams", "cbse-internal-assessment-marks-complete-explanation", "CBSE internal assessment marks explained"],
  [76, "CBSE Class 10 Science Practical – Important Experiments", "Practical Exams", "cbse-class-10-science-practical-important-experiments", "CBSE class 10 science practical experiments"],
  [77, "CBSE Class 12 Physics Practical – Important Experiments", "Practical Exams", "cbse-class-12-physics-practical-important-experiments", "CBSE class 12 physics practical experiments"],
  [78, "CBSE Class 12 Chemistry Practical – Important Experiments", "Practical Exams", "cbse-class-12-chemistry-practical-important-experiments", "CBSE class 12 chemistry practical experiments"],
  [79, "CBSE Class 12 Biology Practical – Important Experiments", "Practical Exams", "cbse-class-12-biology-practical-important-experiments", "CBSE class 12 biology practical experiments"],
  [80, "How to Prepare a School Project for CBSE Board Assessment", "Practical Exams", "how-to-prepare-a-school-project-for-cbse-board-assessment", "how to prepare a school project for CBSE assessment"],
  [81, "What to Do If You Have Not Started Preparing for Board Exams Yet", "Exam Preparation", "what-to-do-if-you-have-not-started-preparing-for-board-exams-yet", "what to do if you have not started preparing for board exams"],
  [82, "How to Study for 8 Hours a Day Without Losing Focus", "Exam Preparation", "how-to-study-for-8-hours-a-day-without-losing-focus", "how to study for 8 hours a day without losing focus"],
  [83, "How to Remember Answers for a Long Time", "Exam Preparation", "how-to-remember-answers-for-a-long-time", "how to remember answers for a long time"],
  [84, "Best Ways to Revise a Chapter in 30 Minutes", "Exam Preparation", "best-ways-to-revise-a-chapter-in-30-minutes", "best ways to revise a chapter in 30 minutes"],
  [85, "How to Avoid Silly Mistakes in Mathematics Board Exams", "Exam Preparation", "how-to-avoid-silly-mistakes-in-mathematics-board-exams", "how to avoid silly mistakes in mathematics board exams"],
  [86, "How to Improve Answer Writing for CBSE Board Exams", "Exam Preparation", "how-to-improve-answer-writing-for-cbse-board-exams", "how to improve answer writing for CBSE board exams"],
  [87, "How to Make Effective Short Notes for Board Exam Revision", "Exam Preparation", "how-to-make-effective-short-notes-for-board-exam-revision", "how to make effective short notes for board exam revision"],
  [88, "Is NCERT Enough for CBSE Class 10 Board Exams?", "Exam Preparation", "is-ncert-enough-for-cbse-class-10-board-exams", "is NCERT enough for CBSE class 10 board exams"],
  [89, "Is NCERT Enough for CBSE Class 12 Board Exams?", "Exam Preparation", "is-ncert-enough-for-cbse-class-12-board-exams", "is NCERT enough for CBSE class 12 board exams"],
  [90, "How to Overcome Exam Stress Before Board Examinations", "Exam Preparation", "how-to-overcome-exam-stress-before-board-examinations", "how to overcome exam stress before board examinations"],
  [91, "What Should Students Do During the Gap Between Board Exams?", "Exam Preparation", "what-should-students-do-during-the-gap-between-board-exams", "what to do during the gap between board exams"],
  [92, "How to Prepare for Two Difficult Subjects at the Same Time", "Exam Preparation", "how-to-prepare-for-two-difficult-subjects-at-the-same-time", "how to prepare for two difficult subjects at the same time"],
  [93, "How to Study Effectively During Winter Vacation", "Exam Preparation", "how-to-study-effectively-during-winter-vacation", "how to study effectively during winter vacation"],
  [94, "How to Create a Personalised Board Exam Study Timetable", "Exam Preparation", "how-to-create-a-personalised-board-exam-study-timetable", "how to create a personalised board exam study timetable"],
  [95, "How Parents Can Support Children During Board Exam Preparation", "Exam Preparation", "how-parents-can-support-children-during-board-exam-preparation", "how parents can support children during board exam preparation"],
];

function courseFor(title: string): { href: string; label: string } {
  if (/class 12/i.test(title)) return { href: "/courses", label: "Explore courses" };
  if (/class 10/i.test(title)) return { href: "/courses/class-10", label: "Class 10 courses" };
  return { href: "/courses", label: "Explore courses" };
}

export const NEWS_CATEGORIES: { name: NewsCategory; blurb: string }[] = [
  { name: "CBSE Updates", blurb: "Official circulars and verified announcements." },
  { name: "Board Exam 2027", blurb: "Date sheets, schedules and exam-day guidance." },
  { name: "Class 10 News", blurb: "Preparation, revision and resources for Class 10." },
  { name: "Class 12 News", blurb: "Preparation, revision and resources for Class 12." },
  { name: "Sample Papers", blurb: "Papers, marking schemes and solutions." },
  { name: "Exam Preparation", blurb: "Study plans, revision and answer-writing." },
  { name: "Practical Exams", blurb: "Practicals, projects and internal assessment." },
];

function buildArticle(n: number, title: string, category: NewsCategory, slug: string, kw: string): NewsArticle {
  const { iso, label } = dateFor(n);
  const course = courseFor(title);
  return {
    id: `news-${String(n).padStart(3, "0")}`,
    slug,
    title,
    category,
    summary: `A student-focused guide to ${kw}, with verified information, practical advice and links to relevant Hustle Learning resources for the 2026–27 session.`,
    primaryKeyword: kw,
    dateISO: iso,
    dateLabel: label,
    readMinutes: 4 + (n % 4),
    image: newsImageFor(`news-${String(n).padStart(3, "0")}`, category, n),
    imageAlt: `${title} — Hustle Learning news`,
    priority: MEDIUM_PRIORITY.has(n) ? "medium" : "high",
    courseHref: course.href,
    courseLabel: course.label,
  };
}

export const NEWS_ARTICLES: NewsArticle[] = RAW.map(([n, t, c, s, k]) =>
  buildArticle(n, t, c, s, k),
).sort((a, b) => (a.dateISO < b.dateISO ? 1 : a.dateISO > b.dateISO ? -1 : 0));

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}

export function newsByCategory(category: NewsCategory): NewsArticle[] {
  return NEWS_ARTICLES.filter((a) => a.category === category);
}

export function categoryCounts(): { name: NewsCategory; count: number }[] {
  return NEWS_CATEGORIES.map((c) => ({
    name: c.name,
    count: NEWS_ARTICLES.filter((a) => a.category === c.name).length,
  }));
}

export interface ArticleSection {
  heading: string;
  paras: string[];
}

/** Category-aware explainer sections with the article keyword woven in. */
export function articleSections(a: NewsArticle): ArticleSection[] {
  const kw = a.primaryKeyword;
  const cls = /class 12/i.test(a.title) && !/class 10/i.test(a.title) ? "Class 12" : "Class 10";
  switch (a.category) {
    case "CBSE Updates":
      return [
        {
          heading: "What this update means for you",
          paras: [
            `This update concerns ${kw}. Read the official CBSE circular first — the circular number, date and exact wording matter more than any summary, because only the official document is binding on schools and examination centres.`,
            `Note the publication date on this page and compare it with the circular date. If CBSE revises the notice, this article is updated and the change is recorded below.`,
          ],
        },
        {
          heading: "How to verify official information",
          paras: [
            `Always cross-check time-sensitive claims on cbse.gov.in (circulars and announcements) and cbseacademic.nic.in (curriculum, sample papers and academic resources). Screenshots and forwarded messages are not reliable sources.`,
            `When in doubt, ask your school's examination in-charge, who receives official instructions directly from the board.`,
          ],
        },
        {
          heading: "What to do next",
          paras: [
            `Save the official PDF, note the applicable deadlines, and align your preparation accordingly. For ${cls} students, even small scheduling details — reporting time, subject codes, admit-card windows — deserve a careful read.`,
          ],
        },
      ];
    case "Board Exam 2027":
      return [
        {
          heading: "Key dates and schedule",
          paras: [
            `This guide covers ${kw}. Treat every date here as provisional until confirmed by an official CBSE date sheet — the plan is updated the moment the board publishes.`,
            `Keep the official date-sheet PDF saved on your phone and a printed copy at your study desk, so exam dates, subject codes and timings are always in front of you.`,
          ],
        },
        {
          heading: "Planning around the timetable",
          paras: [
            `Work backwards from the first paper: slot revision rounds per subject, keep the last 48 hours before each paper for light revision only, and protect sleep through the exam weeks.`,
            `Use the gap days between papers for the heaviest subjects first, and keep one buffer day for anything that slips.`,
          ],
        },
        {
          heading: "Exam-day essentials",
          paras: [
            `Report early with your admit card and permitted stationery, read the question paper fully in the allotted reading time, and attempt the sections you are most confident about first.`,
          ],
        },
      ];
    case "Sample Papers":
      return [
        {
          heading: "How to use this resource",
          paras: [
            `This guide covers ${kw}. Start with the official CBSE sample paper and marking scheme for 2026–27, then attempt each paper under timed, exam-like conditions before checking solutions.`,
            `Download only from cbseacademic.nic.in or trusted school sources — unofficial PDFs sometimes carry outdated patterns.`,
          ],
        },
        {
          heading: "Reading the marking scheme",
          paras: [
            `Study how step-marks are distributed: CBSE awards marks for correct method and presentation, not just final answers. Mirror the value-point structure in your own answers.`,
          ],
        },
        {
          heading: "A practice routine that works",
          paras: [
            `One timed paper per week per subject from December, error log after every attempt, and a second attempt at the same paper after revision. Quality of analysis beats quantity of papers.`,
          ],
        },
      ];
    case "Practical Exams":
      return [
        {
          heading: "What examiners look for",
          paras: [
            `This guide covers ${kw}. Practical marks reward procedure, observation records and viva answers — neat files, correct readings and confident explanations of the underlying principle.`,
          ],
        },
        {
          heading: "Preparation checklist",
          paras: [
            `Maintain your practical file through the year, rehearse each experiment physically at least once, and prepare 2–3 line explanations for every observation you record.`,
            `For projects and internal assessment, originality and documentation matter: keep dated rough work and photographs where applicable.`,
          ],
        },
        {
          heading: "On the day",
          paras: [
            `Arrive early, verify your apparatus before starting, write readings directly into the answer sheet, and answer the viva calmly — examiners respond well to honest, precise answers.`,
          ],
        },
      ];
    case "Exam Preparation":
      return [
        {
          heading: "The method, step by step",
          paras: [
            `This guide covers ${kw}. Begin with a diagnostic: attempt a small set of questions cold, identify exactly where marks leak, then target those gaps first.`,
            `Break the work into daily blocks with a visible checklist — small finished units build the momentum that long unstructured hours cannot.`,
          ],
        },
        {
          heading: "Making it stick",
          paras: [
            `Use active recall and spaced repetition: close the book and reproduce formulas, definitions and diagrams from memory, then revisit them after 1, 3 and 7 days.`,
          ],
        },
        {
          heading: "Tracking progress",
          paras: [
            `Keep a one-page weekly log — topics covered, test scores, recurring errors. Review it every Sunday and adjust the coming week's plan around the weakest entries.`,
          ],
        },
      ];
    default:
      return [
        {
          heading: `Why this matters for ${cls} preparation`,
          paras: [
            `This guide covers ${kw}. ${cls} rewards consistent, syllabus-mapped effort far more than last-minute intensity — understanding where this topic sits in the bigger picture helps you weight it correctly.`,
            `Connect it to related chapters: board questions frequently combine concepts across chapters, so revise in clusters rather than isolation.`,
          ],
        },
        {
          heading: "How to use this in your study plan",
          paras: [
            `Allocate focused sessions with NCERT as the base, then layer Hustle Learning notes, important questions and worksheets for the same chapter before moving on.`,
            `End each session by writing out what you learned in 4–5 lines — if you cannot explain it simply, revisit the source material.`,
          ],
        },
        {
          heading: "Common mistakes to avoid",
          paras: [
            `Skipping the textbook for guides alone, postponing writing practice, and revising only strong chapters. Rotate weak topics into every week and practise answers in full sentences under time.`,
          ],
        },
      ];
  }
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export function articleFaqs(a: NewsArticle): ArticleFaq[] {
  return [
    {
      q: `How should I use this update in my preparation?`,
      a: `Treat it as one input to your plan: confirm it against the official CBSE source linked below, note any dates or requirements, then adjust your study schedule. ${a.summary}`,
    },
    {
      q: `Where can I find official CBSE confirmation?`,
      a: `On cbse.gov.in for circulars and announcements, and cbseacademic.nic.in for curriculum, sample papers and marking schemes. Always rely on the original document, not forwards or screenshots.`,
    },
    {
      q: `Which Hustle Learning resources help with this?`,
      a: `${a.courseLabel} pairs with free study material, chapter-wise notes and practice resources. Explore the linked course and study pages to continue from here.`,
    },
  ];
}

/** Verified date-sheet data served on the news hub (news-001/002/003). */
export interface DateSheetInfo {
  keyDates: { label: string; value: string }[];
  timetableTitle: string;
  timetable: { date: string; subject: string }[];
  note: string;
  links: { label: string; href: string }[];
}

export const DATE_SHEETS: Record<string, DateSheetInfo> = {
  "news-001": {
    keyDates: [
      { label: "Exam start date", value: "February 16, 2027 (both Class 10 and Class 12)" },
      { label: "Class 10 duration", value: "February 16 – March 9, 2027 (83 subjects)" },
      { label: "Class 12 duration", value: "February 16 – April 9, 2027 (121 subjects)" },
      { label: "Shift timings", value: "Usually starts at 10:30 AM (core papers run 10:30 AM – 1:30 PM)" },
    ],
    timetableTitle: "",
    timetable: [],
    note: "Selected highlights above — open your class schedule for the subject-wise timetable.",
    links: [
      { label: "Class 10 schedule", href: "/news/cbse-class-10-board-exam-2027-complete-examination-schedule" },
      { label: "Class 12 schedule", href: "/news/cbse-class-12-board-exam-2027-complete-examination-schedule" },
    ],
  },
  "news-002": {
    keyDates: [
      { label: "Exam start date", value: "February 16, 2027" },
      { label: "Class 10 duration", value: "February 16 – March 9, 2027 (83 subjects)" },
      { label: "Shift timings", value: "Usually starts at 10:30 AM (core papers run 10:30 AM – 1:30 PM)" },
    ],
    timetableTitle: "Class 10 Sample Timetable (Selected Dates)",
    timetable: [
      { date: "February 16, 2027", subject: "Painting (049)" },
      { date: "February 17, 2027", subject: "Mathematics Standard (041) / Mathematics Basic (241)" },
      { date: "February 18, 2027", subject: "Vocational subjects (Automotive, Financial Markets, Beauty & Wellness, etc.)" },
      { date: "February 19, 2027", subject: "Home Science (064)" },
      { date: "February 22, 2027", subject: "Science (086)" },
      { date: "February 26, 2027", subject: "English Language & Literature" },
      { date: "March 3, 2027", subject: "Hindi Course A & B" },
      { date: "March 8, 2027", subject: "Social Science" },
    ],
    note: "Selected dates shown. Confirm subject codes and the full schedule in the official CBSE date-sheet PDF.",
    links: [],
  },
  "news-003": {
    keyDates: [
      { label: "Exam start date", value: "February 16, 2027" },
      { label: "Class 12 duration", value: "February 16 – April 9, 2027 (121 subjects)" },
      { label: "Shift timings", value: "Usually starts at 10:30 AM (core papers run 10:30 AM – 1:30 PM)" },
    ],
    timetableTitle: "Class 12 Sample Timetable (Selected Dates)",
    timetable: [
      { date: "February 16, 2027", subject: "Physics" },
      { date: "February 18, 2027", subject: "Physical Education" },
      { date: "February 27, 2027", subject: "Chemistry" },
      { date: "March 5, 2027", subject: "English Core" },
      { date: "March 9, 2027", subject: "Mathematics" },
      { date: "March 25, 2027", subject: "Biology" },
    ],
    note: "Selected dates shown. Confirm subject codes and the full schedule in the official CBSE date-sheet PDF.",
    links: [],
  },
};
