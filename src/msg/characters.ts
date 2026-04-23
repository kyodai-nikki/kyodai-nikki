export const charactersPageMsg = {
  title: "Characters",
  description: "兄弟日記 登場キャラクター紹介。",
  detailDescription: (name: string, furigana: string) => `${name}（${furigana}）のキャラクター紹介。`,
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
  externalStatusLink: "他ステータス（外部サイト）",
} as const;
