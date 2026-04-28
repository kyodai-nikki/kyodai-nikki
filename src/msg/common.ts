export const commonMsg = {
  symbols: {
    copyright: "©",
    separatorDot: "・",
    externalMarker: "▼",
  },
  badges: {
    r18: "R-18",
    r18g: "R-18G",
  },
  site: {
    defaultDescription: "TRPG セッションログのアーカイブ。",
  },
  accessibility: {
    skipToMain: "本文へスキップ",
    backToTop: "ページ先頭へ戻る",
  },
  menu: {
    open: "メニューを開く",
    navigation: "サイトナビゲーション",
  },
  social: {
    shareX: "Xで共有",
    shareLine: "LINEで共有",
  },
  footer: {
    shareLabel: "Share :",
  },
  actions: {
    back: "戻る",
    close: "閉じる",
    open: (label: string) => `${label} を開く`,
    read: "読む",
    salePage: "販売ページ",
    backToOverview: "概要に戻る",
    nextEpisode: "次の話",
    previousEpisode: "前の話",
  },
  empty: {
    episodes: "まだエピソードがありません。",
  },
  honorifics: {
    polite: "様",
  },
  redirect: {
    loading: "移動中…",
  },
  notices: {
    spoiler: {
      title: "注意",
      actions: {
        back: "戻る",
        proceed: "進む",
      },
    },
  },
} as const;
