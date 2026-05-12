export const othersPageMsg = {
  meta: {
    description: "設定資料、fan art、問い合わせをまとめたページです。",
  },
  aria: {
    tabs: "Others内のコンテンツ切替",
    settingsCharacters: "設定資料のキャラクター切替",
    materials: (name: string) => `${name}の設定資料一覧`,
  },
  redirect: {
    loading: "設定資料ページへ移動しています…",
    fallbackLink: "自動で切り替わらない場合はこちら",
  },
  settings: {
    detailsHeading: "詳細",
    charactersHeading: "キャラクター一覧",
    openCharacters: "キャラクター一覧を開く",
    closeCharacters: "キャラクター一覧を閉じる",
  },
} as const;
