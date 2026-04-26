# public/images/episodes/

エピソード画像を置くフォルダです。各エピソードのサブフォルダ `season{n}/{n}/` 配下に `episode-list.png` と `thumbnail.png` の 2 枚を置きます。

## ファイル命名

| 用途 | ファイル名 |
|---|---|
| 一覧カード右側に薄く敷く画像 | `episode-list.png` |
| 概要パネルの大きい画像 | `thumbnail.png` |
| 一覧カードのダミー（フォールバック） | `dummy-episode-list.svg` |
| 概要パネルのダミー（フォールバック） | `dummy-thumbnail.svg` |

パス組み立ては `src/lib/episodes` の `episodeListImage` / `episodeThumbnailImage` が担います。

## 推奨サイズ

- episode-list：800×400px 前後、横長 or 正方形（カードの右半分に薄く敷く）
- thumbnail　：1280×720px 前後、16:9

画像未配置の時はダミー SVG にフォールバックします。
