#!/usr/bin/env node
/**
 * scaffold-directory.mjs — materialize the `directory/` content tree.
 * Usage: npm run scaffold
 *
 * Builds: directory/class-6 … class-12 / <7 resource folders> /
 * <subject folders> from the registries in `directory/` itself
 * (_resources.json for the resource list, class-N/_class.json for
 * subjects), plus .gitkeep markers in otherwise-empty leaves
 * (git cannot track empty folders).
 *
 * Idempotent: never touches existing .mdx / README / .gitkeep files.
 * Classes 11–12 and their subjects are planned placeholders until
 * registry entries land as class-N/_class.json files.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirRoot = path.join(root, "directory");

// Planned senior-secondary subjects (registry pending — see directory-structure.md).
const PLANNED_11_12 = ["physics", "chemistry", "mathematics", "biology"];

async function readJson(abs) {
  return JSON.parse(await readFile(abs, "utf-8"));
}

async function subjectsFor(cls) {
  const num = Number(cls.replace("class-", ""));
  if (num >= 11) return PLANNED_11_12;
  try {
    const file = await readJson(path.join(dirRoot, cls, "_class.json"));
    return (file.subjects ?? []).map((s) => s.slug);
  } catch {
    return [];
  }
}

async function ensureLeaf(dir) {
  await mkdir(dir, { recursive: true });
  const entries = await readdir(dir);
  const hasContent = entries.some(
    (e) => e.endsWith(".mdx") || e === "README.md",
  );
  if (!hasContent && !entries.includes(".gitkeep")) {
    await writeFile(
      path.join(dir, ".gitkeep"),
      "Placeholder: this subject folder is ready for its first chapter file.\n" +
        "Run `npm run scaffold` any time to regenerate the tree.\n",
    );
  }
}

async function main() {
  console.log("Scaffolding directory/ content tree…\n");
  const resources = (
    await readJson(path.join(dirRoot, "_resources.json"))
  ).map((r) => r.slug);
  let leaves = 0;
  for (let n = 6; n <= 12; n++) {
    const cls = `class-${n}`;
    const subjects = await subjectsFor(cls);
    for (const res of resources) {
      for (const subject of subjects) {
        await ensureLeaf(path.join(dirRoot, cls, res, subject));
        leaves += 1;
      }
    }
    if (n >= 11) {
      const readme = path.join(dirRoot, cls, "README.md");
      try {
        await readFile(readme);
      } catch {
        await mkdir(path.join(dirRoot, cls), { recursive: true });
        await writeFile(
          readme,
          `# ${cls.replace("class-", "Class ")} — planned\n\n` +
            "Registry entries for senior-secondary classes are pending as\n" +
            "`directory/class-N/_class.json`. Subject folders below are placeholders;\n" +
            "nothing here is published or indexed until registry + chapter\n" +
            "files land. See `directory-structure.md`.\n",
        );
      }
    }
  }
  console.log(`Done: classes 6–12 × ${resources.length} resources (${leaves} subject leaves).`);
  console.log("Existing chapter files were left untouched.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
