export const charactersPageMsg = {
  description: "兄弟日記 登場キャラクター紹介。",
  detailPageTitle: (name: string) => `${name} | Characters`,
  detailDescription: (name: string, nameKana: string) =>
    `${name}（${nameKana}）のキャラクター紹介。`,
  tabsAriaLabel: "キャラクター切替",
  standingAlt: (name: string) => `${name} 立ち絵`,
  quoteAriaLabel: "代表的な台詞",
  stats: {
    age: "年齢",
    gender: "性別",
    height: "身長",
    weight: "体重",
    birthday: "誕生日",
  },
  externalStatusLink: "外部サイト",
} as const;
