import { getCollection, type CollectionEntry } from "astro:content";

export type MovieEntry = CollectionEntry<"movies">;

const sortByNumericIdDesc = <T extends { id: string }>(entries: readonly T[]): T[] =>
  entries
    .slice()
    .sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));

// YouTube の埋め込み URL を privacy enhanced mode で作る。
export const movieEmbedUrl = (movie: MovieEntry): string =>
  `https://www.youtube-nocookie.com/embed/${movie.data.id}`;

// 動画コレクションを新しい表示順で取得する。
export const orderedMovies = async (): Promise<MovieEntry[]> =>
  sortByNumericIdDesc(await getCollection("movies"));
