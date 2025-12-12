const searchButton: HTMLAnchorElement | null = document.getElementById("search") as HTMLAnchorElement;
const menuButton: HTMLAnchorElement | null = document.getElementById("menu") as HTMLAnchorElement;

if (searchButton) {
    searchButton.onclick = () => {
        console.log("open search menu");
    }
}

if (menuButton) {
    menuButton.onclick = () => {
        console.log("open nav menu");
    }
}
