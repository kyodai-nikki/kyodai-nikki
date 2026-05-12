# カラー変数整理プラン

## 目的

ボタンコンポーネントで行ったように、各コンポーネントが直接 `--c-fg` や他コンポーネント用の色変数を参照する状態を減らす。

基本配色はサイト全体で黒・白を共通利用しつつ、あとからコンポーネント単位で色を変えられるようにする。

## 方針

### 1. 色参照を分類する

対象ファイル内の色参照を以下に分類する。

- 直書き色
  - `#...`
  - `rgb()`
  - `rgba()`
  - `color-mix()`
- 汎用semantic参照
  - `--c-fg`
  - `--c-bg`
  - `--c-border`
  - `--c-site-pink`
  - `--c-site-cyan`
- 他コンポーネント用token参照
  - 例: ボタン以外が `--c-btn-*` を参照している
  - 例: Modal以外が `--c-modal-*` を参照している
- 既にコンポーネント専用になっている参照
  - `--c-modal-bg`
  - `--c-back-to-top-bg`
  - `--c-sticky-note-tab-bg` など

### 2. 命名ルール

#### 実色

実際のカラーコードは `--bc-*` に集約する。

例:

```css
--bc-black: #333333;
--bc-white: #ffffff;
--bc-pink: #e86a8b;
--bc-cyan: #00bcd4;
```

#### サイト汎用semantic

サイト全体の基本色は `--c-*` として残す。

例:

```css
--c-bg: var(--bc-white);
--c-fg: var(--bc-black);
--c-border: var(--bc-black);
--c-site-pink: var(--bc-pink);
--c-site-cyan: var(--bc-cyan);
```

#### コンポーネント公開token

コンポーネント単位で外から上書きしたい色は `--c-<component>-<role>` とする。

例:

```css
--c-modal-bg: var(--c-bg);
--c-tabs-border: var(--c-fg);
--c-tabs-active-border: var(--c-site-pink);
--c-back-to-top-bg: rgb(from var(--bc-gray) r g b / 0.96);
```

#### コンポーネント内部token

コンポーネントCSS本体では、なるべく `--c-*` を直接参照せず、内部tokenを見る。

例:

```css
.modal {
  --modal-bg: var(--c-modal-bg);
  --modal-border-color: var(--c-modal-border);

  background: var(--modal-bg);
  border-color: var(--modal-border-color);
}
```

この形にすると、サイト全体の初期値は `styles/variables.css` にありつつ、特定箇所だけ親から `--modal-bg` を上書きできる。

## 実装順

### 1. 共通コンポーネントから対応する

優先対象:

- `Button`
- `Badge`
- `Tabs`
- `Modal`
- `MediaModal`
- `BackToTop`
- `WhiteCard`
- `ImageCardFrame`
- `Header`
- `Footer`
- `NavDrawer`
- `SiteNavDrawer`
- `StickyNoteNav`

作業内容:

- コンポーネント内に `--<component>-<role>` を定義する
- 初期値は `--c-<component>-<role>` または汎用semanticから参照する
- CSS本体は内部tokenだけを見る
- 直書き色をなくす
- 他コンポーネント用token参照をなくす

### 2. feature系コンポーネントに広げる

対象:

- `EpisodeList`
- `EpisodeDetail`
- `LogBody`
- `LogScenarioInfo`
- `LogFooter`
- `CharacterStats`
- `CharacterQuote`
- `CharacterExternalLinks`

作業内容:

- `--c-fg`, `--c-bg`, `--c-border` を直接見ている箇所を確認する
- コンポーネント単位で変えられそうなものは内部token化する
- 例:
  - `--episode-list-fg`
  - `--episode-list-bg`
  - `--episode-list-border`
  - `--log-body-fg`
  - `--character-stats-border`

## NG方針

- コンポーネントAがコンポーネントB用のtokenを見るのは避ける
  - 例: `Tabs` が `--c-btn-*` を見るのはNG
- コンポーネントCSS本体が毎回 `--c-fg` や `--c-bg` を直接見る状態はなるべく減らす
- ただし、完全禁止ではない
  - グローバル基礎スタイル
  - `body`
  - `main`
  - `prose`
  - 汎用的なテキスト基盤
  - 本当にコンポーネント固有化する意味が薄い箇所
  は `--c-fg` / `--c-bg` 参照のままでよい

## 既知の確認ポイント

ボタン周りで以下を確認する。

- `ui-button--white` 内に古い指定と新しい指定が重複していないか
- `--c-white-btn-hover-bg: var(--c-white-btn-hover-bg);` のような自己参照tokenが残っていないか
- hover関連tokenが、現在のhover削除方針と矛盾していないか

また、`styles/initial.css` に古い `--c-base-black` 参照が残っている可能性があるため確認する。

## 確認コマンド

```powershell
rg -n -e "#[0-9a-fA-F]{3,8}|rgba?\(|color-mix\(" src/components styles -g "*.astro" -g "*.css"
```

```powershell
rg -n -e "--c-btn|--c-modal|--c-tabs|--c-back-to-top|--c-sticky-note|--c-nav" src/components -g "*.astro" -g "*.css"
```

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; & 'C:\Users\PC_User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\astro\astro.js build
```

## ゴール

- 直書き色が基本的に `styles/variables.css` に集約されている
- 各コンポーネントが自分用の内部tokenを参照している
- 他コンポーネント用tokenへの依存がない
- サイト全体の黒・白は共通のまま
- 必要になった時に、コンポーネント単位で色だけ差し替えられる
