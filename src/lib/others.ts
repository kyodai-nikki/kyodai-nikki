import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { getCollection, type CollectionEntry } from "astro:content";

import { sortByOrder } from "./common";
import { withBase } from "./urls";

export type OthersFanArtEntry = CollectionEntry<"othersFanArt">;
export type OthersSettingsEntry = CollectionEntry<"othersSettings">;

export type OthersSettingsCharacterEntry = OthersSettingsEntry & {
  data: {
    kind: "character";
    order: number;
    name: string;
  };
};

export type OthersSettingsMaterialEntry = OthersSettingsEntry & {
  data: {
    kind: "material";
    order: number;
    title: string;
    documentUrl: string;
    details?: {
      label: string;
      value: string;
    }[];
  };
};

const isSettingsCharacterEntry = (entry: OthersSettingsEntry): entry is OthersSettingsCharacterEntry =>
  entry.data.kind === "character";

const isSettingsMaterialEntry = (entry: OthersSettingsEntry): entry is OthersSettingsMaterialEntry =>
  entry.data.kind === "material";

export const settingsCharacterSlug = (entry: OthersSettingsEntry): string => entry.id.split("/")[0];

const settingsMaterialSlug = (entry: OthersSettingsMaterialEntry): string =>
  entry.id.split("/")[1]?.replace(/^\d+-/, "") ?? entry.id;

// ファンアートコレクションをファイル名の昇順で取得する。
export const orderedFanArt = async (): Promise<OthersFanArtEntry[]> => {
  const entries = await getCollection("othersFanArt");
  return [...entries].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
};

// ファンアート画像のパスを base path つきで返す。
// images/others/fanart/{id}.jpg が存在すれば jpg、なければ png を返す。
export const fanArtImageSrc = (entry: OthersFanArtEntry): string => {
  const jpgPath = resolve(process.cwd(), "public/images/others/fanart", `${entry.id}.jpg`);
  const ext = existsSync(jpgPath) ? "jpg" : "png";
  return withBase(`/images/others/fanart/${entry.id}.${ext}`);
};

// 設定資料のキャラクターコレクションを表示順で取得する。
export const orderedSettingsCharacters = async (): Promise<OthersSettingsCharacterEntry[]> =>
  sortByOrder((await getCollection("othersSettings")).filter(isSettingsCharacterEntry));

export const orderedSettingsMaterials = async (
  characterSlug: string,
): Promise<OthersSettingsMaterialEntry[]> =>
  sortByOrder(
    (await getCollection("othersSettings")).filter(
      (entry): entry is OthersSettingsMaterialEntry =>
        isSettingsMaterialEntry(entry) && settingsCharacterSlug(entry) === characterSlug,
    ),
  );

export const settingsMaterialImageSrc = (entry: OthersSettingsMaterialEntry): string => {
  const characterSlug = settingsCharacterSlug(entry);
  const materialSlug = settingsMaterialSlug(entry);
  const imageBaseName = `${characterSlug}-${materialSlug}`;
  const imageDir = resolve(process.cwd(), "public/images/others/settings");
  const ext = ["svg", "png", "jpg", "webp"].find((candidate) =>
    existsSync(resolve(imageDir, `${imageBaseName}.${candidate}`)),
  ) ?? "png";

  return withBase(`/images/others/settings/${imageBaseName}.${ext}`);
};
