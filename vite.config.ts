import { defineConfig } from "vite";
import { prerenderPlugin } from "./src/render/vite-plugin-prerender.mts";
import { join } from "node:path";

export default defineConfig({
  base: "/",
  plugins: [prerenderPlugin(join(__dirname, "src/content"))],
});
