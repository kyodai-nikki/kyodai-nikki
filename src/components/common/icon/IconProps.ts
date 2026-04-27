/**
 * 全 Icon コンポーネント（XIcon, ChevronUpIcon, ...）が共通で受け取る Props。
 * Icon.astro 経由ではなく直接アイコンコンポーネントを使う場合もこの型を参照する。
 *
 * - size は数値ではなく CSS 長さ（"24px" 等）に統一する
 *   （Icon.astro 側で number → "{n}px" に正規化してから渡している）
 */
export interface IconProps {
  size?: string;
  class?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-label"?: string;
}
