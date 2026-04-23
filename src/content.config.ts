import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("episode"),
      date: z.string(),
      text: z.string().optional(),
      season: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      episode: z.number().int().positive(),
    }),
    z.object({
      kind: z.literal("page"),
      date: z.string(),
      text: z.string(),
      page: z.enum(["gallery", "goods", "characters", "news", "movies", "introduction", "others"]),
    }),
    z.object({
      kind: z.literal("custom"),
      date: z.string(),
      text: z.string(),
      url: z.string(),
      external: z.boolean().optional(),
    }),
  ]),
});

const episodeLogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/episodes" }),
  schema: z.object({
    season: z.enum(["season1", "season2", "season3", "season4"]).optional(),
    overallNumber: z.number().optional(),
    seasonEpisodeNumber: z.number().int().positive().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    cast: z.string().optional(),
    isAlternate: z.boolean().optional().default(false),
    smallText: z.boolean().optional().default(false),
    isR18: z.boolean().optional().default(false),
    isR18G: z.boolean().optional().default(false),
    scenario: z.object({
      title: z.string().optional(),
      inStoryDate: z.string().optional(),
      participants: z.array(z.string()).optional(),
      author: z.string().optional(),
      distributionName: z.string().optional(),
      distributionUrl: z.string().optional(),
      isAdapted: z.boolean().optional(),
      adaptedScenarioUrl: z.string().optional(),
      compactDescription: z.boolean().optional(),
      removeCanon: z.boolean().optional(),
    }).optional(),
    log: z.object({
      showNextEpisode: z.boolean().optional(),
      showPreviousEpisode: z.boolean().optional(),
    }).optional(),
  }),
});

const episodeSeasons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/episode-seasons" }),
  schema: z.object({
    number: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    label: z.string(),
    slug: z.enum(["season1", "season2", "season3", "season4"]),
    order: z.number().int().positive(),
  }),
});

const introduction = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/introduction" }),
  schema: z.object({}),
});

const characters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/characters" }),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string(),
    furigana: z.string(),
    portrait: z.string(),
    standing: z.string(),
    quote: z.string().optional().default(""),
    description: z.string(),
    age: z.string(),
    gender: z.string(),
    height: z.string(),
    weight: z.string(),
    birthday: z.string(),
    externalLink: z.string().optional().default(""),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gallery" }),
  schema: z.object({
    order: z.number().int().positive(),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    detailSrcs: z.array(z.string()).optional(),
    creditName: z.string().optional(),
    creditUrl: z.string().optional(),
    twitterId: z.string().optional(),
    buttonLabel: z.string().optional(),
  }),
});

const goods = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/goods" }),
  schema: z.object({
    order: z.number().int().positive(),
    title: z.string(),
    url: z.string().optional(),
    image: z.string(),
    detailImage: z.string().optional(),
    description: z.string().optional(),
    saleLabel: z.string().optional(),
    buttonLabel: z.string().optional(),
  }),
});

const movies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/movies" }),
  schema: z.object({
    order: z.number().int().positive(),
    id: z.string(),
    title: z.string(),
    platform: z.literal("youtube").optional().default("youtube"),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/home" }),
  schema: z.object({
    image: z.string(),
    title: z.string(),
    startDate: z.string(),
    status: z.string(),
    imageCredit: z.string().optional().default(""),
  }),
});

const common = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/common" }),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    copyStartYear: z.number().int().positive(),
    social: z.object({
      twitter: z.string().optional().default(""),
    }),
  }),
});

const othersSections = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/others/sections" }),
  schema: z.object({
    order: z.number().int().positive(),
    slug: z.enum(["settings", "fan-art", "contact"]),
    label: z.string(),
    href: z.string(),
    default: z.boolean().optional().default(false),
  }),
});

const othersFanArt = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/others/fanart" }),
  schema: z.object({
    order: z.number().int().positive(),
    title: z.string(),
    image: z.string(),
    url: z.string(),
  }),
});

const othersSettings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/others/settings" }),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string(),
    materials: z.array(z.object({
      id: z.string(),
      title: z.string(),
      image: z.string(),
      documentUrl: z.string(),
      details: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
    })),
  }),
});

export const collections = {
  news,
  episodeLogs,
  episodeSeasons,
  introduction,
  characters,
  gallery,
  goods,
  movies,
  home,
  common,
  othersSections,
  othersFanArt,
  othersSettings,
};
