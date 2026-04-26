import { episodesPageMsg } from "../../msg/episodes";
import { withBase } from "../urls";
import {
  episodeHref,
  firstEpisodeOfSeason,
  seasons,
  type EpisodeEntry,
  type SeasonInfo,
  type TimelineEntry,
} from "./index";

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
      return episodesPageMsg.alternateTag;
    case "normal":
      return `Episode${entry.episodeLabel}`;
    case "deleted":
      return entry.episodeLabel;
  }
};

export const episodeLogHeadingLabel = (
  entry: Pick<EpisodeEntry, "overallNumber" | "seasonAllNumber" | "type">,
  deletedLabel: string = episodesPageMsg.deletedEpisodeTag,
): string => {
  if (entry.type === "deleted") return deletedLabel;
  if (entry.type === "another") return `Episode${deletedLabel}`;
  return `Episode${episodeSeasonNumberLabel(entry)}`;
};

export const timelineEpisodeNumberLabel = (entry: TimelineEntry): string =>
  episodeOverviewLabel(entry);

export const episodeLogHref = (seasonSlug: string, entry: EpisodeEntry): string =>
  `${episodeHref(seasonSlug, entry)}/log`;

export const episodeSeasonHref = async (
  seasonNumber: SeasonInfo["number"],
  seasonSlug: string,
): Promise<string> => {
  const first = await firstEpisodeOfSeason(seasonNumber);
  return first
    ? episodeHref(seasonSlug, first)
    : `/episodes/${seasonSlug}`;
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
        href: withBase(await episodeSeasonHref(season.number, season.slug)),
        active: current === "season" && season.number === activeSeason,
      })),
    )),
    {
      label: episodesPageMsg.seasonTimelineLabel,
      href: withBase("/episodes/timeline"),
      active: current === "timeline",
    },
  ];
};
