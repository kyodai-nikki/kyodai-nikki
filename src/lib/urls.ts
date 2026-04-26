export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// サイトの base path を考慮した絶対パスを作る。
export const withBase = (path: string): string =>
  `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
