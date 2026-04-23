# public/images/characters/

キャラクターの画像を置くフォルダです。

## 概要

contents/characters/{fileName}.md の画像を置く場所

| slug    | 一覧サムネ（縦長） | 詳細ページ立ち絵（透過 PNG 推奨） |
| ------- | ------------------ | --------------------------------- |
| chiaki  | `portrait.jpg`     | `standing.png`                    |
| chifuyu | `portrait.jpg`     | `standing.png`                    |
| akito   | `portrait.jpg`     | `standing.png`                    |
| kujo    | `portrait.jpg`     | `standing.png`                    |

## 推奨サイズ

- portrait：縦長（例：480×1200 程度）、JPG / WEBP
- standing：高さ 800〜1200px、背景透過 PNG

ファイル名を変えたい場合は `src/data/characters.ts` の `portrait` / `standing` のパスを合わせて書き換えてください。
