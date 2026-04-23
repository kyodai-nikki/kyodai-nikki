import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrderDesc } from "./common";
import { withBase } from "./urls";

export type GalleryEntry = CollectionEntry<"gallery">;

// ギャラリー画像を新しい表示順で取得する。
export const displayedGalleryImages = async (): Promise<GalleryEntry[]> =>
  sortByOrderDesc(await getCollection("gallery"));

// モーダルに表示するタイトルを優先順つきで決める。
export const galleryModalTitle = (entry: GalleryEntry): string =>
  entry.data.title ?? entry.data.caption ?? entry.data.alt;

// モーダルに表示する説明文を優先順つきで決める。
export const galleryModalDescription = (entry: GalleryEntry): string =>
  entry.data.description ?? entry.data.caption ?? "";

// モーダル用の詳細画像リストを base path つきで作る。
export const galleryDetailImages = (entry: GalleryEntry): { src: string; alt: string }[] => {
  const img = entry.data;
  return (img.detailSrcs?.length ? img.detailSrcs : [img.src]).map((src) => ({
    src: withBase(src),
    alt: img.alt,
  }));
};
