import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrderDesc } from "./common";
import { imageThumbnailSrc } from "./image-utils";

export type GalleryEntry = CollectionEntry<"gallery">;

export const displayedGalleryImages = async (): Promise<GalleryEntry[]> =>
  sortByOrderDesc(await getCollection("gallery"));

export const gallerySrc = (entry: GalleryEntry): string => {
  const dir = resolve(process.cwd(), "public/images/gallery", entry.id);
  return imageThumbnailSrc(dir, `/images/gallery/${entry.id}`) ?? "";
};
