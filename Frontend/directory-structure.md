# directory/ — Content Structure Guide

> **Start here, new developer.** This file explains the single folder that
> holds every chapter of study material on Hustle Learning: where things
> live, how they are named, how they reach the website, and how to add
> new content without breaking anything.

---

## 1. The idea in 30 seconds

```
directory/class-10/notes/science/chemical-reactions-and-equations.mdx
          │           │      │       │
          │           │      │       └── file   = one chapter (named after the chapter)
          │           │      └── subject folder = science
          │           └── resource folder = notes
          └── class folder = class-10 (i.e. “Class 10”)
```

- **`directory/` is the source of truth for everything study-related.**
  Every `.mdx` file is one chapter (body + metadata + FAQs), and three
  small registry files describe the catalog:
  `_resources.json` (the 7 resource types), `class-N/_class.json`
  (subjects, chapters, class copy), `competitive/<exam>/_exam.json`.
- **There is no study-material data anywhere else.** `data/` holds only
  `navigation.json` (site menus). If you find chapter data outside
  `directory/`, it is a bug — delete it.
- **The website renders automatically.** Add a file → page, sitemap
  entry, search result and breadcrumbs appear on next build.
- **Nothing unpublished is ever shown as available.** Files with
  `status: draft` (or missing files) render “coming soon” with `noindex`.

---

## 2. Level-by-level rules

### Level 1 — Class folders: `class-6` … `class-12`

| Folder | Display name | Status |
|---|---|---|
| `class-6` … `class-10` | Class 6 … Class 10 | Live — registry in `directory/class-N/_class.json` |
| `class-11`, `class-12` | Class 11, Class 12 | **Planned** — skeleton only (see §8) |

Rules:

- Folder names are always lowercase, no spaces: `class-10`, never
  “Class 10”. Display names (“Class 10”) live in the registry.
- A class folder contains **exactly the 7 resource folders** (§3) —
  nothing else, except a `README.md` for planned classes.

### Level 2 — Resource folders (exactly 7 per class)

| # | Folder | Display name | What it holds |
|---|---|---|---|
| 1 | `ncert-solutions/` | NCERT Solutions | Step-by-step textbook exercise solutions |
| 2 | `notes/` | Notes | Revision-ready chapter notes |
| 3 | `important-questions/` | Important Questions | Exam-pattern practice with answer outlines |
| 4 | `sample-papers/` | Sample Papers | Full CBSE-pattern timed papers |
| 5 | `pyqs/` | Previous Year Questions (PYQs) | Chapter-wise questions from past boards |
| 6 | `worksheets/` | Worksheets | Short topic-wise practice sets |
| 7 | `formulas/` | Formula Sheets | One-page revision compilations |

Rules:

- Folder names are URL slugs — they appear in public URLs
  (`/class-10/science/notes/`). **Never rename a folder without a
  redirect plan**; display names can change freely in
  `directory/_resources.json`.
- The order above is fixed everywhere (menus, pages, sitemap).

### Level 3 — Subject folders

- One folder per subject, named by slug: `science/`, `mathematics/`,
  `english/`, `social-science/` (Classes 6–10);
  `physics/`, `chemistry/`, `mathematics/`, `biology/` (planned 11–12,
  JEE/NEET).
- Subject folders are created by `npm run scaffold` from the
  `class-N/_class.json` registry. **Never create a subject folder by
  hand** — add the subject to the `_class.json` first, then scaffold.
- An empty subject folder holds only a `.gitkeep` marker (git cannot
  track empty folders). The marker is auto-managed — leave it alone.

### Level 4 — Chapter files: `<chapter-slug>.mdx`

- File name **must equal the chapter slug** in the registry, e.g.
  `chemical-reactions-and-equations.mdx`.
- One file = one chapter = one resource type. The same chapter in a
  different resource is a *different file*
  (`notes/…/x.mdx` vs `ncert-solutions/…/x.mdx`).
- Full authoring syntax: §4. Starter copy: `directory/_TEMPLATE.mdx`.

### Competitive subtree: `directory/competitive/`

```
directory/competitive/<jee|neet>/<subject>/<resource>/<chapter>.mdx
```

Same file conventions as school content. JEE and NEET trees are fully
independent — never share files between them.

---

## 3. Frontmatter reference (required header of every file)

```mdx
---
id: c10-sci-notes-chemical-reactions   # globally unique, never reused
chapter: chemical-reactions-and-equations  # must match file name + registry
title: Chemical Reactions and Equations — Notes  # page H1
description: One-line summary for cards, search and meta description.
status: draft                          # draft | published | archived
updatedAt: 2026-11-02                  # YYYY-MM-DD
---
```

| Field | Rule |
|---|---|
| `id` | Unique across the whole project (validator enforces). Format: `<class>-<subject>-<resource>-<chapter>` shorthand. |
| `chapter` | Must equal the file name (minus `.mdx`) **and** the registry chapter slug in `class-N/_class.json`. |
| `title` / `description` | Page H1 and the summary used on cards, search and meta description. |
| `status` | `draft` = coming-soon + noindex · `published` = live + indexed · `archived` = hidden. |
| `updatedAt` | Shown as “Last updated …” and used in the sitemap. |

---

## 4. Body syntax reference

Paragraphs before the first heading render as the **introduction**.
Everything below maps 1:1 to page components:

| Syntax | Renders as |
|---|---|
| `## Heading` / `### Heading` | Section headings (h2/h3, auto TOC) |
| Blank-line-separated text | Paragraph |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `\| a \| b \|` + separator row | Table (header + rows) |
| `> [!TIP] text` / `[!NOTE]` / `[!WARNING]` | Tip / note / warning callout |
| ` ```formula:Label ` fence | Formula card (JetBrains Mono) |
| ` ```keys ` fence with `- ` lines | “Key takeaways” panel |
| `Q: question` (+ optional `{demo}`) newline `A: answer` | Question–answer block; `{demo}` marks demonstration content |
| `Q:` / `A:` under `## Frequently asked questions` | Page FAQs (structured data + FAQ section, not article body) |

Worked example (`directory/class-10/notes/science/chemical-reactions-and-equations.mdx`):

```mdx
One-page-style revision notes for Chapter 1. ...

## Balanced chemical equations

A chemical equation lists reactants on the left ...

| Type | Pattern | Example |
| ---- | ------- | ------- |
| Combination | A + B → AB | CaO + H₂O → Ca(OH)₂ |

> [!TIP] Exam tip: precipitation reactions ...
```

Parser: `lib/content/mdx.ts` (dependency-free, fully tested by build).
Full MDX/KaTeX rendering is the documented upgrade path — syntax above
is a strict subset, so files migrate without rewrites.

---

## 5. How `directory/` reaches the website

```
directory/class-10/notes/science/chemical-reactions-and-equations.mdx
        │  frontmatter (id/title/description/status/updatedAt)
        │  + body + ## Frequently asked questions
        ▼
lib/data/school.ts → getResourceFile()
  (scans the subject folder, parses each .mdx, sorts in registry order)
        ▼
app/[classSlug]/[subject]/[resource]/[chapter]/page.tsx
        │  /class-10/science/notes/chemical-reactions-and-equations/
        ▼  sitemap.xml · search index · breadcrumbs · JSON-LD
```

The registries (`_resources.json`, `class-N/_class.json`,
`competitive/<exam>/_exam.json`) provide the catalog: class/subject/
chapter lists, coming-soon placeholders, class focus copy, category
intros and exam sections. They never duplicate chapter data.

Rules:

- A `published` file with bad/missing frontmatter fails validation
  (`npm run validate-content`) — fix the file, not the code.
- Frontmatter `id` must be globally unique; `chapter` must equal the
  file name and a registered chapter slug.

---

## 6. Workflows (copy-paste checklists)

### Add a chapter's resource (most common task)

1. Copy `directory/_TEMPLATE.mdx` to
   `directory/<class>/<resource>/<subject>/<chapter-slug>.mdx`.
2. Fill frontmatter (`id`, `chapter`, `title`, `description`,
   `status: draft`, `updatedAt`), write the body (§4), and add page
   FAQs under `## Frequently asked questions` if any.
3. `npm run validate-content` → `npm run build` → check the
   coming-soon page.
4. Flip `status` to `published` → rebuild → live, indexed,
   sitemap-listed. No JSON edits, no code changes.

### Add a subject to a class

1. Append the subject (+ its chapter list) to
   `directory/<class>/_class.json`.
2. `npm run scaffold` → subject folders appear under all 7 resources.
3. Add chapter files per the checklist above.

### Add a resource type / class

1. Resource: append to `directory/_resources.json` (slug, title,
   description, icon, intro, howTo, faqs) → scaffold → folders appear.
2. Class: create `directory/class-N/_class.json`, add the slug to
   `CLASS_SLUGS` (`lib/data/school.ts`) and `data/navigation.json` →
   scaffold.

### Content rules (non-negotiable)

- Never fabricate NCERT answers, CBSE questions, exam years or PYQs.
  Demonstration material carries `{demo}` (Q&A) or a `[!NOTE]` callout.
- Never publish (`published`) unverified material.
- Dates are `YYYY-MM-DD`; slugs are `kebab-case`; ids are never reused.

---

## 7. Validation (`npm run validate-content` checks)

- Slugs well-formed; chapter slugs unique with sequential numbers.
- Every chapter file carries complete frontmatter; `chapter` matches
  the file name and a registered chapter; ids globally unique.
- Resource folders and subjects resolve against `_resources.json` and
  the class/exam registries; unknown locations fail.
- Planned classes (11–12) must not publish anything yet.

---

## 8. Planned areas (not live)

- **`class-11/`, `class-12/`**: skeleton + `README.md` only. No registry,
  no pages, nothing indexed — until registry entries land.
- **Empty subject folders** (`.gitkeep` only): reserved space, not
  content. Never link to them; pages render “coming soon” instead.

---

## 9. Full tree (generated — `.gitkeep` markers omitted)

```
directory/
  _TEMPLATE.mdx
  _resources.json
  class-6/
    _class.json
    formulas/
      english/
      mathematics/
      science/
      social-science/
    important-questions/
      english/
      mathematics/
      science/
      social-science/
    ncert-solutions/
      english/
      mathematics/
      science/
      social-science/
    notes/
      english/
      mathematics/
      science/
      social-science/
    pyqs/
      english/
      mathematics/
      science/
      social-science/
    sample-papers/
      english/
      mathematics/
      science/
      social-science/
    worksheets/
      english/
      mathematics/
      science/
      social-science/
  class-7/
    _class.json
    formulas/
      english/
      mathematics/
      science/
      social-science/
    important-questions/
      english/
      mathematics/
      science/
      social-science/
    ncert-solutions/
      english/
      mathematics/
      science/
      social-science/
    notes/
      english/
      mathematics/
      science/
      social-science/
    pyqs/
      english/
      mathematics/
      science/
      social-science/
    sample-papers/
      english/
      mathematics/
      science/
      social-science/
    worksheets/
      english/
      mathematics/
      science/
      social-science/
  class-8/
    _class.json
    formulas/
      english/
      mathematics/
      science/
      social-science/
    important-questions/
      english/
      mathematics/
      science/
      social-science/
    ncert-solutions/
      english/
      mathematics/
      science/
      social-science/
    notes/
      english/
      mathematics/
      science/
      social-science/
    pyqs/
      english/
      mathematics/
      science/
      social-science/
    sample-papers/
      english/
      mathematics/
      science/
      social-science/
    worksheets/
      english/
      mathematics/
      science/
      social-science/
  class-9/
    _class.json
    formulas/
      english/
      mathematics/
      science/
      social-science/
    important-questions/
      english/
      mathematics/
      science/
      social-science/
    ncert-solutions/
      english/
      mathematics/
      science/
      social-science/
    notes/
      english/
      mathematics/
      science/
      social-science/
    pyqs/
      english/
      mathematics/
      science/
      social-science/
    sample-papers/
      english/
      mathematics/
      science/
      social-science/
    worksheets/
      english/
      mathematics/
      science/
      social-science/
  class-10/
    _class.json
    formulas/
      english/
      mathematics/
      science/
        light-reflection-and-refraction.mdx
      social-science/
    important-questions/
      english/
      mathematics/
      science/
        acids-bases-and-salts.mdx
      social-science/
    ncert-solutions/
      english/
      mathematics/
      science/
        chemical-reactions-and-equations.mdx
        life-processes.mdx
      social-science/
    notes/
      english/
      mathematics/
        real-numbers.mdx
      science/
        chemical-reactions-and-equations.mdx
        light-reflection-and-refraction.mdx
      social-science/
    pyqs/
      english/
      mathematics/
      science/
      social-science/
    sample-papers/
      english/
      mathematics/
      science/
      social-science/
    worksheets/
      english/
      mathematics/
      science/
      social-science/
  class-11/
    README.md
    formulas/
      biology/
      chemistry/
      mathematics/
      physics/
    important-questions/
      biology/
      chemistry/
      mathematics/
      physics/
    ncert-solutions/
      biology/
      chemistry/
      mathematics/
      physics/
    notes/
      biology/
      chemistry/
      mathematics/
      physics/
    pyqs/
      biology/
      chemistry/
      mathematics/
      physics/
    sample-papers/
      biology/
      chemistry/
      mathematics/
      physics/
    worksheets/
      biology/
      chemistry/
      mathematics/
      physics/
  class-12/
    README.md
    formulas/
      biology/
      chemistry/
      mathematics/
      physics/
    important-questions/
      biology/
      chemistry/
      mathematics/
      physics/
    ncert-solutions/
      biology/
      chemistry/
      mathematics/
      physics/
    notes/
      biology/
      chemistry/
      mathematics/
      physics/
    pyqs/
      biology/
      chemistry/
      mathematics/
      physics/
    sample-papers/
      biology/
      chemistry/
      mathematics/
      physics/
    worksheets/
      biology/
      chemistry/
      mathematics/
      physics/
  competitive/
    jee/
      _exam.json
      physics/
        notes/
          kinematics.mdx
    neet/
      _exam.json
      biology/
        notes/
          cell-structure.mdx
```

---

## 10. New-developer FAQ

**Where do I add a new worksheet?**
`directory/<class>/worksheets/<subject>/<chapter>.mdx` — frontmatter,
body, done. Never touch `app/` for content.

**Why is my page “coming soon”?**
`status` is still `draft`, or the chapter slug isn't registered in the
class `_class.json` — run the validator, it tells you exactly.

**Can I rename a folder?**
Class/subject folders: yes (update the `_class.json` registry).
Resource folders: only with a redirect plan — they are public URL slugs.

**Where do URLs come from?**
`lib/urls.ts` builds them from the `directory/` registries; chapter
files never appear in URLs.

**Is there really no other study data?**
Correct. Chapter files + three registry files per area are everything:
`_resources.json`, `class-N/_class.json`, `competitive/<exam>/_exam.json`.
`data/` holds only site navigation.
