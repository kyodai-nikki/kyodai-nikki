import { getCollection, type CollectionEntry } from "astro:content";

import { episodeHrefByNumber, findEpisode } from "./episodes";
import { withBase } from "./urls";

export type NewsEntry = CollectionEntry<"news">;

export interface NewsListItem {
  entry: NewsEntry;
  href: string | undefined;
  external: boolean;
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

// ファイル名（YYYYMMDD-slug）から YYYY-MM-DD 形式の日付文字列を返す。
export const newsDate = (entry: NewsEntry): string => {
  const m = entry.id.match(/^(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
};

// ニュースコレクションをファイル名の降順（新しい日付順）で取得する。
export const orderedNews = async (): Promise<NewsEntry[]> => {
  const entries = await getCollection("news");
  return [...entries].sort((a, b) => b.id.localeCompare(a.id));
};

// URL が外部リンクかどうかを判定する。
const isExternalUrl = (url: string): boolean =>
  /^(https?:)?\/\//.test(url) || url.startsWith("mailto:");

// ニュース種別に応じてリンク先 URL を解決する（リンクなしの場合は undefined）。
export const resolveNewsUrl = async (item: NewsEntry): Promise<string | undefined> => {
  switch (item.data.kind) {
    case "episode":
      return await episodeHrefByNumber(item.data.season, item.data.episodeUrlSlug);
    case "page":
      return pagePaths[item.data.page];
    case "custom":
      return item.data.url;
  }
};

// エピソード追加ニュースの文言をエピソード情報から補完する。
export const resolveNewsText = async (item: NewsEntry): Promise<string> => {
  if (item.data.kind !== "episode") return item.data.text;

  const episode = await findEpisode(item.data.season, String(item.data.episodeUrlSlug));
  if (!episode) {
    return item.data.text ?? `Episode${String(item.data.episodeUrlSlug).padStart(2, "0")}を追加しました！`;
  }

  const number = episode.seasonAllNumber ?? "―";
  return `Episode${number}：${episode.title}を追加しました！`;
};

// ニュースの href を外部/内部リンクに応じて整える（リンクなしの場合は undefined）。
export const newsHref = async (item: NewsEntry): Promise<string | undefined> => {
  const resolved = await resolveNewsUrl(item);
  if (resolved === undefined) return undefined;
  return isExternalUrl(resolved) ? resolved : withBase(resolved);
};

// ニュースリンクが外部リンクとして扱われるか判定する。
export const isExternalNews = async (item: NewsEntry): Promise<boolean> => {
  const resolved = await resolveNewsUrl(item);
  return resolved !== undefined && isExternalUrl(resolved);
};

// ニュース日付を YYYY.MM.DD 表記にする。
export const formatNewsDate = (entry: NewsEntry): string => newsDate(entry).replace(/-/g, ".");

// ページ表示用にニュース一覧のリンク情報と文言をまとめる。
export const newsListItems = async (): Promise<NewsListItem[]> =>
  Promise.all(
    (await orderedNews()).map(async (item) => {
      const href = await newsHref(item);
      return {
        entry: item,
        external: href !== undefined && isExternalUrl(href),
        href,
        text: await resolveNewsText(item),
      };
    }),
  );
