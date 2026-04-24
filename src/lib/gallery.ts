import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrderDesc } from "./common";
import { withBase } from "./urls";

export type GalleryEntry = CollectionEntry<"gallery">;

// ギャラリー画像を新しい表示順で取得する。
export const displayedGalleryImages = async (): Promise<GalleryEntry[]> =>
  sortByOrderDesc(await getCollection("gallery"));

// サムネイル画像のパスを base path つきで返す。
// thumbnail.jpg が存在すれば jpg、なければ png を返す。
export const gallerySrc = (entry: GalleryEntry): string => {
  const jpgPath = resolve(process.cwd(), "public/images/gallery", entry.id, "thumbnail.jpg");
  const ext = existsSync(jpgPath) ? "jpg" : "png";
  return withBase(`/images/gallery/${entry.id}/thumbnail.${ext}`);
};

// 詳細画像のパスを base path つきで返す。
// public/images/gallery/{id}/images/ 配下の画像を昇順で列挙する。
// ディレクトリが存在しない場合はサムネイルにフォールバック。
export const galleryDetailImagePaths = (entry: GalleryEntry): string[] => {
  const dir = resolve(process.cwd(), "public/images/gallery", entry.id, "images");
  try {
    const files = readdirSync(dir)
      .filter((f) => f.endsWith(".png") || f.endsWith(".jpg"))
      .sort();
    if (files.length > 0) {
      return files.map((f) => `/images/gallery/${entry.id}/images/${f}`);
    }
  } catch {
    // ディレクトリが存在しない場合はフォールバック
  }
  const jpgPath = resolve(process.cwd(), "public/images/gallery", entry.id, "thumbnail.jpg");
  const ext = existsSync(jpgPath) ? "jpg" : "png";
  return [`/images/gallery/${entry.id}/thumbnail.${ext}`];
};

// モーダルに表示するタイトルを優先順つきで決める。
export const galleryModalTitle = (entry: GalleryEntry): string =>
  entry.data.title ?? entry.data.alt;

// モーダルに表示する説明文を優先順つきで決める。
export const galleryModalDescription = (entry: GalleryEntry): string =>
  entry.data.description ?? "";

// モーダル用の詳細画像リストを base path つきで作る。
export const galleryDetailImages = (entry: GalleryEntry): { src: string; alt: string }[] =>
  galleryDetailImagePaths(entry).map((src) => ({
    src: withBase(src),
    alt: entry.data.alt,
  }));
