import type { CollectionEntry } from "astro:content";
import { episodesPageMsg } from "../../msg/episodes";
import { withBase } from "../urls";
import {
  episodeHref,
  episodesBySeason,
  episodeUrlSlug,
  firstEpisodeOfSeason,
  seasons,
  type EpisodeEntry,
  type SeasonInfo,
  type TimelineEntry,
} from "./index";
import { hasAnyEpisodeLog } from "./logs";

export interface EpisodeTabItem {
  label: string;
  href: string;
  active: boolean;
}

const episodeSeasonNumberLabel = (
  episode: Pick<EpisodeEntry, "seasonAllNumber" | "overallNumber">,
): string => String(episode.seasonAllNumber ?? episode.overallNumber).padStart(2, "0");

export const episodeListNumberLabel = (entry: EpisodeEntry): string =>
  entry.episodeLabel;

export const episodeOverviewLabel = (
  entry: Pick<EpisodeEntry, "episodeLabel" | "type">,
): string => {
  switch (entry.type) {
    case "another":
      return episodesPageMsg.labels.alternateTag;
    case "normal":
      return `Episode${entry.episodeLabel}`;
    case "deleted":
      return entry.episodeLabel;
  }
};

export const episodeLogHeadingLabel = (
  entry: Pick<EpisodeEntry, "overallNumber" | "seasonAllNumber" | "type">,
  deletedLabel: string = episodesPageMsg.labels.deletedEpisodeTag,
): string => {
  if (entry.type === "deleted") return deletedLabel;
  if (entry.type === "another") return `Episode${deletedLabel}`;
  return `Episode${episodeSeasonNumberLabel(entry)}`;
};

export const timelineEpisodeNumberLabel = (entry: TimelineEntry): string =>
  episodeOverviewLabel(entry);

// エピソードログページへのパスを返す（base path 込み。episodeHref が base path 込みのため）。
export const episodeLogHref = (seasonSlug: string, entry: EpisodeEntry): string =>
  `${episodeHref(seasonSlug, entry)}/log`;

export interface LogNavigation {
  previousHref: string | undefined;
  nextHref: string | undefined;
  showPreviousButton: boolean;
  showNextButton: boolean;
}

// 現在のエピソードログに対する前後リンクを解決する。
// 同シーズン内に隣接するログがなければ、前/次シーズンの末尾/先頭ログにフォールバックする（シーズン跨ぎ）。
export const resolveLogNavigation = async (
  seasonInfo: SeasonInfo,
  episode: EpisodeEntry,
  logEntries: CollectionEntry<"episodeLogs">[],
): Promise<LogNavigation> => {
  const seasonItems = await seasons();

  const seasonEpisodes = await episodesBySeason(seasonInfo.number);
  const logEpisodes = seasonEpisodes.filter((item) =>
    hasAnyEpisodeLog(seasonInfo.slug, episodeUrlSlug(item), logEntries),
  );
  const currentIndex = logEpisodes.findIndex(
    (item) => item.overallNumber === episode.overallNumber,
  );
  const previousEpisode =
    currentIndex > 0 ? logEpisodes[currentIndex - 1] : undefined;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < logEpisodes.length - 1
      ? logEpisodes[currentIndex + 1]
      : undefined;

  const previousSeasonInfo = seasonItems.find(
    (s) => s.number === seasonInfo.number - 1,
  );
  const nextSeasonInfo = seasonItems.find(
    (s) => s.number === seasonInfo.number + 1,
  );

  const previousSeasonEpisodes = previousSeasonInfo
    ? await episodesBySeason(previousSeasonInfo.number)
    : [];
  const previousSeasonLastEpisode = previousSeasonEpisodes.at(-1);
  const previousSeasonLastLogEpisode =
    previousSeasonInfo &&
    previousSeasonLastEpisode &&
    hasAnyEpisodeLog(
      previousSeasonInfo.slug,
      episodeUrlSlug(previousSeasonLastEpisode),
      logEntries,
    )
      ? previousSeasonLastEpisode
      : undefined;

  const nextSeasonEpisodes = nextSeasonInfo
    ? await episodesBySeason(nextSeasonInfo.number)
    : [];
  const nextSeasonFirstEpisode = nextSeasonEpisodes[0];
  const nextSeasonFirstLogEpisode =
    nextSeasonInfo &&
    nextSeasonFirstEpisode &&
    hasAnyEpisodeLog(
      nextSeasonInfo.slug,
      episodeUrlSlug(nextSeasonFirstEpisode),
      logEntries,
    )
      ? nextSeasonFirstEpisode
      : undefined;

  const previousHref = previousEpisode
    ? episodeLogHref(seasonInfo.slug, previousEpisode)
    : previousSeasonInfo && previousSeasonLastLogEpisode
      ? episodeLogHref(previousSeasonInfo.slug, previousSeasonLastLogEpisode)
      : undefined;
  const nextHref = nextEpisode
    ? episodeLogHref(seasonInfo.slug, nextEpisode)
    : nextSeasonInfo && nextSeasonFirstLogEpisode
      ? episodeLogHref(nextSeasonInfo.slug, nextSeasonFirstLogEpisode)
      : undefined;

  return {
    previousHref,
    nextHref,
    showPreviousButton: Boolean(previousHref),
    showNextButton: Boolean(nextHref),
  };
};

// シーズンタブ用のリンク先パスを返す（base path 込み）。
export const episodeSeasonHref = async (
  seasonNumber: SeasonInfo["number"],
  seasonSlug: string,
): Promise<string> => {
  const first = await firstEpisodeOfSeason(seasonNumber);
  return first
    ? episodeHref(seasonSlug, first)
    : withBase(`/episodes/${seasonSlug}`);
};

export const episodeSeasonTabItems = async (
  current: "season" | "timeline",
  activeSeason?: SeasonInfo["number"],
): Promise<EpisodeTabItem[]> => {
  const seasonItems = await seasons();

  return [
    ...(await Promise.all(
      seasonItems.map(async (season) => ({
        label: season.label,
        href: await episodeSeasonHref(season.number, season.slug),
        active: current === "season" && season.number === activeSeason,
      })),
    )),
    {
      label: episodesPageMsg.labels.seasonTimeline,
      href: withBase("/episodes/timeline"),
      active: current === "timeline",
    },
  ];
};
