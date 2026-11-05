/** Per-resource icon hues (tint tokens are themed for both modes). */
export const RESOURCE_TINTS: Record<string, { text: string; colorVar: string }> = {
  "ncert-solutions": { text: "text-res-ncert", colorVar: "var(--res-ncert)" },
  notes: { text: "text-res-notes", colorVar: "var(--res-notes)" },
  "important-questions": {
    text: "text-res-impq",
    colorVar: "var(--res-impq)",
  },
  "sample-papers": {
    text: "text-res-sample",
    colorVar: "var(--res-sample)",
  },
  pyqs: { text: "text-res-pyq", colorVar: "var(--res-pyq)" },
  worksheets: {
    text: "text-res-worksheet",
    colorVar: "var(--res-worksheet)",
  },
  formulas: { text: "text-res-formula", colorVar: "var(--res-formula)" },
};

export function resourceTint(slug: string) {
  return (
    RESOURCE_TINTS[slug] ?? {
      text: "text-text-primary",
      colorVar: "var(--text-primary)",
    }
  );
}
