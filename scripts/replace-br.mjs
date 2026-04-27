/**
 * src/content/episodes/season* 配下の .md ファイルに含まれる
 * <br>、<br/>、<br /> タグを改行文字（\n）に置換するスクリプト。
 *
 * 使い方: node scripts/replace-br-tags.mjs
 *   --dry-run オプションを付けると実際には書き込まず変更内容だけ確認できる。
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "node:fs/promises";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const contentRoot = join(projectRoot, "src/content/episodes");

const isDryRun = process.argv.includes("--dry-run");

// <br>、<br/>、<br /> にマッチする正規表現
const BR_PATTERN = /<br\s*\/?>/gi;

const processFile = async (filePath) => {
  const original = await readFile(filePath, "utf-8");

  if (!BR_PATTERN.test(original)) return { changed: false };

  // フラグをリセットして再度適用
  BR_PATTERN.lastIndex = 0;
  const replaced = original.replace(BR_PATTERN, "\n");
  const count = (original.match(/<br\s*\/?>/gi) ?? []).length;

  if (!isDryRun) {
    await writeFile(filePath, replaced, "utf-8");
  }

  return { changed: true, count };
};

const main = async () => {
  if (isDryRun) {
    console.log("[dry-run] ファイルへの書き込みはしません\n");
  }

  const pattern = join(contentRoot, "**/*.md");
  const files = [];

  for await (const file of glob(pattern)) {
    files.push(file);
  }

  files.sort();

  let totalFiles = 0;
  let totalReplacements = 0;

  for (const file of files) {
    const result = await processFile(file);
    if (result.changed) {
      totalFiles++;
      totalReplacements += result.count;
      const rel = relative(projectRoot, file);
      console.log(
        `  ${isDryRun ? "[変更予定]" : "[変更済み]"} ${rel}  (${result.count} 件)`,
      );
    }
  }

  if (totalFiles === 0) {
    console.log("対象ファイルに <br> タグは見つかりませんでした。");
  } else {
    console.log(
      `\n完了: ${totalFiles} ファイル、計 ${totalReplacements} 件を${isDryRun ? "検出" : "置換"}しました。`,
    );
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
