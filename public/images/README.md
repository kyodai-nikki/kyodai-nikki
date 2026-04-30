# public/images/

ビルド時に加工せず、そのまま配信される画像を置きます。URL では `public` を含めず、`/images/...` として参照します。

## 構成

| ディレクトリ | 用途 |
| --- | --- |
| `characters/` | キャラクターの一覧画像・立ち絵。詳細は `characters/README.md` |
| `episodes/` | エピソード一覧・詳細画像。詳細は `episodes/README.md` |
| `gallery/` | ギャラリー画像と生成済み WebP |
| `goods/` | 物販画像 |
| `home/` | トップページ画像 |
| `settings/` | Others の設定資料画像 |
| `fanart/` | fan art 関連画像 |
| `icons/` | SNS など、外部由来の画像アイコン |

## 参照のルール

- Astro / TypeScript 側で `src` を組み立てる場合は `withBase("/images/...")` を使う。
- CSS から参照したい画像は、Astro 側で `withBase()` 済みの値を CSS カスタムプロパティとして渡す。
- Content と対になる画像は、Markdown のファイル名や slug とディレクトリ名を揃える。
- `gallery` の WebP は `npm run optimize-gallery`、または `npm run build` の `prebuild` で生成される。

## 追加時の確認

- 実ファイルのディレクトリと、コードが参照する URL のディレクトリが一致しているか確認する。
- base path 付きの公開先でも壊れないように、先頭 `/images/...` の直書きだけで終わらせない。
