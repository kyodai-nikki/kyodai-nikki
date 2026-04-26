export type OthersSectionSlug = "settings" | "fan-art" | "contact";

export type OthersSection = {
  slug: OthersSectionSlug;
  label: string;
  href: string;
  default?: boolean;
};

export const OTHERS_SECTIONS: readonly OthersSection[] = [
  {
    slug: "settings",
    label: "設定資料",
    href: "/others/settings/chiaki",
    default: true,
  },
  {
    slug: "fan-art",
    label: "fan art",
    href: "/others/fanart",
  },
  {
    slug: "contact",
    label: "問い合わせ",
    href: "/others/contact",
  },
] as const;

export const defaultOthersPath = (): string =>
  OTHERS_SECTIONS.find((section) => section.default)?.href ?? OTHERS_SECTIONS[0]?.href ?? "/others";
