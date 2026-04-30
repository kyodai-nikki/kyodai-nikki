# public/images/characters/

キャラクターの画像を置くフォルダです。

## 概要

`src/content/characters/{slug}.md` に対応する画像を置く場所です。画像パスは `src/lib/characters.ts` の helper が組み立てます。

| slug    | 一覧サムネ（縦長） | 詳細ページ立ち絵（透過 PNG 推奨） |
| ------- | ------------------ | --------------------------------- |
| chiaki  | `portrait.png`     | `standing.png`                    |
| chifuyu | `portrait.png`     | `standing.png`                    |
| akito   | `portrait.png`     | `standing.png`                    |
| kujo    | `portrait.png`     | `standing.png`                    |

## 推奨サイズ

- portrait：縦長（例：480×1200 程度）、PNG
- standing：高さ 800〜1200px、背景透過 PNG

ファイル名を変えたい場合は `src/lib/characters.ts` の `characterPortraitSrc` / `characterStandingSrc` のパスを合わせて書き換えてください。
