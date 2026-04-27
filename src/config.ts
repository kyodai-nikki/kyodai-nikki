export const siteConfig = {
  name: "兄弟日記",
  nameEn: "KYODAI NIKKI",
  copyStartYear: 2023,
  social: {
    twitter: "https://x.com/kyodai_nikki",
  },
  logoPath: "/logo.png",
  teamName: "兄弟日記制作チーム",
  email: "kyodai-nikki@googlegroups.com",
} as const;

export const homeConfig = {
  enableSlideshow: false,
} as const;

export const path = {
  contentBase: "./src/content",
} as const;
