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

/*
The calculator has several functionalities:
  -it takes the user input when they click on any of the numbers or operators and displays it as the user is clicking the operators or numbers buttons
  -it displays the input in the .display__input-line
  -when the user clicks on the equal sign in the operations section, the result of the expression in the .display__input-line is evaluated and 
  displayed in the .display__preview-line
  -whenever the user clicks on the AC button,the .displaye__input-line and .display__preview-line are emptied
  -whenver the user clicks on the +/- button the result in the .display__preview-line is doubled but only once 
*/

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((total, current) => total + current, 0);
};

const multiply = function (array) {
  return array.reduce((product, current) => product * current);
};

const power = function (a, b) {
  return Math.pow(a, b);
};

const factorial = function (n) {
  if (n === 0) return 1;
  const solutionToSubProblem = factorial(n - 1);
  return solutionToSubProblem + n;
};

// The actual calculator functionality

const input = document.querySelector(".display__input-line");
const result = document.querySelector(".display__preview-line--result");

const numbersBtns = document.querySelectorAll(".keypad__numbers button");
const operatorsBtns = document.querySelectorAll(".keypad__operators button");

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
// if the user clicks on the equal button, the program searches for  × or ÷ and then grabs the term before and after the operator
// and evaluates the term and returs it then the program evaluates
