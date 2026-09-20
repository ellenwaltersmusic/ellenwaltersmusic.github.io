import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "./render.mts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../..");

const contentDir = join(root, "src/content");
const distDir = join(root, "dist");
const templatePath = join(distDir, "index.html");

const template = readFileSync(templatePath, "utf-8");

function routeForFile(filename: string) {
  const name = filename.replace(/\.md$/, "");
  return name === "index" ? "/" : `/${name}`;
}

function outPathForRoute(route: string) {
  if (route === "/") return join(distDir, "index.html");
  if (route === "/404") return join(distDir, "404.html");
  return join(distDir, `${route.slice(1)}.html`);
}

async function main() {
  const files = readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  console.log();
  for (const file of files) {
    const route = file === "404.md" ? "/404" : routeForFile(file);
    const markdown = readFileSync(join(contentDir, file), "utf-8");
    const output = await renderPage(template, markdown, route);

    const outPath = outPathForRoute(route);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, output);
    console.log(`rendered ${route}`);
  }
  console.log("✓ rendering complete");
}

main();
