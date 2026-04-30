# styles/

全ページで共有する素の CSS を置きます。`src/layouts/BaseLayout.astro` から読み込まれます。

## ファイル

| ファイル | 役割 |
| --- | --- |
| `variables.css` | 色、フォント、幅、余白、ブレークポイントなどの共有トークン |
| `globals.css` | reset、基本タイポグラフィ、ページ土台、共通 utility |

## 方針

- 共有値は `variables.css` の CSS 変数に寄せる。
- ページ全体の土台や reset は `globals.css` に置く。
- コンポーネント固有の見た目は、各 `.astro` コンポーネント内の `<style>` に置く。
- レスポンシブは既存の `@media (--bp-tablet)` と `@media (--bp-mobile)` を使う。
- 全体の背景画像は `BaseLayout.astro` で `withBase("/images/bg.png")` を解決し、`main` の `--page-shell-bg-image` として渡す。

## 背景画像

メイン背景は `public/images/bg.png` を使います。デザイン変更でない限り、次の指定は維持します。

```css
background-position: center top;
background-size: 1920px;
```
