import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrderDesc } from "./common";

export type MovieEntry = CollectionEntry<"movies">;

// YouTube の埋め込み URL を privacy enhanced mode で作る。
export const movieEmbedUrl = (movie: MovieEntry): string =>
  `https://www.youtube-nocookie.com/embed/${movie.data.id}`;

// 動画コレクションを新しい表示順で取得する。
export const orderedMovies = async (): Promise<MovieEntry[]> =>
  sortByOrderDesc(await getCollection("movies"));
