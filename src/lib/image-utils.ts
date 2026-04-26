import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { withBase } from "./urls";

const IMAGE_EXTENSIONS = new Set(["svg", "png", "jpg", "jpeg", "webp"]);

/** scripts/optimize-gallery.mjs が出力するバリアントのサフィックス */
const OPTIMIZED_VARIANT_SUFFIXES = ["thumbnail", "medium", "large"] as const;
type OptimizedVariant = (typeof OPTIMIZED_VARIANT_SUFFIXES)[number];

const isImageFile = (filename: string): boolean =>
  IMAGE_EXTENSIONS.has(filename.split(".").pop()?.toLowerCase() ?? "");

const isThumbnail = (filename: string): boolean =>
  filename.split(".").slice(0, -1).join(".") === "thumbnail";

const baseName = (filename: string): string =>
  filename.split(".").slice(0, -1).join(".");

/**
 * 最適化スクリプトが生成した派生ファイル
 * （thumbnail.webp / 1.medium.webp / 1.large.webp など）を判定する。
 * 一覧やモーダルに「原寸候補」として混入するのを防ぐため。
 */
const isOptimizedVariant = (filename: string): boolean => {
  const name = baseName(filename);
  if (!filename.endsWith(".webp")) return false;
  if (OPTIMIZED_VARIANT_SUFFIXES.includes(name as OptimizedVariant)) return true;
  return OPTIMIZED_VARIANT_SUFFIXES.some((suffix) =>
    name.endsWith(`.${suffix}`),
  );
};

/** ディレクトリ内に <basename>.<variant>.webp が存在すればその public URL を返す */
const variantSrc = (
  dir: string,
  urlBase: string,
  source: string,
  variant: OptimizedVariant,
): string | undefined => {
  const variantFile = `${baseName(source)}.${variant}.webp`;
  if (!existsSync(join(dir, variantFile))) return undefined;
  return withBase(`${urlBase}/${variantFile}`);
};

// thumbnail.{ext} があればそれを、なければ最初の非サムネ画像を返す。
export const imageThumbnailSrc = (dir: string, urlBase: string): string | undefined => {
  if (!existsSync(dir)) return undefined;
  const files = readdirSync(dir).filter(isImageFile).filter((f) => !isOptimizedVariant(f));
  const thumbnail = files.find(isThumbnail);
  if (thumbnail) return withBase(`${urlBase}/${thumbnail}`);
  const first = files
    .filter((f) => !isThumbnail(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0];
  return first ? withBase(`${urlBase}/${first}`) : undefined;
};

// ディレクトリ内の全画像を数値昇順で返す（thumbnail フィルタなし）。
export const imageAllSrcs = (dir: string, urlBase: string): string[] => {
  if (!existsSync(dir)) return [];
  try {
    return readdirSync(dir)
      .filter(isImageFile)
      .filter((f) => !isOptimizedVariant(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => withBase(`${urlBase}/${f}`));
  } catch {
    return [];
  }
};

// thumbnail.* を除いた画像を数値昇順で返す。
export const imageListSrcs = (dir: string, urlBase: string): string[] => {
  if (!existsSync(dir)) return [];
  try {
    return readdirSync(dir)
      .filter((f) => isImageFile(f) && !isThumbnail(f) && !isOptimizedVariant(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => withBase(`${urlBase}/${f}`));
  } catch {
    return [];
  }
};

/**
 * <picture> で表示するための「WebP 候補 + フォールバック原寸」のセット。
 * scripts/optimize-gallery.mjs が thumbnail.webp を出力していれば、
 * webp に thumbnail.webp の URL を、fallback には元の thumbnail.{jpg,png} を入れて返す。
 * 最適化が回っていない環境でも fallback だけで動作するよう設計している。
 */
export interface PictureSources {
  /** WebP の URL（最適化済みなら絶対に存在する） */
  webp?: string;
  /** 旧フォーマット（jpg/png/svg）にフォールバックするための URL */
  fallback: string;
}

export const imageThumbnailPicture = (
  dir: string,
  urlBase: string,
): PictureSources | undefined => {
  const fallback = imageThumbnailSrc(dir, urlBase);
  if (!fallback) return undefined;
  // imageThumbnailSrc が返したファイル名から webp 候補を組み立てる
  const fallbackFile = fallback.split("/").pop()!;
  const webp = variantSrc(dir, urlBase, fallbackFile, "thumbnail");
  return { webp, fallback };
};

/**
 * モーダル等で並べる詳細画像群。
 * 各原寸画像について、medium.webp / large.webp が存在すればそれを srcset 用に同梱する。
 */
export interface DetailImageSource {
  /** 原寸（jpg/png）の public URL。<img src> または <picture> の最終フォールバックに使う */
  fallback: string;
  /** モーダル幅向けの WebP URL（最大 1280px 幅） */
  mediumWebp?: string;
  /** 高 dpi ディスプレイ向け WebP URL（最大 1920px 幅） */
  largeWebp?: string;
}

export const imageListDetail = (
  dir: string,
  urlBase: string,
): DetailImageSource[] => {
  if (!existsSync(dir)) return [];
  try {
    const files = readdirSync(dir)
      .filter((f) => isImageFile(f) && !isThumbnail(f) && !isOptimizedVariant(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return files.map((file) => ({
      fallback: withBase(`${urlBase}/${file}`),
      mediumWebp: variantSrc(dir, urlBase, file, "medium"),
      largeWebp: variantSrc(dir, urlBase, file, "large"),
    }));
  } catch {
    return [];
  }
};
