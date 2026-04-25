import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { withBase } from "./urls";

export type CharacterEntry = CollectionEntry<"characters">;

// キャラクター詳細ページへのリンクを返す。
export const characterHref = (character: CharacterEntry): string =>
  withBase(`/characters/${character.id}/`);

// キャラクターポートレート画像のパスを base path つきで返す。
export const characterPortraitSrc = (character: CharacterEntry): string =>
  withBase(`/images/characters/${character.id}/portrait.png`);

// キャラクター立ち絵の画像パスを base path つきで返す。
export const characterStandingSrc = (character: CharacterEntry): string =>
  withBase(`/images/characters/${character.id}/standing.png`);

// キャラクターコレクションを表示順で取得する。
export const orderedCharacters = async (): Promise<CharacterEntry[]> =>
  sortByOrder(await getCollection("characters"));

// [slug].astro の getStaticPaths 用。
