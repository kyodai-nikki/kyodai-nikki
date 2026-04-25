export const commonMsg = {
  symbol: {
    dot: "・",
    previousEpisodeArrow: "‹",
    nextEpisodeArrow: "›",
  },
  badge: {
    r18: "R-18",
    r18g: "R-18G",
  },
  redirectingMsg: "移動中…",
  dear: "様",
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
    close: "閉じる",
    open: (label: string) => `${label} を開く`,
    read: "読む",
    salePage: "販売ページ",
    backToOverview: "概要に戻る",
    nextEpisode: "次の話",
    previousEpisode: "前の話",
  },
  noEpisodes: "まだエピソードがありません。",
  spoilerNotice: {
    title: "注意",
    back: "戻る",
    proceed: "進む",
  },
} as const;
