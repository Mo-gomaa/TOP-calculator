// check for saved 'lightMode' in localStorage
let lightMode = localStorage.getItem("lightMode");

const lightModeToggle = document.querySelector(".toggle-history__toggle");

const enableLightMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("light-mode");
  // 2. Update lightMode in localStorage
  localStorage.setItem("lightMode", "enabled");
};

const disableLightMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("light-mode");
  // 2. Update lightMode in localStorage
  localStorage.setItem("lightMode", null);
};

// If the user already visited and enabled lightMode
// start things off with it on
if (lightMode === "enabled") {
  enableLightMode();
}

// When someone clicks the button
lightModeToggle.addEventListener("change", () => {
  // get their lightMode setting
  lightMode = localStorage.getItem("lightMode");

  // if it not current enabled, enable it
  if (lightMode !== "enabled") {
    enableLightMode();
    // if it has been enabled, turn it off
  } else {
    disableLightMode();
  }
});
