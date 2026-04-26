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

`astro.co