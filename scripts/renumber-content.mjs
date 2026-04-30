import { access, readdir, rename } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");

const valueOf = (name) => {
  const exactIndex = args.indexOf(name);
  if (exactIndex >= 0) return args[exactIndex + 1];

  const prefix = `${name}=`;
  return args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
};

const typeArg =
  valueOf("--type") ??
  args.find((arg) => !arg.startsWith("-")) ??
  "episodes";

const contentRoot = (...parts) => join(projectRoot, "src/content", ...parts);
const publicImageRoot = (...parts) => join(projectRoot, "public/images", ...parts);

const TYPES = {
  episodes: {
    label: "episodes",
    groups: true,
    groupPattern: /^season\d+$/,
    contentRoot: contentRoot("episodes"),
    assetRoot: publicImageRoot("episodes"),
    entryKind: "directory",
  },
  settings: {
    label: "settings",
    groups: true,
    groupPattern: /^(?!_).+$/,
    contentRoot: contentRoot("settings"),
    assetRoot: publicImageRoot("settings"),
    entryKind: "file",
  },
  gallery: {
    label: "gallery",
    groups: false,
    contentRoot: contentRoot("gallery"),
    assetRoot: publicImageRoot("gallery"),
    entryKind: "file",
  },
  goods: {
    label: "goods",
    groups: false,
    contentRoot: contentRoot("goods"),
    assetRoot: publicImageRoot("goods"),
    entryKind: "file",
  },
  movies: {
    label: "movies",
    groups: false,
    contentRoot: contentRoot("movies"),
    entryKind: "file",
  },
};

const usage = () => {
  console.log(`Usage:
  node scripts/renumber-content.mjs --type episodes [--dry-run]
  node scripts/renumber-content.mjs gallery [--dry-run]

Types:
  episodes  Renumber src/content/episodes/season*/N and public/images/episodes/season*/N
  settings  Renumber number-prefixed material files in src/content/settings/*/N*.md and public/images/settings/*/N*
  gallery   Renumber src/content/gallery/N*.md and public/images/gallery/N*
  goods     Renumber src/content/goods/N*.md and public/images/goods/N*
  movies    Renumber src/content/movies/N.md
  all       Run every type above
`);
};

const exists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true });

const numberedName = (name) => /^\d+/.test(name);

const entryId = (entry, kind) =>
  kind === "file" ? basename(entry.name, extname(entry.name)) : entry.name;

const listEntries = async (dir, config) => {
  const { entryKind } = config;
  const dirents = await readdir(dir, { withFileTypes: true });
  return dirents
    .filter((entry) => {
      if (entry.name.startsWith("_")) return false;
      if (entryKind === "directory") return entry.isDirectory() && numberedName(entry.name);
      return entry.isFile() && extname(entry.name) === ".md" && numberedName(entryId(entry, entryKind));
    })
    .sort((a, b) => naturalCompare(entryId(a, entryKind), entryId(b, entryKind)));
};

const listGroups = async (config) => {
  if (!config.groups) {
    return [{ name: "", contentRoot: config.contentRoot, assetRoot: config.assetRoot }];
  }

  const dirents = await readdir(config.contentRoot, { withFileTypes: true });
  const groupPattern = config.groupPattern ?? /^season\d+$/;
  return dirents
    .filter((entry) => entry.isDirectory() && groupPattern.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      contentRoot: join(config.contentRoot, entry.name),
      assetRoot: config.assetRoot ? join(config.assetRoot, entry.name) : undefined,
    }))
    .sort((a, b) => naturalCompare(a.name, b.name));
};

const entryPath = (root, kind, id) =>
  kind === "file" ? join(root, `${id}.md`) : join(root, id);

const desiredName = (kind, n) => (kind === "file" ? `${n}.md` : String(n));

const rel = (path) => relative(projectRoot, path);

const makeMove = (from, to, label) => ({
  from,
  to,
  temp: join(
    from,
    "..",
    `.renumber-content-${Date.now()}-${Math.random().toString(36).slice(2)}-${basename(from)}`,
  ),
  label,
});

const collectMovesForGroup = async (config, group) => {
  const entries = await listEntries(group.contentRoot, config);
  const moves = [];

  for (const [index, entry] of entries.entries()) {
    const currentId = entryId(entry, config.entryKind);
    const nextId = String(index + 1);
    const contentFrom = entryPath(group.contentRoot, config.entryKind, currentId);
    const contentTo = join(group.contentRoot, desiredName(config.entryKind, index + 1));

    if (contentFrom !== contentTo) {
      moves.push(makeMove(contentFrom, contentTo, "content"));
    }

    if (group.assetRoot) {
      const assetFrom = join(group.assetRoot, currentId);
      const assetTo = join(group.assetRoot, nextId);
      if ((await exists(assetFrom)) && assetFrom !== assetTo) {
        moves.push(makeMove(assetFrom, assetTo, "asset"));
      }
    }
  }

  return { group, entries, moves };
};

const assertNoConflicts = async (moves) => {
  const sources = new Set(moves.map((move) => move.from));
  const targets = new Set();

  for (const move of moves) {
    if (targets.has(move.to)) {
      throw new Error(`Duplicate target: ${rel(move.to)}`);
    }
    targets.add(move.to);

    if ((await exists(move.to)) && !sources.has(move.to)) {
      throw new Error(`Target already exists and is not part of this renumber: ${rel(move.to)}`);
    }
  }
};

const runType = async (config) => {
  const groups = await listGroups(config);
  const batches = [];

  for (const group of groups) {
    batches.push(await collectMovesForGroup(config, group));
  }

  const moves = batches.flatMap((batch) => batch.moves);

  await assertNoConflicts(moves);

  console.log(`\n[${config.label}]`);

  for (const batch of batches) {
    const groupLabel = batch.group.name ? ` ${batch.group.name}` : "";
    const planned = batch.moves.filter((move) => move.label === "content").length;
    console.log(`  ${batch.entries.length} entries${groupLabel}, ${planned} content rename(s)`);
  }

  if (moves.length === 0) {
    console.log("  already sequential");
    return;
  }

  for (const move of moves) {
    console.log(`  ${isDryRun ? "would move" : "move"}: ${rel(move.from)} -> ${rel(move.to)}`);
  }

  if (isDryRun) return;

  for (const move of moves) {
    await rename(move.from, move.temp);
  }

  for (const move of moves) {
    await rename(move.temp, move.to);
  }

  console.log(`  done: ${moves.length} move(s)`);
};

const main = async () => {
  if (args.includes("--help") || args.includes("-h")) {
    usage();
    return;
  }

  const selected =
    typeArg === "all"
      ? Object.values(TYPES)
      : typeArg
        .split(",")
        .map((type) => {
          const config = TYPES[type.trim()];
          if (!config) {
            throw new Error(`Unknown type: ${type}`);
          }
          return config;
        });

  if (isDryRun) {
    console.log("[dry-run] no files will be renamed");
  }

  for (const config of selected) {
    await runType(config);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
