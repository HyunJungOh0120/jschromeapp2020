const gameContainer = document.querySelector(".randomNumGame");
const randomNumber = gameContainer.querySelector(".randomNumber");
const rangeInput = gameContainer.querySelector(".randomNumGame__rangeInput");
const numInput = gameContainer.querySelector(".randomNumGame__numInput");
const buttonInput = gameContainer.querySelector(".randomNumGame__buttonInput");
const gameStatus = gameContainer.querySelector(".randomNumGame__status");
const gameResult = gameContainer.querySelector(".randomNumGame__result");
///////////////////////////////////////////////////////////////
// Find a random number on a range between 0 and a number defined by the user.
// Use range input.
// Update the range value in real time.
// Only play after the user chooses a number.
// Notify the user if the game is lost or won.

// 1. range input => change the randomNumber on html
// 2. Create guessNum => Math.random() * ${+randomNumber}
// 3. buttoninput.addevent('click', then...)

///// if (numInput > guessNum)
///// update status  => remove 'hidden' class
/////  `You chose: ${numInput}, the machine chose: ${guessNum}`
///// update result  => remove 'hidden' class
///// `You won!`

///// if (numInput < guessNum)
///// update status  => remove 'hidden' class
/////  `You chose: ${numInput}, the machine chose: ${guessNum}`
///// update result  => remove 'hidden' class
///// `You lost!`
let guessNum, limitNum;
const generateNumber = function () {
  limitNum = rangeInput.value;
  randomNumber.textContent = limitNum;

  guessNum = Math.floor(Math.random() * limitNum + 1);
  console.log(guessNum);
};

const playGame = function (e) {
  e.preventDefault();
  const currNum = numInput.value;

  if (!currNum) return;
  if (+currNum > +limitNum) {
    gameStatus.textContent = `You chose too big number. Please choose again. 🥲`;
    gameStatus.classList.remove("hidden");

    return;
  }

  generateNumber();

  gameStatus.textContent = `You chose: ${currNum}, the machine chose: ${guessNum}`;
  gameStatus.classList.remove("hidden");

  if (currNum > guessNum) {
    gameResult.textContent = `You won! 😁`;
    gameResult.classList.remove("hidden");
  }

  if (currNum < guessNum) {
    gameResult.textContent = `You lost! 😜`;
    gameResult.classList.remove("hidden");
  }

  if (currNum === guessNum) {
    gameResult.textContent = `Same Number! Good job! 😎`;
    gameResult.classList.remove("hidden");
  }
};

function init() {
  rangeInput.addEventListener("input", generateNumber);
  buttonInput.addEventListener("click", playGame);
}

init();

/*
<body>
    <h1>Random Number Game</h1>
    <div>
      <h3 class="js-title">Generate a number between 0 and <span>10</span></h3>
      <datalist id="number">
        <option value="50"></option>
        <option value="100"></option>
        <option value="150"></option>
        <option value="200"></option>
      </datalist>
      <input
        list="number"
        id="js-range"
        type="range"
        min="5"
        max="200"
        value="5"
        step="5"
      />
    </div>
    <form id="js-guess">
      <label>Guess the number:</label>
      <input type="number" max="200" min="5" />
      <button>Play!</button>
    </form>
    <div id="js-result">
      <span></span>
    </div>
    <script src="src/index.js"></script>
  </body>



const range = document.getElementById("js-range");
const title = document.querySelector(".js-title");
const guessForm = document.getElementById("js-guess");
const result = document.getElementById("js-result");

function handleRangeChange(e) {
  const selectedRange = title.querySelector("span");
  selectedRange.innerHTML = range.value;
}

function handleGuessSubmit(e) {
  e.preventDefault();
  const guessInput = guessForm.querySelector("input");
  if (guessInput.value === "") {
    return;
  }
  const max = range.value;
  const random = Math.ceil(Math.random() * max);
  const userGuess = parseInt(guessInput.value, 10);
  const resultSpan = result.querySelector("span");
  resultSpan.innerHTML = `
  You chose: ${userGuess},
  the machine chose: ${random}.<br />
  <strong>${userGuess === random ? "You won!" : "You lost!"}</strong>
  `;
}

guessForm.addEventListener("submit", handleGuessSubmit);
range.addEventListener("input", handleRangeChange);
 */
