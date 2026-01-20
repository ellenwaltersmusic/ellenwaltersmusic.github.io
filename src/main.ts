import { renderRoute } from "./router";

window.addEventListener("popstate", renderRoute);
await renderRoute();

//

const searchButton: HTMLAnchorElement | null = document.getElementById(
  "search",
) as HTMLAnchorElement;
const searchDialog: HTMLDialogElement | null = document.getElementById(
  "search-modal",
) as HTMLDialogElement;
const searchCloseButton: HTMLImageElement | null = document.getElementById(
  "search-close",
) as HTMLImageElement;
const menuButton: HTMLAnchorElement | null = document.getElementById(
  "menu",
) as HTMLAnchorElement;

if (searchButton && searchDialog) {
  searchButton.onclick = () => {
    searchDialog.showModal();
  };
}

if (searchDialog && searchCloseButton) {
  searchDialog.onclick = (e) => {
    if (e.target === searchDialog || e.target === searchCloseButton) {
      searchDialog.close();
    }
  };
}

if (menuButton) {
  menuButton.onclick = () => {
    console.log("open nav menu");
  };
}
