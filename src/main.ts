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

const navClick = (e: KeyboardEvent) => {
  if (e.target && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    (e.target as HTMLElement).click();
  }
};

if (searchButton && searchDialog) {
  searchButton.onclick = () => {
    searchDialog.showModal();
  };
  searchButton.onkeydown = navClick;
}

if (searchDialog && searchCloseButton) {
  searchDialog.onclick = (e) => {
    if (e.target === searchDialog || e.target === searchCloseButton) {
      searchDialog.close();
    }
  };
  searchCloseButton.onkeydown = navClick;
}

if (menuButton) {
  menuButton.onclick = () => {
    console.log("open nav menu");
  };
  menuButton.onkeydown = navClick;
}
