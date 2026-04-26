/**
 * public/images/gallery/<id>/ 配下の画像から WebP 縮小版を生成するスクリプト
 *
 *   - thumbnail.webp        : 一覧カード用（最大 640px 幅）
 *   - <name>.medium.webp    : モーダル表示用（最大 1280px 幅）
 *   - <name>.large.webp     : 高解像度ディスプレイ用 srcset 候補（最大 1920px 幅）
 *
 * 同じ <name>.{ext} の mtime と既存 <name>.medium.webp の mtime を比較して、
 * 元ファイルが新しい場合のみ再生成する（差分ビルド）。
 *
 * 使い方: npm run optimize-gallery
 *   build 前に自動実行されるよう prebuild フックも設定済み。
 */

import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const galleryRoot = join(projectRoot, "public/images/gallery");

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const THUMBNAIL_BASENAME = "thumbnail";

const VARIANTS = [
  { suffix: "thumbnail", width: 640, quality: 78, only: "thumbnail" },
  { suffix: "medium", width: 1280, quality: 82, only: "non-thumbnail" },
  { suffix: "large", width: 1920, quality: 80, only: "non-thumbnail" },
];

const isSourceFile = (filename) =>
  SOURCE_EXTENSIONS.has(parse(filename).ext.toLowerCase());

const isThumbnail = (filename) => parse(filename).name === THUMBNAIL_BASENAME;

// 生成バリアントの判定。.webp 出力ファイルだけを対象にする。
// （これがないと、ユーザが用意した thumbnail.png 等までソース候補から除外されてしまう）
const isGeneratedVariant = (filename) => {
  const { name, ext } = parse(filename);
  if (ext.toLowerCase() !== ".webp") return false;
  return VARIANTS.some(
    (v) => name === v.suffix || name.endsWith(`.${v.suffix}`),
  );
};

const needsRebuild = async (sourcePath, outputPath) => {
  if (!existsSync(outputPath)) return true;
  const [src, out] = await Promise.all([stat(sourcePath), stat(outputPath)]);
  return src.mtimeMs > out.mtimeMs;
};

const buildVariant = async ({ sourcePath, outputPath, width, quality }) => {
  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(sourcePath, { failOn: "none" })
    .rotate() // EXIF orientation を反映
    .resize({ width, withoutEnlargement: true, fit: "inside" })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
};

const processEntry = async (entryDir) => {
  const files = (await readdir(entryDir))
    .filter(isSourceFile)
    .filter((f) => !isGeneratedVariant(f));

  const thumbnailSource =
    files.find(isThumbnail) ??
    files
      .filter((f) => !isThumbnail(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];

  if (!thumbnailSource) return { built: 0, skipped: 0 };

  let built = 0;
  let skipped = 0;

  for (const variant of VARIANTS) {
    if (variant.only === "thumbnail") {
      const outputPath = join(entryDir, `${variant.suffix}.webp`);
      const sourcePath = join(entryDir, thumbnailSource);
      if (await needsRebuild(sourcePath, outputPath)) {
        await buildVariant({
          sourcePath,
          outputPath,
          width: variant.width,
          quality: variant.quality,
        });
        built++;
        console.log(
          `  build: ${relative(projectRoot, outputPath)}  (from ${thumbnailSource})`,
        );
      } else {
        skipped++;
      }
      continue;
    }

    for (const file of files) {
      if (isThumbnail(file)) continue;
      const { name } = parse(file);
      const sourcePath = join(entryDir, file);
      const outputPath = join(entryDir, `${name}.${variant.suffix}.webp`);
      if (await needsRebuild(sourcePath, outputPath)) {
        await buildVariant({
          sourcePath,
          outputPath,
          width: variant.width,
          quality: variant.quality,
        });
        built++;
        console.log(`  build: ${relative(projectRoot, outputPath)}`);
      } else {
        skipped++;
      }
    }
  }

  return { built, skipped };
};

const main = async () => {
  if (!existsSync(galleryRoot)) {
    console.log(`gallery ディレクトリが見つかりません: ${galleryRoot}`);
    return;
  }

  const entries = (await readdir(galleryRoot, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let totalBuilt = 0;
  let totalSkipped = 0;

  for (const id of entries) {
    const entryDir = join(galleryRoot, id);
    const { built, skipped } = await processEntry(entryDir);
    totalBuilt += built;
    totalSkipped += skipped;
  }

  console.log(
    `\n完了: ${totalBuilt} 件を生成、${totalSkipped} 件は最新のためスキップ`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
