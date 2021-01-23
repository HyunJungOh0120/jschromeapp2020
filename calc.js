"use strict";

const calContainer = document.querySelector(".calculator");
const calcNumbers = calContainer.querySelector(".calc__numbers");
const calcOperations = calContainer.querySelector(".calc__operations");

const btnAnswer = calcNumbers.querySelector(".answer");

////////////////////////////////////////////////////////
const calculator = {
  displayValue: "0",
  firstNum: null,
  operator: null,
  waiting: false,
};

const inputNum = function (keyContent) {
  const { displayValue, waiting, firstNum, operator } = calculator;
  if (waiting === true) {
    calculator.displayValue = keyContent;
    calculator.waiting = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? keyContent : displayValue + keyContent;
  }
  calculator.exOps = operator;
};

const displayNum = function () {
  btnAnswer.textContent = calculator.displayValue;
};

const decimalDot = function (keyContent) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue + ".";
};

const calculate = function (first, second, ops) {
  if (ops === "plus") {
    return first + second;
  }
  if (ops === "minus") {
    return first - second;
  }
  if (ops === "multiply") {
    return first * second;
  }
  if (ops === "divide") {
    return first / second;
  }
  return second;
};

const handleOperator = function (nextops) {
  const { displayValue, firstNum, operator, waiting } = calculator;
  const digit = parseFloat(displayValue);

  if (firstNum === null && !isNaN(displayValue)) {
    calculator.firstNum = digit;
  } else if (operator) {
    const result = calculate(firstNum, digit, nextops);

    calculator.displayValue = String(result);
    calculator.firstNum = result;
  }
  calculator.waiting = true;

  calculator.operator = nextops;
  console.log(calculator);
};

const resetAll = function () {
  calculator.firstNum = null;
  calculator.displayValue = "0";
  calculator.operator = null;
  calculator.waiting = false;

  displayNum();
};

const getResult = function (ops) {
  const { displayValue, firstNum, exOps } = calculator;

  const digit = parseFloat(displayValue);
  const result = calculate(firstNum, digit, exOps);

  calculator.displayValue = String(result);
  calculator.firstNum = null;
  calculator.operator = null;
  calculator.waiting = false;
  console.log(calculator);
};

calContainer.addEventListener("click", (e) => {
  const key = e.target;
  const keyContent = key.textContent;
  const ops = key.dataset.ops;

  if (!key.matches("button")) return;

  if (!ops) {
    inputNum(keyContent);
    console.log(calculator);
  }
  if (ops === "decimal") {
    decimalDot(keyContent);
  }
  displayNum();

  if (
    ops === "plus" ||
    ops === "minus" ||
    ops === "multiply" ||
    ops === "divide"
  ) {
    handleOperator(ops);

    displayNum();
  }

  if (ops === "clear") {
    resetAll();
  }

  if (ops === "result") {
    getResult(ops);
    displayNum();
  }
});

/* 

  <body>
    <span class="js-result result">0</span>
    <span class="js-reset reset">C</span>
    <span class="js-number">7</span>
    <span class="js-number">8</span>
    <span class="js-number">9</span>
    <span class="js-operation operation">+</span>
    <span class="js-number">4</span>
    <span class="js-number">5</span>
    <span class="js-number">6</span>
    <span class="js-operation operation">-</span>
    <span class="js-number">1</span>
    <span class="js-number">2</span>
    <span class="js-number">3</span>
    <span class="js-operation operation">*</span>
    <span class="js-number zero">0</span>
    <span class="js-equals">=</span>
    <span class="js-operation operation">/</span>
    <script src="src/index.js"></script>
  </body>



  body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 80px;
  grid-auto-rows: 80px;
  grid-gap: 10px;
  background-color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body span {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3d3b41;
  border-radius: 20px;
  font-size: 28px;
  color: white;
  cursor: pointer;
}

body span:active {
  opacity: 0.8;
}

body span:not(.result) {
  user-select: none;
}

.result {
  background-color: black;
  padding-right: 20px;
  justify-content: flex-end;
  font-size: 48px;
  grid-column: 1 / 4;
}

.zero {
  grid-column: 1 / 3;
}

.operation {
  background-color: #ff9a00;
}

.reset {
  background-color: #b3b3bb;
}




const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");
const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));

let firstValue = "",
  firstDone,
  secondValue = "",
  secondDone,
  currentOperation;

function doOperation() {
  const intValueA = parseInt(firstValue, 10);
  const intValueB = parseInt(secondValue, 10);
  switch (currentOperation) {
    case "+":
      return intValueA + intValueB;
    case "-":
      return intValueA - intValueB;
    case "/":
      return intValueA / intValueB;
    case "*":
      return intValueA * intValueB;
    default:
      return;
  }
}

function handleNumberClick(e) {
  const clickedNum = e.target.innerText;
  if (!firstDone) {
    firstValue = firstValue + clickedNum;
    result.innerHTML = firstValue;
  } else {
    secondValue = secondValue + clickedNum;
    result.innerHTML = secondValue;
    secondDone = true;
  }
}

function calculate() {
  const operation = doOperation();
  result.innerHTML = operation;
  firstValue = operation;
  secondDone = false;
  secondValue = "";
}

function handleOperationClick(e) {
  const clickedOperation = e.target.innerText;
  if (!firstDone) {
    firstDone = true;
  }
  if (firstDone && secondDone) {
    calculate();
  }
  currentOperation = clickedOperation;
}

function handleReset() {
  firstValue = "";
  secondValue = "";
  firstDone = false;
  secondDone = false;
  currentOperation = null;
  result.innerHTML = "0";
}

function handleEqualsClick() {
  if (firstDone && secondDone) {
    calculate();
  }
}

numbers.forEach(function(number) {
  number.addEventListener("click", handleNumberClick);
});
operations.forEach(function(operation) {
  operation.addEventListener("click", handleOperationClick);
});
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleEqualsClick);
*/
