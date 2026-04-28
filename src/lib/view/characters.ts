import { characterHref, type CharacterEntry } from "../characters";

export interface CharacterTabItem {
  label: string;
  href: string;
  active: boolean;
}

// キャラクター切替タブ用のアイテム配列を返す（href は base path 込み）。
export const characterTabItems = (
  characters: CharacterEntry[],
  currentId: string,
): CharacterTabItem[] =>
  characters.map((character) => ({
    label: character.data.name,
    href: characterHref(character),
    active: character.id === currentId,
  }));
