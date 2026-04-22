// =========================================================
// Content Collections 定義
// ---------------------------------------------------------
// TRPG のキャンペーンとセッションログを markdown で管理する。
//
// ディレクトリ規約:
//   src/content/campaigns/<campaign-slug>.md
//   src/content/sessions/<campaign-slug>/<session-slug>.md
//
// セッションの id は "<campaign-slug>/<session-slug>" となり、
// 先頭のセグメントでキャンペーンとの関係が引ける。
// =========================================================

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const campaigns = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/campaigns" }),
  schema: z.object({
    title: z.string(),
    system: z.string(),                        // 例: "クトゥルフ神話TRPG 7版"
    gm: z.string().optional(),
    players: z
      .array(
        z.object({
          name: z.string(),
          pc: z.string().optional(),          // PC 名
        }),
      )
      .default([]),
    status: z.enum(["ongoing", "completed", "paused"]).default("ongoing"),
    startDate: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** キャンペーン一覧の並び順（昇順）。未指定は startDate で自動 */
    order: z.number().optional(),
  }),
});

const sessions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sessions" }),
  schema: z.object({
    title: z.string(),
    sessionNumber: z.number().int().positive(),
    date: z.coerce.date(),
    duration: z.string().optional(),          // 例: "約4時間"
    players: z.array(z.string()).default([]), // PL名 or PC名
    summary: z.string().optional(),           // カード・一覧に出す短文
    draft: z.boolean().default(false),        // true なら本番ビルドから除外
  }),
});

export const collections = { campaigns, sessions };
