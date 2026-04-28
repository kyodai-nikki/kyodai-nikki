# Scripts

運用補助用の Node.js スクリプトを置いています。

## 一覧

| script | npm script | 用途 |
| --- | --- | --- |
| `replace-br.mjs` | `replace-br`, `replace-br:dry` | episode ログ本文内の `<br>` タグを改行に置換 |
| `optimize-gallery.mjs` | `optimize-gallery` | gallery 画像から表示用 WebP を生成 |
| `renumber-content.mjs` | `renumber-content`, `renumber-content:dry` | 連番管理している content と画像ディレクトリをリネーム |
| `_check_heights.mjs` | なし | home 画像の寸法確認用の一時補助スクリプト |

`prebuild` では `replace-br` と `optimize-gallery` が自動実行されます。

```bash
npm run build
```

## replace-br.mjs

`src/content/episodes/season*` 配下の Markdown に含まれる `<br>` / `<br/>` / `<br />` を、通常の改行に置換します。

### 使い方

```bash
npm run replace-br:dry
npm run replace-br
```

Node で直接実行する場合:

```bash
node scripts/replace-br.mjs --dry-run
node scripts/replace-br.mjs
```

### 仕様

- 対象は `src/content/episodes/**/*.md` です。
- `--dry-run` では変更予定だけを表示し、ファイルは書き換えません。
- `npm run build` 前の `prebuild` でも実行されます。

## optimize-gallery.mjs

`public/images/gallery/<id>/` 配下の元画像から、一覧・モーダル表示用の WebP 画像を生成します。

### 使い方

```bash
npm run optimize-gallery
```

Node で直接実行する場合:

```bash
node scripts/optimize-gallery.mjs
```

### 生成物

| file | 用途 |
| --- | --- |
| `thumbnail.webp` | gallery 一覧カード用 |
| `<name>.medium.webp` | モーダル表示用 |
| `<name>.large.webp` | 高解像度表示・srcset 用 |

### 仕様

- 対象の元画像は `.png` / `.jpg` / `.jpeg` です。
- 既に生成済みで、元画像より新しい WebP はスキップします。
- `thumbnail.png` など、ファイル名が `thumbnail` の画像があれば一覧サムネイルの元画像として使います。
- `thumbnail` がない場合は、最初の元画像をサムネイル元として使います。
- `npm run build` 前の `prebuild` でも実行されます。

## renumber-content.mjs

連番で管理している content と、それに紐づく画像ディレクトリを並び替えるスクリプトです。

### 使い方

まずは dry-run で変更予定を確認します。

```bash
npm run renumber-content:dry -- --type episodes
```

問題なければ実行します。

```bash
npm run renumber-content -- --type episodes
```

`npm` が PowerShell の実行ポリシーや nvm まわりで止まる場合は、Node で直接実行できます。

```bash
node scripts/renumber-content.mjs --type episodes --dry-run
node scripts/renumber-content.mjs --type episodes
```

### type

| type | 対象 |
| --- | --- |
| `episodes` | `src/content/episodes/season*/N` と `public/images/episodes/season*/N` |
| `gallery` | `src/content/gallery/N.md` と `public/images/gallery/N` |
| `goods` | `src/content/goods/N.md` と `public/images/goods/N` |
| `movies` | `src/content/movies/N.md` |
| `all` | 上記すべて |

複数指定もできます。

```bash
node scripts/renumber-content.mjs --type gallery,movies --dry-run
```

### 仕様

- `_template.md.example` のような `_` で始まるファイルは対象外です。
- 数字で始まるファイル名・ディレクトリ名を対象にします。
- `4test.md` や `4test` のような仮名も対象です。
- 既存の並びを自然順で読み取り、`1` から連番にします。
- リネームは一度テンポラリ名に退避してから戻すため、`1 -> 2` のような衝突を避けられます。
- `gallery` / `movies` の表示順はファイル名から自動算出するため、frontmatter の `order` は使いません。

### 例

`src/content/gallery` が次の状態の場合:

```text
1.md
3.md
10.md
```

`--type gallery` を実行すると次のようになります。

```text
1.md
2.md
3.md
```

`public/images/gallery/3` や `public/images/gallery/10` があれば、content と同じ番号にリネームされます。

## _check_heights.mjs

`public/images/home` 配下の画像サイズを確認するための補助スクリプトです。

### 使い方

```bash
node scripts/_check_heights.mjs
```

### 仕様

- 対象は `public/images/home` の `.png` / `.jpg` / `.jpeg` / `.webp` / `.svg` です。
- 各画像の `width` / `height` を JSON で出力します。
- 最後に最大 height と、その 80% の値を出力します。
- npm script には登録していません。必要なときだけ直接実行します。
