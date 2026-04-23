import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { withBase } from "./urls";

export type OthersSectionEntry = CollectionEntry<"othersSections">;
export type OthersFanArtEntry = CollectionEntry<"othersFanArt">;
export type OthersSettingsEntry = CollectionEntry<"othersSettings">;

// Others のタブ定義を表示順で取得する。
export const orderedOthersSections = async (): Promise<OthersSectionEntry[]> =>
  sortByOrder(await getCollection("othersSections"));

// Others のデフォルト遷移先パスを決める。
export const defaultOthersPath = (sections: OthersSectionEntry[]): string =>
  sections.find((section) => section.data.default)?.data.href ?? sections[0]?.data.href ?? "/others";

// Others のデフォルト遷移先 href を base path つきで返す。
export const defaultOthersHref = async (): Promise<string> =>
  withBase(defaultOthersPath(await orderedOthersSections()));

// ファンアートコレクションを表示順で取得する。
export const orderedFanArt = async (): Promise<OthersFanArtEntry[]> =>
  sortByOrder(await getCollection("othersFanArt"));

// 設定資料のキャラクターコレクションを表示順で取得する。
export const orderedSettingsCharacters = async (): Promise<OthersSettingsEntry[]> =>
  sortByOrder(await getCollection("othersSettings"));
