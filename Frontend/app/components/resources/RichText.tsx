import { Fragment } from "react";

/**
 * Renders `**bold**` markers inside content strings as <strong>.
 * Strength inherits the surrounding colour so it stays legible in every
 * context (body copy, callouts, navy takeaway panels, tables).
 */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
