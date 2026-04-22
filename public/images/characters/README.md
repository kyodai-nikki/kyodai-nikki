# public/images/characters/

キャラクターの画像を置くフォルダです。

## 必要なファイル

現在 `src/data/characters.ts` に登録されている 4 キャラ分：

| slug | 一覧サムネ（縦長） | 詳細ページ立ち絵（透過 PNG 推奨） |
|---|---|---|
| chiaki | `chiaki-portrait.jpg` | `chiaki-standing.png` |
| chifuyu | `chifuyu-portrait.jpg` | `chifuyu-standing.png` |
| akito | `akito-portrait.jpg` | `akito-standing.png` |
| kujo | `kujo-portrait.jpg` | `kujo-standing.png` |

## 推奨サイズ

- portrait：縦長（例：480×1200 程度）、JPG / WEBP
- standing：高さ 800〜1200px、背景透過 PNG

ファイル名を変えたい場合は `src/data/characters.ts` の `portrait` / `standing` のパスを合わせて書き換えてください。
