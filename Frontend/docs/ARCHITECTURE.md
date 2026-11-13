# Hustle Learning — Platform Architecture

> Next.js 16 App Router · TypeScript (strict) · Tailwind CSS 4 · zero new
> runtime dependencies (only `lucide-react` for icons, as before).

## 1. Big picture

```
directory/           ← SOLE source of study-material data
  _resources.json              7 resource categories + editorial copy
  class-N/_class.json          class → subjects → chapters + class copy
  class-6 … class-12 / <7 resource folders> / <subject> / <chapter>.mdx
  competitive/<jee|neet>/_exam.json + <subject>/<resource>/<chapter>.mdx
  _TEMPLATE.mdx, scaffold via `npm run scaffold`
  (full conventions: directory-structure.md)

data/navigation.json ← site menus only (no study data)

lib/content/mdx.ts   ← dependency-free MDX-subset parser (body → blocks+FAQs)
lib/data/*.ts        ← cached loaders read directory/ (nothing else)
scripts/scaffold-directory.mjs ← `npm run scaffold` (regenerate skeleton)
scripts/validate-content.mjs ← `npm run validate-content`
```

app/             ← routes (thin templates, no hardcoded content)
  /resources, /resources/[resource]
  /[classSlug]/[subject]/[resource]/[chapter]
  /jee|/neet, /[subject], /[subject]/[resource]
  /search, /sitemap.ts, /robots.ts

lib/             ← loaders, URL builders, SEO, search
components/      ← reusable templates (resources/, exams/, layout/, seo/)
types/content.ts ← interfaces every JSON file must satisfy
```

**Content is separate from presentation.** Adding a chapter never touches
JSX: copy `_TEMPLATE.mdx` → write the body → register JSON metadata →
set `published` → the page, sitemap entry, search index and breadcrumbs
appear automatically. Full conventions: `directory-structure.md`.

## 2. Key decisions (and why)

| Decision | Rationale |
|---|---|
| No framework migration | Project was already Next.js App Router — improved in place. |
| Navy/amber identity kept | `design.md` + all components use `#14213D`/`#FFB627`. The brief's purple (`#6256CA`) conflicts with the "preserve existing identity" rule, so navy/amber wins. Documented exception, not an oversight. |
| JSON content blocks, not MDX/KaTeX yet | Avoids new deps and build complexity; every block maps 1:1 to a future MDX component (`contentFile` field reserves the path). Demo content is explicitly labelled — no fabricated NCERT/CBSE answers. MDX migration path is in `CONTENT_GUIDE.md`. |
| No Zod | A dependency-free `validate-content.mjs` enforces the same schemas without adding a runtime dependency. |
| No Pagefind/Algolia | Static registry search (`lib/search.ts`) suits current scale; Pagefind is the documented upgrade path. |
| `NEXT_PUBLIC_SITE_URL` default | Placeholder `https://www.hustlelearning.in` — **must be replaced** with the real domain before launch (see `.env.example`). |

## 3. URL architecture

```
/class-10/                                    class landing
/class-10/science/                            subject landing
/class-10/science/notes/                      resource landing
/class-10/science/notes/chemical-reactions…/  chapter page (SEO focus)
/resources, /resources/ncert-solutions/       hubs
/jee/, /jee/physics/, /jee/physics/notes/     exam track (separate data)
/neet/…                                       same, independent
/search                                       utility (noindex)
```

Dynamic `[classSlug]` yields 404 for unknown slugs; static routes
(`/classes`, `/courses`, …) take precedence over it. The physical content
layout (`directory/…`) never leaks into URLs — `lib/urls.ts` is the only
place URL shapes are defined.

## 4. Indexing rules (enforced in `generateMetadata`)

- Class/subject/exam pages: index iff `status: "published"`.
- Resource pages: index iff ≥ 1 published item, else `noindex`.
- Chapter pages: index iff item is `published` **and** has blocks.
- `/search`: always `noindex`. Drafts: friendly "coming soon", never 404,
  never indexed. `sitemap.xml` includes published pages only.

## 5. Navigation

`data/navigation.json` drives the desktop 3-column mega menu
(School Education · Study Resources · Competitive Exams) and the mobile
accordion menu. Hover opens on desktop; Escape/outside-click closes;
44px targets; `aria-expanded`/`menuitem` roles throughout.

**Link-first content navigation:** cards are reserved for class selection
(`ClassSelector` — number, tagline, accent edge, arrow, whole-card link).
Subjects, chapters and resources navigate via separator-style text-link
rows (`components/resources/LinkLists.tsx`, `ChapterList.tsx`) with
availability badges — never dead links, never cards. Exam promo panels
remain on the homepage and resources hub only.

## 6. SEO per page

Canonical tags, Open Graph + Twitter cards (from root layout defaults),
`BreadcrumbList` on every trail, `Article` on chapter/exam content,
`FAQPage` only where genuine FAQs exist, Organization + WebSite JSON-LD
globally. One `h1` per page, semantic order preserved.

## 7. Verification

```
npm run validate-content   # JSON schemas + reference integrity
npm run lint               # eslint
npm run build              # SSG for every published page
npm run verify              # all three, in order
```
