export const charactersPageMsg = {
  meta: {
    description: "兄弟日記 登場キャラクター紹介。",
    detailTitle: (name: string) => `${name} | Characters`,
    detailDescription: (name: string, nameKana: string) =>
      `${name}（${nameKana}）のキャラクター紹介。`,
  },
  aria: {
    tabs: "キャラクター切替",
    quote: "代表的な台詞",
  },
  alt: {
    standing: (name: string) => `${name} 立ち絵`,
  },
  labels: {
    externalStatusLink: "外部サイト",
  },
  stats: {
    age: "年齢",
    gender: "性別",
    height: "身長",
    weight: "体重",
    birthday: "誕生日",
  },
} as const;
