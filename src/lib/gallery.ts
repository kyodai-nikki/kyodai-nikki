import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrderDesc } from "./common";
import {
  imageThumbnailPicture,
  imageThumbnailSrc,
  type PictureSources,
} from "./image-utils";

export type GalleryEntry = CollectionEntry<"gallery">;

export const displayedGalleryImages = async (): Promise<GalleryEntry[]> =>
  sortByOrderDesc(await getCollection("gallery"));

const galleryDir = (entry: GalleryEntry): string =>
  resolve(process.cwd(), "public/images/gallery", entry.id);

const galleryUrlBase = (entry: GalleryEntry): string =>
  `/images/gallery/${entry.id}`;

export const gallerySrc = (entry: GalleryEntry): string =>
  imageThumbnailSrc(galleryDir(entry), galleryUrlBase(entry)) ?? "";

/**
 * <picture> 用に WebP + フォールバック原寸 のセットを返す。
 * scripts/optimize-gallery.mjs で thumbnail.webp が生成されていれば webp を含む。
 */
export const galleryPicture = (entry: GalleryEntry): PictureSources | undefined =>
  imageThumbnailPicture(galleryDir(entry), galleryUrlBase(entry));
