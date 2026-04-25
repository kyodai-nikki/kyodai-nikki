import { resolve } from "node:path";

import { commonMsg } from "../../msg/common";
import { goodsImage, type GoodsEntry } from "../goods";
import { imageListSrcs } from "../image-utils";

export interface GoodsDetailImage {
  src: string;
  alt: string;
}

export interface GoodsAction {
  label: string;
  href: string;
}

export const goodsDetailImages = (entry: GoodsEntry): GoodsDetailImage[] => {
  const dir = resolve(process.cwd(), "public/images/goods", entry.id);
  const srcs = imageListSrcs(dir, `/images/goods/${entry.id}`);
  const images = srcs.map((src) => ({ src, alt: entry.data.title }));
  return images.length > 0 ? images : [{ src: goodsImage(entry), alt: entry.data.title }];
};

export const goodsActions = (entry: GoodsEntry): GoodsAction[] =>
  entry.data.url
    ? [{ label: commonMsg.actions.salePage, href: entry.data.url }]
    : [];
