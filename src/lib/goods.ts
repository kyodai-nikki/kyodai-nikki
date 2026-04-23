import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { withBase } from "./urls";

export type GoodsEntry = CollectionEntry<"goods">;

// グッズコレクションをファイル名の降順で取得する。
export const orderedGoods = async (): Promise<GoodsEntry[]> => {
  const entries = await getCollection("goods");
  return [...entries].sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
};

// サムネイル画像のパスを base path つきで返す。
// thumbnail.jpg が存在すれば jpg、なければ png を返す。
export const goodsImage = (entry: GoodsEntry): string => {
  const jpgPath = resolve(process.cwd(), "public/images/goods", entry.id, "thumbnail.jpg");
  const ext = existsSync(jpgPath) ? "jpg" : "png";
  return withBase(`/images/goods/${entry.id}/thumbnail.${ext}`);
};

// 詳細画像リストを base path つきで返す。
// public/images/goods/{id}/images/ 配下の画像を昇順で列挙する。
// ディレクトリが存在しない場合はサムネイルにフォールバック。
export const goodsDetailImages = (entry: GoodsEntry): { src: string; alt: string }[] => {
  const dir = resolve(process.cwd(), "public/images/goods", entry.id, "images");
  try {
    const files = readdirSync(dir)
      .filter((f) => f.endsWith(".png") || f.endsWith(".jpg"))
      .sort();
    if (files.length > 0) {
      return files.map((f) => ({
        src: withBase(`/images/goods/${entry.id}/images/${f}`),
        alt: entry.data.title,
      }));
    }
  } catch {
    // ディレクトリが存在しない場合はフォールバック
  }
  return [{ src: goodsImage(entry), alt: entry.data.title }];
};

// 販売ページがある場合だけモーダルのアクションを作る。
export const goodsActions = (
  entry: GoodsEntry,
  fallbackSaleLabel: string,
): { label: string; href: string }[] =>
  entry.data.url ? [{ label: entry.data.saleLabel ?? fallbackSaleLabel, href: entry.data.url }] : [];
