let game1;

const wordToGuessEl = document.querySelector("#word-to-guess");
const messageEl = document.querySelector("#message");

// wordToGuessEl.textContent = game1.getPuzzle();
// messageEl.textContent = game1.getStatusMessage();

window.addEventListener("keypress", e => {
  if (
    (e.charCode >= 65 && e.charCode <= 90) ||
    (e.charCode >= 97 && e.charCode <= 122)
  ) {
    const guess = e.key;
    game1.makeGuess(guess);
    render();
  }
});

const render = () => {
  wordToGuessEl.innerHTML = "";
  messageEl.textContent = game1.getStatusMessage();
  game1
    .getPuzzle()
    .split("")
    .forEach(letter => {
      wordToGuessEl.innerHTML += "<span>" + letter + "</span>";
    });
};

const startGame = async () => {
  try {
    const puzzle = await getPuzzleAsync();
    game1 = new Hangman(puzzle, 7);
    render();
  } catch (e) {
    console.log(e);
    wordToGuessEl.innerHTML =
      '<div class="error">Cannot generate a puzzle!</div>';
  }
};

document.querySelector("#btn-start").addEventListener("click", startGame);

startGame();

// Call getPUzzleAsync (Use async-await function)
// getPuzzleAsync().then((puzzle) => {
//   console.log(puzzle);
// }).catch((error) => {
//   console.log(`Error happens: ${error}`);
// });

// Call getPuzzleFetch (Use fetch API)
// getPuzzleFetch().then((puzzle) => {
//   console.log(puzzle);
// }).catch((error) => {
//   console.log(`Error happens: ${error}`);
// });

// Call getPuzzlePromise (Using promise)
// const puzzlePromise = getPuzzlePromise();
// puzzlePromise.then((data) => {
//   console.log(data);
// }, (error) => {
//   console.log(`Error happens: ${error}`);
// });

// Call getPuzzle (Async version)
// getPuzzle((error, data) => {
//   if(error) {
//     console.log(`Error happens: ${error}`);
//   } else {
//     console.log(data);
//   }
// })

// Call getPuzzleSync()
// const puzzle = getPuzzleSync();
// console.log(puzzle);

// console.log('Do something else.');
