import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "dist/index.html", dest: "", rename: "404.html" },
        { src: "dist/index.html", dest: "", rename: "about.html" },
      ],
    }),
  ],
});
