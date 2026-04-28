// PostCSS 設定。
// postcss-custom-media を使って @media のブレークポイントを名前で参照できるようにする。
//
// サイト全体で使うブレークポイントは以下の3つに統一：
//   --bp-mobile : ～480px        （スマートフォン）
//   --bp-tablet : ～768px        （iPad 含むタブレット以下。モバイルもこの範囲に含まれる）
//   PC          : 769px～        （メディアクエリ不要、デフォルトのスタイルで対応）
//
// 各 .astro / .css 内では `@media (--bp-mobile) { ... }` のように参照する。
// 同じ値を JS（matchMedia 等）からも使いたい場合は、下の `breakpoints` を named import する。

import postcssCustomMedia from "postcss-custom-media";

/**
 * サイト全体のブレークポイント定義。
 * CSS（@custom-media 経由）と JS（matchMedia 等）の単一ソース。
 */
export const breakpoints = {
  mobile: 480,
  tablet: 768,
};

export default {
  plugins: [
    postcssCustomMedia({
      preserve: false,
      customMedia: {
        "--bp-mobile": `(max-width: ${breakpoints.mobile}px)`,
        "--bp-tablet": `(max-width: ${breakpoints.tablet}px)`,
      },
    }),
  ],
};
