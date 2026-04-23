import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { withBase } from "./urls";

export type GoodsEntry = CollectionEntry<"goods">;

// グッズコレクションを表示順で取得する。
export const orderedGoods = async (): Promise<GoodsEntry[]> =>
  sortByOrder(await getCollection("goods"));

// グッズ一覧カードの画像パスを base path つきで返す。
export const goodsImage = (entry: GoodsEntry): string => withBase(entry.data.image);

// グッズ詳細モーダルの画像パスを base path つきで返す。
export const goodsDetailImage = (entry: GoodsEntry): string =>
  withBase(entry.data.detailImage ?? entry.data.image);

// 販売ページがある場合だけモーダルのアクションを作る。
export const goodsActions = (
  entry: GoodsEntry,
  fallbackSaleLabel: string,
): { label: string; href: string }[] =>
  entry.data.url ? [{ label: entry.data.saleLabel ?? fallbackSaleLabel, href: entry.data.url }] : [];
