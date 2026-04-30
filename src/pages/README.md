# src/pages/

Astro のファイルベースルーティングです。ここに置いた `.astro` ファイルが実際の URL になります。

## 主なルート

| ファイル | URL |
| --- | --- |
| `index.astro` | `/` |
| `404.astro` | `/404` |
| `news/index.astro` | `/news` |
| `introduction/index.astro` | `/introduction` |
| `characters/index.astro` | `/characters` |
| `characters/[slug].astro` | `/characters/{slug}` |
| `episodes/index.astro` | `/episodes` |
| `episodes/[season]/index.astro` | `/episodes/{season}` |
| `episodes/[season]/[slug].astro` | `/episodes/{season}/{slug}` |
| `episodes/[season]/[slug]/log.astro` | `/episodes/{season}/{slug}/log` |
| `episodes/timeline/index.astro` | `/episodes/timeline` |
| `gallery/index.astro` | `/gallery` |
| `movies/index.astro` | `/movies` |
| `goods/index.astro` | `/goods` |
| `others/index.astro` | `/others` |
| `others/settings/[character].astro` | `/others/settings/{character}` |
| `others/fanart/index.astro` | `/others/fanart` |
| `others/contact/index.astro` | `/others/contact` |

## 方針

- ページはデータ取得、ページ全体の構成、SEO 情報の指定を担当する。
- 繰り返し使う表示は `src/components/` に切り出す。
- Content の取得や整形が増えたら `src/lib/` に移す。
- 内部リンクや画像パスは、最終的に `withBase()` 済みの値を使う。
