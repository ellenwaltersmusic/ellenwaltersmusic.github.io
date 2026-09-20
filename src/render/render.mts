import { marked } from "marked";
import { JSDOM } from "jsdom";

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
  if (navEl) navEl.classList.add("active");

  return dom.serialize();
}
