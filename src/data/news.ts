// =========================================================
// News 一覧のデータソース
// ---------------------------------------------------------
// このファイル 1 箇所を編集するだけで /news/ の一覧が更新される。
//   - date:  "YYYY-MM-DD" 形式
//   - text:  リストに表示される本文（リンク文字列）
//   - href:  クリック時の遷移先
//            "/episodes/xxx/xxx/" のようなサイト内パス、または
//            "https://..." のような外部URL のどちらでも OK。
//            外部URL は自動判定して新規タブで開きます（external を明示してもOK）。
// =========================================================

export interface NewsItem {
  date: string;       // "YYYY-MM-DD"
  text: string;
  href: string;
  /** 明示的に新規タブで開きたい場合だけ true。未指定なら URL から自動判定。 */
  external?: boolean;
}

export const news: NewsItem[] = [
  {
    date: "2025-04-15",
    text: "Episode35：蓄堰を追加しました！",
    href: "/episodes/main/35-chikuseki/",
  },
  {
    date: "2025-04-15",
    text: "Episode35：夜になんか攫われてたまるかを追加しました！",
    href: "/episodes/main/35-yoru-ni-nanka/",
  },
  {
    date: "2025-02-16",
    text: "Episode34：双離の果実を追加しました！",
    href: "/episodes/main/34-souri-no-kajitsu/",
  },
  {
    date: "2025-02-14",
    text: "Episode33：催眠ダーリンLv1を追加しました！",
    href: "/episodes/main/33-saimin-darling-lv1/",
  },
  {
    date: "2023-11-14",
    text: "千秋の誕生日イラストを公開しました！",
    href: "/gallery/",
  },
  {
    date: "2023-11-14",
    text: "Episode27：喰らわば、日常を追加しました！",
    href: "/episodes/main/27-kurawaba-nichijou/",
  },
  {
    date: "2023-11-11",
    text: "Episode26：水中密室を追加しました！",
    href: "/episodes/main/26-suichu-misshitsu/",
  },
];
