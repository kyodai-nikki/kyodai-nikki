import { getCollection, type CollectionEntry } from "astro:content";

import { sortByDateDesc } from "./common";
import { episodeHrefByNumber, findEpisode } from "./episodes";
import { withBase } from "./urls";

export type NewsEntry = CollectionEntry<"news">;

export interface NewsListItem {
  entry: NewsEntry;
  external: boolean;
  href: string;
  text: string;
}

const pagePaths = {
  gallery: "/gallery",
  goods: "/goods",
  characters: "/characters",
  news: "/news",
  movies: "/movies",
  introduction: "/introduction",
  others: "/others",
} as const;

// ニュースコレクションを日付の新しい順で取得する。
export const orderedNews = async (): Promise<NewsEntry[]> =>
  sortByDateDesc(await getCollection("news"));

// ニュースリンクが外部リンクとして扱われるか判定する。
export const isExternalNews = (item: NewsEntry): boolean => {
  if (item.data.kind !== "custom") return false;
  if (item.data.external !== undefined) return item.data.external;
  return /^(https?:)?\/\//.test(item.data.url) || item.data.url.startsWith("mailto:");
};

// ニュース種別に応じてリンク先 URL を解決する。
export const resolveNewsUrl = async (item: NewsEntry): Promise<string> => {
  switch (item.data.kind) {
    case "episode":
      return await episodeHrefByNumber(item.data.season, item.data.episode);
    case "page":
      return pagePaths[item.data.page];
    case "custom":
      return item.data.url;
  }
};

// エピソード追加ニュースの文言をエピソード情報から補完する。
export const resolveNewsText = async (item: NewsEntry): Promise<string> => {
  if (item.data.kind !== "episode") return item.data.text;

  const episode = await findEpisode(item.data.season, String(item.data.episode));
  if (!episode) {
    return item.data.text ?? `Episode${String(item.data.episode).padStart(2, "0")}を追加しました！`;
  }

  const number = episode.seasonAllNumber ?? "―";
  return `Episode${number}：${episode.title}を追加しました！`;
};

// ニュースの href を外部/内部リンクに応じて整える。
export const newsHref = async (item: NewsEntry): Promise<string> => {
  const resolved = await resolveNewsUrl(item);
  return isExternalNews(item) ? resolved : withBase(resolved);
};

// ニュース日付を YYYY.MM.DD 表記にする。
export const formatNewsDate = (date: string): string => date.replace(/-/g, ".");

// ページ表示用にニュース一覧のリンク情報と文言をまとめる。
export const newsListItems = async (): Promise<NewsListItem[]> =>
  Promise.all(
    (await orderedNews()).map(async (item) => ({
      entry: item,
      external: isExternalNews(item),
      href: await newsHref(item),
      text: await resolveNewsText(item),
    })),
  );
