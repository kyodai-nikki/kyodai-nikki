import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { siteConfig } from "./config";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${siteConfig.contentBase}/news` }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("episode"),
      text: z.string().optional(),
      season: z.number().int().positive(),
      episodeUrlSlug: z.number().int().positive(),
    }),
    z.object({
      kind: z.literal("page"),
      text: z.string(),
      page: z.enum([
        "gallery",
        "goods",
        "characters",
        "news",
        "movies",
        "introduction",
        "others",
      ]),
    }),
    z.object({
      kind: z.literal("custom"),
      text: z.string(),
      url: z.string().optional(),
    }),
  ]),
});

const episodeLogs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/episodes`,
  }),
  schema: z.object({
    session: z
      .object({
        type: z
          .enum(["normal", "another", "deleted"])
          .optional()
          .default("normal"),
        rating: z
          .object({
            isR18: z.boolean().optional().default(false),
            isR18G: z.boolean().optional().default(false),
          })
          .optional(),
        storyDate: z.string().optional(),
        timelineCast: z.string().optional(),
        cast: z.array(z.string()).optional(),
      })
      .optional(),
    scenario: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        author: z.string().optional(),
        distributionName: z.string().optional(),
        distributionUrl: z.string().optional(),
        adaptedScenarioUrl: z.string().optional(),
      })
      .optional(),
    custom: z
      .object({
        showSmallTitle: z.boolean().optional().default(false),
        isCompactDescription: z.boolean().optional().default(false),
      })
      .optional(),
  }),
});

const episodeSeasons = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/episode-seasons`,
  }),
  schema: z.object({
    number: z.number().int().positive(),
    label: z.string(),
    slug: z.string().min(1),
  }),
});

const characters = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/characters`,
  }),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string(),
    nameKana: z.string(),
    quote: z.string().optional().default(""),
    description: z.string(),
    age: z.string(),
    gender: z.string(),
    height: z.string(),
    weight: z.string(),
    birthday: z.string(),
    externalLinks: z
      .array(
        z.object({
          label: z.string().optional().default(""),
          url: z.string().url(),
        }),
      )
      .optional()
      .default([]),
  }),
});

const gallery = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/gallery`,
  }),
  schema: z.object({
    alt: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    creditName: z.string().optional(),
    creditUrl: z.string().url().optional(),
    twitterId: z.string().optional(),
    buttonLabel: z.string().optional(),
  }),
});

const goods = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${siteConfig.contentBase}/goods` }),
  schema: z.object({
    title: z.string(),
    url: z.string().optional(),
    description: z.string().optional(),
  }),
});

const movies = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/movies`,
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    platform: z.literal("youtube").optional().default("youtube"),
  }),
});

const othersFanArt = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/fanart`,
  }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
  }),
});

const othersSettings = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `${siteConfig.contentBase}/settings`,
  }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("character"),
      order: z.number().int().positive(),
      name: z.string(),
    }),
    z.object({
      kind: z.literal("material"),
      order: z.number().int().positive(),
      title: z.string(),
      documentUrls: z.array(z.string()),
      details: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .optional(),
    }),
  ]),
});

export const collections = {
  news,
  episodeLogs,
  episodeSeasons,
  characters,
  gallery,
  goods,
  movies,
  othersFanArt,
  othersSettings,
};
