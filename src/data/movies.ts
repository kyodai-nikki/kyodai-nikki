// =========================================================
// Movies ページ（/movies/）の動画一覧
// ---------------------------------------------------------
// id: YouTube 動画 ID（URL `v=` パラメータの値）
// title: 動画タイトル（iframe の title / 見出しに使用）
// =========================================================

export interface Video {
  id: string;
  title: string;
  platform?: "youtube";
}

export const videos: Video[] = [
  // { id: "dQw4w9WgXcQ", title: "第1話 プレビュー", platform: "youtube" },
];
