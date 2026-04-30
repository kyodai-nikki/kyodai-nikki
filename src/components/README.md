# src/components/

ページから呼び出す Astro コンポーネントを置きます。ページ固有のデータ取得はなるべく `pages/` や `lib/` に寄せ、ここでは受け取った値を表示する責務を中心にします。

## 構成

| ディレクトリ | 役割 |
| --- | --- |
| `common/` | Header、Footer、Tabs、Modal、Button、Icon などの共通部品 |
| `characters/` | キャラクター一覧・詳細で使う表示部品 |
| `episodes/` | エピソード一覧、シーズンナビ、ログ表示 |
| `gallery/` | ギャラリーモーダルなど |
| `goods/` | 物販モーダルなど |
| `others/` | Others 配下のタブ、設定資料表示 |

## 追加・編集の方針

- コンポーネント固有の CSS は、その `.astro` ファイル内に置く。
- 親から見た目を少し変えたい場合は、`class` prop や CSS カスタムプロパティを使う。
- 親コンポーネントから子コンポーネント内部の class を直接上書きしない。
- ページ内で何度も使う表示は `common/`、特定カテゴリ専用ならカテゴリ別ディレクトリに置く。
- 表示文言をコンポーネントに直書きし続けない。共有できる文言は `src/msg/` に移す。

## Icons

アイコンは `common/Icon.astro` 経由で使います。新しいアイコンを足す場合は、次の順で追加します。

1. `common/icon/` に単一用途の Astro コンポーネントを追加する。
2. `common/icon/IconName.ts` に名前を追加する。
3. `common/Icon.astro` のマッピングに登録する。

小さな SVG のために React integration や外部 UI ライブラリは追加しません。
