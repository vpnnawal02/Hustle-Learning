#!/usr/bin/env node
/**
 * validate-content.mjs — build-time validation for the data-driven platform.
 * Usage: npm run validate-content
 *
 * Single source of truth: `directory/`
 *  - directory/_resources.json            7 resource categories
 *  - directory/class-N/_class.json        class → subjects → chapters (+focus/faqs)
 *  - directory/competitive/<exam>/_exam.json
 *  - directory/** /*.mdx                   chapter bodies + frontmatter + FAQs
 * Plus data/navigation.json (site navigation links).
 *
 * Exit non-zero with useful errors on failure.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const directoryDir = path.join(root, "directory");

let errors = 0;
const fail = (msg) => {
  errors += 1;
  console.error(`  ✗ ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

const readJson = async (abs) => JSON.parse(await readFile(abs, "utf-8"));

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = new Set(["draft", "published", "archived"]);
const PLANNED_CLASSES = new Set(["class-11", "class-12"]);

/** Minimal frontmatter reader (mirrors lib/content/mdx.ts conventions). */
function parseFrontmatter(raw) {
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx > 0) fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return fm;
}

const checkFaqs = (faqs, where) => {
  if (!Array.isArray(faqs)) {
    fail(`${where}: faqs must be an array`);
    return;
  }
  for (const f of faqs) {
    if (!f.question || !f.answer) fail(`${where}: faq missing question/answer`);
  }
};

async function main() {
  console.log("Validating Hustle Learning content directory…\n");

  // ---- navigation.json (site nav, lives in data/) ----
  console.log("data/navigation.json");
  const nav = JSON.parse(
    await readFile(path.join(root, "data", "navigation.json"), "utf-8"),
  );
  for (const c of nav.school.classes) {
    if (!/^\/class-\d+$/.test(c.href)) fail(`school class href: ${c.href}`);
  }
  for (const l of nav.resources.links) {
    if (!/^\/resources\/[a-z-]+$/.test(l.href)) fail(`resource href: ${l.href}`);
  }
  for (const card of nav.exams.cards) {
    if (!/^\/(jee|neet)$/.test(card.href)) fail(`exam href: ${card.href}`);
    for (const s of card.subjects) {
      if (!new RegExp(`^/${card.slug}/[a-z-]+$`).test(s.href))
        fail(`exam subject href: ${s.href}`);
    }
  }
  ok("navigation links match route shapes");

  // ---- _resources.json ----
  console.log("directory/_resources.json");
  const resources = await readJson(path.join(directoryDir, "_resources.json"));
  const resourceSlugs = new Set(resources.map((r) => r.slug));
  for (const r of resources) {
    if (!SLUG_RE.test(r.slug)) fail(`resource: bad slug ${r.slug}`);
    if (!Array.isArray(r.intro) || r.intro.length === 0)
      fail(`resource ${r.slug}: needs intro paragraphs`);
    if (!Array.isArray(r.howTo) || r.howTo.length === 0)
      fail(`resource ${r.slug}: needs howTo bullets`);
    if (!r.blurb || r.blurb.length < 10)
      fail(`resource ${r.slug}: needs a one-line blurb`);
    checkFaqs(r.faqs ?? [], `_resources.json:${r.slug}`);
  }
  ok(`${resources.length} resource categories with editorial content`);

  // ---- hardcoded slug lists must mirror the registry ----
  const helpersSrc = await readFile(
    path.join(root, "lib", "data", "helpers.ts"),
    "utf-8",
  );
  const hardcoded = new Set(
    [...helpersSrc.matchAll(/"([a-z0-9-]+)"/g)]
      .map((m) => m[1])
      .filter((s) => resourceSlugs.has(s)),
  );
  for (const r of resourceSlugs) {
    if (!hardcoded.has(r))
      fail(`helpers.ts isSchoolResourceSlug is missing "${r}" (add it or the route 404s)`);
  }

  // ---- class registries ----
  console.log("directory/class-N/_class.json");
  const registry = new Map(); // "class-10/science" -> { chapters: Map(slug -> number) }
  const classSlugs = [];
  for (let n = 6; n <= 10; n++) {
    const slug = `class-${n}`;
    classSlugs.push(slug);
    const file = await readJson(path.join(directoryDir, slug, "_class.json"));
    if (file.slug !== slug) fail(`${slug}: slug mismatch`);
    if (!STATUSES.has(file.status)) fail(`${slug}: bad status`);
    if (file.status === "published" && (!file.focus || file.focus.length < 40))
      fail(`${slug}: published class needs a focus paragraph`);
    checkFaqs(file.faqs ?? [], `${slug}/_class.json`);
    const seenSubjects = new Set();
    for (const subj of file.subjects ?? []) {
      if (seenSubjects.has(subj.slug)) fail(`${slug}: duplicate subject ${subj.slug}`);
      seenSubjects.add(subj.slug);
      const chapters = new Map();
      for (const ch of subj.chapters ?? []) {
        if (!SLUG_RE.test(ch.slug)) fail(`${slug}/${subj.slug}: bad chapter slug`);
        if (chapters.has(ch.slug)) fail(`${slug}/${subj.slug}: duplicate chapter ${ch.slug}`);
        chapters.set(ch.slug, ch.number);
        if (!STATUSES.has(ch.status)) fail(`${slug}/${subj.slug}/${ch.slug}: bad status`);
      }
      registry.set(`${slug}/${subj.slug}`, chapters);
    }
  }
  ok("5 class registries, slugs unique, chapters ordered");

  // ---- exam registries ----
  console.log("directory/competitive/*/_exam.json");
  const examRegistry = new Map(); // "jee/physics" -> { chapters: Set, resources: Set }
  for (const examSlug of ["jee", "neet"]) {
    const exam = await readJson(
      path.join(directoryDir, "competitive", examSlug, "_exam.json"),
    );
    if (exam.slug !== examSlug) fail(`${examSlug}: slug mismatch`);
    if (!Array.isArray(exam.sections) || exam.sections.length === 0)
      fail(`${examSlug}: needs editorial sections`);
    checkFaqs(exam.faqs ?? [], `${examSlug}/_exam.json`);
    const chapterSets = new Map();
    for (const s of exam.subjects ?? []) {
      chapterSets.set(s.slug, new Set((s.chapters ?? []).map((c) => c.slug)));
    }
    examRegistry.set(examSlug, {
      chapters: chapterSets,
      resources: new Set((exam.resources ?? []).map((r) => r.slug)),
    });
  }
  ok("jee + neet registries valid");

  // ---- chapter files ----
  console.log("directory/**/ *.mdx");
  const seenIds = new Set();
  let files = 0;
  let published = 0;
  const publishedSchoolFiles = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!entry.name.endsWith(".mdx") || entry.name.startsWith("_")) continue;
      const rel = path.relative(directoryDir, full).replace(/\\/g, "/");
      const parts = rel.split("/");
      const fm = parseFrontmatter(await readFile(full, "utf-8"));
      files += 1;

      for (const field of ["id", "chapter", "title", "description", "status"]) {
        if (!fm[field]) fail(`${rel}: frontmatter missing "${field}"`);
      }
      if (fm.status && !STATUSES.has(fm.status)) fail(`${rel}: bad status`);
      if (seenIds.has(fm.id)) fail(`${rel}: duplicate id ${fm.id}`);
      seenIds.add(fm.id);
      const filename = entry.name.slice(0, -".mdx".length);
      if (fm.chapter && fm.chapter !== filename)
        fail(`${rel}: chapter "${fm.chapter}" ≠ file name`);
      if (fm.status === "published") {
        published += 1;
        if (fm.updatedAt && !DATE_RE.test(fm.updatedAt))
          fail(`${rel}: bad updatedAt`);
      }

      if (parts[0] === "competitive") {
        const [, exam, subject, resource] = parts;
        const reg = examRegistry.get(exam);
        if (!reg) fail(`${rel}: unknown exam ${exam}`);
        else {
          if (!reg.chapters.has(subject)) fail(`${rel}: unknown subject ${subject}`);
          else if (fm.chapter && !reg.chapters.get(subject).has(fm.chapter))
            fail(`${rel}: unknown chapter ${fm.chapter}`);
          if (!reg.resources.has(resource)) fail(`${rel}: unknown resource ${resource}`);
        }
        if (PLANNED_CLASSES.has(parts[0])) fail(`${rel}: unexpected location`);
      } else {
        const [cls, resource, subject] = parts;
        if (PLANNED_CLASSES.has(cls)) {
          if (fm.status === "published")
            fail(`${rel}: planned class must not publish yet`);
          continue;
        }
        publishedSchoolFiles.push({
          rel,
          cls,
          resource,
          subject,
          status: fm.status,
        });
        if (!classSlugs.includes(cls)) fail(`${rel}: unknown class ${cls}`);
        if (!resourceSlugs.has(resource)) fail(`${rel}: unknown resource ${resource}`);
        const chapters = registry.get(`${cls}/${subject}`);
        if (!chapters) fail(`${rel}: unknown subject ${subject}`);
        else if (fm.chapter && !chapters.has(fm.chapter))
          fail(`${rel}: unknown chapter ${fm.chapter}`);
      }
    }
  };
  await walk(directoryDir);
  ok(`${files} chapter files, ${published} published, ids unique`);

  // ---- _availability.json (subject x resource x class matrix) ----
  console.log("directory/_availability.json");
  const availability = await readJson(
    path.join(directoryDir, "_availability.json"),
  );
  const offeredBySubject = availability.subjects ?? {};
  const classesByResource = availability.resourceClasses ?? {};
  for (const [subject, resources] of Object.entries(offeredBySubject)) {
    for (const r of resources) {
      if (!resourceSlugs.has(r))
        fail(`availability: unknown resource ${r} for subject ${subject}`);
    }
  }
  for (const [r, classes] of Object.entries(classesByResource)) {
    if (!resourceSlugs.has(r)) fail(`availability: unknown resource ${r}`);
    for (const c of classes) {
      if (!classSlugs.includes(c))
        fail(`availability: unknown class ${c} for resource ${r}`);
    }
  }
  let matrixBreaches = 0;
  for (const f of publishedSchoolFiles) {
    if (f.status !== "published") continue;
    // Unknown class/resource already reported above — don't double-report.
    if (!classSlugs.includes(f.cls) || !resourceSlugs.has(f.resource)) continue;
    const offered = offeredBySubject[f.subject] ?? [];
    const allowedClasses = classesByResource[f.resource] ?? classSlugs;
    if (!offered.includes(f.resource) || !allowedClasses.includes(f.cls)) {
      fail(
        `${f.rel}: published but outside the availability matrix ` +
          `(${f.cls}/${f.subject}/${f.resource}) — set status to draft or move it`,
      );
      matrixBreaches += 1;
    }
  }
  if (matrixBreaches === 0)
    ok("published files satisfy the availability matrix");

  console.log(errors === 0 ? "\nAll content checks passed." : `\n${errors} error(s) found.`);
  process.exit(errors === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
