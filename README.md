# 兄弟日記

TRPG セッションログのアーカイブ。Astro v5 + Content Collections で構築。

- 公開先: `https://kyodai-nikki.github.io/kyodai/`
- スタイル: 素のCSS + CSS変数（プリプロセッサ・CSSフレームワーク不使用）
- コンテンツ: `src/content/` 配下の markdown

## 構成

```text
kyodai-nikki/
├── astro.config.mjs              # base: "/kyodai" に設定
├── package.json
├── tsconfig.json
├── public/                        # そのまま配信される静的ファイル
│   ├── favicon.svg
│   └── images/
├── styles/                        # 素のCSS。Layout 経由で全ページにimport
│   ├── variables.css              # デザイントークン（色・タイポ・余白）
│   ├── globals.css                # reset・基本タイポ・utility
│   └── components/
│       ├── header.css
│       ├── footer.css
│       ├── card.css
│       └── session-log.css        # TRPGログ本文の装飾
├── src/
│   ├── assets/                    # Astro image 最適化対象（使うときに配置）
│   ├── content.config.ts          # Content Collection スキーマ定義
│   ├── content/
│   │   ├── campaigns/             # キャンペーンのメタ情報 markdown
│   │   │   └── <slug>.md
│   │   └── sessions/              # セッションログ本体
│   │       └── <campaign-slug>/
│   │           └── <session-slug>.md
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CampaignCard.astro
│   │   └── SessionCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML骨格、全CSSのimport、OGP
│   └── pages/
│       ├── index.astro            # 最新ログ + キャンペーン一覧
│       ├── about.astro
│       ├── 404.astro
│       └── campaigns/
│           ├── index.astro        # 全キャンペーン
│           └── [slug]/
│               ├── index.astro    # キャンペーン詳細 + セッション一覧
│               └── sessions/
│                   └── [session].astro   # 個別セッションログ
└── .github/workflows/deploy.yml   # GitHub Pages デプロイ
```

## コマンド

| コマンド | 内容 |
| :-- | :-- |
| `npm install` | 依存をインストール |
| `npm run dev` | `localhost:4321/kyodai/` でプレビュー |
| `npm run build` | `dist/` に静的ファイルを出力 |
| `npm run preview` | ビルド後の静的サイトを確認 |

## 新しいセッションを追加する

1. `src/content/sessions/<キャンペーンslug>/<セッションslug>.md` を作成
2. frontmatter に必須項目を記入

   ```yaml
   ---
   title: プロローグ — ゴブリンの待ち伏せ
   sessionNumber: 1
   date: 2025-08-12
   duration: 約4時間
   players: [ティル, レン]
   summary: 街道を進む冒険者たちはゴブリンの襲撃に遭う。
   ---
   ```

3. 本文は markdown で書く。TRPGログ向けの装飾は以下のHTMLを混ぜる：

   ```html
   <section class="scene" data-time="昼下がり" data-place="街道沿いの林">
     <p class="narr">森は静まり返っている。</p>
     <p class="line" data-speaker="ティル">警戒して近づくわ。</p>
     <p class="roll" data-pc="ティル" data-check="知覚">1d20+4 → 17</p>
   </section>
   ```

   使えるクラス:
   - `.scene` / `data-time` / `data-place` — シーン区切り
   - `.narr` — 地の文（ナレーション）
   - `.line` / `data-speaker` — 発話
   - `.roll` / `data-pc` / `data-check` — ダイスロール
   - `.roll.roll--fail` — ファンブル系

4. `npm run build` → `git push` で自動デプロイ。

## 新しいキャンペーンを追加する

1. `src/content/campaigns/<slug>.md` を作成（frontmatter のスキーマは `src/content.config.ts` 参照）
2. 同名ディレクトリ `src/content/sessions/<slug>/` を作ってセッションを置いていく

## デザイントークンの差し替え

全ページの見た目は `styles/variables.css` の CSS 変数で制御している。
既存 Studio サイトから色・フォント・余白値を抽出して置換すれば、
コンポーネントのコードを触らずデザインを追従できる。

## 公開パスの調整

`astro.config.mjs` の `base` がサブパス。
`kyodai-nikki.github.io` 直下で公開したい場合は `base` を削除する。

## デプロイ

`.github/workflows/deploy.yml` により `master` への push で自動デプロイ。
`withastro/action@v5` を使っており、package-lock.json からパッケージマネージャを自動判定する。
