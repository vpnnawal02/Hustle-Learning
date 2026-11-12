import type { ContentBlock, ListItem } from "@/types/content";
import { tocEntries } from "@/lib/content/toc";
import { isWorksheetHeading, splitMarks } from "@/lib/content/worksheets";
import RichText from "./RichText";

/** Recursive list nodes (sub-points indent under their parent point). */
function listNodes(items: ListItem[]) {
  return items.map((item, j) => (
    <li key={j}>
      <RichText text={item.text} />
      {item.children.length > 0 && (
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
          {listNodes(item.children)}
        </ul>
      )}
    </li>
  ));
}

/**
 * Renders structured content blocks with consistent typography.
 * Each block maps 1:1 to a future MDX component (see docs/ARCHITECTURE.md).
 * Mathematical expressions render as code-styled text until KaTeX lands.
 */
/** Block index → anchor id for h2 headings (same ids the TOC links to). */
function headingIds(blocks: ContentBlock[]): Map<number, string> {
  const entries = tocEntries(blocks);
  const ids = new Map<number, string>();
  let order = 0;
  blocks.forEach((b, bi) => {
    if (b.type === "heading" && b.level === 2) {
      const entry = entries[order];
      order += 1;
      if (entry) ids.set(bi, entry.id);
    }
  });
  return ids;
}

export default function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  const ids = headingIds(blocks);
  // Block indices of Q&A items and h2 sections in article order.
  const qaOrder = blocks.flatMap((b, bi) => (b.type === "qa" ? [bi] : []));
  const h2Order = blocks.flatMap((b, bi) =>
    b.type === "heading" && b.level === 2 ? [bi] : [],
  );
  // Question number restarts after every h2 (each worksheet runs Q1…).
  const qaNumberAt = (i: number): number => {
    const prevH2 = h2Order.filter((h) => h < i).pop() ?? -1;
    return qaOrder.filter((bi) => bi > prevH2 && bi <= i).length;
  };
  // Questions + total marks in the section an h2 heading opens.
  const sectionStats = (bi: number): { count: number; marks: number } => {
    const nextH2 = h2Order.find((h) => h > bi) ?? blocks.length;
    let count = 0;
    let marks = 0;
    for (let k = bi + 1; k < nextH2; k += 1) {
      const b = blocks[k];
      if (b.type === "qa") {
        count += 1;
        marks += splitMarks(b.question).marks ?? 0;
      }
    }
    return { count, marks };
  };
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "intro":
            return (
              <p
                key={i}
                className="max-w-[68ch] text-base leading-[1.6] text-text-secondary sm:text-lg"
              >
                <RichText text={block.text} />
              </p>
            );
          case "heading": {
            if (block.level !== 2) {
              return (
                <h3
                  key={i}
                  className="scroll-mt-24 font-sans text-xl font-bold text-text-primary"
                >
                  {block.text}
                </h3>
              );
            }
            const id = ids.get(i);
            if (!isWorksheetHeading(block.text)) {
              return (
                <h2
                  key={i}
                  id={id}
                    className="scroll-mt-24 text-2xl text-balance text-text-primary"
                >
                  {block.text}
                </h2>
              );
            }
            const stats = sectionStats(i);
            return (
              <div
                key={i}
                className="overflow-hidden rounded-md border border-border"
              >
                <div className="border-b border-border bg-surface-muted/60 px-5 py-4">
                  <h2
                    id={id}
                    className="scroll-mt-24 text-xl text-balance text-text-primary"
                  >
                    {block.text}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    {stats.count} question{stats.count === 1 ? "" : "s"}
                    {stats.marks > 0 &&
                      ` · ${stats.marks} mark${stats.marks === 1 ? "" : "s"}`}
                    {" · tap a question to reveal its answer"}
                  </p>
                </div>
              </div>
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className="max-w-[68ch] text-base leading-[1.6] text-text-secondary"
              >
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return block.ordered ? (
              <ol
                key={i}
                className="flex max-w-[68ch] list-decimal flex-col gap-2 pl-6 text-base leading-[1.6] text-text-secondary"
              >
                {listNodes(block.items)}
              </ol>
            ) : (
              <ul className="flex max-w-[68ch] list-disc flex-col gap-2 pl-6 text-base leading-[1.6] text-text-secondary" key={i}>
                {listNodes(block.items)}
              </ul>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-md border border-border"
              >
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-surface-muted">
                      {block.head.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="border-b border-border px-4 py-3 font-bold text-text-primary"
                        >
                          <RichText text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-border last:border-0">
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-3 text-text-secondary">
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "formula":
            return (
              <figure
                key={i}
                className="rounded-md border border-border bg-surface-muted/60 px-5 py-4"
              >
                <figcaption className="text-[13px] font-semibold text-text-secondary">
                  {block.label}
                </figcaption>
                <code className="mt-1.5 block text-base text-text-primary">
                  {block.expression}
                </code>
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className={`rounded-md border px-5 py-4 text-[15px] leading-[1.6] ${
                  block.tone === "tip"
                    ? "border-accent/60 bg-accent/10 text-text-primary"
                    : block.tone === "warning"
                      ? "border-red-500/50 bg-red-500/5 text-text-primary"
                      : "border-border bg-surface-muted/60 text-text-secondary"
                }`}
              >
                <strong className="mr-2 font-bold">
                  {block.tone === "tip"
                    ? "Tip:"
                    : block.tone === "warning"
                      ? "Note:"
                      : "Note:"}
                </strong>
                <RichText text={block.text} />
              </aside>
            );
          case "qa": {
            // Independent <details> accordion per question: only the question
            // is visible until tapped; the answer expands with a smooth
            // height + fade animation. Native <details> needs no client JS,
            // so the answer stays in the HTML (SEO-friendly). Questions
            // render verbatim (including source marks); answer-less
            // questions render as static text with no accordion.
            // Numbering restarts after every h2.
            const num = qaNumberAt(i);
            if (block.answer.trim().length === 0) {
              return (
                <div
                  key={i}
                  className="rounded-md border border-border bg-surface px-5 py-4"
                >
                  <p className="font-semibold text-text-primary">
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-sm bg-brand-navy text-sm font-bold text-brand-white"
                    >
                      {num}
                    </span>
                    <RichText text={block.question} />
                    {block.options && block.options.length > 0 && (
                      <span className="mt-2 grid gap-1 font-normal text-text-secondary sm:grid-cols-2">
                        {block.options.map((opt, oi) => (
                          <span key={oi}>
                            <RichText text={opt} />
                          </span>
                        ))}
                      </span>
                    )}
                  </p>
                </div>
              );
            }
            return (
              <details
                key={i}
                className="group rounded-md border border-border bg-surface px-5 py-4 transition-colors duration-300 ease-in-out open:border-accent/60 open:bg-surface-muted open:shadow-sm motion-reduce:transition-none"
              >
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex min-h-[28px] items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-brand-navy text-sm font-bold text-brand-white transition-colors duration-300 group-open:bg-accent group-open:text-on-accent motion-reduce:transition-none"
                    >
                      {num}
                    </span>
                    <span className="flex-1 font-semibold text-text-primary">
                      <RichText text={block.question} />
                      {block.options && block.options.length > 0 && (
                        <span className="mt-2 grid gap-1 font-normal text-text-secondary sm:grid-cols-2">
                          {block.options.map((opt, oi) => (
                            <span key={oi}>
                              <RichText text={opt} />
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl leading-none font-light text-accent transition-transform duration-300 ease-in-out group-open:rotate-45 motion-reduce:transition-none"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
                  <div className="overflow-hidden opacity-0 transition-opacity delay-75 duration-300 group-open:opacity-100 motion-reduce:transition-none">
                    <div className="mt-3 ml-10 border-l-2 border-accent pl-4">
                      <p className="text-[15px] leading-[1.6] text-text-secondary">
                        <strong className="font-semibold text-text-primary">
                          A.{" "}
                        </strong>
                        <RichText text={block.answer} />
                      </p>
                      {block.demo && (
                        <p className="mt-2 text-[13px] text-text-muted">
                          Demonstration example — illustrates the answer format.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            );
          }
          case "stanza":
            return (
              <figure
                key={i}
                className="rounded-md border border-border bg-surface px-5 py-6 sm:px-8"
              >
                {block.label && (
                  <figcaption className="mb-3 text-center text-[13px] font-semibold tracking-wide text-text-muted uppercase">
                    {block.label}
                  </figcaption>
                )}
                <blockquote className="mx-auto max-w-[60ch] text-center text-[17px] leading-[1.9] text-text-primary">
                  {block.lines.map((ln, j) => (
                    <span key={j} className="block italic">
                      <RichText text={ln} />
                    </span>
                  ))}
                </blockquote>
              </figure>
            );
          case "keyPoints":            return (
              <div
                key={i}
                className="rounded-md bg-brand-navy p-5 text-brand-white sm:p-6"
              >
                <p className="text-sm font-bold text-accent">
                  Key takeaways
                </p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {block.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[15px] leading-[1.55]"
                    >
                      <span aria-hidden="true" className="font-bold text-accent">
                        ✦
                      </span>
                      <span>
                        <RichText text={point} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
