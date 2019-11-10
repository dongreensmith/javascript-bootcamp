/**
 * Hangman class(Prototype)
 */
const Hangman = function(word, remainingGuesses) {
  this.wordToGuess = word.toUpperCase();    // The word to guess (string format)
  this.word = word.toUpperCase().split(''); // The word to guess (array format)
  this.remainingGuesses = remainingGuesses; // The number of remaining guesses
  this.guessedLetters = []; // The letters that have been guessed
  this.status = 0;  // The status of a game: 0 => 'playing', 1 => 'finished', -1 => 'failed'
};

/**
 * Generate a puzzle based on guessed letter(s)
 * For example, if the word for guess is 'class', it will return '*****' initially
 * If 'a' is guessed and it's a good guess, it will return the guessed letter(s) with unguessed ones, like '**a**'.
 * @param null
 * @returns String the puzzle string
 */
Hangman.prototype.getPuzzle = function() {
  let puzzle = '';
  this.word.forEach((letter) => {
    if(this.guessedLetters.includes(letter)) {
      puzzle += letter;
    } else {
      puzzle += '*';
    }
  });
  return puzzle;
};

/**
 * Make a guess, add the guessed letter to guessedLetters array,
 * Check if it is a good guess and update the status if necessary.
 * If it is not a good guess, the function will subtract the remaining guesses by 1. 
 * @param String/Character the letter to guess
 * @returns undefined 
 */
Hangman.prototype.makeGuess = function(guess) {
  guess = guess.toUpperCase();
  const isUnique = !this.guessedLetters.includes(guess);  
  const isBadGuess = !this.word.includes(guess);

  if(this.status !== 0) { // If status is not 0(playing), stop guess
    return;
  }
  
  if(isUnique) {  // Check if the letter is guessed before
    this.guessedLetters.push(guess);
    if(isBadGuess) this.remainingGuesses--; // Check if it is a bad guess
  }
  this.setStatus();
};

/**
 * Check and set the game status: finished(win), failed or playing
 * @param null
 * @returns undefined
 */
Hangman.prototype.setStatus = function() {
  const isWin = this.word.every((letter) => this.guessedLetters.includes(letter));
  if(this.remainingGuesses <= 0) {
    this.status = -1;
  } else if(isWin) {
    this.status = 1;
  } else {
    this.status = 0;
  }
}

/**
 * Return game messages based on game status
 * @param null
 * @returns String game messages
 */
Hangman.prototype.getStatusMessage = function() {
  if(this.status === 0) {
    return `Guesses left: ${this.remainingGuesses}`;
  } else if(this.status === -1) {
    return `You lose! The word is ${this.wordToGuess}`;
  } else if(this.status === 1) {
    return 'Congratulations! You win!';
  }
}