import { resolve } from "node:path";

import { gallerySrc, type GalleryEntry } from "../gallery";
import { imageListSrcs } from "../image-utils";

export interface GalleryDetailImage {
  src: string;
  alt: string;
}

export const galleryModalTitle = (entry: GalleryEntry): string =>
  entry.data.title ?? entry.data.alt;

export const galleryModalDescription = (entry: GalleryEntry): string =>
  entry.data.description ?? "";

export const galleryDetailImages = (entry: GalleryEntry): GalleryDetailImage[] => {
  const dir = resolve(process.cwd(), "public/images/gallery", entry.id);
  const srcs = imageListSrcs(dir, `/images/gallery/${entry.id}`);
  const images = srcs.map((src) => ({ src, alt: entry.data.alt }));
  return images.length > 0 ? images : [{ src: gallerySrc(entry), alt: entry.data.alt }];
};
