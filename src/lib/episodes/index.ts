import { getCollection, type CollectionEntry } from "astro:content";
import {
  sortByOrder,
  sortByOverallNumber,
  sortLogEntriesByOverallNumber,
} from "../common";
import type { EpisodeLogMeta, EpisodeScenarioInfo } from "./logs";

export interface EpisodeEntry {
  overallNumber: number;
  seasonAllNumber?: number;
  seasonEpisodeNumber?: number;
  title: string;
  description: string;
  isAlternate?: boolean;
  smallText?: boolean;
  date?: string;
  cast?: string;
  isR18?: boolean;
  isR18G?: boolean;
  scenario?: EpisodeScenarioInfo;
  log?: EpisodeLogMeta;
}

export interface SeasonInfo {
  number: 1 | 2 | 3 | 4;
  label: string;
  slug: string;
}

export interface Season extends SeasonInfo {
  episodes: EpisodeEntry[];
}

export interface TimelineEntry extends EpisodeEntry {
  season: 1 | 2 | 3 | 4;
  seasonSlug: string;
  seasonLabel: string;
}

type EpisodeLogEntry = CollectionEntry<"episodeLogs">;
type EpisodeSeasonEntry = CollectionEntry<"episodeSeasons">;

const IMG_BASE = "/images/episodes";
const allowedLogSections = new Set(["main", "prologue", "epilogue", "background", "omake"]);

// episodeLogs の entry id からセクション名を取り出す。
const sectionKeyFromId = (id: string) => id.split("/").at(-1) ?? "";

// episodeLogs の entry id からエピソード slug を取り出す。
const episodeSlugFromId = (id: string) => id.split("/").at(-2) ?? "";

let cachedEpisodes: Promise<Season[]> | undefined;

// main ログにエピソード一覧用の必須メタ情報があるか検証する。
const assertEpisodeMain = (entry: EpisodeLogEntry) => {
  const missing = [
    entry.data.season ? undefined : "season",
    entry.data.overallNumber === undefined ? "overallNumber" : undefined,
    entry.data.seasonEpisodeNumber === undefined ? "seasonEpisodeNumber" : undefined,
    entry.data.title ? undefined : "title",
    entry.data.description ? undefined : "description",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(`Missing episode metadata in ${entry.id}: ${missing.join(", ")}`);
  }
};

// episodeLogs の id 末尾が既知のログセクション名か検証する。
const validateLogEntryNames = (entries: EpisodeLogEntry[]) => {
  for (const entry of entries) {
    const sectionKey = sectionKeyFromId(entry.id);
    if (!allowedLogSections.has(sectionKey)) {
      throw new Error(`Unknown episode log section "${sectionKey}" in ${entry.id}`);
    }
  }
};

// シーズン定義を表示順に並び替える。
const sortSeasons = (entries: EpisodeSeasonEntry[]) =>
  sortByOrder(entries);

// content collection からシーズン別エピソード一覧を組み立ててキャッシュする。
const loadEpisodes = async (): Promise<Season[]> => {
  if (cachedEpisodes) return cachedEpisodes;

  cachedEpisodes = (async () => {
    const seasonEntries = sortSeasons(await getCollection("episodeSeasons"));
    const logEntries = await getCollection("episodeLogs");
    validateLogEntryNames(logEntries);

    const mainEntries = sortLogEntriesByOverallNumber(
      logEntries.filter((entry) => sectionKeyFromId(entry.id) === "main"),
    );

    for (const entry of mainEntries) {
      assertEpisodeMain(entry);
    }

    let seasonAllCounter = 0;
    return seasonEntries.map<Season>((seasonEntry) => {
      const episodes = mainEntries
        .filter((entry) => entry.data.season === seasonEntry.data.slug)
        .map<EpisodeEntry>((entry) => {
          const data = entry.data;
          const episode: EpisodeEntry = {
            overallNumber: data.overallNumber!,
            seasonEpisodeNumber: data.seasonEpisodeNumber,
            title: data.title!,
            description: data.description!,
            date: data.date,
            cast: data.cast,
            isAlternate: data.isAlternate,
            smallText: data.smallText,
            isR18: data.isR18,
            isR18G: data.isR18G,
            scenario: data.scenario,
            log: data.log,
          };

          if (!episode.isAlternate) {
            episode.seasonAllNumber = seasonAllCounter++;
          }

          return episode;
        });

      return {
        number: seasonEntry.data.number,
        label: seasonEntry.data.label,
        slug: seasonEntry.data.slug,
        episodes: sortByOverallNumber(episodes),
      };
    });
  })();

  return cachedEpisodes;
};

// URL で使うエピソード slug を返す。
export const episodeUrlSlug = (e: EpisodeEntry): string =>
  String(e.seasonEpisodeNumber ?? e.overallNumber);

// エピソード概要画像のパスを返す。
export const episodeSummaryImage = (
  seasonSlug: string,
  e: EpisodeEntry,
): string => `${IMG_BASE}/${seasonSlug}/${episodeUrlSlug(e)}/summary.png`;

// エピソード詳細画像のパスを返す。
export const episodeDetailImage = (
  seasonSlug: string,
  e: EpisodeEntry,
): string => `${IMG_BASE}/${seasonSlug}/${episodeUrlSlug(e)}/detail.png`;

// シーズン一覧を取得する。
export const seasons = async (): Promise<readonly SeasonInfo[]> =>
  (await loadEpisodes()).map(({ number, label, slug }) => ({ number, label, slug }));

// 指定シーズンのエピソード一覧を取得する。
export const episodesBySeason = async (n: number): Promise<EpisodeEntry[]> =>
  sortByOverallNumber((await loadEpisodes()).find((s) => s.number === n)?.episodes ?? []);

// シーズン番号と slug からエピソードを探す。
export const findEpisode = async (
  season: number,
  slug: string,
): Promise<EpisodeEntry | undefined> =>
  (await episodesBySeason(season)).find((e) => episodeUrlSlug(e) === slug);

// 指定シーズンの先頭エピソードを取得する。
export const firstEpisodeOfSeason = async (n: number): Promise<EpisodeEntry | undefined> =>
  (await episodesBySeason(n))[0];

// 全シーズンのエピソードを時系列表示用の形で取得する。
export const episodesTimeline = async (): Promise<TimelineEntry[]> =>
  sortByOverallNumber(
    (await loadEpisodes()).flatMap((s) =>
      s.episodes.map<TimelineEntry>((e) => ({
        ...e,
        season: s.number,
        seasonSlug: s.slug,
        seasonLabel: s.label,
      })),
    ),
  );

// slug からシーズン情報を探す。
export const seasonFromSlug = async (slug: string): Promise<SeasonInfo | undefined> =>
  (await seasons()).find((s) => s.slug === slug);

// 全エピソードを season と episode の組で取得する。
export const allEpisodes = async (): Promise<{ season: Season; episode: EpisodeEntry }[]> =>
  (await loadEpisodes()).flatMap((s) => s.episodes.map((e) => ({ season: s, episode: e })));

// エピソード詳細ページへのパスを返す。
export const episodeHref = (seasonSlug: string, e: EpisodeEntry): string =>
  `/episodes/${seasonSlug}/${episodeUrlSlug(e)}`;

// シーズン番号とエピソード番号から詳細ページへのパスを返す。
export const episodeHrefByNumber = async (
  seasonNumber: SeasonInfo["number"],
  episodeNumber: number,
): Promise<string> => {
  const season = (await seasons()).find((item) => item.number === seasonNumber);
  if (!season) {
    throw new Error(`Unknown season number: ${seasonNumber}`);
  }
  return `/episodes/${season.slug}/${episodeNumber}`;
};

// タイムライン項目からエピソード詳細ページへのパスを返す。
export const timelineEpisodeHref = (entry: TimelineEntry): string =>
  episodeHref(entry.seasonSlug, entry);

// タイムラインに表示するエピソード番号ラベルを作る。
export const timelineEpisodeNumberLabel = (entry: TimelineEntry): string =>
  entry.isAlternate
    ? "…"
    : `Episode${String(entry.seasonEpisodeNumber ?? "").padStart(2, "0")}`;

// タイムライン項目をシーズンごとにグルーピングする。
export const groupedEpisodesTimeline = async (): Promise<
  { season: SeasonInfo; items: TimelineEntry[] }[]
> => {
  const seasonItems = await seasons();
  const timeline = await episodesTimeline();
  return seasonItems.map((season) => ({
    season,
    items: timeline.filter((entry) => entry.season === season.number),
  }));
};

// シーズン別リダイレクトページの static paths を作る。
export const episodeSeasonStaticPaths = async (): Promise<
  { params: { season: string }; props: { seasonNumber: SeasonInfo["number"] } }[]
> =>
  (await seasons()).map((season) => ({
    params: { season: season.slug },
    props: { seasonNumber: season.number },
  }));

// エピソードログページへのパスを返す。
export const episodeLogHref = (seasonSlug: string, e: EpisodeEntry): string =>
  `/episodes/${seasonSlug}/${episodeUrlSlug(e)}/log`;

// ログ本文が存在するか判定する。
export const hasEpisodeLogBody = (entry: EpisodeLogEntry | undefined): boolean =>
  Boolean(entry?.body?.trim());

// main ログの entry id からエピソード slug を取り出す。
export const episodeSlugFromMainEntry = (entry: EpisodeLogEntry): string =>
  episodeSlugFromId(entry.id);
