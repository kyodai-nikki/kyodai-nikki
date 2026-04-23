import type { EpisodeLogMeta, EpisodeScenarioInfo } from "./episodeLogs";

interface EpisodeLogOverride {
  scenario?: EpisodeScenarioInfo;
  log?: EpisodeLogMeta;
}

const overrides: Record<string, EpisodeLogOverride> = {
  "season1/1": {
    scenario: {
      title: "なんてね",
      inStoryDate: "2021.10.02",
      participants: ["京", "梗"],
      author: "未設定",
      distributionName: "私家版シナリオ",
      isAdapted: false,
      compactDescription: false,
      removeCanon: false,
    },
    log: {
      showNextEpisode: false,
      showPreviousEpisode: false,
    },
  },
};

const keyFor = (seasonSlug: string, episodeSlug: string) =>
  `${seasonSlug}/${episodeSlug}`;

export const getEpisodeLogOverride = (
  seasonSlug: string,
  episodeSlug: string,
): EpisodeLogOverride => overrides[keyFor(seasonSlug, episodeSlug)] ?? {};
