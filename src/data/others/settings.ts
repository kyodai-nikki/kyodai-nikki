export interface SettingDetail {
  label: string;
  value: string;
}

export interface SettingMaterial {
  id: string;
  title: string;
  image: string;
  documentUrl: string;
  details?: SettingDetail[];
}

export interface SettingsCharacter {
  slug: string;
  name: string;
  materials: SettingMaterial[];
}

export const settingsCharacters: SettingsCharacter[] = [
  {
    slug: "chiaki",
    name: "染谷千秋",
    materials: [
      {
        id: "chiaki-setting-sheet",
        title: "千秋 - 設定画",
        image: "/images/others/chiaki-setting-sheet.svg",
        documentUrl: "https://drive.google.com/file/d/chiaki-setting-sheet/view",
        details: [
          { label: "カテゴリ", value: "設定資料" },
          { label: "形式", value: "Google Drive" },
        ],
      },
      {
        id: "chiaki-expression-03",
        title: "千秋 - 表情差分③",
        image: "/images/others/chiaki-expression-03.svg",
        documentUrl: "https://drive.google.com/file/d/chiaki-expression-03/view",
        details: [
          { label: "カテゴリ", value: "表情差分" },
          { label: "メモ", value: "ダミー画像" },
        ],
      },
      {
        id: "chiaki-expression-02",
        title: "千秋 - 表情差分②",
        image: "/images/others/chiaki-expression-02.svg",
        documentUrl: "https://drive.google.com/file/d/chiaki-expression-02/view",
        details: [
          { label: "カテゴリ", value: "表情差分" },
          { label: "メモ", value: "ダミー画像" },
        ],
      },
      {
        id: "chiaki-expression-01",
        title: "千秋 - 表情差分①",
        image: "/images/others/chiaki-expression-01.svg",
        documentUrl: "https://drive.google.com/file/d/chiaki-expression-01/view",
        details: [
          { label: "カテゴリ", value: "表情差分" },
          { label: "メモ", value: "ダミー画像" },
        ],
      },
      {
        id: "chiaki-standing",
        title: "千秋 - 立ち絵",
        image: "/images/others/chiaki-standing.svg",
        documentUrl: "https://drive.google.com/file/d/chiaki-standing/view",
        details: [
          { label: "カテゴリ", value: "立ち絵" },
          { label: "形式", value: "Google Drive" },
        ],
      },
    ],
  },
  {
    slug: "chifuyu",
    name: "染谷千冬",
    materials: [
      {
        id: "chifuyu-expression",
        title: "千冬 - 表情差分",
        image: "/images/others/chifuyu-expression.svg",
        documentUrl: "https://drive.google.com/file/d/chifuyu-expression/view",
        details: [
          { label: "カテゴリ", value: "表情差分" },
          { label: "形式", value: "Google Drive" },
        ],
      },
      {
        id: "chifuyu-standing",
        title: "千冬 - 立ち絵",
        image: "/images/others/chifuyu-standing.svg",
        documentUrl: "https://drive.google.com/file/d/chifuyu-standing/view",
        details: [
          { label: "カテゴリ", value: "立ち絵" },
          { label: "形式", value: "Google Drive" },
        ],
      },
    ],
  },
];

export const getSettingsCharacter = (slug: string) =>
  settingsCharacters.find((character) => character.slug === slug);
