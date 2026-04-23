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

任意で `prologue.md`、`epilogue.md`、`background.md`、`omake.md` を同じディレクトリに置くと、ログページにセクションとして表示されます。本文が空のセクションは表示されません。

画像は `public/images/episodes/{season}/{episode}/summary.png` と `detail.png` に置きます。

`seasonAllNumber` は自動計算なので書かなくて OK です。

## News

テンプレートは `news/_template-episode.md.example`、`news/_template-page.md.example`、`news/_template-custom.md.example` を使います。

ファイル名は `YYYYMMDD-slug.md` 形式にすると管理しやすいです。
