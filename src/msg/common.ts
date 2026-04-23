export const commonMsg = {
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
    officialX: "公式 X (Twitter)",
    shareX: "Xで共有",
    shareLine: "LINEで共有",
  },
  footer: {
    madeByTeam: "制作チーム",
    shareLabel: "Share :",
  },
  actions: {
    back: "戻る",
    open: (label: string) => `${label} を開く`,
    read: "読む",
    backToOverview: "概要に戻る",
    nextEpisode: "次の話",
    previousEpisode: "前の話",
  },
  states: {
    noEpisodes: "まだエピソードがありません。",
    preparing: "準備中",
    redirecting: "移動中…",
  },
} as const;
