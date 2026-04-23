// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kyodai-nikki.com",
  markdown: {
    syntaxHighlight: false,
  },
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
