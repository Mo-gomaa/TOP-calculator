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

// The calculation functionality
const input = document.querySelector(".display__input-line");
const result = document.querySelector(".display__preview-line--result");

const numbersBtns = document.querySelectorAll(
  ".keypad__numbers button:not(:nth-child(10))"
);
const point = document.querySelector(".keypad__numbers button:nth-child(10)");
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
function evaluateExpression(expression) {
  return new Function("return " + expression)();
}

function calculate() {
  result.textContent = evaluateExpression(
    input.textContent.replace(/÷/g, "/").replace(/×/g, "*")
  );
  clearInput();
}

function clearInput() {
  input.textContent = "";
}

numbersBtns.forEach((El) => {
  El.addEventListener("click", () => (input.textContent += El.textContent));
});

AC.addEventListener("click", () => {
  clearInput();
});
plusInMinus.addEventListener("click", () => {
  if (result.textContent.startsWith("-")) {
    return;
  } else {
    result.textContent = "-" + result.textContent;
  }
});
perCent.addEventListener("click", () => {
  result.textContent /= 100;
  perCent.disabled = true;
});

equalBtn.addEventListener("click", () => calculate());

point.addEventListener("click", () => {
  if (input.textContent === "") {
    input.textContent += "0.";
  } else {
    for (term in input.textContent.split(" ")) {
      if (
        input.textContent
          .split(" ")
          [input.textContent.split(" ").length - 1].includes(".")
      ) {
        return;
      } else {
        input.textContent += ".";
      }
    }
  }
});

operatorsBtns.forEach((El) => {
  El.addEventListener("click", () => {
    if (input.textContent === "") {
      input.textContent = result.textContent;
      input.textContent += ` ${El.textContent} `;
    } else {
      input.textContent += ` ${El.textContent} `;
    }
  });
});

window.addEventListener("keydown", (e) => {
  handleKeyboardEvent(e.key);
});

function handleKeyboardEvent(key) {
  if (key >= 0 && key <= 9) {
    if (input.textContent === "") {
      input.textContent += `${key}`;
    } else {
      input.textContent += `${key}`;
    }
  } else if (key === ".") {
    if (input.textContent === "") {
      input.textContent += "0.";
    } else {
      for (term in input.textContent.split(" ")) {
        if (
          input.textContent
            .split(" ")
            [input.textContent.split(" ").length - 1].includes(".")
        ) {
          return;
        } else {
          input.textContent += ".";
        }
      }
    }
  } else if (key === "+" || key === "-") {
    if (input.textContent === "") {
      input.textContent = result.textContent;
      input.textContent += ` ${key} `;
    } else {
      input.textContent += ` ${key} `;
    }
  } else if (key === "/") {
    if (input.textContent === "") {
      input.textContent = result.textContent;
      input.textContent += ` ${divisionBtn.textContent} `;
    } else {
      input.textContent += ` ${divisionBtn.textContent} `;
    }
  } else if (key === "*") {
    if (input.textContent === "") {
      input.textContent = result.textContent;
      input.textContent += ` ${multiplicationBtn.textContent} `;
    } else {
      input.textContent += ` ${multiplicationBtn.textContent} `;
    }
  } else if (key === "Backspace") {
    if (
      input.textContent.split(" ")[input.textContent.split(" ").length - 1]
        .length == 3
    ) {
      for (let i = 0; i < 3; i++) {
        input.textContent = input.textContent.substring(
          0,
          input.textContent.length - 1
        );
      }
    } else {
      input.textContent = input.textContent.substring(
        0,
        input.textContent.length - 1
      );
    }
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Delete") {
    clearInput();
  } else if (key === "F9") {
    if (result.textContent === "0") {
      return;
    } else {
      if (result.textContent.startsWith("-")) {
        result.textContent = result.textContent.replace("-", "");
      } else {
        result.textContent = "-" + result.textContent;
      }
    }
  }
}

/*
The remaining funcionalities are:
  -moving 
  -history
 */
