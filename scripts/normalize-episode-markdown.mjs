/**
 * Normalizes episode Markdown source text so Markdown-only markers render as
 * plain text in the published log.
 *
 * Usage:
 *   node scripts/normalize-episode-markdown.mjs --dry-run
 *   node scripts/normalize-episode-markdown.mjs
 */

import { glob, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const contentRoot = join(projectRoot, "src/content/episodes");

const isDryRun = process.argv.includes("--dry-run");

const splitFrontmatter = (source) => {
  if (!source.startsWith("---\n") && !source.startsWith("---\r\n")) {
    return { frontmatter: "", body: source };
  }

  const newline = source.startsWith("---\r\n") ? "\r\n" : "\n";
  const endMarker = `${newline}---${newline}`;
  const endIndex = source.indexOf(endMarker, 3);

  if (endIndex === -1) {
    return { frontmatter: "", body: source };
  }

  const frontmatterEnd = endIndex + endMarker.length;
  return {
    frontmatter: source.slice(0, frontmatterEnd),
    body: source.slice(frontmatterEnd),
  };
};

const normalizeBody = (body) =>
  body
    .replace(/^([ \t]*)- /gm, "$1・")
    .replace(/\*/g, "＊")
    .replace(/~/g, "～")
    .replace(/｢/g, "「")
    .replace(/｣/g, "」");

const countChanges = (before, after) => {
  if (before === after) return 0;
  const listMarkers = before.match(/^([ \t]*)- /gm)?.length ?? 0;
  const asterisks = before.match(/\*/g)?.length ?? 0;
  const tildes = before.match(/~/g)?.length ?? 0;
  const halfwidthOpeningQuotes = before.match(/｢/g)?.length ?? 0;
  const halfwidthClosingQuotes = before.match(/｣/g)?.length ?? 0;
  return (
    listMarkers +
    asterisks +
    tildes +
    halfwidthOpeningQuotes +
    halfwidthClosingQuotes
  );
};

const processFile = async (filePath) => {
  const original = await readFile(filePath, "utf-8");
  const { frontmatter, body } = splitFrontmatter(original);
  const normalizedBody = normalizeBody(body);
  const next = `${frontmatter}${normalizedBody}`;
  const count = countChanges(body, normalizedBody);

  if (count === 0) {
    return { changed: false, count: 0 };
  }

  if (!isDryRun) {
    await writeFile(filePath, next, "utf-8");
  }

  return { changed: true, count };
};

const main = async () => {
  if (isDryRun) {
    console.log("[dry-run] No files will be changed.\n");
  }

  const files = [];

  for await (const file of glob(join(contentRoot, "**/*.md"))) {
    files.push(file);
  }

  files.sort();

  let totalFiles = 0;
  let totalReplacements = 0;

  for (const file of files) {
    const result = await processFile(file);

    if (!result.changed) continue;

    totalFiles++;
    totalReplacements += result.count;
    console.log(
      `  ${isDryRun ? "[will change]" : "[changed]"} ${relative(projectRoot, file)} (${result.count})`,
    );
  }

  if (totalFiles === 0) {
    console.log('No episode Markdown lines starting with "- " were found.');
    return;
  }

  console.log(
    `\nDone: ${totalFiles} file(s), ${totalReplacements} replacement(s).`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
