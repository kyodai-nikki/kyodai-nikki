import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sessions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sessions" }),
  schema: z.object({
    title: z.string(),
    sessionNumber: z.number().int().positive(),
    date: z.coerce.date(),
    duration: z.string().optional(),
    players: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const episodeLogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/episodes" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { sessions, episodeLogs };
