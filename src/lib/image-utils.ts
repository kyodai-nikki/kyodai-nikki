import { existsSync, readdirSync } from "node:fs";

import { withBase } from "./urls";

const IMAGE_EXTENSIONS = new Set(["svg", "png", "jpg", "jpeg", "webp"]);

const isImageFile = (filename: string): boolean =>
  IMAGE_EXTENSIONS.has(filename.split(".").pop()?.toLowerCase() ?? "");

const isThumbnail = (filename: string): boolean =>
  filename.split(".").slice(0, -1).join(".") === "thumbnail";

// thumbnail.{ext} があればそれを、なければ最初の非サムネ画像を返す。
export const imageThumbnailSrc = (dir: string, urlBase: string): string | undefined => {
  if (!existsSync(dir)) return undefined;
  const files = readdirSync(dir).filter(isImageFile);
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
      .filter((f) => isImageFile(f) && !isThumbnail(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => withBase(`${urlBase}/${f}`));
  } catch {
    return [];
  }
};
