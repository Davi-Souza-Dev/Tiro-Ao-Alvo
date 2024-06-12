const light = document.getElementById("luz");
const grid = document.getElementById("hexGrid");
const mira = document.getElementById("mira");

window.addEventListener("mousemove", (e) => {
  light.style.left = `${e.clientX}px`;
  light.style.top = `${e.clientY}px`;
});
