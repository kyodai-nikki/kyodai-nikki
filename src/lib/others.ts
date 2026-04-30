import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { imageThumbnailSrc, imageListSrcs } from "./image-utils";
import { withBase } from "./urls";

export type OthersFanArtEntry = CollectionEntry<"othersFanArt">;
export type OthersSettingsCharacterEntry =
  CollectionEntry<"othersSettingCharacters">;
export type OthersSettingsMaterialEntry =
  CollectionEntry<"othersSettingMaterials">;

type OthersSettingsEntry =
  | OthersSettingsCharacterEntry
  | OthersSettingsMaterialEntry;

export const settingsCharacterSlug = (entry: OthersSettingsEntry): string =>
  entry.id.split("/")[0];

const settingsMaterialSlug = (entry: OthersSettingsMaterialEntry): string =>
  entry.id.split("/")[1]?.replace(/^\d+-/, "") ?? entry.id;

const sortByEntryId = <T extends { id: string }>(entries: readonly T[]): T[] =>
  entries
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

// ファンアートコレクションをファイル名の昇順で取得する。
export const orderedFanArt = async (): Promise<OthersFanArtEntry[]> => {
  const entries = await getCollection("othersFanArt");
  return [...entries].sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
  );
};

// ファンアート画像のパスを base path つきで返す。
// images/fanart/{id}.jpg が存在すれば jpg、なければ png を返す。
export const fanArtImageSrc = (entry: OthersFanArtEntry): string => {
  const jpgPath = resolve(
    process.cwd(),
    "public/images/fanart",
    `${entry.id}.jpg`,
  );
  const ext = existsSync(jpgPath) ? "jpg" : "png";
  return withBase(`/images/fanart/${entry.id}.${ext}`);
};

// 設定資料のキャラクターコレクションを表示順で取得する。
export const orderedSettingsCharacters = async (): Promise<
  OthersSettingsCharacterEntry[]
> =>
  sortByOrder(await getCollection("othersSettingCharacters"));

export const orderedSettingsMaterials = async (
  characterSlug: string,
): Promise<OthersSettingsMaterialEntry[]> =>
  sortByEntryId(
    (await getCollection("othersSettingMaterials")).filter(
      (entry) => settingsCharacterSlug(entry) === characterSlug,
    ),
  );

const settingsMaterialDir = (entry: OthersSettingsMaterialEntry): string =>
  resolve(
    process.cwd(),
    "public/images/settings",
    settingsCharacterSlug(entry),
    settingsMaterialSlug(entry),
  );

const settingsMaterialUrlBase = (entry: OthersSettingsMaterialEntry): string =>
  `/images/settings/${settingsCharacterSlug(entry)}/${settingsMaterialSlug(entry)}`;

// カード用サムネイル: thumbnail.* がなければ最初の画像にフォールバック。
export const settingsMaterialThumbnailSrc = (
  entry: OthersSettingsMaterialEntry,
): string | undefined =>
  imageThumbnailSrc(settingsMaterialDir(entry), settingsMaterialUrlBase(entry));

// モーダル用画像一覧: thumbnail.* を除いたファイルを数値昇順で返す。
export const settingsMaterialImageSrcs = (
  entry: OthersSettingsMaterialEntry,
): string[] =>
  imageListSrcs(settingsMaterialDir(entry), settingsMaterialUrlBase(entry));
