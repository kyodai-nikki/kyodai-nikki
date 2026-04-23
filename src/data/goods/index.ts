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
  {
    title: "ふくふく缶バッジ",
    url: "https://example.booth.pm/items/fukufuku-can-badge",
    image: "/images/goods/dummy-thumb.svg",
    detailImage: "/images/goods/dummy-detail.svg",
    description: "クッション素材入りの厚みがある缶バッジです。",
  },
  {
    title: "ちびキャラアクリルスタンド",
    url: "https://example.booth.pm/items/chibi-acrylic-stand",
    image: "/images/goods/dummy-thumb.svg",
    detailImage: "/images/goods/dummy-detail.svg",
    description: "ちびキャラのアクリルスタンドです。",
  },
  {
    title: "兄弟おもちストラップ",
    url: "https://example.booth.pm/items/kyodai-omochi-strap",
    image: "/images/goods/dummy-thumb.svg",
    detailImage: "/images/goods/dummy-detail.svg",
    description: "丸々としたおもちストラップです。絵柄は2種類ずつです。",
  },
  {
    title: "アクリルスタンド",
    url: "https://example.booth.pm/items/acrylic-stand",
    image: "/images/goods/dummy-thumb.svg",
    detailImage: "/images/goods/dummy-detail.svg",
    description: "かきおろし絵を使用したアクリルスタンドです。",
  },
];
