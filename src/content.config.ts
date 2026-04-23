import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("episode"),
      date: z.string(),
      text: z.string(),
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
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { news, episodeLogs };
