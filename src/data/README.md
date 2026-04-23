# src/data/ — サイト更新はこのフォルダだけで完結

このディレクトリの TypeScript ファイルを編集すると、各ページに自動反映されます。
ページ本体（`src/pages/*/index.astro`）は表示だけを担当していて、データは編集しません。

## ファイル一覧

| ファイル | 対応するページ | 役割 |
|---|---|---|
| `site.ts` | 全ページ | サイト名・SNS URL などグローバル設定 |
| `hero.ts` | `/` | トップのキービジュアル・タイトル・タグライン |
| `news.ts` | `/news/` | お知らせ一覧（日付・本文・リンク先） |
| `introduction.ts` | `/introduction/` | あらすじ段落 |
| `characters.ts` | `/characters/` `/characters/{slug}/` | キャラ一覧カード＆詳細（立ち絵・台詞・ステータス・外部リンク） |
| `episodes.ts` | `/episodes/` `/episodes/season{N}/{slug}/` `/episodes/timeline/` | エピソードカード＆詳細パネル、シーズン分け、別史フラグ |
| `gallery.ts` | `/gallery/` | ギャラリー画像 |
| `movies.ts` | `/movies/` | 動画埋め込み |
| `goods.ts` | `/goods/` | 物販リンク |
| `others/tab.ts` | `/others/` | Othersタブの導線 |
| `others/settings.ts` | `/others/settings/{character}/` | 設定資料データ |
| `others/fanArt.ts` | `/others/fanart/` | fan art の外部リンク一覧 |

## 編集のコツ

- 各ファイルの先頭に、フィールドの意味をコメントで書いています。迷ったらそこを読めば OK。
- 配列に 1 要素足せば、ページ側も 1 枚 / 1 行増えます。
- 画像や動画のファイル本体は `public/` 以下（例: `public/images/gallery/`）に置き、このファイルではパスだけを指定します。
- 長文ログ系の Markdown は `src/content/episodes/` 配下で管理します。

## よくあるパターン

### News を 1 件追加したい

`news.ts` の `news` 配列の先頭に追記：

```ts
{
  date: "2026-05-01",
  text: "第36話を追加しました！",
  href: "/episodes/main/36-xxx/",
},
```

### Introduction の文章を差し替えたい

`introduction.ts` の `paragraphs` 配列を書き換えるだけ。段落ごとに 1 つの文字列です。
文字列の中に `\n` を入れると、改行として表示されます。

### キャラクターを増やしたい・差し替えたい

`characters.ts` の `characters` 配列にオブジェクトを追加、または既存要素を編集します。

フィールドは以下の通り（`?` は省略可）：

| フィールド | 用途 |
|---|---|
| `slug` | URL（`/characters/<slug>/`）。半角英数のみ。 |
| `name` / `furigana` | 表示名と読み仮名。 |
| `portrait` | 一覧ページの縦長サムネイル画像。 |
| `standing` | 詳細ページの立ち絵（透過 PNG 推奨）。横からスライドインします。 |
| `quote` | 詳細ページ左側に縦書きで出る台詞。`\n` で改行。 |
| `description` | 紹介文。`\n` で改行。 |
| `age` / `gender` / `height` / `weight` / `birthday` | ステータス欄。不明なら `"?"` で OK。 |
| `externalLink?` | いあきゃら等の外部 URL。空文字列なら非表示。 |

#### 画像ファイルの置き場所

キャラ画像は `public/images/characters/` に置いてください。ファイル名の規則：

- 一覧サムネ：`<slug>-portrait.jpg`（例：`chiaki-portrait.jpg`）
- 立ち絵　　：`<slug>-standing.png`（例：`chiaki-standing.png`）

現在登録済みの 4 スラッグ：`chiaki` / `chifuyu` / `akito` / `kujo`。画像が未配置の場合、一覧は斜めストライプのプレースホルダ、詳細は画像なしで表示されます。

### エピソードを追加・編集したい

`episodes.ts` の `episodes` 配列にオブジェクトを追加します。シーズン枠は `seasons` 定数（1〜4）を使います。

| フィールド | 用途 |
|---|---|
| `overallNumber` | 通算番号（タイムライン並び順）。別史は `3.5` のように小数で挟むのも OK。 |
| `season` | 1〜4 |
| `seasonEpisodeNumber?` | シーズン内番号。**別史エピソードは省略**してください（カードでは「—」表記になります）。 |
| `slug` | URL に使う半角英数。通常は番号と同じ文字列（例 `"00"`、`"01"`）、別史は読みやすい英字（例 `"negai"`）。 |
| `title` | タイトル |
| `summaryImage` | 一覧カードの右側に薄く敷く画像 |
| `detailImage` | 詳細パネルに表示する大きい画像 |
| `description` | 詳細パネル本文。`\n` で改行 |
| `badge?` | 詳細パネル左下のバッジ（例 `"R-18"`）。空なら非表示。 |
| `readHref?` | 「読む」ボタンのリンク先。空なら非表示。 |
| `isAlternate?` | `true` で別史扱い（番号「—」、黒背景カード） |
| `smallText?` | `true` でカードのタイトル文字を小さく表示（長いタイトル向け） |
| `date?` | タイムラインに表示する作中日付。例：`"2021.10.02"` |
| `cast?` | タイムラインに表示する登場人物 1 行。例：`"千秋 (15歳・高校生) 千冬 (18歳・専門学校)"` |

#### 画像ファイルの置き場所

`public/images/episodes/` に配置してください。命名規則の例：

- 概要画像：`s1-00-summary.jpg`（season1 の 00 用）
- 詳細画像：`s1-00-detail.jpg`
- 別史　　：`s1-negai-summary.jpg` / `s1-negai-detail.jpg`

ファイル名は自由で、`episodes.ts` の `summaryImage` / `detailImage` を合わせて書き換えれば OK。

#### URL の早見表

| ページ | URL |
|---|---|
| トップ（season1 の先頭） | `/episodes/` |
| シーズン先頭 | `/episodes/season1/00/` のように各シーズンの先頭 slug へ遷移 |
| 個別エピソード | `/episodes/season1/00/` 等 |
| 全話タイムライン | `/episodes/timeline/` |
