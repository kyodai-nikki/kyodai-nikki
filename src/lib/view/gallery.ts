import { resolve } from "node:path";

import { gallerySrc, type GalleryEntry } from "../gallery";
import { imageListDetail } from "../image-utils";

export interface GalleryDetailImage {
  /** 原寸（jpg/png）の public URL。<img src> または <picture> の最終フォールバック */
  src: string;
  alt: string;
  /** モーダル幅向け WebP（最大 1280px 幅）。最適化スクリプト未実行時は undefined */
  mediumWebp?: string;
  /** 高 dpi 向け WebP（最大 1920px 幅）。srcset の 2x 候補に使う */
  largeWebp?: string;
}

export const galleryModalTitle = (entry: GalleryEntry): string =>
  entry.data.title ?? entry.data.alt;

export const galleryModalDescription = (entry: GalleryEntry): string =>
  entry.data.description ?? "";

export const galleryDetailImages = (entry: GalleryEntry): GalleryDetailImage[] => {
  const dir = resolve(process.cwd(), "public/images/gallery", entry.id);
  const sources = imageListDetail(dir, `/images/gallery/${entry.id}`);

  const images: GalleryDetailImage[] = sources.map((source) => ({
    src: source.fallback,
    alt: entry.data.alt,
    mediumWebp: source.mediumWebp,
    largeWebp: source.largeWebp,
  }));

  return images.length > 0
    ? images
    : [{ src: gallerySrc(entry), alt: entry.data.alt }];
};
