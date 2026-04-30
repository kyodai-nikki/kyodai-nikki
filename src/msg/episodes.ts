export const episodesPageMsg = {
  meta: {
    timelineTitle: "Timeline | Episodes",
    timelineDescription: "兄弟日記 全エピソードのタイムライン。",
  },
  aria: {
    timelineJumpNav: "シーズンへジャンプ",
    episodeStickyNav: "エピソード一覧",
    logNavigation: "ログナビゲーション",
    previousEpisodeMove: "前の話へ移動",
    nextEpisodeMove: "次の話へ移動",
  },
  labels: {
    alternateTag: "Another Episode",
    deletedEpisodeTag: "――",
    episodeList: "エピソード一覧",
    seasonTimeline: "timeline",
    logSuffix: "のログ",
  },
  empty: {
    episodeSelection: "エピソードを選択してください。",
    noEpisodesYet: "No episodes yet.",
  },
  alt: {
    thumbnail: (title: string) => `${title} main visual`,
  },
  scenario: {
    author: "シナリオ制作者 :",
    distribution: "シナリオ頒布先 :",
    adapted: "改変シナリオ :",
    adaptedLink: "URL",
  },
} as const;
