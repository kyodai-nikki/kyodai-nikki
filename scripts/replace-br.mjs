/**
 * src/content/episodes 配下の MD ファイルの <br> を改行に置換するスクリプト
 * 使い方: npm run replace-br
 */

import { readFileSync, writeFileSync } from "fs";
import { glob } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const targetDir = join(__dirname, "../src/content/episodes");

let updated = 0;
let skipped = 0;

for await (const file of glob(`${targetDir}/**/*.md`)) {
  const original = readFileSync(file, "utf-8");
  if (!original.includes("<br>")) {
    skipped++;
    continue;
  }
  writeFileSync(file, original.replaceAll("<br>", "\n"), "utf-8");
  updated++;
  console.log(`  updated: ${file.replace(targetDir, "")}`);
}

console.log(`\n完了: ${updated} ファイルを更新、${skipped} ファイルをスキップ`);
