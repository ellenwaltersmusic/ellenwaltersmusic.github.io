import { readdirSync } from "node:fs";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as rawPhotosJson from "../content/photos.json";
const photosJson = rawPhotosJson as Record<string, string>;

const __dirname = dirname(fileURLToPath(import.meta.url));
const photosDir = join(__dirname, "../../public/photos");

let photosCache: string[] | null = null;
function loadPhotos(): string[] {
  if (photosCache) return photosCache;
  photosCache = readdirSync(photosDir).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
  return photosCache;
}

export async function renderPage(
  template: string,
  markdown: string,
  route: string,
) {
  const html = await marked(markdown, { gfm: true, breaks: true });
  const dom = new JSDOM(template);
  const document = dom.window.document;

  const header = document.getElementById("hero-header");
  const subtitle = document.getElementById("hero-subtitle");
  const container = document.getElementById("content");
  const footer = document.querySelector("footer");

  const parts = html.split("<hr>");
  for (let i = 1; i < parts.length; i++) {
    const section = document.createElement("section");
    section.id = `section${i}`;
    const sectionContent = document.createElement("div");
    sectionContent.id = `section${i}-content`;
    sectionContent.innerHTML = parts[i];
    section.appendChild(sectionContent);
    if (container) container.appendChild(section);
  }

  const content = document.createElement("div");
  content.innerHTML = html;

  const h1 = content.querySelector("h1");
  if (h1 && header) header.textContent = h1.textContent;

  const h2 = content.querySelector("h2");
  if (h2 && subtitle) subtitle.textContent = h2.textContent;
  else if (subtitle) subtitle.remove();

  if (footer) footer.style.display = "block";

  const navId = route === "/" ? "home" : (route.slice(1) as string);
  const navEl = document.getElementById(navId);
  if (navEl) {
    navEl.classList.add("active");
    if (navEl.id != "home") document.title += ` - ${navEl.textContent}`;
  }

  const photoEl = document.getElementById("gallery");
  if (photoEl && route === "/photos") {
    const photos = loadPhotos();
    for (const photo of photos) {
      const container = document.createElement("div");
      container.className = "img-container";

      const img = document.createElement("img");
      img.src = `photos/${photo}`;

      if (photosJson[photo]) {
        const alt = document.createElement("span");
        alt.textContent = photosJson[photo];
        container.appendChild(alt);
      }

      container.appendChild(img);
      photoEl.appendChild(container);
    }
  }

  return dom.serialize();
}
