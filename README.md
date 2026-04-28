# 兄弟日記

TRPG セッションログのアーカイブ。Astro v5 + Content Collections で構築。

- 公開先: `https://kyodai-nikki.github.io/kyodai/`
- スタイル: 素のCSS + CSS変数（プリプロセッサ・CSSフレームワーク不使用）
- コンテンツ: `src/content/` 配下の markdown

## 構成

```text
kyodai-nikki/
├── astro.config.mjs              # Astro 設定（site / trailingSlash / markdown など）
├── package.json
├── tsconfig.json
├── public/                        # そのまま配信される静的ファイル
│   ├── favicon.svg
│   └── images/
│       ├── characters/            # キャラクター画像
│       ├── episodes/              # エピソード画像（episode-list.png / thumbnail.png）
│       ├── gallery/               # ギャラリー画像
│       ├── goods/                 # 物販画像
│       ├── home/                  # トップ画像
│       └── others/                # Others 用画像
├── styles/                        # 素のCSS。BaseLayout 経由で全ページにimport
│   ├── variables.css              # デザイントークン（色・タイポ・余白）
│   ├── globals.css                # reset・基本タイポ・utility
│   └── components/
│       ├── header.css
│       ├── footer.css
│       ├── tabs.css
│       └── session-log.css        # TRPGログ本文の装飾
├── src/
│   ├── assets/                    # Astro image 最適化対象（使うときに配置）
│   ├── content.config.ts          # Content Collection スキーマ定義
│   ├── content/                   # サイト表示データ（編集対象）
│   │   ├── README.md              # content 編集ガイド
│   │   ├── common/                # サイト名・SNS URL など共通設定
│   │   ├── home/                  # トップページ
│   │   ├── news/                  # お知らせ
│   │   ├── introduction/          # あらすじ
│   │   ├── characters/            # キャラクター
│   │   ├── episode-seasons/       # シーズン定義
│   │   ├── episodes/              # エピソード基本情報 + ログ本文
│   │   │   └── season1/
│   │   │       └── 1/
│   │   │           ├── main.md    # 必須。基本情報 + 本編ログ
│   │   │           ├── prologue.md
│   │   │           ├── epilogue.md
│   │   │           └── background.md
│   │   ├── gallery/               # ギャラリー
│   │   ├── movies/                # 動画
│   │   ├── goods/                 # 物販
│   │   └── others/                # Others タブ・設定資料・fan art
│   ├── components/
│   │   ├── common/                # Header / Footer / Tabs / Modal など
│   │   ├── episodes/              # エピソード一覧・ログ表示
│   │   └── others/                # Others タブ
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML骨格、全CSSのimport、OGP
│   ├── lib/
│   │   └── episodes/              # エピソード content の読み込み helper
│   ├── msg/                       # 表示文言
│   └── pages/
│       ├── index.astro            # トップページ
│       ├── 404.astro
│       ├── news/
│       ├── introduction/
│       ├── characters/
│       ├── episodes/
│       ├── gallery/
│       ├── movies/
│       ├── goods/
│       └── others/
└── .github/workflows/deploy.yml   # GitHub Pages デプロイ
```

## コマンド

| コマンド          | 内容                                  |
| :---------------- | :------------------------------------ |
| `npm install`     | 依存をインストール                    |
| `npm run dev`     | `localhost:4321/kyodai/` でプレビュー |
| `npm run build`   | `dist/` に静的ファイルを出力          |
| `npm run preview`    | ビルド後の静的サイトを確認                                              |
| `npm run replace-br` | `src/content/episodes/` 配下の MD の `<br>` を改行に一括置換（`scripts/replace-br.mjs`） |

## コンテンツ編集

現在のサイトデータは `src/content/` 配下の Markdown で管理しています。News、Characters、Episodes、Gallery、Goods などの追加・編集方法は `src/content/README.md` を参照してください。

## デザイントークンの差し替え

全ページの見た目は `styles/variables.css` の CSS 変数で制御している。
既存 Studio サイトから色・フォント・余白値を抽出して置換すれば、
コンポーネントのコードを触らずデザインを追従できる。

## 公開パスの調整

公開先のパスは `astro.config.mjs` で調整します。

独自ドメインなど、ドメイン直下で公開する場合は `base` を指定しません。

```js
export default defineConfig({
  site: "https://kyodai-nikki.com",
});
```

GitHub Pages の project site のように `/kyodai/` 配下で公開する場合は、`base` を有効にします。

```js
export default defineConfig({
  site: "https://kyodai-nikki.github.io",
  base: "/kyodai",
});
```

## 環境構築

友達と一緒に触るときの初回セットアップ手順です。

### 必要なもの

- Git
- Node.js 20 LTS 以上を推奨
- npm

Node.js を入れると npm も一緒に入ります。バージョン確認は次のコマンドでできます。

```bash
node -v
npm -v
```

### 初回セットアップ

リポジトリを取得します。

```bash
git clone <repository-url>
cd kyodai-nikki
```

依存パッケージを入れます。`package-lock.json` に合わせるため、共同作業では `npm ci` 推奨です。

```bash
npm ci
```

`npm ci` によって `prepare` script も実行され、`.githooks` が Git hook として設定されます。

### 開発サーバー

ローカルで確認する場合は dev server を起動します。

```bash
npm run dev
```

起動後、ブラウザで次を開きます。

```text
http://localhost:4321/
```

`astro.config.mjs` で `base: "/kyodai"` を有効にしている場合は、次の URL で確認します。

```text
http://localhost:4321/kyodai/
```

### ビルド確認

公開前や大きめの変更後は build を確認します。

```bash
npm run build
```

`npm run build` の前には `prebuild` が自動で走ります。

```text
npm run replace-br
npm run optimize-gallery
```

つまり、episode ログ内の `<br>` 置換と gallery 画像の WebP 生成は build 時に自動実行されます。

### プレビュー

build 後の `dist/` をローカルで確認する場合は preview を使います。

```bash
npm run preview
```

### コンテンツ編集

表示データは主に `src/content/` 配下の Markdown で管理します。

- episode: `src/content/episodes/season*/N/`
- gallery: `src/content/gallery/N.md`
- movies: `src/content/movies/N.md`
- goods: `src/content/goods/N.md`

連番の整理は dry-run で確認してから実行します。

```bash
npm run renumber-content:dry -- --type movies
npm run renumber-content -- --type movies
```

`renumber-content` の詳細は `scripts/README.md` を参照してください。

### Windows で npm が止まる場合

PowerShell で `npm.ps1` の実行が止まる場合は、次のどちらかで対応できます。

```powershell
npm.cmd run dev
npm.cmd run build
```

または、CurrentUser の実行ポリシーを変更します。

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### よく使うコマンド

| command | 内容 |
| --- | --- |
| `npm ci` | 依存パッケージを lockfile 通りにインストール |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 静的サイトを生成 |
| `npm run preview` | build 後のサイトを確認 |
| `npm run replace-br:dry` | episode ログの `<br>` 置換予定を確認 |
| `npm run renumber-content:dry -- --type <type>` | 連番リネーム予定を確認 |
