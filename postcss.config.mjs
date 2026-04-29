// PostCSS 設定。
// postcss-custom-media を使って @media のブレークポイントを名前で参照できるようにする。
//
// サイト全体で使うブレークポイントは以下の3つに統一：
//   --bp-mobile : ～480px        （スマートフォン）
//   --bp-tablet : ～768px        （iPad 含むタブレット以下。モバイルもこの範囲に含まれる）
//   --bp-laptop : ～1024px       （横向きタブレット・小さめノートPC）
//   PC          : 1025px～       （メディアクエリ不要、デフォルトのスタイルで対応）
//
// 各 .astro / .css 内では `@media (--bp-mobile) { ... }` のように参照する。
// 同じ値を JS（matchMedia 等）からも使いたい場合は、`src/lib/breakpoints.mjs` から import する。

import postcssCustomMedia from "postcss-custom-media";
import { breakpoints } from "./src/lib/breakpoints.mjs";

/**
 * サイト全体のブレークポイント定義。
 * CSS（@custom-media 経由）と JS（matchMedia 等）の単一ソース。
 */
export { breakpoints };

const customMedia = {
  "--bp-mobile": `(max-width: ${breakpoints.mobile}px)`,
  "--bp-tablet": `(max-width: ${breakpoints.tablet}px)`,
  "--bp-laptop": `(max-width: ${breakpoints.laptop}px)`,
};

const injectCustomMedia = () => ({
  postcssPlugin: "inject-custom-media",
  Once(root) {
    [...Object.entries(customMedia)]
      .reverse()
      .forEach(([name, query]) => {
        root.prepend({
          name: "custom-media",
          params: `${name} ${query}`,
        });
      });
  },
});

injectCustomMedia.postcss = true;

export default {
  plugins: [
    injectCustomMedia(),
    postcssCustomMedia({
      preserve: false,
    }),
  ],
};
