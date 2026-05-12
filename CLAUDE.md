# Project Conventions

- Avoid using `:global()` from a parent component to force child component styling. Prefer explicit component props, CSS custom properties passed to the child root, or a small child-component API extension.
- Use `border-radius: var(--r-md)` for standard rounded UI corners unless an existing component pattern or token calls for a different radius.

## Before Editing Components

- Before styling a child component from a parent, check whether the target is the child component root or an internal element.
- If styling seems to require `:global()`, pause and first consider using or adding component props, passing CSS custom properties to the child root, adding a local wrapper, or making a small child-component API extension.
- Use `:global()` only for true global foundations, third-party markup, or documented escape hatches.

# CSS

## AGENTS.md / CLAUDE.md の同期

`AGENTS.md` または `CLAUDE.md` のいずれかを編集する場合、プロジェクト共通の方針は両方のファイルに同じ内容を反映すること。

## シェアボタンのスタイル責務について

シェアボタン（X・LINEなど）のホバーエフェクトや色・サイズに関するスタイルは、ボタンを使用する親コンポーネント側ではなく、各シェアボタンコンポーネント（XShareButton.astro・LineShareButton.astro など）の内部に定義すること。
親コンポーネントは .site-social a { ... } のような形でシェアボタンの見た目を直接上書きしない。カスタマイズが必要な場合は、CSS カスタムプロパティ（--share-btn-size など）を通じて行う。

## CSSで色定義を行う場合

`styles/variables.css` には、raw palette colors、共有 semantic roles、複数箇所で再利用・上書きされる component defaults を定義する。
1ページでしか使わない色 role は `variables.css` に昇格させず、そのページまたはコンポーネントの stylesheet 内に閉じること。
共通コンポーネントの色を変えたい場合は、ページ単位の上書きではなく、コンポーネント側で所有する CSS カスタムプロパティや props を通じて instance ごとにカスタマイズできるようにすること。

# コンポーネント設計方針

## 責務の分離

コンポーネントのスタイル・ロジック・デザインはそのコンポーネントファイル内に完結させること。親コンポーネントから子コンポーネントの内部実装（クラスや要素）を直接操作しない。カスタマイズが必要な場合は CSS カスタムプロパティや props を通じて行う。

## 共通パーツの切り出し

複数箇所で使われる、または使われる可能性のある UI 要素は積極的にコンポーネントとして切り出すこと。

## アイコンの扱い

アイコンを追加する場合は、原則として `src/components/common/icon/` 配下に単体の Astro コンポーネントを作成し、`src/components/common/icon/IconName.ts` と `src/components/common/Icon.astro` のマッピングに登録すること。
利用側では SVG path を直接埋め込まず、`Icon.astro` を経由して表示する。
単純な SVG アイコンを数点使うだけの場合は、外部 UI ライブラリや React 連携を追加せず、既存の Icon コンポーネント構成に寄せること。

## ファイルの配置

新規ファイルを作成する際は、プロジェクトのディレクトリ構成と各ディレクトリの責務を考慮し、適切な場所に配置すること。

## メッセージ・ラベルの定義

表示テキストやラベルは src/msg/ 配下に定義すること。特定のコンポーネントやページ内でのみ使用する文言はコンポーネントごとの msg ファイルに、複数箇所で共通して使用する汎用的な語句（「様」「円」など）は common ファイルに定義する。

## 影響範囲の最小化

将来の改修で不具合が生じないよう、ファイルの責務を明確に分け、修正の影響範囲が最小限になる設計を心がけること。

## パスの指定

「最終形 href / src を返す関数」はbase path込みで設定すること。
その際は共通関数であるwithBase()を利用すること。

## 検証・開発サーバー

Windows で Astro の開発サーバーを起動する場合、二重引用符で囲んだ PowerShell 文字列の中に `cmd.exe /c` の二重引用符をさらにネストすると失敗しやすい。引用符で失敗した場合は、`cmd.exe /c` のペイロード全体を PowerShell のシングルクォートで囲む。

```powershell
cmd.exe /c 'set ASTRO_TELEMETRY_DISABLED=1&& start "" /B "C:\Users\PC_User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "C:\Users\PC_User\Desktop\it\kyodai-nikki\node_modules\astro\astro.js" dev --host 127.0.0.1 --port 4321 > .astro-dev.out.log 2> .astro-dev.err.log'
```
