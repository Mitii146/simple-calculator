const display = document.querySelector("#display");
const allBtns = document.querySelectorAll(".btn");

let currentNumber = "";
let previousNumber = "";
let operator = "";

// Funkcja do liczenia wyniku
function calculate(a, b, op) {
  let numA = parseFloat(a);
  let numB = parseFloat(b);
  let result = 0;

  if (op === "+") result = numA + numB;
  else if (op === "-") result = numA - numB;
  else if (op === "*") result = numA * numB;
  else if (op === "/") {
    if (numB === 0) return "Error";
    result = numA / numB;
  }

  return parseFloat(result.toFixed(4)).toString();
}

allBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.classList.contains("number")) {
      if (btn.innerText === ",") {
        if (!currentNumber.includes(".")) {
          currentNumber += ".";
          display.textContent = currentNumber;
        }
      } else {
        currentNumber += btn.textContent;
        display.textContent = currentNumber;
      }
    } else if (btn.classList.contains("operator")) {
      if (currentNumber === "" && previousNumber === "") return;
      if (previousNumber !== "" && currentNumber !== "") {
        currentNumber = calculate(previousNumber, currentNumber, operator);
        display.textContent = currentNumber;
      }
      operator = btn.textContent;
      previousNumber = currentNumber;
      currentNumber = "";
    } else if (btn.classList.contains("equal")) {
      if (currentNumber === "" || previousNumber === "" || operator === "")
        return;
      currentNumber = calculate(previousNumber, currentNumber, operator);
      display.innerText = currentNumber;
      previousNumber = "";
      operator = "";
    } else {
      if (btn.textContent === "C") {
        currentNumber = currentNumber.slice(0, -1);
        display.textContent = currentNumber;
      } else if (btn.textContent === "AC") {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        display.textContent = "";
      } else if (btn.textContent === "%") {
        if (currentNumber !== "") {
          currentNumber = (parseFloat(currentNumber) / 100).toString();
          display.textContent = currentNumber;
        }
      }
    }
  })
);
