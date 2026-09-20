import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderPage } from "./render.mts";

export function prerenderPlugin(contentDir: string): Plugin {
  return {
    name: "md-prerender-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const route =
          req.url === "/" ? "/" : (req.url?.replace(/\/$/, "") ?? "");
        const file = route === "/" ? "index.md" : `${route.slice(1)}.md`;
        let markdown: string;
        try {
          markdown = readFileSync(join(contentDir, file), "utf-8");
        } catch {
          return next();
        }

        const rawTemplate = readFileSync(
          join(server.config.root, "index.html"),
          "utf-8",
        );
        const template = await server.transformIndexHtml(req.url!, rawTemplate);

        const html = await renderPage(template, markdown, route);
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      });
    },
  };
}
