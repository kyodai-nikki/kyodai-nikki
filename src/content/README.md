# Content Editing Guide

サイト上の表示データは、基本的に `src/content/` 配下の Markdown を編集します。

## 主なファイル

| ファイル | ページ | 役割 |
|---|---|---|
| `common/common.md` | 全ページ | サイト名・SNS URL など |
| `home/home.md` | `/` | トップページ |
| `news/*.md` | `/news` | お知らせ |
| `introduction/index.md` | `/introduction` | あらすじ |
| `characters/*.md` | `/characters` | キャラクター |
| `episode-seasons/*.md` | `/episodes` | シーズン定義 |
| `episodes/{season}/{episode}/main.md` | `/episodes/seasonN/N` | エピソード基本情報と本編ログ |
| `episodes/{season}/{episode}/{section}.md` | `/episodes/seasonN/N/log` | 任意ログセクション |
| `gallery/*.md` | `/gallery` | ギャラリー |
| `movies/*.md` | `/movies` | 動画 |
| `goods/*.md` | `/goods` | 物販 |
| `others/sections/*.md` | `/others` | Others タブ |
| `others/settings/*.md` | `/others/settings/{character}` | 設定資料 |
| `others/fanart/*.md` | `/others/fanart` | fan art リンク |

## Episodes

エピソード追加時は `episodes/{season}/{episode}/main.md` を作ります。`main.md` は必須で、frontmatter に一覧・詳細・タイムライン用の情報を書き、本文にはログ本編を書けます。
`season` は `season1` のような文字列ではなく数値で指定します。エピソード情報は `session` / `scenario` / `custom` に分けて管理します。
`session.type` は `normal` / `another` / `deleted` の3種類です。`session.storyDate` は作中日付、`session.timelineCast` はタイムライン表示用の配列、`session.cast` はログ表示用の配列です。年齢制限フラグ (`isR18` / `isR18G`) は `session.rating` 配下で管理します。概要文は `scenario.description`、表示系フラグは `custom.showSmallTitle` と `custom.isCompactDescription` を使います。

任意で `prologue.md`、`epilogue.md`、`background.md`、`omake.md` 
