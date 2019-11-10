import Hangman from './hangman';
import getPuzzleAsync from './request';
import '../style/main.css';
import '../images/favicon.png';

let game1;

const wordToGuessEl = document.querySelector('#word-to-guess');
const messageEl = document.querySelector('#message');
const lettersEl = document.querySelector('#letters');
let letterEls;

/**
 * When the key is pressed, get the pressed letter and make a guess
 */
window.addEventListener('keypress', (e) => { 
  if( (e.charCode >=65 && e.charCode <=90) || (e.charCode >=97 && e.charCode <=122) ) {
    const guess = e.key;
    styleGuessedLetter(guess);  // Apply a style to guessed letter
    game1.makeGuess(guess);
    render();
  }  
});

/**
 * Render 26 letters on the screen and add event listeners to it.
 * When click a letter, this letter is guessed.
 */
const renderLetters = () => {
  lettersEl.innerHTML = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lettersArr = letters.split('');
  lettersArr.forEach((letter) => {
    lettersEl.innerHTML += `<span letter="${letter}">${letter}</span>`;
  });

  letterEls = document.querySelectorAll('span[letter]');
  letterEls.forEach((letterEl) => {
    letterEl.addEventListener('click', (e) => {
      const guess = e.srcElement.attributes.letter.nodeValue;
      styleGuessedLetter(guess);  // Apply a style to guessed letter
      game1.makeGuess(guess);
      render();
    });
  });
}

/**
 * Render the puzzle section
 */
const render = () => {
  wordToGuessEl.innerHTML = '';
  messageEl.textContent = game1.getStatusMessage(); 
  game1.getPuzzle().split('').forEach((letter) => {
    wordToGuessEl.innerHTML += '<span>' + letter + '</span>';
  });
}

/**
 * Start a game. Get a new puzzle and render the puzzle section and 26 letters
 */
const startGame = async () => {
  try {
    const puzzle = await getPuzzleAsync();
    game1 = new Hangman(puzzle, 7);
    render();
    renderLetters();    
  } catch(e) {
    console.log(e);
    wordToGuessEl.innerHTML = '<div class="error">Cannot generate a puzzle!</div>';
  }
};

document.querySelector('#btn-start').addEventListener('click', startGame);

startGame(); 

/**
 * Add a style to guessed letters 
 */
const styleGuessedLetter = (guess) => {
  if(game1.status !== 0) return;
  letterEls.forEach((letterEl) => {
    if(letterEl.attributes.letter.nodeValue === guess.toUpperCase()) {
      letterEl.className = 'guessed-letter';
    }
  });
}


