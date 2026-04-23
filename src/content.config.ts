import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const episodeLogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/episodes" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { episodeLogs };
