// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
//
// `site` は絶対URL（canonical, OGP, sitemap 用）。
// `base`  はサブパス公開時のルート。今回はルート直下で公開するので未指定（= "/"）。
//   例: https://kyodai-nikki.com/ 直下に配信 → base 未設定でOK
//       もしサブパス（/kyodai など）で公開するなら base: "/kyodai" を追加する。
export default defineConfig({
  site: "https://kyodai-nikki.com",
  trailingSlash: "never",      // URL 末尾の "/" を付けない（/about 形式）
  build: {
    format: "file",            // 出力を about.html 形式に
  },
});
