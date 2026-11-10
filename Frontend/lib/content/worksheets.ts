import type { ContentBlock } from "@/types/content";

/**
 * Worksheet sections: a `## Worksheet N` h2 heading opens one worksheet
 * page (/:class/:subject/:resource/:chapter/worksheet-N). Pure functions
 * over parsed blocks — no I/O, safe to import anywhere.
 */

export interface WorksheetSection {
  /** URL slug, e.g. "worksheet-1". */
  slug: string;
  /** Display title, e.g. "Worksheet 1". */
  title: string;
  /** Section blocks, starting with the h2 heading itself. */
  blocks: ContentBlock[];
  questionCount: number;
  totalMarks: number;
}

/** A `## Worksheet N` heading starts a worksheet section. */
export function isWorksheetHeading(text: string): boolean {
  return /^worksheet\b/i.test(text.trim());
}

/** Split a trailing "(N mark/marks)" suffix off a question. */
export function splitMarks(question: string): {
  text: string;
  marks: number | null;
} {
  const m = question.match(/\(\s*(\d+)\s*marks?\s*\)\s*$/i);
  if (!m || m.index === undefined) return { text: question, marks: null };
  return { text: question.slice(0, m.index).trim(), marks: Number(m[1]) };
}

function worksheetSlug(title: string, fallback: number): string {
  const m = title.match(/worksheet\s*(\d+)/i);
  if (m) return `worksheet-${m[1]}`;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `worksheet-${fallback}`;
}

/** Zero-padded worksheet number for display ("Worksheet 1" → "01"). */
export function worksheetDisplayNumber(slugOrTitle: string): string {
  const m = slugOrTitle.match(/worksheet[\s-]*(\d+)/i);
  return m ? m[1].padStart(2, "0") : "01";
}

export type MarksBand = "one" | "two-three" | "four-plus" | "mixed";

const BAND_TITLES: Record<MarksBand, string> = {
  one: "Very Short Answer Questions",
  "two-three": "Short Answer Questions",
  "four-plus": "Long Answer Questions",
  mixed: "Questions",
};

function bandOf(marks: number | null): MarksBand {
  if (marks === null) return "mixed";
  if (marks <= 1) return "one";
  if (marks <= 3) return "two-three";
  return "four-plus";
}

export interface BandQuestion {
  question: string;
  answer: string;
  marks: number | null;
  demo?: boolean;
  options?: string[];
}

export interface BandGroup {
  band: MarksBand;
  letter: string;
  title: string;
  /** e.g. "(10 × 1 = 10 Marks)" or "(8 questions · 20 Marks)". */
  suffix: string;
  items: BandQuestion[];
}

function suffixFor(items: BandQuestion[]): string {
  const total = items.reduce((s, q) => s + (q.marks ?? 0), 0);
  const uniform =
    items.length > 0 &&
    items.every((q) => q.marks !== null && q.marks === items[0].marks);
  if (uniform && items[0].marks !== null)
    return `(${items.length} × ${items[0].marks} = ${total} Marks)`;
  if (total > 0) return `(${items.length} questions · ${total} Marks)`;
  return `(${items.length} questions)`;
}

function toBandQuestion(b: Extract<ContentBlock, { type: "qa" }>): BandQuestion {
  return {
    question: splitMarks(b.question).text,
    answer: b.answer,
    marks: splitMarks(b.question).marks,
    ...(b.demo ? { demo: true as const } : {}),
    ...(b.options && b.options.length > 0 ? { options: b.options } : {}),
  };
}

/**
 * Group a worksheet section's questions for the exam paper. Explicit
 * `### Section …` headings win (banner shows the heading text with a
 * computed marks suffix); otherwise questions auto-group into A/B/C
 * marks bands. Convention: keep worksheet questions ordered by
 * ascending marks.
 */
export function groupWorksheetQuestions(
  blocks: ContentBlock[],
): BandGroup[] {
  const groups: BandGroup[] = [];
  const letter = () => String.fromCharCode(65 + groups.length);
  const pushAuto = (items: BandQuestion[]) => {
    const byBand = new Map<MarksBand, BandQuestion[]>();
    for (const q of items) {
      const band = bandOf(q.marks);
      if (!byBand.has(band)) byBand.set(band, []);
      byBand.get(band)?.push(q);
    }
    for (const [band, list] of byBand) {
      groups.push({
        band,
        letter: letter(),
        title: BAND_TITLES[band],
        suffix: suffixFor(list),
        items: list,
      });
    }
  };
  let pending: BandQuestion[] = [];
  let explicitTitle: string | null = null;
  const flushExplicit = () => {
    if (explicitTitle === null) return;
    const items = pending;
    pending = [];
    const firstMarks = items.length > 0 ? items[0].marks : null;
    groups.push({
      band: items.length > 0 ? bandOf(firstMarks) : "mixed",
      letter: letter(),
      title: explicitTitle,
      suffix: suffixFor(items),
      items,
    });
    explicitTitle = null;
  };
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 3) {
      flushExplicit();
      // Auto-band any questions that preceded the first explicit section.
      if (groups.length === 0 && pending.length > 0) {
        const stray = pending;
        pending = [];
        pushAuto(stray);
      }
      explicitTitle = b.text.trim();
    } else if (b.type === "qa") {
      pending.push(toBandQuestion(b));
    }
  }
  if (explicitTitle !== null) flushExplicit();
  else pushAuto(pending);
  return groups;
}

/** Split chapter blocks into worksheet sections (empty when none). */
export function splitWorksheets(blocks: ContentBlock[]): WorksheetSection[] {
  const out: WorksheetSection[] = [];
  let current: ContentBlock[] | null = null;
  let title = "";
  const flush = () => {
    if (!current || current.length === 0) return;
    let questionCount = 0;
    let totalMarks = 0;
    for (const b of current) {
      if (b.type === "qa") {
        questionCount += 1;
        totalMarks += splitMarks(b.question).marks ?? 0;
      }
    }
    out.push({
      slug: worksheetSlug(title, out.length + 1),
      title,
      blocks: current,
      questionCount,
      totalMarks,
    });
  };
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 2 && isWorksheetHeading(b.text)) {
      flush();
      title = b.text.trim();
      current = [b];
    } else if (current) {
      current.push(b);
    }
  }
  flush();
  return out;
}

/** Blocks outside every worksheet section (intro, takeaways, …). */
export function nonWorksheetBlocks(blocks: ContentBlock[]): ContentBlock[] {
  const first = blocks.findIndex(
    (b) => b.type === "heading" && b.level === 2 && isWorksheetHeading(b.text),
  );
  if (first === -1) return blocks;
  const last = blocks.reduce(
    (acc, b, i) =>
      b.type === "heading" && b.level === 2 && isWorksheetHeading(b.text)
        ? i
        : acc,
    first,
  );
  return [...blocks.slice(0, first), ...blocks.slice(last + 1)];
}
