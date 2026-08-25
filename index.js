const sidebar = document.getElementById("sidebar");
const navss = document.getElementById("navss");
const sidebarImg = sidebar.querySelector("img");
const links = document.querySelectorAll(".nav-link");

sidebar.onclick = () => {
  navss.classList.toggle("open");

  if (navss.classList.contains("open")) {
    sidebarImg.src = "imgs/close-svgrepo-com.svg";
    sidebarImg.alt = "close";
  } else {
    sidebarImg.src = "imgs/align-left-svgrepo-com.svg";
    sidebarImg.alt = "menu";
  }
};

links.forEach((link) => {
  link.onclick = (event) => {
    event.preventDefault();
    navss.classList.remove("open");

    sidebarImg.src = "imgs/align-left-svgrepo-com.svg";
    sidebarImg.alt = "menu";
  };
});
