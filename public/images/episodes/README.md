# public/images/episodes/

エピソード画像を置くフォルダです。

## ファイル命名（推奨）

| 用途 | 例 |
|---|---|
| 一覧カード右側の概要画像 | `s1-00-summary.jpg` |
| 詳細パネルの大きい画像 | `s1-00-thumbnail.jpg` |
| 別史エピソードの概要画像 | `s1-negai-summary.jpg` |
| 別史エピソードの詳細画像 | `s1-negai-thumbnail.jpg` |

ファイル名は自由ですが、`src/data/episodes.ts` の `summaryImage` / `thumbnailImage` と一致させてください。

## 推奨サイズ

- summary　：800×400px 前後、横長 or 正方形（カードの右半分に薄く敷く）
- thumbnail：1280×720px 前後、16:9

画像未配置の時は 404 になりますが、レイアウトは崩れません。
