# Adding Notes — The Checklist

> Follow this file every time you add chapter notes (or any chapter
> resource) to the site. It is deliberately short — the full conventions
> live in `directory-structure.md`.

## Before you start

- [ ] You have the chapter content (notes document, textbook reference).
- [ ] The chapter is registered in `directory/<class>/_class.json`
      (subject → chapters). If not, add it first:
      `{ "slug": "kebab-case", "title": "…", "number": N, "status": "draft" }`.
- [ ] You copied `directory/_TEMPLATE.mdx` (never start from blank).

## Write the file → `directory/<class>/notes/<subject>/<chapter-slug>.mdx`

- [ ] File name **exactly equals** the registry chapter slug.
- [ ] Frontmatter filled: `id` (globally unique), `chapter` (= file name),
      `title`, `description` (one line), `status: draft`, `updatedAt`
      (YYYY-MM-DD).
- [ ] **Every line transcribed** — nothing skipped, nothing summarized away.
      Clean PDF ligature corruption (`NaƟonalism` → `Nationalism`,
      `aŌer` → `after`, stray control characters removed).
- [ ] Key terms wrapped in `**bold**` where the source emphasizes them.
- [ ] Numbered points written as `1.` `2.` `3.` … (renderer numbers them).
- [ ] Tables use `| col |` + separator row; formulas go in
      ```` ```formula:Label ```` fences; takeaways in a ```` ```keys ````
      fence.
- [ ] Page FAQs appended under `## Frequently asked questions`
      (genuine questions only — never invent official answers).
- [ ] No fabricated NCERT/CBSE claims. Demonstration content marked
      `{demo}` or with a `[!NOTE]` callout.

## Publish

- [ ] `npm run validate-content` passes (checks frontmatter, ids,
      registry match, slug = filename).
- [ ] `npm run build` passes — open the chapter page, read it end to end.
- [ ] Flip `status` to `published` **in the file frontmatter AND the
      registry chapter entry**, plus the subject to `published` if this
      is its first chapter (draft subjects 404 their pages).
- [ ] Rebuild. Confirm: chapter page renders, parent pages list it,
      search finds it, sitemap includes it.

## Gotchas (learned the hard way)

- **Restart `next dev` after content/registry edits.** A running dev
  server caches loaded files — your new page will 404 until restart.
  Production builds always read fresh.
- Registry chapter `status` and file `status` must agree.
- `id` is forever — never reuse one, even after deleting a file.
- One file = one chapter = one resource type. Same chapter in another
  resource (e.g. `important-questions/…`) is a separate file.
