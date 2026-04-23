export type OthersSectionSlug = "settings" | "fan-art" | "contact";

export interface OthersSection {
  slug: OthersSectionSlug;
  label: string;
  href: string;
}

export const defaultOthersPath = "/others/settings/chiaki";

export const othersSections: OthersSection[] = [
  { slug: "settings", label: "設定資料", href: defaultOthersPath },
  { slug: "fan-art", label: "fan art", href: "/others/fanart" },
  { slug: "contact", label: "問い合わせ", href: "/others/contact" },
];
