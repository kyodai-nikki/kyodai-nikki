# src/msg/

画面に表示する固定文言、ボタンラベル、アクセシビリティ文言を置きます。

## 方針

- 複数箇所で使う文言は `common.ts` に置く。
- 特定ページだけで使う文言は、ページ名ごとのファイルに置く。
- 画面に出る文言を `pages/` や `components/` に直書きし続けない。
- Content として編集したい本文や説明文は `src/content/` に置く。

## ファイルの目安

| ファイル | 主な用途 |
| --- | --- |
| `common.ts` | 共通ボタン、SNS共有、バッジ、アクセシビリティ文言 |
| `home.ts` | トップページ |
| `news.ts` | News |
| `introduction.ts` | Introduction |
| `characters.ts` | Characters |
| `episodes.ts` | Episodes |
| `gallery.ts` | Gallery |
| `movies.ts` | Movies |
| `goods.ts` | Goods |
| `others.ts` | Others |
| `notFound.ts` | 404 |

文言に値を埋め込む必要がある場合は、既存の `commonMsg.actions.open(label)` のように小さな関数で定義します。
