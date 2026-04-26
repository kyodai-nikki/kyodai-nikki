import {
  newsHref,
  orderedNews,
  resolveNewsText,
  type NewsEntry,
} from "../news";

export interface NewsListItem {
  entry: NewsEntry;
  href: string | undefined;
  external: boolean;
  text: string;
}

const isExternalUrl = (url: string): boolean =>
  /^(https?:)?\/\//.test(url) || url.startsWith("mailto:");

export const newsDate = (entry: NewsEntry): string => {
  const match = entry.id.match(/^(\d{4})(\d{2})(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
};

export const formatNewsDate = (entry: NewsEntry): string =>
  newsDate(entry).replace(/-/g, ".");

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
