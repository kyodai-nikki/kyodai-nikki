# src/

Astro のページ、コンポーネント、表示データを組み立てるアプリケーション本体です。

## 役割

| ディレクトリ / ファイル | 役割 |
| --- | --- |
| `content.config.ts` | Content Collections のスキーマ定義 |
| `content/` | サイトに載せる本文・一覧データ。編集手順は `content/README.md` |
| `components/` | ページから使う Astro コンポーネント |
| `data/` | ナビゲーションなど、Markdown ではない固定データ |
| `layouts/` | 全ページ共通の HTML 骨格とグローバル CSS 読み込み |
| `lib/` | Content の取得、URL 生成、表示用データ整形 |
| `msg/` | 画面表示文言、ラベル、アクセシビリティ文言 |
| `pages/` | Astro のファイルベースルーティング |

## 編集の目安

- 本文や追加コンテンツは、まず `content/` を見る。
- 画面に出る固定文言は `msg/` に寄せる。
- 表示順やタブ定義のような固定データは `data/` に置く。
- Content Collection の取得やパス組み立ては `lib/` に置く。
- ページ固有の構成は `pages/`、再利用する見た目は `components/` に分ける。

## パス

公開先に base path が付くことがあるため、ページ内の `href` や `src` は最終的に `lib/urls.ts` の `withBase()` を通してください。
CSS で画像 URL が必要な場合は、Astro 側で `withBase()` 済みの値を CSS カスタムプロパティとして渡します。
