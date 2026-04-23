import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { withBase } from "./urls";

export type CharacterEntry = CollectionEntry<"characters">;

// キャラクター一覧で使う仮ポートレート画像のパスを返す。
export const dummyPortraitSrc = (): string => withBase("/images/characters/dummy-portrait.svg");

// キャラクター詳細ページへのリンクを返す。
export const characterHref = (character: CharacterEntry): string =>
  withBase(`/characters/${character.id}/`);

// キャラクター立ち絵の画像パスを base path つきで返す。
export const characterStandingSrc = (character: CharacterEntry): string =>
  withBase(character.data.standing);

// キャラクターコレクションを表示順で取得する。
export const orderedCharacters = async (): Promise<CharacterEntry[]> =>
  sortByOrder(await getCollection("characters"));
