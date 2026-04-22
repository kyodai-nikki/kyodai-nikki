// =========================================================
// Gallery ページ（/gallery/）の画像一覧
// ---------------------------------------------------------
// 画像は public/images/gallery/ 配下に置いて、
// src のパスは "/images/gallery/xxx.jpg" の形で指定する。
// =========================================================

export interface GalleryImage {
  src: string;     // public/ からの相対パス（先頭 "/"）
  alt: string;     // 代替テキスト（必須）
  caption?: string;
}

export const images: GalleryImage[] = [
  // { src: "/images/gallery/ep01-01.jpg", alt: "第1話 冒頭シーン", caption: "街道沿いの林" },
];
