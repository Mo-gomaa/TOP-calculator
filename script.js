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

// The calculation unctionality
let equalClicked = false;
const input = document.querySelector(".display__input-line");
const result = document.querySelector(".display__preview-line--result");

const numbersBtns = document.querySelectorAll(".keypad__numbers button");
const operatorsBtns = document.querySelectorAll(
  ".keypad__operators button:not(:last-child)"
);
const specialOperationsBtns = document.querySelectorAll(
  ".keypad__special-operations button"
);

const AC = document.querySelector(
  ".keypad__special-operations button:nth-child(1)"
);
const plusInMinus = document.querySelector(
  ".keypad__special-operations button:nth-child(2)"
);
const perCent = document.querySelector(
  ".keypad__special-operations button:nth-child(3)"
);

const divisionBtn = document.querySelector(
  ".keypad__operators button:nth-child(1)"
);
const multiplicationBtn = document.querySelector(
  ".keypad__operators button:nth-child(2)"
);
const subtractionBtn = document.querySelector(
  ".keypad__operators button:nth-child(3)"
);
const additionBtn = document.querySelector(
  ".keypad__operators button:nth-child(4)"
);
const equalBtn = document.querySelector(
  ".keypad__operators button:nth-child(5)"
);
// when the user clicks any of the numbers or operators, the clicked button content is concatenated to the input expression
// and if the user clicks on any of the operators, a space before and after the operators are added aesthsitics
// if the user clicks on the equal button, the program takes the expression and replaces the ÷ with / and the × with *
// the program calculates the expression and assign the result to output and then result.textContent = output

numbersBtns.forEach((El) => {
  El.addEventListener("click", () => {
    input.textContent += El.textContent;
  });
});

operatorsBtns.forEach((El) => {
  El.addEventListener("click", () => {
    input.textContent += ` ${El.textContent} `;
  });
});

specialOperationsBtns.forEach((El) => {
  if (equalClicked == true) {
    El.addEventListener("click", function () {
      this.disabled = true;
    });
  }
});
AC.addEventListener("click", () => (input.textContent = ""));
plusInMinus.addEventListener("click", () => (result.textContent *= 2));
perCent.addEventListener("click", () => (result.textContent /= 100));
equalBtn.addEventListener("click", () => {
  equalClicked = true;
  let expression = input.textContent.replace(/÷/g, "/").replace(/×/g, "*");
  console.log(expression);
  result.textContent = evaluateExpression(expression);
});

function evaluateExpression(expression) {
  return new Function("return " + expression)();
}
