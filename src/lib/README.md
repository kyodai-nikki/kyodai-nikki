# src/lib/

Content Collections の取得、URL 組み立て、表示用データへの変換を置く場所です。ページやコンポーネントから直接 Markdown の構造を触りすぎないようにするための層です。

## 構成

| ファイル / ディレクトリ | 役割 |
| --- | --- |
| `common.ts` | 汎用ソートなどの小さな共通処理 |
| `urls.ts` | base path 対応の URL ヘルパー |
| `characters.ts` | キャラクター collection と画像・詳細ページ URL |
| `episodes/` | エピソード collection、ログ、表示用変換 |
| `gallery.ts` / `goods.ts` / `movies.ts` / `news.ts` / `others.ts` | 各ページ向けの collection 取得 |
| `routes/` | ルーティングや static paths に近い補助処理 |
| `view/` | ページ表示用に整えたラベル、URL、表示モデル |
| `image-utils.ts` | 画像候補やフォールバックの補助 |
| `breakpoints.mjs` | CSS の custom media と共有するブレークポイント値 |

## 方針

- `href` / `src` を返す helper は、原則 `withBase()` 済みの値を返す。
- Content Collection の schema に依存する整形は、ページではなくここに寄せる。
- 表示順は `order` やファイル名など、既存のルールに合わせて helper で揃える。
- コンポーネント用に必要な形が複雑になったら、`view/` に表示モデルを作る。
