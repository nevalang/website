document.addEventListener("DOMContentLoaded", setTheme);

function setTheme() {
  const preference = localStorage.getItem("dark");

  if (preference === "true") {
    document.body.classList.add("dark");
    return;
  }

  if (preference === "false") {
    return;
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark");
  }
}


