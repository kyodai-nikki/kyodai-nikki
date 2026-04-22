export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  description?: string;
  detailSrcs?: string[];
  creditName?: string;
  creditUrl?: string;
  twitterId?: string;
  buttonLabel?: string;
}

export const images: GalleryImage[] = [
  {
    src: "/images/gallery/dummy-01.svg",
    alt: "ギャラリー動作確認用のダミー画像",
    caption: "ダミー画像",
    title: "ギャラリー確認用",
    description: "ポップアップの表示確認用に追加したダミー画像です。",
    detailSrcs: ["/images/gallery/dummy-01.svg"],
    creditName: "Codex dummy asset",
    twitterId: "openai",
    buttonLabel: "戻る",
  },
  // Example:
  // {
  //   src: "/images/gallery/sample.jpg",
  //   alt: "Sample artwork",
  //   caption: "Sample caption",
  //   title: "Sample artwork",
  //   description: "Any short note you want to show in the popup.",
  //   detailSrcs: ["/images/gallery/sample.jpg"],
  //   creditName: "Artist name",
  //   creditUrl: "https://example.com",
  //   twitterId: "artist_id",
  //   buttonLabel: "Back",
  // },
];
