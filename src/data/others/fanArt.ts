export interface FanArtItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

export const fanArt: FanArtItem[] = [
  {
    id: "higashijima-poipiku",
    title: "東鴨臣 - poipiku",
    image: "/images/others/fanart-higashijima.svg",
    url: "https://example.com/fanart/higashijima",
  },
  {
    id: "tsukizuki-poipiku",
    title: "倉月 - poipiku",
    image: "/images/others/fanart-tsukizuki.svg",
    url: "https://example.com/fanart/tsukizuki",
  },
];
