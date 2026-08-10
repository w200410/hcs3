const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "開啟導覽選單");
}

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "關閉導覽選單" : "開啟導覽選單");
});

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

document.querySelector("#year").textContent = new Date().getFullYear();
