import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { path } from "./config";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/news` }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("episode"),
      text: z.string().optional(),
      season: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
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
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/episodes` }),
  schema: z.object({
    season: z
      .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
      .optional(),
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
    base: `${path.contentBase}/episode-seasons`,
  }),
  schema: z.object({
    number: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
    label: z.string(),
    slug: z.enum(["season1", "season2", "season3", "season4"]),
    order: z.number().int().positive(),
  }),
});

const characters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/characters` }),
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
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/gallery` }),
  schema: z.object({
    order: z.number().int().positive(),
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
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/goods` }),
  schema: z.object({
    title: z.string(),
    url: z.string().optional(),
    description: z.string().optional(),
  }),
});

const movies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/movies` }),
  schema: z.object({
    order: z.number().int().positive(),
    id: z.string(),
    title: z.string(),
    platform: z.literal("youtube").optional().default("youtube"),
  }),
});

const othersFanArt = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/fanart` }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
  }),
});

const othersSettings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path.contentBase}/settings` }),
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
