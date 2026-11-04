import type { ContentBlock, ListItem } from "@/types/content";
import { tocEntries } from "@/lib/content/toc";
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
                  className="scroll-mt-24 text-xl font-bold tracking-tight text-text-primary"
                >
                  {block.text}
                </h3>
              );
            }
            const id = ids.get(i);
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-24 text-2xl font-extrabold tracking-tight text-balance text-text-primary"
              >
                {block.text}
              </h2>
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
                className="overflow-x-auto rounded-lg border border-border"
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
                className="rounded-lg border border-border bg-surface-muted/60 px-5 py-4"
              >
                <figcaption className="text-[13px] font-semibold text-text-secondary">
                  {block.label}
                </figcaption>
                <code className="mt-1.5 block font-mono text-base text-text-primary">
                  {block.expression}
                </code>
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className={`rounded-lg border px-5 py-4 text-[15px] leading-[1.6] ${
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
          case "qa":
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <p className="font-bold text-text-primary">
                  Q. <RichText text={block.question} />
                </p>
                <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
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
            );
          case "keyPoints":
            return (
              <div
                key={i}
                className="rounded-lg bg-brand-navy p-5 text-brand-white sm:p-6"
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
