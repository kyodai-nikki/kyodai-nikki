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
// 戻り値は外部 URL ならそのまま、内部リンクなら base path 込みのパス。
export const resolveNewsUrl = async (item: NewsEntry): Promise<string | undefined> => {
  switch (item.data.kind) {
    case "episode":
      // episodeHrefByNumber は base path 込みで返す
      return await episodeHrefByNumber(item.data.season, item.data.episodeUrlSlug);
    case "page":
      // 固定の内部パス → base path を補う
      return withBase(pagePaths[item.data.page]);
    case "custom":
      // 任意 URL。外部ならそのまま、内部相対パスなら base path を補う
      if (item.data.url === undefined) return undefined;
      return isExternalUrl(item.data.url) ? item.data.url : withBase(item.data.url);
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

// ニュースの href を返す（resolveNewsUrl が既に外部/内部に応じた最終形を返す）。
export const newsHref = async (item: NewsEntry): Promise<string | undefined> =>
  await resolveNewsUrl(item);

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
