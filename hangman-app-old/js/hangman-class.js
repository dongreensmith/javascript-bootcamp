/**
 * Hangman class(Class)
 */
class Hangman {
  constructor(word, remainingGuesses) {
    this.wordToGuess = word.toUpperCase();    // The word to guess (string format)
    this.word = word.toUpperCase().split(''); // The word to guess (array format)
    this.remainingGuesses = remainingGuesses; // The number of remaining guesses
    this.guessedLetters = []; // The letters that have been guessed
    this.status = 0;  // The status of a game: 0 => 'playing', 1 => 'finished', -1 => 'failed'
  }

  getPuzzle() {
    let puzzle = '';
    this.word.forEach((letter) => {
      if(this.guessedLetters.includes(letter)) {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });
    return puzzle;
  }

  makeGuess(guess) {
    guess = guess.toUpperCase();
    const isUnique = !this.guessedLetters.includes(guess);  
    const isBadGuess = !this.word.includes(guess);

    if(this.status !== 0) { // If status is not 0(playing), stop guess
      return;
    }
    
    if(isUnique) {  // Check if the letter is guessed before
      // this.guessedLetters.push(guess);
      this.guessedLetters = [...this.guessedLetters, guess];
      if(isBadGuess) this.remainingGuesses--; // Check if it is a bad guess
    }
    this.setStatus();
  }

  setStatus() {
    const isWin = this.word.every((letter) => this.guessedLetters.includes(letter));
    if(this.remainingGuesses <= 0) {
      this.status = -1;
    } else if(isWin) {
      this.status = 1;
    } else {
      this.status = 0;
    }
  }

  getStatusMessage() {
    if(this.status === 0) {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if(this.status === -1) {
      return `You lose! The word is ${this.wordToGuess}`;
    } else if(this.status === 1) {
      return 'Congratulations! You win!';
    }
  }

}
