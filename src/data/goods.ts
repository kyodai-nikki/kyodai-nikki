export interface GoodsItem {
  title: string;
  url?: string;
  image: string;
  detailImage?: string;
  description?: string;
  saleLabel?: string;
  buttonLabel?: string;
}

export const goods: GoodsItem[] = [
  // Example:
  // {
  //   title: "ふくふく缶バッジ",
  //   image: "/images/goods/can-badge-thumb.jpg",
  //   detailImage: "/images/goods/can-badge-detail.jpg",
  //   description: "クッション素材入りの厚みがある缶バッジです。",
  //   url: "https://example.booth.pm/items/xxxx",
  //   saleLabel: "販売ページ",
  //   buttonLabel: "戻る",
  // },
];
