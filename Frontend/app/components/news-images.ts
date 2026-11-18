/**
 * ALL news artwork lives here — this is the only file you need to touch
 * to change images across the news hub and all 95 article pages.
 * ============================================================================
 * HOW TO USE YOUR OWN IMAGES
 * ----------------------------------------------------------------------------
 * 1. Save your picture files in:
 *        public/news/
 *    Use clear lowercase names with dashes, e.g.  my-new-picture.png
 *    (no spaces or special characters).
 *
 *    Recommended sizes:
 *      - Card / hero images : 1200 x 675 px (16:9), JPG or WebP, < 300 KB
 *      - Keep text out of the image (headlines overlay it on the site).
 *
 * 2. Point at the file with its web path (always starts with /news/):
 *
 *        "/news/my-new-picture.png"
 *
 * 3. Assign it in ONE of the two places below:
 *
 *    a) ARTICLE_IMAGES  → shows on ONE specific article only
 *       (key = article id, e.g. "news-001"). Highest priority.
 *
 *    b) CATEGORY_IMAGES → rotates across every article in a category
 *       (used when an article has no override above).
 *
 * 4. Rebuild — no other file needs editing.
 *
 * NOTE: Alt text is generated automatically from each article's title
 * (see news-articles.ts). If a picture needs a custom description,
 * edit its `imageAlt` there.
 * ============================================================================
 */

export type NewsImage = string;

// ── Per-category defaults (rotate across every article in the category) ─────
export const CATEGORY_IMAGES: Record<string, NewsImage[]> = {
  "CBSE Updates": ["/news/notice-board.png", "/news/cbse-board-circular.png"],
  "Board Exam 2027": ["/news/datesheet-study-desk.png", "/news/exam-day-calendar.png"],
  "Class 10 News": ["/news/class10-study-desk.png", "/news/science-mind-map.png"],
  "Class 12 News": ["/news/graduation-day.png", "/news/late-night-study.png"],
  "Sample Papers": ["/news/organized-study-desk.png", "/news/focused-study.png"],
  "Exam Preparation": ["/news/maths-study-desk.png", "/news/maths-study-session.png"],
  "Practical Exams": ["/news/science-lab-practical.png", "/news/science-practical-file.png"],
};

// ── Per-article overrides (beat the category pool) ──────────────────────────
export const ARTICLE_IMAGES: Record<string, NewsImage> = {
  "news-001": "/news/datesheet-class10-12.png", // Top story + hub banner
  "news-002": "/news/datesheet-class10.png", // Class 10 schedule
  "news-003": "/news/datesheet-study-desk.png", // Class 12 schedule
  "news-010": "/news/exam-day-desk.png", // Exam-day guidelines
};

/** Resolve the image for an article: override first, else category rotation. */
export function newsImageFor(
  articleId: string,
  category: string,
  index: number,
): NewsImage {
  const override = ARTICLE_IMAGES[articleId];
  if (override) return override;
  const pool = CATEGORY_IMAGES[category] ?? [];
  if (pool.length === 0) return "/news/notice-board.png";
  return pool[index % pool.length];
}
