# Content Editing Guide

サイト上の表示データは、基本的に `src/content/` 配下の Markdown を編集します。スキーマは `src/content.config.ts` で定義しています。

## 主なファイル

| ファイル | ページ | 役割 |
| --- | --- | --- |
| `home.md` | `/` | トップページ |
| `introduction.md` | `/introduction` | あらすじ |
| `contact.md` | `/others/contact` | 問い合わせ |
| `episodes-spoiler-notice.md` | episode ログ導線 | ネタバレ注意モーダル |
| `news/*.md` | `/news` | お知らせ |
| `characters/*.md` | `/characters` | キャラクター |
| `episode-seasons/*.md` | `/episodes` | シーズン定義 |
| `episodes/{season}/{episode}/main.md` | `/episodes/{season}/{episode}` | エピソード基本情報と本編ログ |
| `episodes/{season}/{episode}/{section}.md` | `/episodes/{season}/{episode}/log` | 任意ログセクション |
| `gallery/*.md` | `/gallery` | ギャラリー |
| `movies/*.md` | `/movies` | 動画 |
| `goods/*.md` | `/goods` | 物販 |
| `settings/{character}/index.md` | `/others/settings/{character}` | 設定資料のキャラクター定義 |
| `settings/{character}/{number}.md` | `/others/settings/{character}` | 設定資料 |
| `fanart/*.md` | `/others/fanart` | fan art リンク |

## Templates

追加時は、各ディレクトリの `_template` や `_template.md.example` をコピーして使います。

| テンプレート | 用途 |
| --- | --- |
| `characters/_template.md.example` | キャラクター追加 |
| `episodes/_template/*.md.example` | episode ログ追加 |
| `gallery/_template.md.example` | ギャラリー追加 |
| `goods/_template.md.example` | 物販追加 |
| `movies/_template.md.example` | 動画追加 |
| `news/_template-*.md.example` | お知らせ追加 |
| `settings/_template/` | 設定資料キャラクター・資料追加 |
| `fanart/_template.md.example` | fan art リンク追加 |

## Episodes

エピソード追加時は `episodes/{season}/{episode}/main.md` を作ります。`main.md` は必須で、frontmatter に一覧・詳細・タイムライン用の情報を書き、本文にはログ本編を書けます。

- `season` は `season1` のような文字列ではなく数値で指定する。
- `session.type` は `normal` / `another` / `deleted` の3種類。
- `session.storyDate` は作中日付。
- `session.timelineCast` はタイムライン表示用、`session.cast` はログ詳細表示用。
- 年齢制限フラグは `session.rating.isR18` / `session.rating.isR18G`。
- 概要文は `scenario.description`。
- 表示系フラグは `custom.showSmallTitle` と `custom.isCompactDescription`。

任意ログセクションとして、`prologue.md`、`epilogue.md`、`background.md`、`omake.md` を追加できます。使えるセクション名は `src/lib/episodes/index.ts` の `allowedLogSections` と揃えます。

対応する画像は `public/images/episodes/{season}/{episode}/` に置きます。命名は `public/images/episodes/README.md` を参照してください。

## Characters

キャラクターは `characters/{slug}.md` で管理します。表示順は `order` です。詳細ページ URL と画像ディレクトリは、この `{slug}` を使います。

```text
src/content/characters/chiaki.md
public/images/characters/chiaki/portrait.png
public/images/characters/chiaki/standing.png
```

画像パスは `src/lib/characters.ts` の helper が組み立てます。

## Gallery / Goods / Movies

`gallery`、`goods`、`movies` は数字で始まるファイル名で管理します。並び替えや番号整理は、まず dry-run で確認します。

```bash
npm run renumber-content:dry -- --type gallery
npm run renumber-content -- --type gallery
```

`gallery` と `goods` は対応する画像ディレクトリも同じ番号にします。

```text
src/content/gallery/1.md
public/images/gallery/1/
```

`gallery` の WebP は `npm run optimize-gallery`、または `npm run build` の `prebuild` で生成されます。

## Settings / Fanart

設定資料は `settings/{character}/index.md` でキャラクターを定義し、`settings/{character}/{number}.md` に各資料を書きます。画像は `public/images/settings/{character}/{number}/` に置きます。

fan art は `fanart/{number}.md` にリンク情報を書きます。表示ページは `/others/fanart` です。

## 注意

- `_` で始まるテンプレートや作業用ファイルは、表示対象や連番整理の対象外にしています。
- Content に書く URL は、外部リンクなら完全な URL、内部リンクなら表示側の helper で base path を通す形にします。
- 画面に出る固定ラベルは `src/msg/`、ナビゲーションやタブ定義は `src/data/` を優先してください。
