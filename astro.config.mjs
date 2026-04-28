// @ts-check
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://kyodai-nikki.github.io",
  // base: "/kyodai",
  // site: "https://kyodai-nikki.com",
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
