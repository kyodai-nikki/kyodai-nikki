import { defaultOthersPath } from "./othersSections";

export type NavPage = {
  nav: string;
  title: string;
  href: string;
};

export const navigation = {
  news: { nav: "News", title: "News", href: "/news" },
  introduction: {
    nav: "Introduction",
    title: "Introduction",
    href: "/introduction",
  },
  characters: { nav: "Characters", title: "Characters", href: "/characters" },
  episodes: { nav: "Episodes", title: "Episodes", href: "/episodes/season1/1" },
  gallery: { nav: "Gallery", title: "Gallery", href: "/gallery" },
  movies: { nav: "Movies", title: "Movies", href: "/movies" },
  goods: { nav: "Goods", title: "Goods", href: "/goods" },
  others: { nav: "Others", title: "Others", href: defaultOthersPath() },
} as const satisfies Record<string, NavPage>;

export const navItems: NavPage[] = Object.values(navigation);
