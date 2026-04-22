// =========================================================
// Others ページ（/others/）のリンク集
// ---------------------------------------------------------
// href:      遷移先。空 / "#" の場合は disabled: true と合わせて「準備中」表示に。
// external:  外部リンクなら true。未指定なら URL で自動判定されます。
// disabled:  ページ未完成の項目は true を付けるとグレーアウト＋「準備中」チップ表示
// =========================================================

export interface OtherLink {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  disabled?: boolean;
}

export const links: OtherLink[] = [
  { title: "Q & A",   href: "#", description: "よくある質問",                disabled: true },
  { title: "Credits", href: "#", description: "製作に関わった人々",          disabled: true },
  { title: "Terms",   href: "#", description: "利用規約 / 二次創作ガイドライン", disabled: true },
  // { title: "公式 X", href: "https://twitter.com/...", external: true },
];
