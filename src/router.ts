import { pages } from "./content";
import { marked } from "marked";

export async function renderRoute() {
  let path = window.location.pathname.replace(/\/$/, "");

  if (path === "" || path === "/") {
    path = "/index";
    (document.getElementById("home") as HTMLAnchorElement).classList.add("active");
  }

  if (!/^\/[a-zA-Z0-9_-]+$/.test(path)) {
    const md = pages["./content/404.md"];
    await setupPage(md);
    return;
  }

  if (path === "/about")
    (document.getElementById("about") as HTMLAnchorElement).classList.add("active");

  const key = `./content${path}.md`;

  if (pages[key]) {
    const md = pages[key];
    await setupPage(md);
  } else {
    const md = pages["./content/404.md"];
    await setupPage(md);
  }
}

const footer = document.querySelector("footer") as HTMLElement;
footer.style.display = "none";

const header = document.getElementById("hero-header") as HTMLHeadingElement;
const subtitle = document.getElementById("hero-subtitle") as HTMLHeadingElement;
const container = document.getElementById("content") as HTMLDivElement;

async function setupPage(markdown: string) {
  const content = await marked(markdown, { gfm: true, breaks: true });

  for (let i = 1; i < content.split("<hr>").length; i++) {
    const section = document.createElement("section");
    section.id = `section${i}`;

    const sectionContent = document.createElement("div");
    sectionContent.id = `section${i}-content`;
    sectionContent.innerHTML = content.split("<hr>")[i];

    section.appendChild(sectionContent);
    container.appendChild(section);
  }

  const element = document.createElement("div");
  element.innerHTML = content;

  const h1 = element.querySelector("h1");
  if (h1) {
    header.textContent = h1.textContent;
  }
  const h2 = element.querySelector("h2");
  if (h2) {
    subtitle.textContent = h2.textContent;
  } else {
    subtitle.remove();
  }

  footer.style.display = "block";
}
