import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { imageThumbnailSrc } from "./image-utils";

export type GoodsEntry = CollectionEntry<"goods">;

export const orderedGoods = async (): Promise<GoodsEntry[]> => {
  const entries = await getCollection("goods");
  return [...entries].sort((a, b) =>
    b.id.localeCompare(a.id, undefined, { numeric: true }),
  );
};

export const goodsImage = (entry: GoodsEntry): string => {
  const dir = resolve(process.cwd(), "public/images/goods", entry.id);
  return imageThumbnailSrc(dir, `/images/goods/${entry.id}`) ?? "";
};
