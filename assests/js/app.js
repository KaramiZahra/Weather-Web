// dark mode
const darkModeBtn = document.querySelector(".bx-moon");
const htmlTag = document.querySelector("html");

darkModeBtn.addEventListener("click", () => {
  if (darkModeBtn.classList.contains("bx-moon")) {
    darkModeBtn.classList.replace("bx-moon", "bx-sun");
    htmlTag.classList.add("dark");
    setLocalMode("Dark");
  } else {
    darkModeBtn.classList.replace("bx-sun", "bx-moon");
    htmlTag.classList.remove("dark");
    setLocalMode("Light");
  }
});

const setLocalMode = (theme) => {
  localStorage.setItem("theme", JSON.stringify(theme));
};

window.addEventListener("load", () => {
  let getTheme = JSON.parse(localStorage.getItem("theme"));
  getTheme == "Dark"
    ? htmlTag.classList.add("dark")
    : htmlTag.classList.remove("dark");
});
