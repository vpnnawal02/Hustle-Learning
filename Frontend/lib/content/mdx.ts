import { promises as fs } from "node:fs";
import path from "node:path";
import type { ContentBlock, ListItem } from "@/types/content";

/**
 * Minimal MDX-subset parser for chapter files under `directory/`.
 * Dependency-free by design: supports exactly the block types in
 * `ContentBlock` (see directory-structure.md for the authoring syntax).
 * Full MDX/KaTeX rendering remains the documented upgrade path.
 */

export interface ParsedMdx {
  frontmatter: Record<string, string>;
  blocks: ContentBlock[];
  /** Q&A written under a `## Frequently asked questions` heading. */
  faqs: { question: string; answer: string }[];
}

/** Load a full chapter file: body blocks plus FAQs and frontmatter. */
export async function loadChapterFile(
  rel: string,
): Promise<ParsedMdx & { rel: string }> {
  const empty: ParsedMdx & { rel: string } = {
    frontmatter: {},
    blocks: [],
    faqs: [],
    rel,
  };
  try {
    // Statically scoped under directory/ (keeps bundler tracing narrow).
    if (!rel.startsWith("directory/") || rel.includes("..")) return empty;
    const safe = rel.slice("directory/".length);
    const raw = await fs.readFile(
      path.join(process.cwd(), "directory", safe),
      "utf-8",
    );
    return { ...parseMdx(raw), rel };
  } catch {
    return empty;
  }
}

/** Load and parse a chapter file, e.g. `directory/class-10/notes/science/x.mdx`. */
export async function loadContentFile(rel: string): Promise<ContentBlock[]> {
  return (await loadChapterFile(rel)).blocks;
}

export function parseMdx(raw: string): ParsedMdx {
  const text = raw.replace(/\r\n/g, "\n");
  const frontmatter: Record<string, string> = {};
  let body = text;
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) {
    for (const line of fm[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx > 0) {
        frontmatter[line.slice(0, idx).trim()] = line
          .slice(idx + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
      }
    }
    body = text.slice(fm[0].length);
  }

  const lines = body.split("\n");
  const blocks: ContentBlock[] = [];
  const faqs: { question: string; answer: string }[] = [];
  let i = 0;
  // Q&A under an FAQ heading belongs to page FAQs, not the article body.
  let inFaqSection = false;

  const isSpecial = (l: string) => {
    const t = l.trimStart();
    return (
      t.startsWith("## ") ||
      t.startsWith("### ") ||
      t.startsWith("```") ||
      t.startsWith("|") ||
      t.startsWith("> [!") ||
      t.startsWith("Q: ") ||
      /^(\d+[.)]|[-*])\s/.test(t)
    );
  };
  const listMarker = (l: string) =>
    l.match(/^(\s*)(\d+[.)]|[-*])\s+(.*)$/);

  while (i < lines.length) {
    const line = lines[i];

    // Blank: separator only.
    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Fenced blocks: ```formula:Label, ```keys, and ```stanza.
    if (line.startsWith("```")) {
      const info = line.slice(3).trim();
      const inner: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        inner.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      if (info.toLowerCase().startsWith("stanza")) {
        const label = info.slice("stanza".length).replace(/^[:\s]+/, "").trim();
        blocks.push({
          type: "stanza",
          label,
          lines: inner.map((l) => l.trim()).filter(Boolean),
        });
      } else if (info.toLowerCase().startsWith("formula")) {
        const label = info.slice("formula".length).replace(/^[:\s]+/, "").trim() || "Formula";
        blocks.push({
          type: "formula",
          label,
          expression: inner.join("\n").trim(),
        });
      } else if (info.toLowerCase() === "keys") {
        blocks.push({
          type: "keyPoints",
          points: inner
            .map((l) => l.replace(/^[-*]\s+/, "").trim())
            .filter(Boolean),
        });
      }
      continue;
    }

    // Tables.
    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|?[\s:|-]*$/.test(lines[i + 1].trim()) &&
      lines[i + 1].includes("|")
    ) {
      const split = (r: string) =>
        r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = split(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(split(lines[i]));
        i += 1;
      }
      blocks.push({ type: "table", head, rows });
      continue;
    }

    // Headings (an FAQ heading reroutes following Q&A into page FAQs).
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      inFaqSection = /frequently asked|faq/i.test(text);
      if (!inFaqSection) {
        blocks.push({ type: "heading", level: 2, text });
      }
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    // Callouts: > [!TIP] text / [!NOTE] / [!WARNING].
    if (line.startsWith("> [!")) {
      const m = line.match(/^>\s*\[!(TIP|NOTE|WARNING)\]\s*(.*)$/i);
      if (m) {
        const tone =
          m[1].toUpperCase() === "TIP"
            ? "tip"
            : m[1].toUpperCase() === "WARNING"
              ? "warning"
              : "note";
        blocks.push({ type: "callout", tone, text: m[2].trim() });
        i += 1;
        continue;
      }
    }

    // Q&A: Q: ... [{demo}] followed by optional (a)/(b)/... option lines,
    // then A: ... (continuation lines joined).
    if (line.startsWith("Q: ")) {
      let question = line.slice(3).trim();
      let demo = false;
      if (question.endsWith("{demo}")) {
        demo = true;
        question = question.slice(0, -"{demo}".length).trim();
      }
      i += 1;
      // Blank lines may separate Q: from options/A: — skip them.
      while (i < lines.length && lines[i].trim() === "") i += 1;
      // MCQ options: consecutive "(a) text" lines before the answer.
      const options: string[] = [];
      while (i < lines.length && /^\([a-zA-Z]\)\s+\S/.test(lines[i].trim())) {
        options.push(lines[i].trim());
        i += 1;
      }
      while (i < lines.length && lines[i].trim() === "") i += 1;
      const answerLines: string[] = [];
      if (i < lines.length && lines[i].startsWith("A: ")) {
        answerLines.push(lines[i].slice(3).trim());
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !isSpecial(lines[i]) &&
          !lines[i].startsWith("Q: ")
        ) {
          answerLines.push(lines[i].trim());
          i += 1;
        }
      }
      const qa: ContentBlock = {
        type: "qa",
        question,
        answer: answerLines.join(" "),
      };
      if (demo) (qa as { demo?: boolean }).demo = true;
      if (options.length > 0)
        (qa as { options?: string[] }).options = options;
      if (inFaqSection) {
        faqs.push({ question, answer: answerLines.join(" ") });
      } else {
        blocks.push(qa);
      }
      continue;
    }

    // Lists. Nesting via indentation (2 spaces per level).
    if (listMarker(line)) {
      const raw: { indent: number; ordered: boolean; text: string }[] = [];
      while (i < lines.length) {
        if (lines[i].trim() === "") {
          // A blank line ends the list unless another item follows.
          let j = i + 1;
          while (j < lines.length && lines[j].trim() === "") j += 1;
          if (j < lines.length && listMarker(lines[j])) {
            i = j;
            continue;
          }
          break;
        }
        const m = listMarker(lines[i]);
        if (!m) break;
        raw.push({
          indent: m[1].length,
          ordered: /^\d/.test(m[2]),
          text: m[3].trim(),
        });
        i += 1;
      }
      const root: ListItem[] = [];
      const stack: { indent: number; node: ListItem }[] = [];
      for (const r of raw) {
        const node: ListItem = { text: r.text, children: [] };
        while (
          stack.length > 0 &&
          r.indent <= stack[stack.length - 1].indent
        ) {
          stack.pop();
        }
        if (stack.length === 0) root.push(node);
        else stack[stack.length - 1].node.children.push(node);
        stack.push({ indent: r.indent, node });
      }
      blocks.push({
        type: "list",
        ordered: raw.length > 0 && raw[0].ordered,
        items: root,
      });
      continue;
    }

    // Paragraphs: before any other block they are the introduction.
    const para: string[] = [line.trim()];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isSpecial(lines[i]) &&
      !lines[i].startsWith("Q: ")
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    const text = para.join(" ");
    if (blocks.length === 0) blocks.push({ type: "intro", text });
    else blocks.push({ type: "paragraph", text });
  }

  return { frontmatter, blocks, faqs };
}
