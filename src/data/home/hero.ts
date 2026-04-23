// =========================================================
// トップページ（/）ヒーロー表示
// ---------------------------------------------------------
// image は public/ からの相対パス。
// 例：public/images/hero/main.jpg を置いて "/images/hero/main.jpg"
// =========================================================

export interface Hero {
  image: string;        // public/ 配下の画像パス
  title: string;        // 右上の大きな明朝タイトル
  startDate: string;    // "2023.02.18開始" など
  status: string;       // "4th season更新中" など
  imageCredit?: string; // 任意。"illust: xxx"
}

export const hero: Hero = {
  image: "/images/hero/main.jpg",
  title: "兄弟日記",
  startDate: "2023.02.18開始",
  status: "4th season更新中",
  imageCredit: "",
};
