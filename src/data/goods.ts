// =========================================================
// Goods ページ（/goods/）の物販情報
// ---------------------------------------------------------
// image: public/ 配下のパス（例 "/images/goods/xxx.jpg"）
// url:   BOOTH / STORES などの商品ページURL
// =========================================================

export interface GoodsItem {
  title: string;
  url: string;
  image?: string;
  price?: string;
  note?: string;
}

export const goods: GoodsItem[] = [
  // {
  //   title: "第1シーズン スペシャルブックレット",
  //   image: "/images/goods/booklet-01.jpg",
  //   price: "¥1,500",
  //   url: "https://example.booth.pm/items/xxxx",
  //   note: "全32p / 特典ポストカード付",
  // },
];
