# Content Guide — Adding Classes, Subjects, Chapters & Resources

No React changes are needed for routine content work. The full
conventions live in `directory-structure.md` — this guide is the short
version. Follow the steps, then run `npm run validate-content`.

## Add a chapter's resource (e.g. a worksheet)

1. Copy `directory/_TEMPLATE.mdx` to
   `directory/<class>/<resource>/<subject>/<chapter-slug>.mdx`
   (e.g. `directory/class-10/worksheets/science/acids-bases-and-salts.mdx`).
2. Fill the frontmatter (`id`, `chapter`, `title`, `description`,
   `status: draft`, `updatedAt`), write the body with the documented syntax
   (headings, lists, tables, ` ```formula: ` / ` ```keys ` fences,
   `> [!TIP|NOTE|WARNING]`, `Q:` / `A:` blocks, and a trailing
   `## Frequently asked questions` section for page FAQs).
3. Keep `status: "draft"` until verified; flip to `"published"` to go
   live — page + sitemap + search appear on the next build.
   (Chapter metadata lives in the file frontmatter; there is no
   per-chapter JSON to edit.)

## Add a new chapter to a subject

1. Edit `directory/<class>/_class.json` → subject → `chapters`:
   `{ "slug": "kebab-case", "title": "…", "number": N, "status": "draft" }`.
2. Numbers must be unique and sequential; slugs unique per subject.
3. New chapters automatically show "Coming soon" on resource pages
   (noindex) until a `published` chapter file exists.

## Add a subject / class / resource category

- Subject: append to `subjects` in the class file with `status: "draft"`
  and at least its chapter registry.
- Class: create `directory/class-N/_class.json` + add the slug to
  `CLASS_SLUGS` in `lib/data/school.ts` and to `data/navigation.json`.
- Resource category: append to `directory/_resources.json` (slug, title,
  description, lucide `icon` from `components/resources/icons.tsx`).

## JEE / NEET content

Mirror structure under `directory/competitive/`: registry in
`competitive/<exam>/_exam.json`, chapter files in
`competitive/<exam>/<subject>/<resource>/`. Exam URLs stop at the resource
level — items render inline on that page. Never mix school and exam data.

## Content rules (non-negotiable)

- **Never fabricate** NCERT answers, CBSE questions or historical PYQs.
  Demonstration material must carry `demo: true` (Q&A) or a `note`
  callout, matching existing examples.
- Unpublished/incomplete resources stay `draft` — they render "coming
  soon" with `noindex` and are excluded from the sitemap.
- Dates use `YYYY-MM-DD`. Slugs use `kebab-case`.

## MDX status and upgrade path

Chapter bodies already live in `.mdx` files under `directory/` and are
parsed by the dependency-free subset parser in `lib/content/mdx.ts`
(headings, paragraphs, lists, tables, formulas, callouts, Q&A, key
points — see `directory-structure.md` §4 for the exact syntax).

When volume justifies full MDX: add `@next/mdx` + KaTeX, swap the
parser for an MDX renderer, and keep every file as-is — the syntax
used here is a strict subset, so no rewrites are needed. JSON metadata,
URLs and validation stay unchanged.
